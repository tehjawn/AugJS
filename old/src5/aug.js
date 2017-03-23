class Aug {
  constructor({ el, templateId } = {}) {
    customElements.define(elName,
      class extends HTMLElement {
        constructor() {
          super()
          var template = document
            .getElementById(templateId)

          if (!template) {
            var link = document.getElementById('link[rel=import][name=' + componentName + ']');
            template = link.import.getElementById(targetElement);
          }

          const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true))
      }
    })
  }
}
