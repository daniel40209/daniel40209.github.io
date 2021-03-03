'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveTaskDown_Transaction extends jsTPS_Transaction {
    constructor(view, appModel, e) {
        super();
        this.view = view;
        this.appModel = appModel;
        this.e = e;
    }

    doTransaction() {
        // MOVE TASK DOWN
        var desiredId = this.e.target.parentNode.parentNode.id.substring(15);
        var currentList = this.appModel.currentList.items;
        for (var n = 0; n < currentList.length; n++) {
            if (currentList[n].id == desiredId) {
                if (n === currentList.length - 1    ) {
                    break;
                }
                this.toUndo = currentList;
                this.undoMove = n;
                var temp = currentList[n];
                currentList[n] = currentList[n + 1];
                currentList[n + 1] = temp;
                break;
            }
        }
        this.view.viewList(this.appModel.currentList);
    }

    undoTransaction() {
        var temp = this.toUndo[this.undoMove];
        this.toUndo[this.undoMove] = this.toUndo[this.undoMove + 1];
        this.toUndo[this.undoMove + 1] = temp;
        this.view.viewList(this.view.model.currentList);
    }
}