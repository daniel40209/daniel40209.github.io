'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditTaskDesc_Transaction extends jsTPS_Transaction {
    constructor(view, editEvent, editNode) {
        super();
        this.view = view;
        this.editEvent = editEvent;
        this.editNode = editNode;
    }

    doTransaction() {
        // CHANGE TASK DESCRIPTION
        var appModel = this.view.model;
        var desiredId = this.editEvent.target.parentNode.id.substring(15);
        var currentList = appModel.currentList.items;
        for (var z = 0; z < currentList.length; z++) {
            if (currentList[z].id == desiredId) {
                this.toUndo = currentList[z];
                this.undoDescription = currentList[z].description;
                currentList[z].description = this.editNode.value;
                }
            }
        this.view.viewList(appModel.currentList);
    }

    undoTransaction() {
        this.toUndo.description = this.undoDescription;
        this.view.viewList(this.view.model.currentList);
    }
}