/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// #1
const promoAdv = document.querySelector('.promo__adv')
// promoAdv.style.display = 'none'
const promoImg = document.querySelectorAll('img')
const promoTitle = document.querySelector('.promo__adv-title')

promoImg.forEach(item => {
    if(!promoAdv.innerHTML.includes('img')) {
        item.remove()
        promoTitle.remove()
    }
})

// #2 #3
const promoContent = document.querySelector('.promo__content .promo__genre')
const promoBg = document.querySelector('.promo__content .promo__bg')
promoContent.innerHTML = "драма"
promoBg.style.background = "url(./img/bg.jpg)"
promoBg.style.backgroundSize = "cover"

// #4

// #5
const tabs = document.querySelectorAll('.promo__menu-item')
tabs.forEach(item => {
    item.onclick = () => {
        tabs.forEach(item => item.classList.remove('promo__menu-item_active'))
        item.classList.add('promo__menu-item_active')
    }
})

// #6
const deleteFilms = document.querySelectorAll('.delete')

deleteFilms.forEach(item => {
    item.onclick = () => {
        // item.parentElement.style.display = "none"
        item.parentElement.remove('li')
    }
})

// #7
const seenFilm = document.querySelectorAll('.promo__interactive-item')
const filmTitle = document.querySelector('.promo__title')
seenFilm.forEach(film => {
    film.style.cursor = 'pointer'
    film.onclick = () => {
        filmTitle.innerHTML = film.innerHTML
    }
})