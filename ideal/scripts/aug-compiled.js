'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// === Aug Class ===
// Foundational object that is the start point of all Aug objects
// Aug Objects are also known as "Augjects"

var Aug = function () {

  /**
   * constructor - Augject Constructor; creates new Aug object
   *
   * @param  {String} el        Element selector of root Aug element
   * @param  {Obj}  opts        Contains all options and properties of element
   * @return {void}             No return
   */

  function Aug() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        el = _ref.el,
        opts = _ref.opts;

    _classCallCheck(this, Aug);

    this.aug = this.findAugEl({ el: el });

    if (opts) {
      var template = this.findTemplate({ opts: opts });
      this.aug.innerHTML = this.parseTemplate(template, opts.data);
    }
  }

  /**
   * setOpts - Sets the options of the Augject
   *
   * @param  {Obj}  opts     Contains all options and properties of element
   * @return {type}          description
   */


  _createClass(Aug, [{
    key: 'setOpts',
    value: function setOpts(_ref2) {
      var opts = _ref2.opts;

      var template = this.findTemplate({ opts: opts });

      this.aug.innerHTML = this.parseTemplate(template, opts.data);
    }

    // --- AugJS Public Helper Functions ---

    /**
     * findAugEl - Find element with specified selector tag
     *
     * @param  {String} el      Element selector to search for
     * @return {HTMLObj}
     */

  }, {
    key: 'findAugEl',
    value: function findAugEl() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          el = _ref3.el;

      console.log('Searching for ' + el);

      var augEl = this.select({ el: el });

      return augEl ? augEl : 'err: No element found with ID ' + el;
    }

    /**
     * findTemplate - Find template by ID
     *
     * @param  {String} template        Template ID to search for
     * @param  {String} opts       Component name to search in
     * @return {HTMLObj} foundTemplate  The template element that was found
     */

  }, {
    key: 'findTemplate',
    value: function findTemplate() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          opts = _ref4.opts;

      var id = opts.template.id;


      console.log('Searching for template with ID ' + id);

      var template = this.select({ opts: opts });

      return template ? template : 'err: No template with ID ' + id + ' found.';
    }

    /**
     * select - Finds element with {el} selector
     *
     * @param  {String} el          Target element selector to search for
     * @param  {Obj}    opts        Opt. object with search options
     * @return {HTMLObj} selected   The element that was found (if any)
     */

  }, {
    key: 'select',
    value: function select() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          el = _ref5.el,
          opts = _ref5.opts;

      var localTemplate = document.querySelector(el);

      localTemplate ? console.log('Found template for ' + el) : localTemplate = this.importSelectTemplate({ opts: opts });

      return localTemplate;
    }

    /**
     * importSelectTemplate - Finds element within import with {el} selector
     *
     * @param  {type}    template           description
     * @param  {type}    opts               Obj with import name
     * @return {HTMLOBj} importedTemplate
     */

  }, {
    key: 'importSelectTemplate',
    value: function importSelectTemplate() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          opts = _ref6.opts;

      var _opts$template = opts.template,
          id = _opts$template.id,
          src = _opts$template.src;


      var component = document.querySelector('link[rel=import][name=' + src + ']');

      var importedTemplate = component.import.querySelector(id);

      return importedTemplate ? importedTemplate : 'err: No template with ID ' + opts.template + ' found.';
    }

    /**
     * parseTemplate - Takes in an HTML template and parses the '{{}}'s
     *
     * @param  {type} template  description
     * @param  {type} data      description
     * @return {type}           description
     */

  }, {
    key: 'parseTemplate',
    value: function parseTemplate(template, data) {
      var tem = template.innerHTML.replace(/ /g, '');

      while (tem.includes('{{') && tem.includes('}}')) {

        var begin = tem.indexOf('{{');
        var end = tem.indexOf('}}');
        var dataVar = tem.slice(begin + 2, end);

        if (data[dataVar]) {
          if (isFunction(data[dataVar])) {
            dataVar = data[dataVar]();
          } else {
            dataVar = data[dataVar];
          }
        } else {
          dataVar = '';
        }

        var dvl = dataVar.length;

        tem = tem.slice(0, begin) + dataVar + tem.slice(end + 2, tem.length);
      }

      return tem;
    }
  }]);

  return Aug;
}();

// Helper function that checks if a value is of type 'function'


function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
