// const dom = document.body


// const song = dom.children[0]
// const heart = dom.children[1]

// const hearts = heart.children

// const heart1 = heart.children[0]
// const heart2 = heart.children[1]
// const heart3 = heart.children[2]

// let audio = song.children[0]
// let button = song.children[1]
// let isPlaying = false


// button.onclick = () => {
//     if(isPlaying) {
//         isPlaying = false
//         audio.pause()
//     } else {
//         isPlaying = true
//         audio.play()
//     }
// }



const audio = document.querySelector('audio')
const button = document.querySelector('button')
const hearts = document.querySelectorAll('.heart')
let isPlaying = false

hearts.forEach(heart => {
    button.onclick = () => {
        if(isPlaying) {
            isPlaying = false
            audio.pause()
            button.innerHTML = "play song"
        } else {
            isPlaying = true
            audio.play()
            button.innerHTML = "pause song"
        }
    }
})
