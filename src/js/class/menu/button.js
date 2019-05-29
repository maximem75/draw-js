import { createNode } from 'dom-js';
import { on } from 'custom-event-js';
import data from '../../common/data';

export default class Button {
  constructor(id = null, label, startEvent, stopEvent) {
    this.id = id;
    this.label = label;
    this.startEvent = startEvent;
    this.stopEvent = stopEvent;
    this.element = null;
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    init(this);
  }

  updatePosition() {
    const positions = this.element.getBoundingClientRect();
    this.x = positions.x;
    this.y = positions.y;
    this.width  = positions.width;
    this.height = positions.height;
  }
}

function init(button) {
  button.element = createNode('span', { class: data.class_list.menu_button }, button.label);
  on(button.element, 'click', () => {
    if (!button.active) button.startEvent();
    else button.stopEvent();

    button.active = !button.active;
  });
}
