// AugJS

'use strict';

var Aug = 
  function(root) {
    (document.getElementById(root)) ? this.root = root : this.root = null;
  }

Aug.prototype.printRoot =
  function() { console.log(this.root || "No root ID established.") }

Aug.prototype.getModels =
  function(str) {
    var list = [],
      regex = /{{\s*([^}]+)\s*}}/g,
      item;

    while (item = regex.exec(str))
      list.push(item[1]);

    return list;
  }

Aug.prototype.setModels =
  function(vals) {
    
  }