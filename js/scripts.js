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

let taskObj = {
    'idTarea': 0,
    'titulo': '',
    'prioridad': ''
}

///////////////////// Llamadas:


function drawTask(pTaskList, pId) {
    let sectionCreate = document.getElementById('create');//es un array collec. con la seccion vacia.
    let task = pTaskList.find(item => {
        return item.idTarea == pId
    })
    sectionCreate.innerHTML += '<article id="' + task.idTarea + '" class="' + task.prioridad + '"><h3>' + task.titulo + '</h3><a href="#" title="delete">Delete</a></article>';
}

/////////////////////

function drawTaskList(pTaskList) {
    let sectionCreate = document.getElementById('create').innerHTML = '' //Para borrarlas que estan antes de volver a pintarlas.

    for (item of pTaskList) {
        var idNoticia = item.idTarea;
        drawTask(pTaskList, idNoticia); //Rediseñar con createDocumentFragment()
    }
}

/////////////////////

function deleteTask(pTaskList, pId) {
    let task = pTaskList.find(item => {
        return item.idTarea == pId;
    });

    let taskPosition = pTaskList.findIndex(item => {
        return item.idTarea == task.idTarea;
    });

    pTaskList.splice(taskPosition, 1);

    let sectionCreate = document.getElementById('create').innerHTML = ''
    drawTaskList(pTaskList); //La borro para que no las pinte de nuevo


    //HACERLO CON REMOVE CHILD!
}

//////// Events:

document.getElementById('save').addEventListener('click', function () {
    taskList.push(taskObj);
    taskList[taskList.length - 1].idTarea = taskList[taskList.length - 2].idTarea + 1; // -2 refiriendome al ultimo valor porque -1 seria el objeto nuevo con id 0 sin crear.
    taskList[taskList.length - 1].titulo = document.getElementById('type').value;
    taskList[taskList.length - 1].prioridad = document.getElementById('priority').value;
    drawTask(taskList, taskObj.idTarea);
    taskObj = {
        'idTarea': 0,
        'titulo': '',
        'prioridad': ''
    }
})

///////////////////// onClick

/* document.getElementById('save').onclick = function () {
    taskList.push(taskObj);
    taskList[taskList.length - 1].idTarea = taskList[taskList.length - 2].idTarea + 1; // -2 refiriendome al ultimo valor porque -1 seria el objeto nuevo con id 0 sin crear.
    taskList[taskList.length - 1].titulo = document.getElementById('type').value;
    taskList[taskList.length - 1].prioridad = document.getElementById('priority').value;
    drawTask(taskList, taskObj.idTarea);

    //Reinicio el objeto para no sobreescribir los anteriores. ya que .onclick es una propiedad que sobreescribe. addEventListener no sobre escribe el evento de escucha.
    taskObj = {
        'idTarea': 0,
        'titulo': '',
        'prioridad': ''
    }
} */

