const buttons = document.querySelectorAll('.btn')
const contents = document.querySelectorAll('.content_item')

// let index = 0

showTabs(index = 0)
function showTabs(index) {
  contents.forEach(content => content.style.display = 'none')
  contents[index].style.display = 'block'
}

buttons.forEach((btn, index) => {
  btn.onclick = () => {
    buttons.forEach(btn => btn.classList.remove('active'))
    btn.classList.add('active')
    showTabs(index)
  }
})