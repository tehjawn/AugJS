// Primary Aug Object that stores Aug Root Elements and their Shadow Root
function Aug (rootElement) {
  this.rootElement = rootElement;
  this.shadowRoot = null;
  return this
}

// Defines a custom Aug Component
Aug.prototype.component = function(targetElement, componentName) {
  var newComponent = document.registerElement("aug-"+componentName, {
    prototype: Object.create(HTMLElement.prototype, {
      createdCallback: {
        value: function() {
          var root = this.createShadowRoot();
          var template = document.querySelector(targetElement);
          if (!template) {
            var link = document.querySelector('link[rel=import][name='+componentName+']');
            template = link.import.querySelector(targetElement);
          }
          var clone = document.importNode(template.content, true);
          root.appendChild(clone);
        }
      }
    })
  });
}

// Sets the Root of the MAIN Aug Object
Aug.prototype.setRoot = function(rootElement) {
	// console.log("Setting Aug RootElement to: " + rootElement);
	this.rootElement = document.querySelector(rootElement);
	return this;
}

// Sets the View of the
Aug.prototype.setView = function(view, aug) {
  var template = document.querySelector('template' + view);
  if (aug) template = aug.shadowRoot.querySelector(view)
  // console.log("Setting Root View to: " + view);

	// this.shadowRoot = this.rootElement.createShadowRoot();
	this.shadowRoot = this.rootElement.createShadowRoot({mode:'open'});
  this.shadowRoot.appendChild(document.importNode(template.content, true));

  return this;
}

Aug.prototype.setChildAug = function(parentAug, element) {
	this.rootElement = parentAug.shadowRoot.querySelector(element);
}
