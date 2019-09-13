import { createSVG } from 'dom-js';
import Container from "./container";
import globalData from '../../common/globalData';

export default class Svg extends Container {
  constructor(parent) {
    super(parent);
    this.init();
  }

  init() {
    this.element = createSVG('svg', { class: globalData.class_list.svg });
    super.init();
  }
}


