let task = document.querySelector('#user-input')
let inputButton = document.querySelector('#input-button')
let taskListDiv = document.querySelector('#task-list')

let taskListArray = [];
// task.addEventListener('input', (event) => {
//     console.log('Live text:', event.target.value);
// });

task.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log('Submitted text:', event.target.value);
        taskListArray.push(event.target.value);
        printArray()
    }
})

function printArray() {
    taskListArray.forEach(element => {
        console.log(`array element : ${element}`)
    });
}
