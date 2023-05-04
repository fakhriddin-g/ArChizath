import product from './module/db.js'



let container = document.querySelector('.container')
// ================================
let amount = document.querySelector('.center span')
let data_showFive = document.querySelector('button[data-show-five]')
let data_showAll = document.querySelector('button[data-show-all]')
let data_cart = document.querySelector('button[data-cart]')
let shopped = document.querySelector('.shopped')
let bg = document.querySelector('.bg')


let icons = ['price', 'rate', 'count']
let cart = []

reloadCard(product, container)

function reloadCard(arr, place) {
  place.innerHTML = ''
  amount.innerHTML = cart.length
  
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
  
    place.append(item_div)
  
    button.onclick = () => {
      if(cart.includes(item.id)) {
        cart = cart.filter(id => id !== item.id)
        button.classList.remove('add-to-mark')
        button.innerHTML = 'В избранное'
      } else {
        cart.push(item.id)
        button.classList.add('add-to-mark')
        button.innerHTML = 'Добавлено'
      }

      amount.innerHTML = cart.length
      console.log(cart);
    }
  }
}

// ===========================================
data_showFive.onclick = () => {
  reloadCard(product.slice(0,5), container)
}
data_showAll.onclick = () => {
  reloadCard(product, container)
}

// ===========================================
data_cart.onclick = () => {
  shopped.style.right = '0'
  bg.style.left = '0'
  bg.style.scale = '1'
}
bg.onclick = () => {
  shopped.style.right = '-33%'
  bg.style.scale = '0'
}