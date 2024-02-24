const insertTask = document.getElementById('insertTask');
const insertBtn = document.getElementById('insertBtn');
const tasks = document.getElementById('tasks');
const empty = document.getElementById('empty');
const options = document.getElementById('options');
const sort = document.getElementById('sort');
const deleteBtn = document.querySelectorAll('deleteBtn');
const checkBtn = document.querySelectorAll('#tasks .checkBtn'); 
const clear = document.getElementById('clear');


const check = () => {

    const taskElements = document.querySelectorAll('#tasks .task');
    
    if (taskElements.length === 0) {
        empty.style.display = 'flex';
        tasks.style.boxShadow = '0 0 10px black';
    } else {
        empty.style.display = 'none';
        tasks.style.boxShadow = 'none';
    };

};

const remaining = () => {

    let pending = document.querySelector('#pending');
    const taskElements = document.querySelectorAll('#tasks .task');
    const exclude = document.querySelectorAll('.done');
    let todo = taskElements.length - exclude.length;

    pending.innerHTML = `${todo} tasks left`;

}

remaining();

insertBtn.addEventListener('click', function() {

    if (insertTask.value != '') {

        const taskElements = document.querySelectorAll('#tasks .task');
        let todo = taskElements.length;

        let fieldset = document.createElement('fieldset');
        fieldset.classList.add('task');

        let checkButton = document.createElement('button');
        checkButton.classList.add('checkBtn');
        fieldset.append(checkButton);

        let i1 = document.createElement('i');
        i1.classList.add('fa-solid');
        i1.classList.add('fa-circle');
        checkButton.append(i1);

        let p = document.createElement('p');
        p.innerText = `${insertTask.value}`;
        fieldset.append(p);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteBtn');
        fieldset.append(deleteButton);
        
        let i2 = document.createElement('i');
        i2.classList.add('fa-solid');
        i2.classList.add('fa-x');
        deleteButton.append(i2);

        tasks.insertBefore(fieldset, tasks.firstChild);
        console.log(fieldset);
        check();

        insertTask.value = '';
        remaining();
        localStorage.setItem(todo, p.innerText);
        
    };

});

function addActive(Id) {

    let all = document.querySelector('#all');
    let active = document.querySelector('#active');
    let completed = document.querySelector('#completed');

    let list=["all", "active", "completed"];
    list.forEach( e => {
        document.querySelector(`[for="${e}"]`).classList.remove("active");
    });

    document.querySelector(`[for="${Id}"]`).classList.add("active");

};

sort.addEventListener('click', function(e) {

    let target = e.target;
    const val = target.getAttribute("for");

    if (val) {
        addActive(val);
    };

});

clear.addEventListener('click', function() {

    const taskElements = document.querySelectorAll('#tasks .task');

    taskElements.forEach(taskElement => {
        taskElement.remove();
    });

    localStorage.clear();
    check();
    remaining();

});

tasks.addEventListener('click', function(event) {

    if (event.target.classList.contains('fa-circle') || event.target.closest('.checkBtn')) {
        const icon = event.target.closest('.checkBtn').querySelector('i');
        const text = event.target.closest('.task').querySelector('p');
        
        if (icon.classList.contains('fa-circle')) {
            icon.classList.remove('fa-circle');
            icon.classList.add('fa-check');
            text.classList.add('done');

        } else {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-circle');
            text.classList.remove('done');
        }
    }
    remaining();

});

tasks.addEventListener('click', function(event) {

    if (event.target.classList.contains('fa-x') || event.target.closest('.deleteBtn')) {
        const taskElement = event.target.closest('.task');
        // localStorage.remove();
        taskElement.remove();
    }
    remaining();
    check();

});

document.querySelector('#all').addEventListener('click', function() {

    const taskElements = document.querySelectorAll('#tasks .task');
    console.log(taskElements);
    // taskElements.style.display = 'block';
    document.querySelectorAll('.done').style.display = 'block';

});

document.querySelector('#active').addEventListener('click', function() {

    const taskElements = document.querySelectorAll('#tasks .task');
    console.log(taskElements);
    // taskElements.style.display = 'block';
    document.querySelectorAll('.done').style.display = 'none';

});

document.querySelector('#completed').addEventListener('click', function() {

    const taskElements = document.querySelectorAll('#tasks .task');
    console.log(taskElements);
    // taskElements.style.display = 'none';
    document.querySelectorAll('.done').style.display = 'block';

});

