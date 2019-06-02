import { createNode } from 'dom-js';
import { on, clearId } from 'custom-event-js';
import data from '../../common/data';
import Container from "./container";

export class ColorPicker extends Container {
  constructor(parent, x, y) {
    super(parent, null, null, x, y);
    this.element = null;
    this.padding = 5;
    this.block_x = 0;
    this.block_y = 0;
    this.color = 'rgba(255,0,0,1)';
    this.color_block = null;
    this.color_strip = null;
    this.color_render = null;
    this.color_block_lineX = null;
    this.color_block_lineY = null;
    this.label_rgba = null;
    this.label_code = null;

    createStructure(this);

    super.init();

    initColorBlock(this);
    initColorStrip(this);
    addEvents(this);
  }

  show() {
    this.element.style.visibility = 'visible';
  }

  hide() {
    this.element.style.visibility = 'hidden';
  }
}

/********* Init methods *********/

function createStructure(color_picker) {
  color_picker.color_block = createColorBlock();
  color_picker.color_strip = createColorStrip();
  color_picker.color_render = createColorRender();
  color_picker.element = createElement(color_picker);

  color_picker.color_block.ctx = color_picker.color_block.element.getContext('2d');
  color_picker.color_strip.ctx = color_picker.color_strip.element.getContext('2d');
}

function initColorBlock(color_picker) {
  setColorBlockDimensions(color_picker);

  const color_block = color_picker.color_block;
  color_block.ctx.rect(0, 0, color_block.dimensions.width, color_block.dimensions.height);
  fillColorBlock(color_picker);

  createColorBlockLines(color_picker);
  updateColorBlock(color_picker);
}

function initColorStrip(color_picker) {
  color_picker.color_strip.ctx.rect(0, 0, color_picker.color_strip.width, color_picker.color_strip.height);
  const grd1 = color_picker.color_strip.ctx.createLinearGradient(0, 0, 0, color_picker.color_strip.height);
  grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
  grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
  grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
  grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
  grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
  grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
  grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
  color_picker.color_strip.ctx.fillStyle = grd1;
  color_picker.color_strip.ctx.fill();
}

function setColorBlockDimensions(color_picker) {
  const block_dimensions = color_picker.color_block.element.getBoundingClientRect();
  color_picker.color_block.dimensions = Object.assign(block_dimensions, {});
}

/********* Create elements methods *********/

function createElement(color_picker) {
  return createNode('div', {
    class: data.class_list.color_picker,
    style: getElementStyle(color_picker)
  }, [
    color_picker.color_block.element,
    color_picker.color_strip.element,
    color_picker.color_render.element
  ]);
}

function createColorBlock() {
  return {
    element: createNode('canvas', {
      class: data.class_list.color_picker_block,
      width: data.dimensions.color_block.width,
      height: data.dimensions.color_block.height
    }),
    dimensions: {},
    ctx: null
  };
}

function createColorStrip() {
  return {
    element: createNode('canvas', {
      class: data.class_list.color_picker_strip,
      width: data.dimensions.color_strip.width,
      height: data.dimensions.color_strip.height
    }),
    width: data.dimensions.color_strip.width,
    height: data.dimensions.color_strip.height,
    ctx: null
  };
}

function createColorRender() {
  return {
    element: createNode('div', {
      class: data.class_list.color_render,
      style: getRenderStyle()
    }),
    width: data.dimensions.color_render.width,
    height: data.dimensions.color_render.height
  };
}

function createColorBlockLines(color_picker) {
  color_picker.color_block_lineX = createLine(getBlockLineXStyle(color_picker));
  color_picker.color_block_lineY = createLine(getBlockLineYStyle(color_picker));

  color_picker.block_x = Math.ceil(color_picker.color_block.dimensions.width / 2) + color_picker.padding;
  color_picker.block_y = Math.ceil(color_picker.color_block.dimensions.height / 2) + color_picker.padding;

  color_picker.element.appendChild(color_picker.color_block_lineX.element);
  color_picker.element.appendChild(color_picker.color_block_lineY.element);
}

function createLine(style) {
  return {
    element: createNode('div', {
      class: 'color-picker-block-line',
      style
    }),
    x: 0,
    y: 0
  };
}


/********* Color methods *********/

function fillColorBlock(color_picker) {
  const block_ctx = color_picker.color_block.ctx;
  const strip_ctx = color_picker.color_strip.ctx;
  const block_width = color_picker.color_block.dimensions.width;
  const block_height = color_picker.color_block.dimensions.height;

  block_ctx.fillStyle = color_picker.color;
  block_ctx.fillRect(0, 0, block_width, block_height);

  const grdWhite = strip_ctx.createLinearGradient(0, 0, block_width, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  block_ctx.fillStyle = grdWhite;
  block_ctx.fillRect(0, 0, block_width, block_height);

  const grdBlack = strip_ctx.createLinearGradient(0, 0, 0, block_height);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  block_ctx.fillStyle = grdBlack;
  block_ctx.fillRect(0, 0, block_width, block_height);
}

function setColor(imageData, color_picker) {
  color_picker.color = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
}

function updateColorBlock(color_picker) {
  setColor(color_picker.color_block.ctx.getImageData(color_picker.block_x - color_picker.padding, color_picker.block_y - color_picker.padding, 1, 1).data, color_picker);
  updateRender(color_picker);
}

function updateColorStrip(e, color_picker) {
  setColor(color_picker.color_strip.ctx.getImageData(0, e.offsetY, 1, 1).data, color_picker);
  fillColorBlock(color_picker);

  updateColorBlock(color_picker);
}

function updateRender(color_picker) {
  color_picker.color_render.element.style.backgroundColor = color_picker.color;
}


/********* Block Line methods *********/

function updateBlockLinesPositions(pos_x, pos_y, color_picker) {
  const minX = pos_x > color_picker.color_block.dimensions.left ? pos_x : color_picker.color_block.dimensions.left;
  const x = minX < color_picker.color_block.dimensions.right ? minX : color_picker.color_block.dimensions.right - 0.1;

  const minY = pos_y > color_picker.color_block.dimensions.top ? pos_y : color_picker.color_block.dimensions.top;
  const y = minY < color_picker.color_block.dimensions.bottom ? minY : color_picker.color_block.dimensions.bottom - 0.1;

  color_picker.block_x = x - color_picker.color_block.dimensions.left + color_picker.padding;
  color_picker.block_y = y - color_picker.color_block.dimensions.top + color_picker.padding;

  color_picker.color_block_lineX.element.style.left = `${color_picker.block_x}px`;
  color_picker.color_block_lineY.element.style.top = `${color_picker.block_y}px`;
}


/********* Event methods *********/

function addEvents(color_picker) {
  on(color_picker.color_strip.element, 'mousedown', (e) => mouseDownColorStrip(e, color_picker));
  on(color_picker.color_block.element, 'mousedown', (e) => mouseDownColorBlock(e, color_picker));
}

function mouseDownColorBlock(e, color_picker) {
  eventColorBlock(e, color_picker);

  const mousemove_id = on(document.body, 'mousemove', (ev) => eventColorBlock(ev, color_picker));
  const mouseup_id = on(document.body, 'mouseup', () => {
    clearId(mousemove_id);
    clearId(mouseup_id);
  });
}

function eventColorBlock(e, color_picker) {
  updateBlockLinesPositions(e.pageX, e.pageY, color_picker);
  updateColorBlock(color_picker);
}

function mouseDownColorStrip(e, color_picker) {
  updateColorStrip(e, color_picker);

  const mousemove_id = on(color_picker.color_strip.element, 'mousemove', (e) => updateColorStrip(e, color_picker));
  const mouseup_id = on(document.body, 'mouseup', () => {
    clearId(mousemove_id);
    clearId(mouseup_id);
  });
}

/********* Style methods *********/

function getElementStyle(colorPicker) {
  return `width  : ${data.dimensions.color_picker.width}px;
          height : ${data.dimensions.color_picker.height}px;
          left   : ${colorPicker.x}px;
          top    : ${colorPicker.y}px`;
}

function getRenderStyle() {
  return `width  : ${data.dimensions.color_render.width}px;
          height : ${data.dimensions.color_render.height}px;`;
}

function getBlockLineXStyle(color_picker) {
  return `width  : ${data.dimensions.block_lines}px; 
          height : ${color_picker.color_block.dimensions.height}px; 
          top    : ${data.dimensions.color_picker.padding}px; 
          left   : ${Math.ceil(color_picker.color_block.dimensions.width / 2) + color_picker.padding}px;`;
}

function getBlockLineYStyle(color_picker) {
  return `width  : ${color_picker.color_block.dimensions.width}px; 
          height : ${data.dimensions.block_lines}px; 
          top    : ${Math.ceil(color_picker.color_block.dimensions.height / 2) + color_picker.padding}px; 
          left   : ${data.dimensions.color_picker.padding}px;`;
}
