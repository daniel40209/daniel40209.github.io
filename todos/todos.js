(function () {
    var todosList = {
        init: function () {
            this.todos = this.store('todos-jquery');
            this.displayTodosDiv();
            todosHandler.eventListener();
        },
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            } else {
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            }
        },
        displayTodosDiv: function () {
            var todosDisplayDiv = document.querySelector('div.todosDisplayDiv');
            todosDisplayDiv.innerHTML = null;
            this.todos.filter(function (todo, position) {
                var todosDiv = document.createElement('div');
                todosDiv.className = 'todosDiv';
                todosDiv.id = position;
                todosDiv.appendChild(todosHandler.toggleTodosButton(todo));
                todosDiv.appendChild(todosHandler.editTodosButton(todo));
                todosDiv.appendChild(todosHandler.deleteTodosButton());
                todosDisplayDiv.appendChild(todosDiv);
            })
            if (this.todos.length > 0) {
                todosDisplayDiv.appendChild(todosHandler.todosToolbar());
            }
            this.store('todos-jquery', this.todos)
        },
        addTodos: function (todoText) {
            this.todos.push({
                todoText: todoText,
                completed: false
            });
            this.displayTodosDiv();
        },
        editTodos: function (position, newTodoText) {
            this.todos[position].todoText = newTodoText;
            this.displayTodosDiv();
        },
        deleteTodos: function (position) {
            this.todos.splice(position, 1)
            this.displayTodosDiv();
        },
        toggleTodos: function (position) {
            this.todos[position].completed = !this.todos[position].completed;
            this.displayTodosDiv();
        },
        toggleAll: function () {
            var completedTodos = 0;
            this.todos.filter(function (todo) {
                if (todo.completed === true) {
                    completedTodos += 1;
                }
            })
            this.todos.filter(function (todo) {
                if (completedTodos === todosList.todos.length) { todo.completed = false }
                else { todo.completed = true }
            })
            this.displayTodosDiv();
        },
        clearCompleted: function () {
            todosInitialLength = this.todos.length
            while (todosInitialLength--) {
                if (this.todos[todosInitialLength].completed === true) {
                    this.deleteTodos(todosInitialLength);
                }
            }
            this.displayTodosDiv();
        },
    }
    var todosHandler = {
        toggleTodosButton: function (todo) {
            var toggleDiv = document.createElement('div');
            toggleDiv.className = 'toggleDiv';
            if (todo.completed === true) {
                toggleDiv.className = 'toggleDiv1';
            }
            else {
                toggleDiv.className = 'toggleDiv2';
            }
            return toggleDiv;
        },
        editTodosButton: function (todo) {
            var editDiv = document.createElement('input');
            editDiv.className = 'editDiv';
            if (todo.completed === true) {
                editDiv.placeholder = todo.todoText;
            }
            else {
                editDiv.placeholder = todo.todoText;
            }
            return editDiv;
        },
        deleteTodosButton: function () {
            var deleteDiv = document.createElement('div');
            deleteDiv.className = 'deleteDiv';
            return deleteDiv;
        },
        todosToolbar: function () {
            var todosToolbar = document.createElement('div');
            todosToolbar.className = 'todosToolbar';
            var todosCounter = document.createElement('div');
            todosCounter.className = 'todosCounter';
            var plural = todosList.todos.length === 1 ? '' : 's';
            todosCounter.textContent = todosList.todos.length + ' item' + plural;
            var todosClearCompleted = document.createElement('div');
            todosClearCompleted.className = 'todosClearCompleted';
            todosClearCompleted.textContent = 'Clear Completed';
            todosToolbar.appendChild(todosCounter)
            todosToolbar.appendChild(todosClearCompleted)
            return todosToolbar;
        },
        eventListener: function () {
            var todosContainer = document.querySelector('div.todosContainer');
            var todosDisplayDiv = document.querySelector('div.todosDisplayDiv');
            var toggleAllButton = document.querySelector("div.toggleAllButton");
            toggleAllButton.addEventListener("click", function () { todosList.toggleAll() })

            todosContainer.addEventListener('keyup', function (event) {
                if (event.target.className === 'addTodosTextInput' && event.keyCode === 13) {
                    todosList.addTodos(event.target.value);
                    event.target.value = null;
                }
                if (event.target.className === 'editDiv' && event.keyCode === 13) {
                    todosList.editTodos(parseInt(event.target.parentNode.id), event.target.value);
                }
            });
            todosContainer.addEventListener('mouseover', function (event) {
                if (event.target.className === 'toggleAllButton') {
                    event.target.childNodes[0].style.opacity = 1;
                }
                if (event.target.className === 'toggleAllImg') {
                    event.target.style.opacity = 1;
                }
            });
            todosContainer.addEventListener('mouseout', function (event) {
                if (event.target.className === 'toggleAllButton') {
                    event.target.childNodes[0].style.opacity = .5;
                }
                if (event.target.className === 'toggleAllImg') {
                    event.target.style.opacity = .5;
                }
            });
            todosDisplayDiv.addEventListener('mouseover', function (event) {
                if (event.target.className === 'deleteDiv') {
                    event.target.style.opacity = 1;
                }
                if (event.target.className === 'editDiv') {
                    event.target.parentNode.childNodes[2].style.opacity = .65;
                }
                if (event.target.className === 'todosClearCompleted') {
                    event.target.style.textDecoration = 'underline';
                }
            });
            todosDisplayDiv.addEventListener('mouseout', function (event) {
                if (event.target.className === 'deleteDiv') {
                    event.target.style.opacity = 0;
                }
                if (event.target.className === 'editDiv') {
                    event.target.parentNode.childNodes[2].style.opacity = 0;
                }
                if (event.target.className === 'todosClearCompleted') {
                    event.target.style.textDecoration = 'none';
                }
            });
            todosDisplayDiv.addEventListener('click', function (event) {
                if (event.target.className === 'deleteDiv') {
                    todosList.deleteTodos(parseInt(event.target.parentNode.id), 1);
                }
                if (event.target.className === 'toggleDiv1' || event.target.className === 'toggleDiv2') {
                    todosList.toggleTodos(event.target.parentNode.id);
                }
                if (event.target.className === 'todosClearCompleted') {
                    todosList.clearCompleted();
                }
            });
        },
    }
    todosList.init();
})()