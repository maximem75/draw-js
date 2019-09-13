import { createSVG, createNode } from "dom-js";
import Container from "./container";
import Pixel from "../background/pixel";
import Line from "../background/line";
import globalData from "../../common/globalData";

export default class Grid extends Container {
  constructor(parent, pixel_dimension) {
    super(parent);
    this.pixel_dimension = pixel_dimension;
    this.pixels = {};
    this.lines = {};
    this.group_lines = null;
    this.group_pixels = null;

    this.active_style = null;
    this.active_row_id = null;
    this.active_col_id = null;

    this.hightlight_color = '#44bbef';

    this.init();
  }

  init() {
    this.element = createSVG('g', { class: globalData.class_list.grid });
    super.init();
  }

  build(width, height) {
    this.clearGrid();
    this.buildPixels(width, height);
    this.buildLines(width, height);

    if (!this.active_style) {
      this.active_style = createNode('style', { class: 'grid-style' });
      document.head.appendChild(this.active_style);
    }
  }

  buildLines(width, height) {
    this.group_lines = createSVG('g', { class: globalData.class_list.group_line });

    let nodes = '';
    const col_number = Math.ceil(width / this.pixel_dimension);
    const row_number = Math.ceil(height / this.pixel_dimension);


    for (let c = 0; c < col_number; c += 1) {
      const id = Line.generateColId(c);
      const x1 = c * this.pixel_dimension, x2 = c * this.pixel_dimension, y1 = 0;
      const line = new Line(id, x1, y1, x2, height);

      this.lines[id] = line;
      nodes += line.element;
    }

    for (let r = 0; r < row_number; r += 1) {
      const id = Line.generateRowId(r);
      const x1 = 0, y1 = r * this.pixel_dimension, y2 = r * this.pixel_dimension;
      const line = new Line(id, x1, y1, width, y2);

      this.lines[id] = line;
      nodes += line.element;
    }

    this.group_lines.innerHTML = nodes;
    this.element.appendChild(this.group_lines);
  }

  buildPixels(width, height) {
    this.group_pixels = createSVG('g', { class: globalData.class_list.group_pixel });

    let nodes = '';
    const array = [];
    const row_number = Math.ceil(height / this.pixel_dimension);
    const col_number = Math.ceil(width / this.pixel_dimension);

    for (let r = 0; r < row_number; r += 1) {
      for (let c = 0; c < col_number; c += 1) {
        const id = Pixel.generateId(c, r);
        const pixel = new Pixel(id, this.pixel_dimension, c, r);

        this.pixels[id] = pixel;
        array.push(pixel.element);
        nodes += pixel.element;
      }
    }

    this.group_pixels.innerHTML = nodes;
    this.element.appendChild(this.group_pixels);
  }

  clearGrid() {
    if (this.element)
      this.element.innerHTML = '';
  }

  clearLines() {
    if (this.group_lines)
      this.group_lines.parentNode.removeChild(this.group_lines);
  }

  clearPrixels() {
    if (this.group_pixels)
      this.group_pixels.parentNode.removeChild(this.group_pixels);
  }

  getColumnId(left) {
    return `col_${Math.floor(left / this.pixel_dimension)}`;
  }

  getRowId(top) {
    return `row_${Math.floor(top / this.pixel_dimension)}`;
  }

  startHighlightLines(left, top) {
    let update = false;

    const x = left - this.x;
    const y = top - this.y;

    if (x <= 0 || y <= 0 || x >= this.width || y >= this.height) {
      this.stopHightLightLine();
      return;
    }

    const colId = this.getColumnId(x);
    const rowId = this.getRowId(y);

    if (this.active_row_id !== rowId) {
      update = true;
      this.active_row_id = rowId;
    }

    if (this.active_col_id !== colId) {
      update = true;
      this.active_col_id = colId;
    }

    if (update)
      addHighlightStyle(this);
  }

  stopHightLightLine() {
    removeHighlightStyle(this);
  }
}

function addHighlightStyle(grid) {
  grid.active_style.innerHTML = '#' + grid.active_row_id + ' { stroke: ' + grid.hightlight_color + '!important; stroke-width: 1px!important; }' +
    '#' + grid.active_col_id + ' { stroke: ' + grid.hightlight_color + '!important; stroke-width: 1px!important; }';
}

function removeHighlightStyle(grid) {
  grid.active_style.innerHTML = '';
}