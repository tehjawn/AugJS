// Aug.JS - Augmentable website building blocks

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