const form = document.querySelector('#user-input-field')
const taskList = document.querySelector('#task-list-tree')

let taskArrayList = []


// form event listener -> collects user input
form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const taskInput = document.getElementById('user-input').value;
    createTaskNode(taskInput)
    console.log(taskInput)
})

// creates a task node -> check box | task name | delete button
function createTaskNode(task) {
    const li = document.createElement('li')

    // creating task name
    const taskName = document.createElement('span')
    taskName.textContent = task;
    //li.textContent = task;
    li.appendChild(taskName)
    


    // creating delete button
    const dltButton = document.createElement('button')
    dltButton.textContent = "Delete";
    li.appendChild(dltButton)


    // appending the nodes to the main tree
    taskList.appendChild(li);
}

function renderTaskList() {}