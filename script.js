import products from './module/db.js'



let container = document.querySelector('.container')
let shopped = document.querySelector('.shopped')
let cartBoxScroll = document.querySelector('.cart-box-scroll')
// ================================
let amount = document.querySelector('.center span')
let dataShowFive = document.querySelector('button[data-show-five]')
let dataShowAll = document.querySelector('button[data-show-all]')
let dataCart = document.querySelector('button[data-cart]')
let bg = document.querySelector('.bg')
// ================================
let totalMoney = document.querySelector('.total_money')
// =========================================================
// =========================================================
let orderBtn = document.querySelector('.order')
let modal = document.querySelector('.modal')
let inputs = document.querySelectorAll('form input')
let modalBtn = document.querySelector('#order')

let icons = ['price', 'rate', 'count']
let cart = []

reloadCard(products, container)

function reloadCard(arr, place) {
  place.innerHTML = ''
  amount.innerHTML = cart.length
  
  for (const item of arr) {
    // Main Item
    let itemDiv = document.createElement('div')
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
  
    itemDiv.classList.add('item')
    img.classList.add('main-img')
    description.classList.add('description')
    row.classList.add('row')
  
    h3.innerHTML = item.title.slice(0, 20)
    p.innerHTML = item.description.slice(0, 59).toLowerCase()
    img.src = item.image
    // button.innerHTML = 'В избранное'
  
    itemDiv.append(img, description)
    description.append(h3, p, row, button)
    place.append(itemDiv)

    if (cart.includes(item.id)) {
      button.innerHTML = 'Добавлено'
      button.classList.add('add-to-mark')
    } else{
      button.classList.remove('add-to-mark')
      button.innerHTML = 'В избранное'
    }
    
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
      reload()
    }
  }
}

function reload() {
  cartBoxScroll.innerHTML = ''
  let temp = []
  let allPrices = 0
  let qtCount = 0

  for (const item of products) {
    for (const id of cart) {
      if (item.id === id) {
        temp.push({
          ...item,
          qt: 1
        })
      }
    }
  }

  for (const item of temp) {
    // Shopped Item
    let cartItem = document.createElement('div')
    let itemCheckbox = document.createElement('input')
    let itemImg = document.createElement('img')
    let product = document.createElement('div')
    let itemTitle = document.createElement('div')
    let itemTitleH3 = document.createElement('h3')
    let itemTitleButton = document.createElement('button')
    let itemTitleButtonImg = document.createElement('img')
    let itemTitleButtonSpan = document.createElement('span')
    let itemInfo = document.createElement('div')
    let productInfo = document.createElement('div')
    let itemColor = document.createElement('span')
    let itemCounter = document.createElement('div')
    let itemDecrease = document.createElement('span')
    let itemInput = document.createElement('input')
    let itemIncrease = document.createElement('span')
    let itemPrice = document.createElement('div')
    let discountPrice = document.createElement('div')
  
  
    cartItem.classList.add('cart-item')
    itemImg.classList.add('item-img')
    product.classList.add('product')
    itemTitle.classList.add('item-title')
    itemInfo.classList.add('item-info')
    productInfo.classList.add('product-info')
    itemColor.classList.add('item-color')
    itemCounter.classList.add('item-counter')
    itemDecrease.classList.add('item-derease')
    itemIncrease.classList.add('item-increase')
    itemPrice.classList.add('item-price')
    discountPrice.classList.add('discount-price')
  
    itemCheckbox.type = 'checkbox'
    itemCheckbox.checked = true
    itemImg.src = item.image
    itemTitleH3.innerHTML = item.title.slice(0,28)
    itemTitleButtonImg.src = './public/icon/count.svg'
    itemTitleButtonSpan.innerHTML = 'Удалить'
    itemColor.innerHTML = ''
    itemDecrease.innerHTML = '-'
    itemInput.value = item.qt
    itemIncrease.innerHTML = '+'
    discountPrice.innerHTML = item.price * item.qt + ' $'
  
  
    product.append(itemTitle, itemInfo, itemCounter, itemPrice)
    itemTitle.append(itemTitleH3, itemTitleButton)
    itemTitleButton.append(itemTitleButtonImg, itemTitleButtonSpan)
    itemInfo.append(productInfo, itemCounter, itemPrice)
    productInfo.append(itemColor)
    itemCounter.append(itemDecrease, itemInput, itemIncrease)
    itemPrice.append(discountPrice)
    cartItem.append(itemCheckbox, itemImg, product)
    cartBoxScroll.append(cartItem)

    allPrices += item.price * item.qt
    
    itemCheckbox.onchange = () => {
      if (itemCheckbox.checked) {
        allPrices += item.price * item.qt
      } else {
        allPrices -= item.price * item.qt
      }
      updateTotal()
    }

    itemDecrease.onclick = () => {
      if (itemInput.value > 1) {
        itemInput.value--
        item.qt = itemInput.value
        allPrices -= item.price
        discountPrice.innerHTML = item.price * item.qt + ' $'
        updateTotal()
      }
    }

    itemIncrease.onclick = () => {
      if (itemInput.value < item.rating.count) {
        itemInput.value++
        item.qt = itemInput.value
        allPrices += item.price
        discountPrice.innerHTML = item.price * item.qt + ' $'
        updateTotal()
      }
    }

    itemTitleButton.onclick = () => {
      let sure = confirm('R U Sure')

      if (sure) {
        cart = cart.filter(id => id !== item.id)
        reload()
        reloadCard(products, container)
      }
    }

    form.onsubmit = (event) => {
      event.preventDefault()
      modalBtn.onclick = () => {
        saveChanges(temp)
      }
    }
    
    reloadCard(products, container)
  }
  
  function updateTotal() {
    totalMoney.innerHTML = `${allPrices.toLocaleString('tj-TJ')} $`
  }
  updateTotal()
}

orderBtn.onclick = () => {
  modal.style.display = 'flex'

}

// ===========================================
dataShowFive.onclick = () => {
  reloadCard(products.slice(0,5), container)
}
dataShowAll.onclick = () => {
  reloadCard(products, container)
}

// ===========================================
// shtorka
dataCart.onclick = () => {
  shopped.style.right = '0'
  shopped.style.scale = '1'
  bg.style.left = '0'
  bg.style.scale = '1'
  document.body.style.overflow = "hidden"
}
bg.onclick = () => {
  shopped.style.right = '-33%'
  shopped.style.scale = '0'
  bg.style.scale = '0'
  bg.style.left = '-100%'
  document.body.style.overflow = "scroll"
  modal.style.display = 'none'
}



function saveChanges(temp) {
  let changes = {buyer:{}}
  let db = new FormData(form)
  db.forEach((value, key) => {
    changes.buyer[key] = value
  })
  changes.goods = temp

  console.log(changes);
}


