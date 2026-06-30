const form = document.querySelector('#user-input-field')
const taskList = document.querySelector('#task-list-tree')
const resetButton = document.querySelector('#reset-button')
const totalTask = document.querySelector('#totalTasks')
const completedTask = document.querySelector('#completedTasks')

let taskArrayList = []
let totalTasksCounter = 0;
let taskDoneCounter = 0;

// array -> objects - > { taskname : <yourtask>, completed: true/false}

function saveTaskInMemory() {
    localStorage.setItem(
        'tasks',
        JSON.stringify(taskArrayList)
    );
    console.log('elements stored in the local storage')
}

function taskResetButton() {
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('tasks');
        taskList.replaceChildren();
        taskArrayList = []
        taskCounters()
    })
}

// form event listener -> collects user input
function takeTheUserInput() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('user-input').value.trim()
        document.getElementById('user-input').value = '';

        if (!taskName) {
            alert("enter a valid task name")
            return
        }
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
}

// creates a task node -> check box | task name | delete button
function createTaskNode(taskObject) {
    const li = document.createElement("li");

    // Creating the checkbox
    const checkBox = document.createElement("input");
    checkBox.className = "new-checkbox";
    checkBox.type = "checkbox";
    checkBox.checked = !!taskObject.completed;
    li.appendChild(checkBox);

    // Creating task name
    const taskName = document.createElement("span");
    taskName.className = "task-name";

    // Span for actual task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = taskObject.taskName;
    taskName.appendChild(taskText);

    // Creating popup
    const popup = document.createElement("div");
    popup.className = "tooltip";
    popup.textContent = "Click On Task To Edit It";
    taskName.appendChild(popup);

    li.appendChild(taskName);

    // Set initial state
    taskName.style.cursor = checkBox.checked ? "not-allowed" : "pointer";
    popup.style.display = checkBox.checked ? "none" : "";

    // Checkbox functionality
    checkBox.addEventListener("change", () => {
        taskObject.completed = checkBox.checked;

        crossTheTask(taskName, taskObject);
        saveTaskInMemory();

        // Disable/Enable editing
        taskName.style.cursor = checkBox.checked ? "not-allowed" : "pointer";
        popup.style.display = checkBox.checked ? "none" : "";
    });

    // Edit task name
    taskName.addEventListener("click", () => {
        // Don't allow editing if completed
        if (checkBox.checked) return;

        const input = document.createElement("input");
        input.type = "text";
        input.value = taskText.textContent;

        taskName.replaceWith(input);
        input.focus();

        input.addEventListener("blur", () => {
            input.replaceWith(taskName);
        });
    });

    // Creating delete button
    const dltButton = document.createElement("button");
    dltButton.className = "delete-button";
    dltButton.textContent = "Delete";
    li.appendChild(dltButton);

    dltButton.addEventListener("click", () => {
        deleteTaskNode(li, taskObject.id);
    });

    // Append to the task list
    taskList.prepend(li);

    // Apply strike-through if already completed
    crossTheTask(taskName, taskObject, li);
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


function crossTheTask(taskName, taskObject, li) {
    console.log("called", taskObject.completed);
    if (taskObject.completed) {
        taskName.style.textDecoration = 'line-through';
        taskName.style.textDecorationThickness = '0.2rem';
        taskName.style.opacity = '0.5';
        console.log(taskName.style.textDecoration);
        taskCounters()
    } else {
        taskName.style.textDecoration = 'none';
        taskCounters()
    }
}


function taskCounters() {
    totalTasksCounter = taskArrayList.length;
    totalTask.textContent = totalTasksCounter;

    taskDoneCounter = 0;

    taskArrayList.forEach(task => {
        if (task.completed) {
            taskDoneCounter++;
        }
    });

    completedTask.textContent = taskDoneCounter;

}

function renderTaskList() {

    const storedTasks = localStorage.getItem('tasks');

    taskArrayList = storedTasks ? JSON.parse(storedTasks) : [];

    taskArrayList.forEach(task => {
        createTaskNode(task);
    });
}


function init() {
    renderTaskList()
    taskResetButton()
    takeTheUserInput()
}


init()