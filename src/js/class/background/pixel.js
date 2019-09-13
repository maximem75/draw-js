import globalData from "../../common/globalData";

export default class Pixel {
  constructor(id, dimension, x, y) {
    this.element = null;
    this.id = id ? id : '';
    this.dimension = dimension;
    this.x = x;
    this.y = y;

    init(this);
  }
}

Pixel.generateId = (c, r) => `pixel_${c}_${r}`;

function init(pixel) {
 pixel.element = '<rect ' +
   'class = "' + globalData.class_list.pixel + '" ' +
   'x  = "' + pixel.dimension * pixel.x + '" ' +
   'y  = "' + pixel.dimension * pixel.y + '" ' +
   'id = "' + pixel.id + '"></rect>';
}