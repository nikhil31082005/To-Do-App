const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

function addTask(){
    if(inputBox.value.trim() === ""){
        alert("You must write something");
        return;
    }
    // Create a task object with name and status
    const task = {
        name: inputBox.value.trim(),
        completed: false
    };
    // Add the task to the tasks array
    tasks.push(task);
    // Render the tasks
    renderTasks();
    // Save tasks to localStorage
    saveData(); 
    // Clear input box
    inputBox.value = "";
}

function renderTasks() {
    // Clear the list container
    listContainer.innerHTML = "";
    // Loop through tasks array and render each task
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.name;
        if (task.completed) {
            li.classList.add("checked");
        }
        // Add event listeners for delete and update
        const deleteImg = document.createElement("img");
        deleteImg.classList.add("dl");
        deleteImg.src = 'delete.png';
        deleteImg.addEventListener("click", () => deleteTask(index));
        
        const updateImg = document.createElement("img");
        updateImg.classList.add("up");
        updateImg.src = 'update.png';
        updateImg.addEventListener("click", () => updateTask(index));
        
        li.appendChild(deleteImg);
        li.appendChild(updateImg);
        
        listContainer.appendChild(li);
    });
}

function deleteTask(index) {
    // Remove the task from the array
    tasks.splice(index, 1);
    // Render the updated tasks
    renderTasks();
    // Save tasks to localStorage
    saveData();
}

function updateTask(index) {
    const newTaskName = prompt("Enter the updated task name:");
    if (newTaskName === null || newTaskName.trim() === "") {
        // If the user cancels or enters an empty string, do nothing
        return;
    }
    // Update the task name
    tasks[index].name = newTaskName.trim();
    // Render the updated tasks
    renderTasks();
    // Save tasks to localStorage
    saveData();
}


function updateTask(index) {
    // Set the task status to completed
    tasks[index].completed = !tasks[index].completed;
    // Render the updated tasks
    renderTasks();
    // Save tasks to localStorage
    saveData();
}
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();