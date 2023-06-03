
let todoText = document.querySelector('#todo-text')
let addTodo = document.querySelector('#add-todo')
let form = document.forms.form

let modal = document.querySelector('.bg')


let container = document.querySelector('.container')

let baseURL = "http://localhost:9999"
const getAllData = async () => {

  try {
    const res = await fetch(baseURL + "/todos")

    if (res.status === 200 || res.status === 201) {
      const data = await res.json()
      reload(data)
    }
  } catch (e) {
    alert('Connection error')
  }
}

getAllData()
// let todos = []

function reload(arr) {
  container.innerHTML = ''

  for (const item of arr) {
    let todoBox = document.createElement('div')
    let todoTitle = document.createElement('div')
    let h2 = document.createElement('h2')
    let span = document.createElement('span')
    let edite = document.createElement('p')
    let del = document.createElement('p')

    todoBox.classList.add('todo-box')
    todoTitle.classList.add('todo-title')
    h2.classList.add('title')
    span.classList.add('hour')
    edite.classList.add('edite')
    del.classList.add('delete')

    h2.innerHTML = item.task
    span.innerHTML = item.time
    edite.innerHTML = 'edite'
    del.innerHTML = 'delete'

    todoTitle.append(h2, span)
    todoBox.append(todoTitle, edite, del)
    container.append(todoBox)

    item.isDone = false
    h2.onclick = () => {
      if (!item.isDone) {
        item.isDone = true
        h2.style.opacity = '.3'
        h2.style.textDecoration = 'line-through'
      } else {
        item.isDone = false
        h2.style.opacity = '1'
        h2.style.textDecoration = 'none'
      }
    }

    del.onclick = async () => {
      const res = await fetch(baseURL + "/todos/" + item.id, {
        method: "delete"
      })
      if (res.status === 200 || res.status === 201) {
        todoBox.remove()
      }
    }

    edite.onclick =async () => {
      try {
        const res = await fetch(baseURL + "/todos/" + item.id, {
          method: "PATCH",
          body: JSON.stringify({task: prompt(item.task)}),
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (res.status === 200 || res.status === 201) {
          getAllData()
        }
      } catch (e) {
        alert('Connection error')
      }
    }
  }
}

form.onsubmit = (event) => {
  event.preventDefault()

  todoText.style.border = '1px solid green'
  if (todoText.value) {
    save()
    form.reset()
  } else {
    todoText.style.border = '1px solid red'
  }
}

function save() {
  let task = {
    id: Math.random(),
    isDone: false,
    time: new Date().getHours() + ':' + new Date().getMinutes()
  }

  let fm = new FormData(form)

  fm.forEach((value, key) => {
    task[key] = value
  })

  createNewTask(task)
}

const createNewTask = async (body) => {
  try {
    const res = await fetch(baseURL + "/todos", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.status === 200 || res.status === 201) {
      getAllData()
    }
  } catch (e) {
    alert('Connection error')
  }
}