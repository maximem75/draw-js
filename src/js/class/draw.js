import { createNode } from 'dom-js';

import data from '../common/data';

import Container from './wrapper/container';
import Menu from './menu/menu';
import Svg from './wrapper/svg';
import Grid from './wrapper/grid';

import { initGridEvents } from '../events/grid';
import { getMenuConfig } from '../config/menu';
import { ColorPicker } from "./wrapper/colorPicker";

export class Draw extends Container {
  constructor(parent = document.body, pixel_dimension = 10) {
    super(parent);

    this.pixel_dimension = pixel_dimension > 10 ? pixel_dimension : 10;
    this.handlers = {};

    this.menu = null;
    this.svg = null;
    this.grid = null;
    this.color_picker = null;
    this.styles = {
      pixel: null
    };

    init(this);
  }
}

function init(draw) {
  draw.element = createNode('section', { class: 'draw-element' });
  draw.init();

  draw.menu = new Menu(draw.element);
  draw.menu.populate(getMenuConfig(draw));
  draw.svg = new Svg(draw.element);
  draw.grid = new Grid(draw.svg.element, draw.pixel_dimension);
  draw.grid.build(draw.svg.width, draw.svg.height);

  console.log(draw);

  const btn_color = draw.menu.getButton('btn_color');
  draw.color_picker = new ColorPicker(draw.element, btn_color.x, (btn_color.y + btn_color.height));

  addPixelStyle(draw);
  initAppEvents(draw);
}

function addPixelStyle(draw) {
  if (draw.styles.pixel !== null)
    draw.styles.pixel.parentNode.removeChild(draw.styles.pixel);

  const template = `.pixel {
    width: ${draw.pixel_dimension}px;
    height: ${draw.pixel_dimension}px;
  }`;

  draw.styles.pixel = createNode('style', null, template);
  document.head.appendChild(draw.styles.pixel);
}

function initAppEvents(draw) {
  initGridEvents(draw);
}