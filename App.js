let enterButton = document.querySelector('.new-todo');
let todo = document.querySelector('.todo-list')
let completedAll = document.querySelector('.toggle-all')
let completedClear = document.querySelector('.clear-completed')
let todoCount = document.querySelector('.todo-count')

completedAll.setAttribute('onclick', 'allCompleted()')
completedClear.setAttribute('onclick', 'clearCompleted()')

let todoList = [];
completedClear.className += ' hidden'

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();

}

enterButton.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (!enterButton.value || enterButton.value.trim() == '') return;

        let newTodo = {
            todo: enterButton.value,
            completed: false,
            id: 0,

        }

        newTodo.todo = enterButton.value.trim();

        todoList.push(newTodo);
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
        enterButton.value = ''

    }

});

function displayMessage() {

    let displayMessage = '';

    todoList.forEach(function(item, index) {

        let completed = () => item.completed ? 'completed' : ''

        displayMessage += `
               
    <li class='${completed()}'>
        
        <div class='view'>
       
        <input class='toggle' type='checkbox' id='item_${index}' ${item.completed ? 'checked' : ''} >
        <label for='item_${index}'> ${item.todo}</label>
        <button class="destroy" id='${index}' onclick="deleteTodo()"></button>
       
        </div>
        
    </li>
            
           `;
        item.id = index;


        if (todoList.every(item => item.completed == false)) {
            completedClear.className += ' hidden'
        } else {

            completedClear.className = 'clear-completed';
        }


        if (todoList.every(item => item.completed == true)) {

            document.querySelector('#toggle-all').checked = true

        } else { document.querySelector('#toggle-all').checked = false }

    });



    if (todoList.length == 0) {
        document.querySelector('body > section > section > label').className += ' hidden';
        completedClear.className += ' hidden';
        document.querySelector('body > section > footer').className += ' hidden'

    } else {
        document.querySelector('body > section > section > label').className = '';
        document.querySelector('body > section > footer').className = 'footer'
    }




    todo.innerHTML = displayMessage;
    todoCount.innerHTML = `Count: ${todoList.length}`;

}

function clearCompleted() {

    let arr = todoList.filter((item) => (item.completed == false))

    todoList = arr;

    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessage();

}

function allCompleted() {
    if (completedAll.checked == true) {
        todoList.forEach(function(item) {
            item.completed = true;
            localStorage.setItem('todo', JSON.stringify(todoList));
            displayMessage();
        })
    } else {
        todoList.forEach(function(item) {
            item.completed = false;
            localStorage.setItem('todo', JSON.stringify(todoList));
            displayMessage();
        })
    }

}


todo.addEventListener('change', function(event) {

    todoList.forEach(function(item) {


        // if (item.todo == todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML.trim()) {

        //     item.completed = !item.completed;
        //     localStorage.setItem('todo', JSON.stringify(todoList));
        //     displayMessage()
        // }



        if (item.id == (event.target.getAttribute('id')).replace('item_', '')) {

            item.completed = !item.completed;
            localStorage.setItem('todo', JSON.stringify(todoList));
            displayMessage()
        }

    });


});


function deleteTodo() {
    let delIndex = event.target.getAttribute('id');
    todoList.splice(delIndex, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessage()

}