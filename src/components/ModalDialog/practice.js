// create a global aria object
let aria = aria || {};
aria.Utils = aria.Utils || {};

(function() {
  // TODO: When do we change this?
  aria.Utils.IgnoreUtilFocusChanges = false;

  aria.Utils.remove = function(element) {
    element.remove();
  };

  // focus on first descendant of element
  // return true if focused, otherwise false
  aria.Utils.focusFirstDescendant = function(element) {
    const childrenLength = element.childNodes.length;

    for (let i = 0; i < childrenLength; i++) {
      const currentChild = element.childNodes[i];

      // try to focus on child, or find the first child there
      // TODO: what does focusLastDescendant do?
      if (
        aria.Utils.attemptFocus(currentChild) ||
        aria.Utils.focusFirstDescendant(currentChild)
      ) {
        return true;
      }
    }

    return false; // did not focus on an element
  };

  aria.Utils.attemptFocus = function(element) {
    // TODO: Why do we need to update IgnoreUtilFocusChanges?
    aria.Utils.IgnoreUtilFocusChanges = true;
    try {
      element.focus();
    } catch (e) {}
    aria.Utils.IgnoreUtilFocusChanges = false;

    return document.activeElement === element;
  };

  // find the last descendant node that is focusable
  aria.Utils.focusLastDescendant = function(element) {
    for (let i = element.childNodes.length - 1; i >= 0; i--) {
      const currentChild = element.childNodes[i];

      if (
        aria.Utils.attemptFocus(child) ||
        aria.Utils.focusLastDescendant(child)
      ) {
        return true;
      }
    }
    return false;
  };

  aria.OpenDialogList = aria.OpenDialogList || [];

  // retrieve the last dialog from array
  aria.getCurrentDialog = function() {
    if (aria.OpenDialogList && aria.OpenDialogList.length) {
      return aria.OpenDialogList[aria.OpenDialogList.length - 1];
    }
  };

  aria.closeCurrentDialog = function() {
    const currentDialog = aria.getCurrentDialog();
    if (currentDialog) {
      currentDialog.close();
      return true;
    }

    return false;
  };

  aria.KeyCode = {
    ESC: 27
  };

  aria.handleEscape = function(event) {
    const key = event.which || event.keyCode;

    if (key === aria.KeyCode.ESC && aria.closeCurrentDialog()) {
      // stop the event from bubbling up
      // event.preventDefault prevents the default behavior of the browser
      event.stopPropagation();
    }
  };

  document.addEventListener("keyup", aria.handleEscape);

  // dialogId => id of the element dialog container
  // focusAfterClosed => element to focus when modal is closed. Required!
  // focusFirst => element to focus when the modal is first opened
  aria.Dialog = function(dialogId, focusAfterClosed, focusFirst) {
    this.dialogNode = document.getElementById(dialogId);

    // invalid dialog
    if (
      this.dialogNode === null ||
      this.dialogNode.getAttribute("role") !== "dialog"
    ) {
      throw new Error(
        "Dialog() requires a DOM element with ARIA role of dialog."
      );
    }

    // set up focusAfterClosed
    if (typeof focusAfterClosed === "string") {
      this.focusAfterClosed = document.getElementById(focusAfterClosed);
    } else if (typeof focusAfterClosed === "object") {
      this.focusAfterClosed = focusAfterClosed;
    } else {
      throw new Error(
        "the focusAfterClosed parameter is required for the aria.Dialog constructor."
      );
    }

    if (typeof focusFirst === "string") {
      this.focusFirst = document.getElementById(focusFirst);
    } else if (typeof focusFirst === "object") {
      this.focusFirst = focusFirst;
    } else {
      this.focusFirst = null;
    }

    // put an invisible, focusable node before and after the dialog
    // this way, while the dialog is open, it will never focus
    const preDiv = document.createElement("div");
    this.preNode = this.dialogNode.parentNode.insertBefore(
      preDiv,
      this.dialogNode
    );
    this.preNode.tabIndex = 0;

    const postDiv = document.createElement("div");
    this.postNode = this.dialogNode.insertBefore(
      postDiv,
      this.dialogNode.nextSibling
    );
    this.postNode.tabIndex = 0;

    this.addListeners();
    aria.OpenDialogList.push(this);
    this.clearDialog();
    this.dialogNode.className = "default_dialog";

    // show dialog layer
    const layer = document.getElementById("dialog_layer");
    layer.className = "showing";

    if (this.focusFirst) {
      this.focusFirst.focus();
    } else {
      aria.Utils.focusFirstDescendant(this.dialogNode);
    }

    // TODO: What is this.lastFocus used for?
    this.lastFocus = document.activeElement;
  };

  aria.Dialog.prototype.addListeners = function() {
    document.addEventListener("focus", this.trapFocus, true);
  };

  aria.Dialog.prototype.removeListeners = function() {
    document.removeEventListener("focus", this.trapFocus, true);
  };

  aria.Dialog.prototype.clearDialog = function() {
    // clears all input fields
    // is this necessary?
  };

  // hides current dialog
  // remove the listeners for the dialog
  // restore listeners of parent dialog, if there was one
  // set focus on focusAfterClosed element, if it has one
  aria.Dialog.prototype.close = function() {
    aria.OpenDialogList.pop();
    this.removeListeners();
    aria.Utils.remove(this.preNode);
    aria.Utils.remove(this.postNode);
    this.dialogNode.className = "hidden";
    this.focusAfterClosed.focus();

    if (aria.OpenDialogList.length > 0) {
      aria.getCurrentDialog().addListeners();
    } else {
      // hide the layer
      const layer = document.getElementById("dialog_layer");
      layer.className = "hidden";
    }
  };

  // Replaces dialog with another
  aria.Dialog.prototype.replace = function(
    newDialogId,
    newFocusAfterClosed,
    newFocusFirst
  ) {
    var closedDialog = aria.getCurrentDialog();
    aria.OpenDialogList.pop();
    this.removeListeners();

    aria.Utils.remove(this.preNode);
    aria.Utils.remove(this.postNode);
    this.dialogNode.className = "hidden";

    var focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
    var dialog = new aria.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
  };

  aria.Dialog.prototype.trapFocus = function(event) {
    // we don't do anything if ignoring focus changes
    if (aria.Utils.IgnoreUtilFocusChanges) {
      return;
    }

    const currentDialog = aria.getCurrentDialog();
    // if current dialog contains the newly focused target
    if (currentDialog.dialogNode.contains(event.target)) {
      // we are updating the lastFocus now
      currentDialog.lastFocus = event.target;
    } else {
      // if we are focusing into something not in the dialog
      // focus back into the modal
      // this handles when we are about to focus out of the dialog
      aria.Utils.focusFirstDescendant(currentDialog.dialogNode);

      // if we are just focused on the same element, this means...
      // we pressed SHIFT+TAB while on the first element
      // this means we actually want to be on the last element...
      if (currentDialog.lastFocus === document.activeElement) {
        aria.Utils.focusLastDescendant(currentDialog.dialogNode);
      }
      currentDialog.lastFocus = document.activeElement;
    }
  };

  window.openDialog = function(dialogId, focusAfterClosed, focusFirst) {
    new aria.Dialog(dialogId, focusAfterClosed, focusFirst);
  };

  window.closeDialog = function(closeButton) {
    const topDialog = aria.getCurrentDialog();
    if (topDialog.dialogNode.contains(closeButton)) {
      topDialog.close();
    }
  };

  window.replaceDialog = function(newDialogId, newFocusAfterClosed) {
    const topDialog = aria.getCurrentDialog();
    if (topDialog.dialogNode.contains(document.activeElement)) {
      topDialog.replace(newDialogId, newFocusAfterClosed, newFocusFirst);
    }
  };
})();
