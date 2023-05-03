import arr from './module/db.js'

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

