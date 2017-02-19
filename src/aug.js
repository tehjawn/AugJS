// Aug.JS - JS Framework to create augmentable website building blocks
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