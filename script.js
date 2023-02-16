let cont = document.querySelector('.container')
let modalBg = document.querySelector('.modal-bg')
let modalWindow = document.querySelector('.modal')
let modalDelWindow = document.querySelector('.modal_del')
let inputDel = modalDelWindow.querySelector("input")
let inputChange = modalWindow.querySelector("input")
let closeChange = modalWindow.querySelector(".close")
let save = closeChange.previousElementSibling

let form = document.forms.reminders
let todos = [
    {
        id: Math.random(),
        time: "10:08",
        isDone: false,
        task: "todo home task"
    },
]

form.onsubmit = (event) => {
    event.preventDefault();
    let inp = form.querySelector("input")

    let hours = new Date().getHours().toString()
    let minut = new Date().getMinutes().toString()

    if (minut.length == 1) {
        minut = "0" + minut
    } else {
        minut = minut
    }

    let task = {
        id: Math.random(),
        isDone: false,
        time: hours + ":" + minut
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    if (task.task == "delete()") {
        todos = []
    } else {
        todos.push(task);
    }
    reload(todos, cont)
    inp.value = ""
}


function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let itemDiv = document.createElement('div'),
            // itemBox = document.createElement('div'),
            col = document.createElement('div'),
            right = document.createElement("div"),
            del = document.createElement('button'),
            edit = document.createElement("button"),
            title = document.createElement('span'),
            time = document.createElement('span');

        if (item.isDone) {
            title.classList.add("done")
            time.classList.add("done")
        }
        itemDiv.classList.add('item')
        col.classList.add('col')
        right.classList.add("col_right")
        del.classList.add('delete')
        edit.classList.add("edit")
        title.classList.add('title')
        time.classList.add('time')

        title.innerHTML = item.task
        time.innerHTML = item.time

        itemDiv.append(col, right)
        col.append(title, time)
        right.append(del, edit)
        place.append(itemDiv)

        del.onclick = () => {
            openModalDel(item, modalDelWindow, itemDiv)
        }
        edit.onclick = () => {
            openModal(item, modalWindow)
        }

        // col.onclick = () => {
        //     item.isDone = !item.isDone
        //     if (item.isDone) {
        //         title.classList.add("done")
        //         time.classList.add("done")
        //     } else {
        //         title.classList.remove("done")
        //         time.classList.remove("done")
        //     }
        // }
    }
}

reload(todos, cont)

function openModalDel(item, modaDel, div) {
    modalAnimation(modaDel, "open")
    let task = inputDel.previousElementSibling.firstElementChild
    let red = inputDel.nextElementSibling.firstElementChild
    let del = inputDel.parentElement.firstElementChild.firstElementChild
    task.innerHTML = item.task
    inputDel.onkeyup = () => {
        if (inputDel.value == item.task) {
            red.style.opacity = "1"
            inputDel.nextElementSibling.classList.add("hover")
            inputDel.nextElementSibling.onclick = () => {
                div.classList.add('fade')
                todos = todos.filter(el => el.id !== item.id)
                setTimeout(() => {
                    reload(todos, cont)
                }, 550);
                modalAnimation(modalDelWindow, "close")
                red.style.opacity = "0.5"
                inputDel.nextElementSibling.classList.remove("hover")
                inputDel.value = ""
            }
        } else {
            red.style.opacity = "0.5"
            inputDel.nextElementSibling.classList.remove("hover")
            inputDel.nextElementSibling.onclick = ""
        }
    }

    del.onclick = () => {
        modalAnimation(modaDel, "close")
        inputDel.value = ""
    }
}

function openModal(item, modaDel) {
    modalAnimation(modaDel, "open")
    inputChange.value = item.task
    save.onclick = () => {
        item.task = inputChange.value
        modalAnimation(modaDel, "close")
        reload(todos, cont)
    }
    closeChange.onclick = () => {
        modalAnimation(modaDel, "close")
    }
}

function modalAnimation(modal, cmd) {
    if (cmd == "open") {
        modal.style.display = "block"
        modalBg.style.display = "block"
        setTimeout(() => {
            modalBg.style.opacity = "1"
            modal.style.opacity = "1"
        }, 250);
    } else {
        modal.style.opacity = "0"
        modalBg.style.opacity = "0"
        setTimeout(() => {
            modalBg.style.display = "none"
            modal.style.display = "none"
        }, 500);
    }
}