// === Aug Class ===
// Primary Aug lifecycle handler that manages the creation and manipulation
// of Aug objects, or 'Augjects'

class Aug {

  constructor() {
    this.augList = []
  }

  /**
   * componentList - Returns all created Augject components thus far
   *
   * @return {Array<Augject>}  An array of all Augject components
   */
  get componentList() {
    return this.augList
  }

  /**
   * registerComponent - Registers a new Augject and pushes it to the augList
   *
   * @param  {String} el    Element selector to be used for Augject
   * @param  {Object} opts  Options to be used for Augject
   * @return {void}
   */
  registerComponent({
    el,
    opts
  }) {
    let augject = new Augject({
      el,
      opts
    })
    this.augList.push(augject)
  }

  /**
   * registerComponents - Takes an array and runs registerComponent on all items
   *
   * @param  {Array<Object>} components  A list of 'x' amount of {el, opts} objects
   * @return {void}
   */
  registerComponents(...components) {
    components.forEach(component => {
      this.registerComponent(component)
    })
  }

  /**
   * setAug - Manually set the options of a target Augject
   *
   * @param  {String} el    Element selector of target Augject component
   * @param  {Object} opts  Options to be used to modify target Augject
   * @return {void}
   */
  setAug({
    el,
    opts
  }) {
    for (var augItem of this.augList) {
      if (augItem.augName == el)
        augItem.setOpts({
          el,
          opts
        })
    }
  }

  /**
   * component - Returns a component of a specified augName
   *
   * @param  {String} el  The element name / augName of a target Augject
   * @return {Augject}    An Augject element whose augName matches 'el'
   */
  component(el) {
    for (var augItem of this.augList) {
      if (augItem.augName == el)
        return augItem
    }
  }
}


// === Augject Class ===
// Foundational object that is the start point of all Aug objects
// Aug Objects are also known as "Augjects"

class Augject {

  /**
   * constructor - Augject Constructor - creates new Aug object
   *
   * @param  {String} el        Element selector of root Aug element
   * @param  {Obj}  opts        Contains all options and properties of element
   * @return {void}             No return
   */

  constructor({
    el,
    opts
  } = {}) {
    this.augName = el
    this.augs = this.findAugEl({
      el
    })

    if (opts) this.setOpts({
      opts
    })
  }

  /**
   * setOpts - Sets the options of the Augject
   *
   * @param  {Obj}  opts     Contains all options and properties of element
   * @return {type}          description
   */
  setOpts({
    opts
  }) {
    let template = this.findTemplate({
      opts
    })

    for (var aug of this.augs) {
      let shadow = undefined

      aug.shadowRoot ?
        shadow = aug.shadowRoot :
        shadow = aug.createShadowRoot({
          mode: 'open'
        })

      if (!opts.preserve)
        shadow.innerHTML = this.parseHandlebars(template, opts.data)
      else
        shadow.innerHTML = template.innerHTML
    }
  }


  // --- AugJS Public Helper Functions ---

  /**
   * findAugEl - Find element with specified selector tag
   *
   * @param  {String} el      Element selector to search for
   * @return {HTMLObj}
   */

  findAugEl({
    el
  } = {}) {
    // console.log(`Searching for ${el}`)

    let augEl = this.select({
      el
    })

    return augEl ?
      augEl :
      `err: No element found with ID ${el}`
  }


  /**
   * findTemplate - Find template by ID
   *
   * @param  {String} template        Template ID to search for
   * @param  {String} opts       Component name to search in
   * @return {HTMLObj} foundTemplate  The template element that was found
   */

  findTemplate({
    opts
  } = {}) {
    let {
      id
    } = opts.template

    // console.log(`Searching for template with ID ${id}`)

    let template = this.select({
      opts
    })

    return template ?
      template :
      `err: No template with ID ${id} found.`
  }


  /**
   * select - Finds element with {el} selector
   *
   * @param  {String} el          Target element selector to search for
   * @param  {Obj}    opts        Opt. object with search options
   * @return {HTMLObj} selected   The element that was found (if any)
   */
  select({
    el,
    opts
  } = {}) {

    if (el) {
      return document.querySelectorAll(el)
    }

    if (opts) {
      return this.importSelectTemplate({
        opts
      })
    }
  }


  /**
   * importSelectTemplate - Finds element within import with {el} selector
   *
   * @param  {type}    template           description
   * @param  {type}    opts               Obj with import name
   * @return {HTMLOBj} importedTemplate
   */

  importSelectTemplate({
    opts
  } = {}) {

    let {
      id,
      src
    } = opts.template

    let component = document.querySelector(`link[rel=import][name=${src}]`)

    let importedTemplate = component.import.querySelector(id)

    return importedTemplate ?
      importedTemplate :
      `err: No template with ID ${opts.template} found.`
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
    let preserve = false
    if (data) {
      if (data.hasOwnProperty('preserve')) {
        if (data.preserve == true)
          preserve = true
      }
    }
    if (!preserve) {
      while (tem.includes('{{') && tem.includes('}}')) {

        let begin = tem.indexOf('{{')
        let end = tem.indexOf('}}')
        let dataVar = tem.slice(begin + 2, end)

        if (data) {
          if (data[dataVar.replace(/ /g, '')]) {
            dataVar = dataVar.replace(/ /g, '')
            if (isFunction(data[dataVar])) {
              dataVar = data[dataVar]()
            } else {
              dataVar = data[dataVar]
            }
          } else {
            let jsParse = eval(`(function(){${dataVar}}())`)
            if (typeof jsParse == 'string' || typeof jsParse == 'number')
              dataVar = jsParse
            else
              dataVar = ''
          }
        } else {
          // console.log(`Warning: {{${dataVar}}} has no existing data variable!`)
          dataVar = arrowSwap(dataVar)
          let jsParse = eval(`(function(){${dataVar}}())`)
          if (typeof jsParse == 'string' || typeof jsParse == 'number')
            dataVar = jsParse
          else
            dataVar = ''
        }

        tem = tem.slice(0, begin) + dataVar + tem.slice(end + 2, tem.length)

      }
    }


    return tem
  }

}

// Helper function that checks if a value is of type 'function'
function isFunction(functionToCheck) {
  var getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

// Helper function to santize &lt; and &gt; into their respective arrow symbols
function arrowSwap(string) {
  return string.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}
