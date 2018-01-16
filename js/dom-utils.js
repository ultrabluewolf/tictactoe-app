
//
const HIDE_CLASS = 'hide';

// -- helpers --
const getPage = () => document.getElementById('page');

const Element = (tag, options = {}) => {
  const elm = document.createElement(tag);
  Object.keys(options)
    .map((k) => {
      if (k === 'className') {
        elm[k] = dedupClasses(options[k]).join(' ');
        return;
      }
      elm[k] = options[k];
    });
  return elm;
};

const setClasses = (element, ...classes) => {
  element.className = dedupClasses(classes).join(' ');
  return element;
};

const dedupClasses = (classes) => {
  const classMap = classes
    .reduce((acm, cls) => {
      acm[cls.trim()] = true;
      return acm;
    }, {});

  return Object.keys(classMap);
};

// append classes only when they aren't already set
const addClasses = (element, ...classes) => {
  const unionOfClasses = element
    .className
    .split(' ')
    .concat(classes);
  const uniqueClasses = dedupClasses(unionOfClasses);
  element.className = uniqueClasses.join(' ');
  return element;
};

const removeClass = (element, className) => {
  element.className = element.className.replace(className, '');
  return element;
};

const addChildrenToElement = (element, children) => {
  children.map((child) => element.appendChild(child));
};

export {
  Element,

  getPage,

  setClasses,
  addClasses,
  removeClass,
  addChildrenToElement,

  HIDE_CLASS,
};
