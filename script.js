// Hearder
const allInputs = document.querySelectorAll('.all_inputs')
const errors = document.querySelector('.error')
const successes = document.querySelector('.success')
errors.innerHTML = 0
successes.innerHTML = 0

// Form
const form = document.forms.form
const needToFill = document.querySelectorAll('.need-to-fill')
const formInputs = document.querySelectorAll('.input_box')

allInputs.forEach(el => {
  el.innerHTML = formInputs.length
})


form.onsubmit = (event) => {
  event.preventDefault()

  let arr = []

  formInputs.forEach(el => {
    let elements = el.querySelectorAll('.input')
    elements.forEach(inp => {
      if (!inp.value.length) {
        arr.push(inp)
        errors.innerHTML = arr.length
        successes.innerHTML = formInputs.length - arr.length
      }
    })
  })

  

  let err = ''

  needToFill.forEach(input_box => {
    let inputs = input_box.querySelectorAll('input')
    inputs.forEach(input => {
      input.style.border = '1px solid green'

      if (input.value.length === 0) {
        input_box.classList.add('need_fill')
        input.style.border = '1px solid red'
        err += ` ${input.name}`
      } else{
        input_box.classList.remove('need_fill')
      }
    })

  })

  if (!err) {
    saveChanges()
  }
}


function saveChanges() {
  let changes = {}
  let db = new FormData(form)
  db.forEach((value, key) => {
    changes[key] = value
  })

  console.log(changes);
}

const patterns = {
  name: /^[a-z ,.'-]+$/i,
  email: /^\S+@\S+\.\S+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  age: /^\d+$/,
  text: /^[a-z0-9_ '.!?""-]{1,50}$/i
}

formInputs.forEach(inp => {
  let inputs = inp.querySelectorAll('input')
  inputs.forEach(input => {
    input.onkeyup = () => {
      validate(patterns[input.name], input)
    }
  })
})

function validate(regex, field) {
  if(regex.test(field.value)) {
    field.style.border = '1px solid green'
  } else{
    field.style.border = '1px solid red'
  }
}