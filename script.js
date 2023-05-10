let todoText = document.querySelector('#todo-text')
let addTodo = document.querySelector('#add-todo')
let form = document.forms.form



let container = document.querySelector('.container')

let todos = []

function reload(arr, place) {
  place.innerHTML = ''
  
  for (const item of arr) {
    let todoBox = document.createElement('div')
    let todoTitle = document.createElement('div')
    let h2 = document.createElement('h2')
    let span = document.createElement('span')
    let img = document.createElement('img')
    
    todoBox.classList.add('todo-box')
    todoTitle.classList.add('todo-title')
    h2.classList.add('title')
    span.classList.add('hour')
    
    h2.innerHTML = item.task
    span.innerHTML = item.time
    img.src = './public/icon/price.svg'
    
    todoBox.append(todoTitle, img)
    todoTitle.append(h2, span)
    place.append(todoBox)

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
      console.log(todos);
    }

    img.onclick = () => {
      console.log(todos);
    }
  }
}

form.onsubmit = (event) => {
  event.preventDefault()

  todoText.style.border = '1px solid green'
  if (todoText.value) {
    save()
  } else{
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

  todos.push(task)
  reload(todos, container)

  console.log(todos);
}