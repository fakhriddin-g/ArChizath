import product from './module/db.js'



let container = document.querySelector('.container')
let shopped = document.querySelector('.shopped')
let cart_box_scroll = document.querySelector('.cart-box-scroll')
// ================================
let amount = document.querySelector('.center span')
let data_showFive = document.querySelector('button[data-show-five]')
let data_showAll = document.querySelector('button[data-show-all]')
let data_cart = document.querySelector('button[data-cart]')
let bg = document.querySelector('.bg')



let icons = ['price', 'rate', 'count']
let cart = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
  },
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
  }
]

reload(cart, cart_box_scroll)
reloadCard(product, container)

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
      if(cart.includes(item.id)) {
        cart = cart.filter(id => id !== item.id)
        button.classList.remove('add-to-mark')
        button.innerHTML = 'В избранное'
      } else {
        cart.push(item.id)
        button.classList.add('add-to-mark')
        button.innerHTML = 'Добавлено'
        reload(cart, cart_box_scroll)
      }

      amount.innerHTML = cart.length
      console.log(cart);
    }
  }
}

function reload(arr, place) {
  for (const element of arr) {
    let top_cart = document.createElement('div')
    let top_cart_h3 = document.createElement('h3')
    let cart_box = document.createElement('div')
    let cart_box_scroll = document.createElement('div')
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
    let rate = document.createElement('div')
    let top = document.createElement('div')
    let rate_title = document.createElement('span')
    let rate_all_price = document.createElement('span')
    let rate_button = document.createElement('button')
  
  
    top_cart.classList.add('top-cart')
    cart_box.classList.add('cart-box')
    cart_box_scroll.classList.add('cart-box-scroll')
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
    rate.classList.add('rate')
    top.classList.add('top')
    rate_button.classList.add('order')
  
    top_cart_h3.innerHTML = 'Корзина'
    item_checkbox.type = 'checkbox'
    item_img.src = element.image
    item_title_h3.innerHTML = 'Fjallraven - Foldsac'
    item_title_button_img.src = './public/icon/count.svg'
    item_title_button_span.innerHTML = 'Удалить'
    item_color.innerHTML = 'Чёрный'
    item_decrease.innerHTML = '-'
    item_input.type.text
    item_increase.innerHTML = '+'
    discount_price.innerHTML = '109.95 $'
    rate_title.innerHTML = 'Общая сумма:'
    rate_all_price.innerHTML = '1000 $'
    rate_button.innerHTML = 'Заказать'
  
  
    cart_box_scroll.append(cart_item)
    cart_item.append(item_checkbox, item_img, product)
    product.append(item_title, item_info)
    item_title.append(item_title_h3, item_title_button)
    item_title_button.append(item_title_button_img, item_title_button_span)
    item_info.append(product_info, item_counter, item_price)
    product_info.append(item_color)
    item_counter.append(item_decrease, item_input, item_increase)
    item_price.append(discount_price)
    top.append(rate_title, rate_all_price)
  
    top_cart.append(top_cart_h3)
    cart_box.append(cart_box_scroll)
    rate.append(top, rate_button)
  
    place.append(cart_item)
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