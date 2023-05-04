import arr from './module/db.js'




// Item
let container = document.querySelector('.container')

let icons = ['price', 'rate', 'count']

for (const item of arr) {
  let item_div = document.createElement('div')
  let img = document.createElement('img')
  let description = document.createElement('div')
  let h3 = document.createElement('h3')
  let p = document.createElement('p')
  let row = document.createElement('div')
  let button = document.createElement('button')

  for (const icon of icons) {
    let feature = document.createElement('div')
    let img = document.createElement('img')
    let span = document.createElement('span')

    feature.classList.add('feature')

    img.src = './public/icon/' + icon + '.svg'
    span.innerHTML = typeof(item[icon]) !== 'undefined' ? item[icon] : item.rating[icon]

    feature.append(img, span)
    row.append(feature)

  }

  item_div.classList.add('item')
  img.classList.add('main-img')
  description.classList.add('description')
  row.classList.add('row')

  h3.innerHTML = item.title.slice(0, 20)
  p.innerHTML = item.description.slice(0, 59).toLowerCase()
  img.src = item.image
  button.innerHTML = 'В избранное'

  item_div.append(img, description)
  description.append(h3, p, row, button)

  container.append(item_div)

}


let btn = document.querySelectorAll('.description button')

let amount = document.querySelector('.center span')
let show = document.querySelector('.show-5-card')
let show_all = document.querySelector('.show-all')
amount.innerHTML = 0

show.onclick = () => {
  arr.splice(5, 20)
  console.log(arr);
}

btn.forEach(item => {
  let item_add = item.classList == 'add-to-mark'
  item.onclick = () => {
    if(!item_add) {
      item.classList.add('add-to-mark')
      item.innerHTML = 'Добавлено'
      amount.innerHTML++
      item_add = true
    } else if (item_add) {
      item.classList.remove('add-to-mark')
      item.innerHTML = 'В избранное'
      amount.innerHTML--
      item_add = false
    }
  }
})

let shoppedBtn = document.querySelector('.shopped-btn')
let shopped = document.querySelector('.shopped')
let bg = document.querySelector('.bg')

shoppedBtn.onclick = () => {
  shopped.style.right = '0'
  bg.style.left = '0'
  bg.style.scale = '1'
  body.style.scroll(0)
}
bg.onclick = () => {
  shopped.style.right = '-33%'
  bg.style.scale = '0'
  // bg.style.left = '-100%'
}