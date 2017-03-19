// Aug

class Aug {
  constructor({ el, opts } = {}) {
    el
      ? elExists(el)
      : console.log('Instantiating Lambda Aug')
  }

  component({template, component}) {
    console.log(`Creating new <aug-${component}> component...`)
    findTemplate({ template, component })
      .then( template => {
        if (!component.wasRegistered()) {
          console.log("New Component!")
          var newComponent = document.registerElement(`aug-${component}`, {
            prototype: Object.create(HTMLElement.prototype, {
              createdCallback: {
                value: function() {
                  console.log(this)
                  var root = this.createShadowRoot();
                  root.appendChild(template.content);
                }
              }
            })
          });
        } else {
          console.log("Component already registered!")
        }
      })
  }

  setView({el:templateId, template, component, view}) {
      let _template = findTemplate(templateId, component)
  }

}

// Helper Functions

function findTemplate({template, component}) {
  let p = new Promise(function(resolve, reject){
    let _template = document.querySelector(template);
    if (!template) {
      var link = document.querySelector('link[rel=import][name=' + component + ']');
      template = link.import.querySelector(_template);
      _template
        ? resolve(_template)
        : reject(`No Template with ID ${template} found!`)
    }
  })
  return p
}

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
