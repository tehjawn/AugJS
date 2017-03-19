let btn = document.querySelector('aug-header').shadowRoot.querySelector('#started-btn')
let btnText = document.querySelector('aug-header').shadowRoot.querySelector('#started-btn-text')

function tilt(e) {
  btn.style.WebkitTransform =
    `
      translate(-50%)
      rotateX(${(e.clientY-btn.offsetTop)/10}deg)
      rotateY(${(e.clientX-btn.offsetLeft)/30}deg)
    `

  btn.style.msTransform =
    `
      translate(-50%)
      rotateX(${(e.clientY-btn.offsetTop)/10}deg)
      rotateY(${(e.clientX-btn.offsetLeft)/30}deg)
    `

  btn.style.transform =
    `
      translate(-50%)
      rotateX(${(e.clientY-btn.offsetTop)/10}deg)
      rotateY(${(e.clientX-btn.offsetLeft)/30}deg)
    `
}

function untilt() {
  btn.style.WebkitTransform =
    `
    translate(-50%)
    rotateX(0deg)
    rotateY(0deg)
    `

  btn.style.msTransform =
    `
    translate(-50%)
    rotateX(0deg)
    rotateY(0deg)
    `

  btn.style.transform =
    `
    translate(-50%)
    rotateX(0deg)
    rotateY(0deg)
    `
}
