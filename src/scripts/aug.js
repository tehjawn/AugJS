// === Aug Class ===
// Foundational object that is the start point of all Aug objects
// Aug Objects are also known as "Augjects"

class Aug {

  /**
   * constructor - Augject Constructor; creates new Aug object
   *
   * @param  {String} el        Element selector of root Aug element
   * @param  {Obj}  opts        Contains all options and properties of element
   * @return {void}             No return
   */

  constructor({ el, opts } = {}) {
    this.augs = this.findAugEl({ el })

    if (opts) this.setOpts({ opts })
  }

  /**
   * setOpts - Sets the options of the Augject
   *
   * @param  {Obj}  opts     Contains all options and properties of element
   * @return {type}          description
   */
  setOpts({ opts }) {
    let template = this.findTemplate({ opts })

    for (var aug of this.augs) {
      let shadow = aug.createShadowRoot({mode: 'open'})
      shadow.innerHTML = this.parseHandlebars(template, opts.data)
    }
  }


  // --- AugJS Public Helper Functions ---

  /**
   * findAugEl - Find element with specified selector tag
   *
   * @param  {String} el      Element selector to search for
   * @return {HTMLObj}
   */

  findAugEl({ el } = {}) {
    // console.log(`Searching for ${el}`)

    let augEl = this.select({ el })

    return augEl
      ? augEl
      : `err: No element found with ID ${el}`
  }


  /**
   * findTemplate - Find template by ID
   *
   * @param  {String} template        Template ID to search for
   * @param  {String} opts       Component name to search in
   * @return {HTMLObj} foundTemplate  The template element that was found
   */

  findTemplate({ opts } = {}) {
    let { id } = opts.template

    // console.log(`Searching for template with ID ${id}`)

    let template = this.select({ opts })

    return template
      ? template
      : `err: No template with ID ${id} found.`
  }


  /**
   * select - Finds element with {el} selector
   *
   * @param  {String} el          Target element selector to search for
   * @param  {Obj}    opts        Opt. object with search options
   * @return {HTMLObj} selected   The element that was found (if any)
   */
  select({ el, opts } = {}) {

    if (el) {
      return document.querySelectorAll(el)
    }

    if (opts) {
      return this.importSelectTemplate({ opts })
    }
  }


  /**
   * importSelectTemplate - Finds element within import with {el} selector
   *
   * @param  {type}    template           description
   * @param  {type}    opts               Obj with import name
   * @return {HTMLOBj} importedTemplate
   */

  importSelectTemplate({ opts } = {}) {

    let { id, src } = opts.template

    let component = document.querySelector(`link[rel=import][name=${src}]`);

    let importedTemplate = component.import.querySelector(id);

    return importedTemplate
      ? importedTemplate
      : `err: No template with ID ${opts.template} found.`
  }


  /**
   * parseHandlebars - Takes in an HTML template and parses the '{{}}'s
   *
   * @param  {type} template  description
   * @param  {type} data      description
   * @return {type}           description
   */
  parseHandlebars(template, data) {
    let tem = template.innerHTML

    while (tem.includes('{{') && tem.includes('}}')) {

      let begin = tem.indexOf('{{')
      let end = tem.indexOf('}}')
      let dataVar = tem.slice(begin+2, end).replace(/ /g,'')

      if (data[dataVar]) {
        // console.log(data[dataVar])
        if (isFunction(data[dataVar])) {
          dataVar = data[dataVar]()
        } else {
          dataVar = data[dataVar]
        }
      } else {
        let jsParse = eval(dataVar)
        if (typeof jsParse == 'string' || typeof jsParse == 'number')
          dataVar = jsParse
        else
          dataVar = ''
      }

      let dvl = dataVar.length

      tem =
        tem.slice(0, begin) + dataVar + tem.slice(end+2, tem.length)

    }

    return tem
  }

}

// Helper function that checks if a value is of type 'function'
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
