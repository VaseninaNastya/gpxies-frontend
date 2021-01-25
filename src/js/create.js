/**
 * Create an element and insert into DOM.
 * @param {string} el - tag
 * @param {string} classNames - space separated string of class names
 * @param {array} child - array of child nodes
 * @param {Node} parent - object of parent node
 * @param {...any} dataAttr - any attributes [name, value]
 */

function create(el, classNames, child, parent, ...dataAttr) {
    let element = null;
    try {
      element = document.createElement(el);
    } catch (error) {
      throw new Error("Unable to create HTMLElement! Give a proper tag name");
    }
    if (classNames) element.classList.add(...classNames.split(" ")); // "class1 class2 class3"
    if (child && Array.isArray(child)) {
      child.forEach(
        (childElement) => childElement && element.append(childElement)
      );
    } else if (child && typeof child === "object") {
      element.append(child);
    } else if (child && typeof child === "string") {
      element.innerHTML = child;
    }
    if (parent) {
      parent.append(element);
    }
    if (dataAttr.length) {
      dataAttr.forEach(([attrName, attrValue]) => {
        if (attrValue === "") {
          element.setAttribute(attrName, "");
        }
        if (attrName.match(/type|id|value|for|name|selected|height|width|href|src|required|placeholder|accept|ref|encType|action|method|alt/)) {
          element.setAttribute(attrName, attrValue);
        } else {
          element.setAttribute(attrName, attrValue);
        }
      });
    }
    return element;
  }
  
  export default create;