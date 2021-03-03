'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            if (document.getElementById("add-list-button").className != "material-icons todo_button opague") {
                appModel.addNewList();
            }
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function() {
            if (appModel.currentList != null) {
                if (confirm('Are you sure you want delete list?')) {
                  appModel.removeCurrentList();
                  document.getElementById("add-item-button").setAttribute("class", "list-item-control material-icons disabled_todo_list_button");
                  document.getElementById("delete-list-button").setAttribute("class", "list-item-control material-icons disabled_todo_list_button");
                  document.getElementById("close-list-button").setAttribute("class", "list-item-control material-icons disabled_todo_list_button");
                  } else {
              } 
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            if (appModel.currentList != null) {
                appModel.addNewItemTransaction();
            }
        } 
        document.getElementById("close-list-button").onmousedown = function() {
            appModel.closeList();
        }
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }
}