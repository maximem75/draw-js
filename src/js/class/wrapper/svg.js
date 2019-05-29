import { createSVG } from 'dom-js';
import Container from "./container";
import data from '../../common/data';

export default class Svg extends Container {
  constructor(parent) {
    super(parent);
    this.init();
  }

  init() {
    this.element = createSVG('svg', { class: data.class_list.svg });
    super.init();
  }
}


