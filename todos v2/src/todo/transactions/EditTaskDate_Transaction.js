'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditTaskDate_Transaction extends jsTPS_Transaction {
    constructor(view, editEvent, dueDateInput) {
        super();
        this.view = view;
        this.editEvent = editEvent;
        this.dueDateInput = dueDateInput;
    }

    doTransaction() {
        // CHANGE TASK DATE
        var desiredId = this.editEvent.target.parentNode.id.substring(15);
        var currentList = this.view.model.currentList.items;
        for (var z = 0; z < currentList.length; z++) {
            if (currentList[z].id == desiredId) {
                this.toUndo = currentList[z];
                this.undoDate = currentList[z].dueDate;
                currentList[z].dueDate = this.dueDateInput.value;
            }
        }
        this.view.viewList(this.view.model.currentList);
    }

    undoTransaction() {
        this.toUndo.dueDate = this.undoDate;
        this.view.viewList(this.view.model.currentList);
    }
}