// Aug

class Aug {
  constructor({ el, opts } = {}) {
    el
      ? elExists(el)
      : console.log('Instantiating Lambda Aug')
  }

  component(targetElement, componentName) {
    console.log(`Creating new <aug-${componentName}> component...`)
    var template = document.querySelector(targetElement);
    if (!template) {
      var link = document.querySelector('link[rel=import][name=' + componentName + ']');
      template = link.import.querySelector(targetElement);
      console.log(template)
    }

    if (!componentName.wasRegistered()) {
      var newComponent = document.registerElement("aug-" + componentName, {
        prototype: Object.create(HTMLElement.prototype, {
          createdCallback: {
            value: function() {
              var root = this.createShadowRoot();
              root.appendChild(template.content);
            }
          }
        })
      });
    } else {
      console.log("Component already registered!")
    }
    return template.content
  }

}

// Helper Functions

function elExists(el) {
  let _el = document.querySelector(el);
  _el ? console.log(`Element ${el} found!`) : console.log(`Element ${el} not found.`);
}


String.prototype.wasRegistered = function() {
  switch (document.createElement(this).constructor) {
    case HTMLElement:
      return false;
    case HTMLUnknownElement:
      return undefined;
  }
  return true;
}
