let todoText = document.querySelector('#todo-text')
let addTodo = document.querySelector('#add-todo')
let form = document.forms.form

let title = document.querySelector('.title')
let hour = document.querySelector('.hour')
let container = document.querySelector('.container')





let todos = []

form.onsubmit = (event) => {
  event.prevevntDefault()

  let task = {
    id: Math.random(),
    isDone: false,
    time: new Date().getHours() + ':' + new Date().getMinutes()
  }

  let fm = new FormData(form)

  fm.forEach((value, key) => {
    task[key] = value
  })

  todos.push(task)
  reload(todos, container)
}

function reload(arr, place) {
  place.innerHTML = ''
  
  for (const item of arr) {
    let todoBox = document.createElement('div')

    todoBox.classList.add('todo-box')
    
    todoBox.append(title, )
   
    addTodo.onclick = () => {
      title.innerHTML = todoText.value
    }
  }
}