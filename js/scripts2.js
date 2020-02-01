var taskList = new Array();

taskList = [
    {
        'idTarea': 1,
        'titulo': 'Estudiar Javascript',
        'prioridad': 'urgent'
    },
    {
        'idTarea': 2,
        'titulo': 'Dormir',
        'prioridad': 'daily'
    },
    {
        'idTarea': 3,
        'titulo': 'Salir a comer',
        'prioridad': 'monthly'
    },
    {
        'idTarea': 4,
        'titulo': 'Entrenar',
        'prioridad': 'monthly'
    }
];


/////////////////
//Declarations://
/////////////////

let taskObj = {
    'idTarea': 0,
    'titulo': '',
    'prioridad': ''
}

let sectionCreate = document.querySelector('#create');


//drawOne:

function drawOne(pId) {
    let task = taskList.find(item => item.idTarea == pId)
    sectionCreate.innerHTML += `<article id="${task.idTarea}" class="${task.prioridad}">
    <h2>${task.titulo}</h2>
    <a href="#" title="delete">Delete</a>
</article>`

    //cada vez que creo una tarea capturo su boton de borrado para un futuro uso.
    captureDelelteBtn();
}

//draw more than one:

function drawMore(pList) {
    sectionCreate.innerHTML = '';
    pList.forEach(item => drawOne(item.idTarea))
}

//deleteOne:

function deleteOne(pId) {
    let deleted = document.getElementById(pId);
    sectionCreate.removeChild(deleted);
}

//delete event:

function captureDelelteBtn() {
    let deleteBtn = document.getElementsByTagName('a');

    for (item of deleteBtn) {
        item.addEventListener('click', (e) => {
            let idDeleted = e.target.parentNode.id;
            deleteOne(idDeleted);
        })
    }
}

//type task event:

let saveBtn = document.querySelector('#save');

saveBtn.addEventListener('click', e => {
    e.preventDefault();
    let priority = document.querySelector('#priority').value
    let name = document.querySelector('#type').value

    //validaciones:
    if (priority != '' && name[0] != 0 && name != '') {
        taskList.push(taskObj);
        newTask();
    }

    //reseteo del form
    document.querySelector('#form').reset();
})


//capture inputs new task

function newTask() {
    name = document.querySelector('#type').value
    priority = document.querySelector('#priority').value
    let id = taskList[taskList.length - 2].idTarea + 1;

    //doy valores al ultimo objeto de taskList qu e esta vacio.
    taskList[taskList.length - 1].titulo = name;
    taskList[taskList.length - 1].prioridad = priority;
    taskList[taskList.length - 1].idTarea = id;
    drawOne(id);
    //restauro el objeto
    taskObj = {
        'idTarea': 0,
        'titulo': '',
        'prioridad': ''
    }
}

//search your task event:

let inputName = document.querySelector('#search');
let namesTaskList = new Array();

inputName.addEventListener('keyup', (e) => {
    let filterName = e.target.value.toLowerCase();
    namesTaskList = taskList.filter(item => item.titulo.toLowerCase().includes(filterName))
    drawMore(namesTaskList);
})

//search by priority:

let inputPriority = document.querySelector('#filterPriority');
let priorityTaskList = new Array();

inputPriority.addEventListener('click', (e) => {
    let filterPriority = e.target.value;
    priorityTaskList = namesTaskList.filter(item => item.prioridad.includes(filterPriority))
    drawMore(priorityTaskList);
})
