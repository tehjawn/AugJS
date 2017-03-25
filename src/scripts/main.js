// Hello, AugJS!

let Header = {
  el: 'aug-header',
  opts: {
    template: {
      id: '#header-template',
      src: 'HeaderComponent'
    }
  }
}

let Content = {
  el: 'aug-content',
  opts: {
    template: {
      id: '#content-template',
      src: 'ContentComponent'
    }
  }
}

let Footer = {
  el: 'aug-footer',
  opts: {
    template: {
      id: '#footer-template',
      src: 'FooterComponent'
    }
  }
}

let aug = new Aug()

aug.registerComponents(Header, Content, Footer)
