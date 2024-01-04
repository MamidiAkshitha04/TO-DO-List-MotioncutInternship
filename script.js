const input = document.getElementById("inputfield");
const list = document.getElementById("list");
const add = document.getElementById("add");


loadTasks();

function data() {
    if (input.value == '') {
        alert("Enter a task");
    } else {
        let li = document.createElement("li");
        const item = `<div class="val"><div ondblclick="completed(this)" class="text">${input.value}</div>
        <button class="edit">Edit</button>
        <button class="del-btn">Delete</button></div>`;
        li.innerHTML = item;
        list.appendChild(li);
        saveTasks();
    }
    input.value = '';
}

function completed(c) {
    if (c.parentElement.querySelector("div").style.textDecoration === "") {
        c.parentElement.querySelector("div").style.textDecoration = "line-through green";
    }
    c.parentElement.querySelector(".edit").style.display = "none";
    saveTasks();
}

list.addEventListener('click', (event) => {
    if (event.target.classList.contains("del-btn")) {
        const listitem = event.target.parentElement.parentElement;
        list.removeChild(listitem);
        saveTasks();
    }
});

list.addEventListener('click', (event) => {
    if (event.target.classList.contains("edit")) {
        const listItem = event.target.parentElement;
        const taskDiv = listItem.querySelector("div");
        const currentTask = taskDiv.textContent;

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentTask;

        listItem.replaceChild(inputField, taskDiv);

        inputField.addEventListener('blur', () => {
            const updatedTask = inputField.value;
            taskDiv.textContent = updatedTask;
            listItem.replaceChild(taskDiv, inputField);

            saveTasks();
        });

        inputField.focus();
    }
});

function saveTasks() {
    const tasks = Array.from(list.children).map(item => {
        return item.querySelector('.text').textContent;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            let li = document.createElement("li");
            const item = `<div class="val"><div ondblclick="completed(this)" class="text">${task}</div>
            <button class="edit">Edit</button>
            <button class="del-btn">Delete</button></div>`;
            li.innerHTML = item;
            list.appendChild(li);

           
        });
    }
}
