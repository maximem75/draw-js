import data from '../../common/data';

export default class Line {
  constructor(id, x1, y1, x2, y2) {
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.element = null;

    init(this);
  }
}

Line.generateColId = (c) => `col_${c}`;
Line.generateRowId = (r) => `row_${r}`;

function init(line) {
  line.element = '<line ' +
   'class = "' + data.class_list.line + '" ' +
   'x1  = "' + line.x1 + '" ' +
   'x2  = "' + line.x2 + '" ' +
   'y1  = "' + line.y1 + '" ' +
   'y2  = "' + line.y2 + '" ' +
   'id = "' + line.id + '"></line>';
}


