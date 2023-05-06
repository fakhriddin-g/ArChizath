import products from './module/db.js'



let container = document.querySelector('.container')
let shopped = document.querySelector('.shopped')
let cart_box_scroll = document.querySelector('.cart-box-scroll')
// ================================
let amount = document.querySelector('.center span')
let data_showFive = document.querySelector('button[data-show-five]')
let data_showAll = document.querySelector('button[data-show-all]')
let data_cart = document.querySelector('button[data-cart]')
let bg = document.querySelector('.bg')
// ================================
let total_money = document.querySelector('.total_money')

let icons = ['price', 'rate', 'count']
let cart = []

reload(cart, cart_box_scroll)
reloadCard(products, container)

function reloadCard(arr, place) {
  place.innerHTML = ''
  amount.innerHTML = cart.length
  
  for (const item of arr) {
    // Main Item
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
      if(cart.includes(item)) {
        cart = cart.filter(id => id !== item)
        button.classList.remove('add-to-mark')
        button.innerHTML = 'В избранное'
      } else {
        cart.push(item)
        button.classList.add('add-to-mark')
        button.innerHTML = 'Добавлено'
        total_money += item.price
      }
      // total_money.innerHTML = total_money

      if (cart.length == 0) {
        total_money.innerHTML = 0 + ' $'
      }
      
      reload(cart, cart_box_scroll)
      amount.innerHTML = cart.length
    }
  }
}

function reload(arr, place) {
  place.innerHTML = ''

  for (const element of arr) {
    // Shopped Item
    let cart_item = document.createElement('div')
    let item_checkbox = document.createElement('input')
    let item_img = document.createElement('img')
    let product = document.createElement('div')
    let item_title = document.createElement('div')
    let item_title_h3 = document.createElement('h3')
    let item_title_button = document.createElement('button')
    let item_title_button_img = document.createElement('img')
    let item_title_button_span = document.createElement('span')
    let item_info = document.createElement('div')
    let product_info = document.createElement('div')
    let item_color = document.createElement('span')
    let item_counter = document.createElement('div')
    let item_decrease = document.createElement('span')
    let item_input = document.createElement('input')
    let item_increase = document.createElement('span')
    let item_price = document.createElement('div')
    let discount_price = document.createElement('div')
  
  
    cart_item.classList.add('cart-item')
    item_img.classList.add('item-img')
    product.classList.add('product')
    item_title.classList.add('item-title')
    item_info.classList.add('item-info')
    product_info.classList.add('product-info')
    item_color.classList.add('item-color')
    item_counter.classList.add('item-counter')
    item_decrease.classList.add('item-derease')
    item_increase.classList.add('item-increase')
    item_price.classList.add('item-price')
    discount_price.classList.add('discount-price')
  
    item_checkbox.type = 'checkbox'
    item_checkbox.checked = true
    item_img.src = element.image
    item_title_h3.innerHTML = element.title.slice(0,28)
    item_title_button_img.src = './public/icon/count.svg'
    item_title_button_span.innerHTML = 'Удалить'
    item_color.innerHTML = ''
    item_decrease.innerHTML = '-'
    item_input.value = '1'
    item_increase.innerHTML = '+'
    discount_price.innerHTML = element.price + ' $'
  
  
    product.append(item_title, item_info, item_counter, item_price)
    item_title.append(item_title_h3, item_title_button)
    item_title_button.append(item_title_button_img, item_title_button_span)
    item_info.append(product_info, item_counter, item_price)
    product_info.append(item_color)
    item_counter.append(item_decrease, item_input, item_increase)
    item_price.append(discount_price)

    cart_item.append(item_checkbox, item_img, product)
    place.append(cart_item)


    item_decrease.onclick = () => {
      if (item_input.value > 1) {
        item_input.value--
        discount_price.innerHTML = ((item_input.value * element.price).toFixed(2)) + ' $'
        total_money.innerHTML = discount_price.innerHTML
      } else{
        item_input.value
      }
    }
    item_increase.onclick = () => {
      if (item_input.value < element.rating.count) {
        item_input.value++
        discount_price.innerHTML = ((item_input.value * element.price).toFixed(2)) + ' $'
        total_money.innerHTML = discount_price.innerHTML
      }else{
        item_input.value = element.rating.count
      }
    }

    

    item_title_button.onclick = () => {
      cart_item.remove()
    }

  }
}




// ===========================================
data_showFive.onclick = () => {
  reloadCard(products.slice(0,5), container)
}
data_showAll.onclick = () => {
  reloadCard(products, container)
}

// ===========================================
// shtorka
data_cart.onclick = () => {
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
}