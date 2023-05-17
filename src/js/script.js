let form = document.forms.form
let tableBody = document.querySelector('tbody')
// Modal
let modal = document.querySelector('.modal')
let modalBg = document.querySelector('.bg')
// Form
let modalNameInput = document.querySelector('.modal .name-input')
let modalAgeInput = document.querySelector('.modal .age-input')
let modalAddBtn = document.querySelector('.modal .add-btn')

let tableDataArr = []

function save() {
  let data = {
    id: Math.random()
  }

  let fm = new FormData(form)

  fm.forEach((value, key) => {
    data[key] = value
  })

  tableDataArr.push({
    ...data,
    number: tableDataArr.length
  })
  // console.log(data);
}

form.onsubmit = (event) => {
  event.preventDefault()

  save()
  reloadTable(tableDataArr, tableBody)
  console.log(tableDataArr);
}

function reloadTable(arr, place) {
  place.innerHTML = ''
  let editeArr = []

  for (let item of arr) {
    let tableRow = document.createElement('tr')
    let tableNumber = document.createElement('td')
    let tableName = document.createElement('td')
    let tableBirth = document.createElement('td')
    let tableAction = document.createElement('td')
    let editeBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')

    tableNumber.innerHTML = item.number + 1
    tableName.innerHTML = item.name
    tableBirth.innerHTML = item.age
    editeBtn.innerHTML = 'Edite'
    deleteBtn.innerHTML = 'Delite'

    tableAction.append(editeBtn, deleteBtn)
    tableRow.append(tableNumber, tableName, tableBirth, tableAction)
    place.append(tableRow)

    deleteBtn.onclick = () => {
      tableDataArr = tableDataArr.filter(el => el.id !== item.id)
      
      reloadTable(tableDataArr, tableBody)
    }

    editeBtn.onclick = () => {
      modal.style.display = 'block'
      modalBg.style.display = 'block'
      modalNameInput.value = item.name
      modalAgeInput.value = item.age

      editeArr.push(item)
    }

    modalAddBtn.onclick = () => {
      for (const el of editeArr) {
        el.name = modalNameInput.value
        el.age = modalAgeInput.value
      }
      reloadTable(tableDataArr, tableBody)

      modal.style.display = 'none'
      modalBg.style.display = 'none'

      console.log(tableDataArr);
    }

    modalBg.onclick = () => {
      modal.style.display = 'none'
      modalBg.style.display = 'none'
      reloadTable(tableDataArr, tableBody)
    }
  }
}

console.log(tableDataArr);