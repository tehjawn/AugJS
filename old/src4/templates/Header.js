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
  // btnText.style.WebkitTransform =
  //   `
  //     translate(${(e.clientX-btn.offsetLeft)/60}%, ${(e.clientY-btn.offsetTop)/60}%)
  //     translateZ(${(Math.abs(e.clientX-btn.offsetLeft)+Math.abs(e.clientY-btn.offsetTop))/10}px)
  //     rotateX(${-(e.clientY-btn.offsetTop)/60}deg)
  //     rotateY(${(e.clientX-btn.offsetLeft)/60}deg)
  //   `
  //
  // btnText.style.msTransform =
  //   `
  //     translate(${(e.clientX-btn.offsetLeft)/60}%, ${(e.clientY-btn.offsetTop)/60}%)
  //     translateZ(${(Math.abs(e.clientX-btn.offsetLeft)+Math.abs(e.clientY-btn.offsetTop))/10}px)
  //     rotateX(${-(e.clientY-btn.offsetTop)/60}deg)
  //     rotateY(${(e.clientX-btn.offsetLeft)/60}deg)
  //   `
  //
  // btnText.style.transform =
  //   `
  //     translate(${(e.clientX-btn.offsetLeft)/60}%, ${(e.clientY-btn.offsetTop)/60}%)
  //     translateZ(${(Math.abs(e.clientX-btn.offsetLeft)+Math.abs(e.clientY-btn.offsetTop))/10}px)
  //     rotateX(${-(e.clientY-btn.offsetTop)/60}deg)
  //     rotateY(${(e.clientX-btn.offsetLeft)/60}deg)
  //   `
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

  // btnText.style.WebkitTransform =
  //   `
  //   rotateX(0deg)
  //   rotateY(0deg)
  //   `
  // btnText.style.msTransform =
  //   `
  //     rotateX(0deg)
  //     rotateY(0deg)
  //   `
  //
  // btnText.style.transform =
  //   `
  //     rotateX(0deg)
  //     rotateY(0deg)
  //   `
}
