import { createNode } from 'dom-js';
import Button from './button';
import globalData from '../../common/globalData';

export default class Menu {
  constructor(parent) {
    this.parent = parent;
    this.element = null;
    this.buttons = null;
  }

  populate(config) {
    if (this.element)
      this.element.parentNode.removeChild(this.element);

    this.buttons = getButtons(config);
    this.element = createNode('div', { class: globalData.class_list.menu }, this.buttons.map(button => button.element));
    this.parent.appendChild(this.element);
    this.updatePositions();
  }

  updatePositions() {
    this.buttons.forEach(button => button.updatePosition());
  }

  getButton(id) {
    if (!id) return;
    return this.buttons.filter(btn => btn.id === id).pop();
  }
}

function getButtons(config) {
  return config.map(button => new Button(button.id, button.label, button.startEvent, button.stopEvent));
}
