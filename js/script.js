import films from "../module/db.js"
let movies = films

let promoBg = document.querySelector('.promo__bg')
let promoGenre = document.querySelector('.promo__genre')
let promoTitle = document.querySelector('.promo__title')
let promoDescription = document.querySelector('.promo__descr')
let imbdRating = document.querySelector('.imbd-rating')
let kinopoiskRating = document.querySelector('.kinopoisk-rating')

// Modal
let modal = document.querySelector('.modal')
let movieName = document.querySelector('.movie-name')
let img = document.querySelector('.modal-img')
let country = document.querySelector('.country')
let duration = document.querySelector('.duration')
let released = document.querySelector('.released')
let genre = document.querySelector('.genre')
let director = document.querySelector('.director')
let lang = document.querySelector('.lang')
let writer = document.querySelector('.writer')
let actors = document.querySelector('.actors')
let plot = document.querySelector('.plot')
let closeBg = document.querySelector('.bg')

closeBg.onclick = () => {
  modal.style.display = 'none'
  closeBg.style.display = 'none'
}

let promoInteractiveList = document.querySelector('.promo__interactive-list')
let promoMenuList = document.querySelector('.promo__menu-list ul')
let searchInput = document.querySelector('#search')

searchInput.onkeyup = () => {
  let val = searchInput.value.toLowerCase().trim()
  console.log(val);

  let filtred = movies.filter(movie => {
    let title = movie.Title.toLowerCase().trim()
    if (title.includes(val)) {
      return movie
    }
  })

  reload(filtred, promoInteractiveList)
}

let genres = []

function reload(arr, place) {
  place.innerHTML = ''
  setMovie(arr[0])

  for (let item of arr) {

    let promoInteractiveItem = document.createElement('li')
    let del = document.createElement('div')

    promoInteractiveItem.classList.add('promo__interactive-item')
    del.classList.add('delete')

    promoInteractiveItem.innerHTML = item.Title

    promoInteractiveItem.append(del)
    place.append(promoInteractiveItem)


    promoInteractiveItem.onclick = () => {
      setMovie(item)
      modalMovie(item)
    }

    del.onclick = () => {
      movies = movies.filter(el => el.ID !== item.ID)
      del.parentElement.remove()
      console.log(movies);
    }

    genres.push(item.Genre)
  }

  genres = [...new Set(genres)]
}

function setMovie(item) {
  promoBg.style.background = `url("${item.Poster}")`
  promoBg.style.backgroundSize = "cover"
  promoGenre.innerHTML = item.Genre
  promoTitle.innerHTML = item.Title
  promoDescription.innerHTML = item.Plot
  imbdRating.innerHTML = 'IMDb: ' + item.imdbRating
  kinopoiskRating.innerHTML = 'Кинопоиск: ' + item.Metascore
}

function modalMovie(item) {
  modal.style.display = 'block'
  closeBg.style.display = 'block'
  movieName.innerHTML = `${item.Title}`
  img.style.background = `url("${item.Poster}")`
  img.style.backgroundSize = "cover"
  img.style.backgroundPosition = "center"
  country.innerHTML = `Страна: ${item.Country}`
  duration.innerHTML = `Длительность: ${item.Runtime}`
  released.innerHTML = `Дата выход: ${item.Released}`
  genre.innerHTML = `Жанр: ${item.Genre}`
  director.innerHTML = `Продюсер: ${item.Director}`
  lang.innerHTML = `Язык: ${item.Language}`
  writer.innerHTML = `Продюсеры: ${item.Writer}`
  actors.innerHTML = `Актёры: ${item.Actors}`
  plot.innerHTML = `О фильме: ${item.Plot}`
}

reload(movies.sort((a,b) => a.Title - b.Title ? 1 : -1), promoInteractiveList)

function reloadGenre(arr, place) {
  for (let item of arr) {
    let promoMenuItem = document.createElement('li')

    promoMenuItem.classList.add('promo__menu-item')
    promoMenuItem.onclick = () => {
      ul.forEach(item => item.classList.remove('promo__menu-item_active'));
      promoMenuItem.classList.add('promo__menu-item_active')
      let filtred = movies.filter(movie => movie.Genre === item)
      reload(filtred, promoInteractiveList)
    }

    promoMenuItem.innerHTML = item

    place.append(promoMenuItem)
  }

  let ul = place.querySelectorAll('li')
}

reloadGenre(genres, promoMenuList)