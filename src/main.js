

let mainForm = document.getElementById("main_form");
let createInput = document.getElementById("create_input");
let errorMsg = document.getElementById("error_msg");
let total_task_count = document.getElementById("total_task_count");
let clear_task = document.getElementById("clear_task");
let taskitemscontainer = document.getElementById('task_items_container');
let tasklist = [];
let editItemId = null;
let submit_form_btn = document.getElementById("submit_form_btn");
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


// This is event handler to add task;
mainForm.addEventListener("submit", addOnUpdateToDo)

// Function for adding task to list by event listener;
function addOnUpdateToDo(event) {

    event.preventDefault();

    let inputValue = createInput.value;

    if (inputValue === "") {
        errorMsg.classList.remove("hidden");
        return;
    }

    if (editItemId) {
        // Update item
        const updateListAfterEdit = tasklist.map((item) => {
            if (("edit-" + item.id) == editItemId) {
                return {
                    ...item,
                    title: inputValue
                }
            } else
                return item;
        })

        tasklist = updateListAfterEdit;
        submit_form_btn.innerText = "Add"
        editItemId = null;

        Toastify({
            text: "Task Updated succesfully",
            className: "succes",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    } else {
        // Add item
        tasklist.push({
            id: crypto.randomUUID(),
            title: inputValue,
            isDone: false,
        })

        Toastify({
            text: "Task added succesfully",
            className: "succes",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    }



    renderHtmlElement();

    // createInput.value = "";

    mainForm.reset();

    calculateTotalTask();

    // console.log(tasklist);

}

// Change status
task_items_container.addEventListener('click', (event) => {
    let checkDoneBtn = event.target.classList.contains("done-btn")

    if (!checkDoneBtn) {
        return;
    }

    let idFromDoneBtn = event.target.getAttribute("id");
    const updateListAfterChangingStatus = tasklist.map((item) => {

        if (("done-" + item.id) === idFromDoneBtn) {
            return {
                ...item,
                isDone: !item.isDone
            }
        }
        else {
            return item;
        }
    })

    tasklist = updateListAfterChangingStatus;

    renderHtmlElement();

    // console.log(updateListAfterChangingStatus);
})




function renderHtmlElement() {

    let updateElements = tasklist.map((item, index) => {
        return `

          <div class="flex mt-2 bg-green-100 rounded-md items-center pl-2">
                <p class="${item.isDone == true ? "w-full line-through opacity-80" : "w-full"} w-full">${index + 1} ${item.title}</p>
                <div class="flex gap-1">
                    <button id="done-${item.id}"
                     type="button"
                        class="text-fg-brand done-btn bg-neutral-primary border border-brand hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-md text-xs px-3 py-1.5 focus:outline-none">${item.isDone ? "Undo" : "Done"}</button>
                    <button id="edit-${item.id}"
                     type="button"
                        class="text-success bg-neutral-primary edit-btn border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-md text-xs px-3 py-1.5 focus:outline-none">Edit</button>
                    <button id="${item.id}"
                    type="button"
                        class="text-danger delete-btn bg-neutral-primary border border-danger hover:bg-danger hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-md text-xs px-3 py-1.5 focus:outline-none">Del</button>
                </div>
            </div>

 
    
        `;
    })

    taskitemscontainer.innerHTML = updateElements.join("")
}

renderHtmlElement();

// Update task


// Edit task
task_items_container.addEventListener("click", (event) => {
    let checkEditBtn = event.target.classList.contains("edit-btn");

    if (checkEditBtn == false) {
        return;
    }
    let idFromBtnTag = event.target.getAttribute("id");

    editItemId = idFromBtnTag;

    let editItem = tasklist.find((item) => {
        return ("edit-" + item.id) == editItemId;
    })

    if (!editItem) return;


    createInput.value = editItem.title;
    submit_form_btn.innerText = "Update"

    console.log(editItemId);
})

// Clear task



// Delete task
let deleteBtns = document.querySelectorAll('.delete-btn')

task_items_container.addEventListener('click', (event) => {
    let checkDeleteBtn = event.target.classList.contains("delete-btn");

    if (checkDeleteBtn == false) {
        return
    }


    let isConfirm = confirm("Are you sure tou want to remove it?")

    if (isConfirm == false) {
        return
    }
    // console.log(isConfirm);

    // Delete code
    let idFromBtnTag = event.target.getAttribute("id");

    console.log(idFromBtnTag);

    let updateTaskAfterDelete = tasklist.filter((task) => {
        return task.id != idFromBtnTag;
    })

    tasklist = updateTaskAfterDelete;

    renderHtmlElement();

    calculateTotalTask();

    Toastify({
        text: "Task removed succesfully",
        className: "succes",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    // console.log(updateTaskAfterDelete);
    // console.log(checkDeleteBtn);
})


function deleteTask() {

}
deleteTask();


function removeErrorMsg() {
    createInput.addEventListener("keydown", () => {

        if (createInput.value.trim() === "") {

            errorMsg.classList.remove("hidden");
        } else {

            errorMsg.classList.add("hidden");
        }
    });
}

removeErrorMsg();


// Render tasks to html element;



function calculateTotalTask() {
    total_task_count.innerHTML = tasklist.length;
}

calculateTotalTask();


function clearAllTask() {
    clear_task.addEventListener("click", () => {
        tasklist = [];
        renderHtmlElement();

        calculateTotalTask();
    })
}

clearAllTask()


// let arr = [100, 200, 300];
// // let output = arr.slice(1, 2);
// // let output = arr.splice(1, 1);
// let output = arr.filter((item) => {
//     return item != 200;
// })
// console.log(arr, output);
