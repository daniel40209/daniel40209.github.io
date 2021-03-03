'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteTask_Transaction extends jsTPS_Transaction {
    constructor(view, appModel, e) {
        super();
        this.view = view;
        this.appModel = appModel;
        this.e = e;
    }

    doTransaction() {
        // DELETE TASK
        var desiredId = this.e.target.parentNode.parentNode.id.substring(15);
        var currentList = this.appModel.currentList.items;
        for (var n = 0; n < currentList.length; n++) {
            if (currentList[n].id == desiredId) {
                this.arr = currentList;
                this.index = n;
                this.item = currentList.splice(n, 1);
                break;
            }
        }
        this.view.viewList(this.appModel.currentList);
    }

    undoTransaction() {
        this.arr.splice(this.index, 0, this.item[0]);
        this.view.viewList(this.appModel.currentList);
    }
}