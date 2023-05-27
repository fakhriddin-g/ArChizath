let form = document.forms.form
let tableBody = document.querySelector('tbody')
// Modal
let modal = document.querySelector('.modal')
let modalBg = document.querySelector('.bg')
// Form
let nameInput = document.querySelector('.form .name-input')
let modalNameInput = document.querySelector('.modal .name-input')
let modalAgeInput = document.querySelector('.modal .age-input')
let modalAddBtn = document.querySelector('.modal .add-btn')

let tableDataArr = []

function save() {
  let data = {
    id: Math.random(),
    // year: new Date().getFullYear()
  }

  let fm = new FormData(form)

  fm.forEach((value, key) => {
    data[key] = value
  })

  data.yearOfBearth = new Date().getFullYear() - data.age
  delete data.age

  tableDataArr.push(data)
  // console.log(data);totalPrice
}

form.onsubmit = (event) => {
  event.preventDefault()
  
  if (nameInput.value) {
    save()
    reloadTable(tableDataArr, tableBody)
  }
  
  form.reset()
  // console.log(tableDataArr);
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

    tableNumber.innerHTML = tableDataArr.indexOf(item) + 1
    tableName.innerHTML = item.name
    tableBirth.innerHTML = item.yearOfBearth
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
      modalAgeInput.value = new Date().getFullYear() - item.yearOfBearth

      editeArr.push(item)
    }

    modalAddBtn.onclick = () => {
      for (const el of editeArr) {
        el.name = modalNameInput.value
        el.yearOfBearth = new Date().getFullYear() -  modalAgeInput.value
      }
      reloadTable(tableDataArr, tableBody)

      modal.style.display = 'none'
      modalBg.style.display = 'none'

      // console.log(tableDataArr);
    }

    modalBg.onclick = () => {
      modal.style.display = 'none'
      modalBg.style.display = 'none'
      reloadTable(tableDataArr, tableBody)
    }
  }
}