export default class Container {
  constructor(parent, width = 0, height = 0, x = 0, y = 0) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.element = null;
  }

  init() {
    if (!this.parent)
      throw new Error('Parent is missing');

    if (!this.element)
      throw new Error('Element is missing');

    this.parent.appendChild(this.element);
    this.updateDimensions();
  }

  updateDimensions() {
    const dimensions = this.element.getBoundingClientRect();

    this.width  = dimensions.width;
    this.height = dimensions.height;
    this.x = dimensions.x;
    this.y = dimensions.y; 
  }
}
