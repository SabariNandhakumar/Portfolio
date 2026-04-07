

let canGoAnother = true;
let inc = 1;
let check = false;
const TASKLIST = [];

function _(selector) {
    return document.querySelector(selector);
}

const ADDBTN = _(".addButton");
const DELETEALL = _(".deleteAll");
const TODOWRAP = _(".todo-wrapper");

ADDBTN.addEventListener("click", addNewTask);

DELETEALL.addEventListener("click", () => {
    TODOWRAP.querySelectorAll(".eachTodo").forEach((el) => el.remove());
    TASKLIST.length = 0;
    canGoAnother = true;
});

function addNewTask() {
    if (canGoAnother) {
        const newTodo = document.createElement("div");
        newTodo.classList.add("eachTodo");
        newTodo.id = `todo-${inc}`;
        newTodo.innerHTML = createTodo(inc);
        TODOWRAP.appendChild(newTodo);

        TASKLIST.push({
            id: inc,
            taskDescription: "",
            priority: "2",
            isCompleted: false
        });

        canGoAnother = false;
        inc++;
    }
}

function createTodo(taskId) {
    return `
        <div class="row-main">
            <button type="button" class="sketch-check check${taskId} check" data-id="${taskId}" aria-label="Toggle done"></button>
            <div class="row-line-wrap">
                <textarea class="task-line Todos${taskId}" placeholder="Write your task…" rows="1"></textarea>
            </div>
        </div>
        <div class="eachTodo-nav item-actions">
            <button type="button" class="del${taskId} delete" data-id="${taskId}" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>
            <select name="" id="selected${taskId}" aria-label="Priority">
                <option value="2" class="opt">Priority</option>
                <option value="Low" class="opt">Low</option>
                <option value="Medium" class="opt">Medium</option>
                <option value="High" class="opt">High</option>
            </select>
            <button type="button" class="edit${taskId} edit save-btn" data-id="${taskId}">ok</button>
        </div>
    `;
}

function taskIdFromEvent(e) {
    const btn = e.target.closest("button[data-id]");
    if (btn) return btn.dataset.id;
    if (e.target.dataset && e.target.dataset.id) return e.target.dataset.id;
    return null;
}

TODOWRAP.addEventListener("click", function (ele) {
    let taskId = taskIdFromEvent(ele);
    if (!taskId) return;

    let selected = document.getElementById(`selected${taskId}`);
    const row = document.getElementById(`todo-${taskId}`);

    if (ele.target.closest(".save-btn") && ele.target.closest(".save-btn").innerText.trim() === "ok") {
        const saveBtn = ele.target.closest(".save-btn");
        if (selected.value != 2) {
            uploadDetails(taskId);
            saveBtn.innerHTML = `<i class='fa-solid fa-pencil' data-id='${taskId}'></i>`;
            selected.disabled = true;
            _(`.Todos${taskId}`).readOnly = true;
            canGoAnother = true;
        }
    }
    else if (ele.target.classList.contains("fa-pencil")) {
        taskId = ele.target.dataset.id;
        selected = document.getElementById(`selected${taskId}`);
        ele.target.className = `fa-solid fa-floppy-disk edit${taskId}`;
        selected.disabled = false;
        _(`.Todos${taskId}`).readOnly = false;
    }
    else if (ele.target.classList.contains("fa-floppy-disk") && selected.value != 2) {
        taskId = ele.target.dataset.id;
        selected = document.getElementById(`selected${taskId}`);
        editTask(taskId);
        ele.target.className = "fa-solid fa-pencil";
        ele.target.setAttribute("data-id", taskId);
        selected.disabled = true;
        _(`.Todos${taskId}`).readOnly = true;
        canGoAnother = true;
    }
    else if (ele.target.closest(".check") || ele.target.classList.contains("fa-check")) {
        const checkBtn = row.querySelector(`.check${taskId}`);
        const task = TASKLIST.find(function (elem) {
            return String(elem.id) === String(taskId);
        });
        const nowDone = !row.classList.contains("done");
        row.classList.toggle("done", nowDone);
        if (checkBtn) checkBtn.classList.toggle("checked", nowDone);
        if (task) task.isCompleted = nowDone;
    }
    else if (ele.target.closest(".delete") || ele.target.classList.contains("fa-trash")) {
        deleteTask(taskId);
    }
});

function uploadDetails(taskId) {
    let boxRef = document.querySelector(`.Todos${taskId}`);
    let selectRef = document.getElementById(`selected${taskId}`);

    let task = TASKLIST.find(function (elem) {
        return elem.id == taskId;
    });

    task.taskDescription = boxRef.value;
    task.priority = selectRef.value;
}

function editTask(taskId) {
    let boxRef = document.querySelector(`.Todos${taskId}`);
    let selectRef = document.getElementById(`selected${taskId}`);

    let task = TASKLIST.find(function (elem) {
        return elem.id == taskId;
    });

    task.taskDescription = boxRef.value;
    task.priority = selectRef.value;
}

function deleteTask(taskId) {
    let taskIndex = TASKLIST.findIndex(function(elem){
        return elem.id == taskId
    } );
    if (taskIndex !== -1) {
        TASKLIST.splice(taskIndex, 1);
    }

    let todoElement = document.getElementById(`todo-${taskId}`);

    todoElement.remove();

    canGoAnother = true;
}




let filterTaskList = function (filterBy, filterValue) {
    // Implement a filter function
    // Examples:
    // filterTaskList('taskPriority', 'low')
    // filterTaskList('taskStatus', true)
}

function noOfTasks() {
    return TASKLIST.length;
}

let noOfIncompleteTasks = function () {
    // Implement a function to return the number of incomplete tasks
}

let noOfCompletedTasks = function () {
    // Implement a function to return the number of completed tasks
}

let deleteAllTasks = function () {
    // Implement a function to delete all tasks
}
