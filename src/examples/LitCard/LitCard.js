
  let card = document.querySelector('lit-card').shadowRoot
  let litDiv = card.getElementById('lit-div')
  let litDivBorder = card.getElementById('lit-div-border')
  let litDivText = card.getElementById('lit-div-text')
  let litDivLight = card.getElementById('lit-div-light')
  let mouseSpan = card.getElementById('mouse')
  let imgSrcInput = card.getElementById('imgSrcInput')

  function updateCard() {
    litDiv.style.background = `url(${imgSrcInput.value})`
  }

  function setBorderHue(color) {
    switch (color) {
      case 'green':
        litDivBorder.style.webkitFilter = 'hue-rotate(180deg)'
        litDivBorder.style.filter = 'hue-rotate(180deg)'
        break;

      case 'red':
        litDivBorder.style.webkitFilter = 'hue-rotate(55deg)'
        litDivBorder.style.filter = 'hue-rotate(55deg)'
        break;

      default:
        litDivBorder.style.webkitFilter = 'hue-rotate(0deg)'
        litDivBorder.style.filter = 'hue-rotate(0deg)'
        break;
    }
  }

  function litMode() {
    let colors = ['green', 'red', 'blue']
    let i = 0
    setInterval(() => {
      setBorderHue(colors[i])
      i++
      if (i > 2) i = 0
    }, 200)
  }

  function tilt(e) {
    litDivLight.style.opacity = `${ (-(e.clientY - litDiv.offsetTop) + (e.clientX - litDiv.offsetLeft)) / 1000}`

    litDiv.style.WebkitTransform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 30}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 30}deg)
    `

    litDiv.style.msTransform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 30}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 30}deg)
    `

    litDiv.style.transform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 30}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 30}deg)
    `
    litDivBorder.style.WebkitTransform = `
      translate(${ (e.clientX - litDiv.offsetLeft) / 60}%, ${ (e.clientY - litDiv.offsetTop) / 60}%)
      translateZ(${ (Math.abs(e.clientX - litDiv.offsetLeft) + Math.abs(e.clientY - litDiv.offsetTop)) / 10}px)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 60}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 60}deg)
    `

    litDivBorder.style.msTransform = `
      translate(${ (e.clientX - litDiv.offsetLeft) / 60}%, ${ (e.clientY - litDiv.offsetTop) / 60}%)
      translateZ(${ (Math.abs(e.clientX - litDiv.offsetLeft) + Math.abs(e.clientY - litDiv.offsetTop)) / 10}px)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 60}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 60}deg)
    `

    litDivBorder.style.transform = `
      translate(${ (e.clientX - litDiv.offsetLeft) / 60}%, ${ (e.clientY - litDiv.offsetTop) / 60}%)
      translateZ(${ (Math.abs(e.clientX - litDiv.offsetLeft) + Math.abs(e.clientY - litDiv.offsetTop)) / 10}px)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 60}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 60}deg)
    `
    litDivText.style.WebkitTransform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 90}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 90}deg)
    `

    litDivText.style.msTransform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 90}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 90}deg)
    `

    litDivText.style.transform = `
      translate(-50%, -50%)
      rotateX(${ - (e.clientY - litDiv.offsetTop) / 90}deg)
      rotateY(${ (e.clientX - litDiv.offsetLeft) / 90}deg)
    `
  }

  function untilt() {
    litDivLight.style.opacity = 0
    litDiv.style.WebkitTransform = `
    translate(-50%, -50%)
    perspective(500px)
    rotateX(0deg)
    rotateY(0deg)
    `

    litDiv.style.msTransform = `
    translate(-50%, -50%)
    perspective(500px)
    rotateX(0deg)
    rotateY(0deg)
    `

    litDiv.style.transform = `
    translate(-50%, -50%)
    perspective(500px)
    rotateX(0deg)
    rotateY(0deg)
    `
    litDivBorder.style.msTransform = `
      rotateX(0deg)
      rotateY(0deg)
    `

    litDivBorder.style.transform = `
      rotateX(0deg)
      rotateY(0deg)
    `
    litDivText.style.WebkitTransform = `
      translate(-50%, -50%)
      rotateX(0deg)
      rotateY(0deg)
    `

    litDivText.style.msTransform = `
      translate(-50%, -50%)
      rotateX(0deg)
      rotateY(0deg)
    `

    litDivText.style.transform = `
      translate(-50%, -50%)
      rotateX(0deg)
      rotateY(0deg)
    `
  }
