// Aug.JS - Augmentable website building blocks Approach 1

'use strict';

function AugApp(augRootElement) {
	this.augRootElement = augRootElement
	this.augHTML = augRootElement.innerHTML
	this.augjects = []

	this.parse = function(i) {
		return i || this.augParse(this.augHTML.trim().split('\n'))
	}

	this.augParse = function(doc) {
		return doc.map(function(line) {
			var lineItems = line.trim().split(' ')
			console.log(lineItems)
			return "<h3>"+lineItems+"</h3>"
		})
	}

	this.setAug = function(v) { augRootElement.innerHTML = v }
}

function Augject(aug) {
	this.augject = aug
	this.childAugjects = []
	this.params = {}

	this.setId = function(id) { this.params.id = id }
	this.setClasses = function(classes) { this.params.classes = classes }
	this.applyClasses = function (classes) {
		if (!this.params.classes) {
			console.log("No classes exist on this Augject!")
		} else {
			var classList = ""
			classes.forEach(function(curClass) { classList += curClass + " "})
		}
	}

	this.hasAugPrepend = function(aug) {
		if(aug.substring(0,4) === "aug-") {
			console.log("aug- Detected!")
			return true
		} else {
			console.log("No aug- Found!")
			return false
		}
	}
}

var scope = new AugApp(document.getElementById('aug-template'))

// scope.setAugTemplate(document.getElementById('aug-template'))
// scope.setAugStyle(document.getElementById('aug-style'))
// scope.setAugScript(document.getElementById('aug-script'))

scope.setAug(scope.parse())


// ==============================
// Aug.JS - JS Framework to create augmentable website building blocks Appraoch 2
// John Nguyen 2017

'use strict';

// Primary Aug Object that stores Aug Root Elements and their Shadow Root
function Aug (rootElement) {
  this.rootElement = rootElement;
  this.shadowRoot = null;
  return this
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

	this.shadowRoot = this.rootElement.createShadowRoot();
  this.shadowRoot.appendChild(document.importNode(template.content, true));

  return this;
}

Aug.prototype.setChildAug = function(parentAug, element) {
	this.rootElement = parentAug.shadowRoot.querySelector(element);
}

// AugJS Approach 3
customElements.define('aug-app', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
      <div id="tabs">...</div>
      <div id="panels">...</div>
    `;
  }
})