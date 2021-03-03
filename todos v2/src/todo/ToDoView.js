'use strict'

import EditTaskDesc_Transaction from './transactions/EditTaskDesc_Transaction.js'
import EditTaskDate_Transaction from './transactions/EditTaskDate_Transaction.js'
import EditTaskStatus_Transaction from './transactions/EditTaskStatus_Transaction.js'
import MoveTaskDown_Transaction from './transactions/MoveTaskDown_Transaction.js'
import MoveTaskUp_Transaction from './transactions/MoveTaskUp_Transaction.js'
import DeleteTask_Transaction from './transactions/DeleteTask_Transaction.js'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        
        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col'>" + listItem.description + "</div>"
                                + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
            if (listItem.status === "complete") {
                listItemElement += "<div class='status-col-complete'>" + listItem.status + "</div>"
            } else {
                listItemElement += "<div class='status-col-incomplete'>" + listItem.status + "</div>"
            }
            listItemElement += "<div class='list-controls-col'>"

            if (i === 0) {
                listItemElement += " <div class='list-item-control material-icons task-up opague'>keyboard_arrow_up</div>"
            } else {
                listItemElement += " <div class='list-item-control material-icons task-up'>keyboard_arrow_up</div>"
            }

            if (i === list.items.length - 1) {
                listItemElement += " <div class='list-item-control material-icons task-down opague'>keyboard_arrow_down</div>"
            } else {
                listItemElement += " <div class='list-item-control material-icons task-down'>keyboard_arrow_down</div>"
            }
            listItemElement += " <div class='list-item-control material-icons task-delete'>close</div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement; 
        } 

        var appModel = this.model
        var view = this;

        
        for (var i = 0; i < itemsListDiv.childNodes.length; i++) {
            var taskNodes = itemsListDiv.childNodes[i].childNodes
            for (var j = 0; j < taskNodes.length; j++) {
                if (taskNodes[j].className === "task-col") {
                    this.taskDescriptionEvent(taskNodes[j]);
                } else if (taskNodes[j].className === "due-date-col") {
                    this.taskDateEvent(taskNodes[j]);
                } else if (taskNodes[j].className === "status-col-complete" || taskNodes[j].className === "status-col-incomplete") {
                    this.taskStatusEvent(taskNodes[j]);
                } else if (taskNodes[j].className === "list-controls-col") {
                    var listControlDiv = taskNodes[j];
                    for (var z = 0; z < listControlDiv.childNodes.length; z++) {
                        var controlNode = listControlDiv.childNodes[z];
                        if (controlNode.className === "list-item-control material-icons task-up") {
                            controlNode.addEventListener("mouseup", function(e) {
                                let transaction = new MoveTaskUp_Transaction(view, appModel, e);
                                view.model.tps.addTransaction(transaction);
                            });
                        } else if (controlNode.className === "list-item-control material-icons task-down") {
                            controlNode.addEventListener("mouseup", function(e) {
                                let transaction = new MoveTaskDown_Transaction(view, appModel, e);
                                view.model.tps.addTransaction(transaction);
                            });
                        } else if (controlNode.className === "list-item-control material-icons task-delete") {
                            controlNode.addEventListener("mouseup", function(e) {
                                let transaction = new DeleteTask_Transaction(view, appModel, e);
                                view.model.tps.addTransaction(transaction);
                            });
                        } 
                    }
                } 
            }
        }
    }
    
    taskDescriptionEvent(element) {
        var view = this;
        element.addEventListener("mouseup", function(e) {
            var editNode = document.createElement("textarea");
            editNode.setAttribute("class", "editing");
            editNode.value = e.target.innerHTML
            
            var parentNode = e.target.parentElement
            parentNode.childNodes[0].remove();
            parentNode.insertBefore(editNode, parentNode.childNodes[0]);
            
            editNode.addEventListener("blur", function(editEvent) {
                let transaction = new EditTaskDesc_Transaction(view, editEvent, editNode);
                view.model.tps.addTransaction(transaction);
            });
            editNode.focus();
        });
    } 

    taskDateEvent(element) {
        var view = this;
        element.addEventListener("mouseup", function(e) {
            var dueDateNode = e.target;
            var dueDateInput = document.createElement("input");
            dueDateInput.setAttribute("type", "date");
            dueDateInput.setAttribute("class", "editing");
            dueDateInput.value = e.target.innerHTML

            var parentNode = e.target.parentElement
            parentNode.childNodes[1].remove();
            parentNode.insertBefore(dueDateInput, parentNode.childNodes[1]);

            dueDateInput.addEventListener("blur", function(editEvent) {
                let transaction = new EditTaskDate_Transaction(view, editEvent, dueDateInput);
                view.model.tps.addTransaction(transaction);
            });
            dueDateInput.focus();
        });
    }

    taskStatusEvent(element) {
        var view = this;
        element.addEventListener("mouseup", function(e) {
            var statusNode = e.target;
            var statusDropDown = document.createElement("select");
            statusDropDown.innerHTML = "<select class = 'editing' style = 'width: 100%'>"  
                                    + "<option> complete </option>"  
                                    + "<option> incomplete </option>";
            statusDropDown.setAttribute("class", "editing");
            statusDropDown.value = statusNode.innerHTML;

            var parentNode = e.target.parentElement
            parentNode.childNodes[2].remove();
            parentNode.insertBefore(statusDropDown, parentNode.childNodes[2]);

            statusDropDown.addEventListener("blur", function(editEvent) {
                let transaction = new EditTaskStatus_Transaction(view, editEvent, statusDropDown);
                view.model.tps.addTransaction(transaction);
            });
            statusDropDown.focus();
        });
    }
    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

    setModel(initModel) {
        this.model = initModel;
    }
}