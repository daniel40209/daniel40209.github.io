'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditTaskStatus_Transaction extends jsTPS_Transaction {
    constructor(view, editEvent, statusDropDown) {
        super();
        this.view = view;
        this.editEvent = editEvent;
        this.statusDropDown = statusDropDown;
    }

    doTransaction() {
        // CHANGE TASK STATUS
        var desiredId = this.editEvent.target.parentNode.id.substring(15);
        var currentList = this.view.model.currentList.items;
        for (var z = 0; z < currentList.length; z++) {
            if (currentList[z].id == desiredId) {
                this.toUndo = currentList[z];
                this.undoStatus = currentList[z].status;
                currentList[z].status = this.statusDropDown.value;
            }
        }
        this.view.viewList(this.view.model.currentList);
    }

    undoTransaction() {
        this.toUndo.status = this.undoStatus;
        this.view.viewList(this.view.model.currentList);
    }
}