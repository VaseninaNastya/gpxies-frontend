import Mounth from './mounth.utils';
function getDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const mounth = Mounth[dateObj.getMonth()];
    const dateRes = day + '.' + mounth + '.' + year;
    return dateRes;
  }


/*
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
  }*/
  
  export default getDate;