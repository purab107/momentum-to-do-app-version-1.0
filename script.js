const form = document.querySelector('#user-input-field')
const taskList = document.querySelector('#task-list-tree')
const resetButton = document.querySelector('#reset-button')
const totalTask = document.querySelector('#totalTasks')
const completedTask = document.querySelector('#completedTasks')

let taskArrayList = []
let totalTasksCounter;
let taskDoneCounter;

// array -> objects - > { taskname : <yourtask>, completed: true/false}

function saveTaskInMemory() {
    localStorage.setItem(
        'tasks',
        JSON.stringify(taskArrayList)
    );
    console.log('elements stored in the local storage')
}

resetButton.addEventListener('click', () => {
    localStorage.removeItem('tasks');
    taskList.replaceChildren();
    taskArrayList = []
    taskCounters()
})

// form event listener -> collects user input
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('user-input').value

    const taskObject = {
        id: Date.now(),
        taskName,
        completed: false
    };

    taskArrayList.push(taskObject)
    // COMMENT THIS
    test()

    saveTaskInMemory()
    createTaskNode(taskObject)
    taskCounters()
})

// creates a task node -> check box | task name | delete button
function createTaskNode(taskObject) {
    const li = document.createElement('li')

    // creating the check box
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.id = 'checkTaskDone'
    checkBox.checked = taskObject.completed
    li.appendChild(checkBox)

    // creating task name
    const taskName = document.createElement('span')
    taskName.textContent = taskObject.taskName;
    li.appendChild(taskName)

    // creating delete button
    const dltButton = document.createElement('button')
    dltButton.textContent = "Delete";
    li.appendChild(dltButton)

    dltButton.addEventListener('click', () => {
        deleteTaskNode(li, taskObject.id)
    })

    // appending the nodes to the main tree
    taskList.appendChild(li);
    crossTheTask(taskName, taskObject)

    
}

function deleteTaskNode(taskNode, taskId) {
    taskArrayList = taskArrayList.filter(task => task.id !== taskId);
    test()
    taskList.removeChild(taskNode)
    deleteTaskFromLocalStorage(taskId)
    console.log('node removed');
    taskCounters()
}

function deleteTaskFromLocalStorage(taskId) {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 2. Filter out the object you want to delete (keep everything EXCEPT id: 2)
    const updatedTasks = allTasks.filter(task => task.id !== taskId);

    // 3. Save the new, updated array back into localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    console.log('task deleted from local storage')
}

// COMMENT THIS
function test() {
    let result = "";
    for (const val of taskArrayList) {
        // Formats each task as: Name(ID:Status)
        result += `${val.taskName}(ID:${val.id}, Done:${val.completed}) `;
    }
    console.log(`array elements : ${result.trim()}`);
}


function crossTheTask(taskName, taskObject) {
    console.log("called", taskObject.completed);
    if(taskObject.completed){
        taskName.style.textDecoration = 'line-through';
        console.log(taskName.style.textDecoration);
    }
}

function checkBoxLogic(){

}

function taskCounters() {
    totalTasksCounter = taskArrayList.length
    totalTask.textContent = totalTasksCounter
}

function renderTaskList() {

    const storedTasks = localStorage.getItem('tasks');

    taskArrayList = storedTasks ? JSON.parse(storedTasks) : [];

    taskArrayList.forEach(task => {
        createTaskNode(task);
    });
}

renderTaskList()
taskCounters()