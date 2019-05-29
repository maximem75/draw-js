import { on, clearId } from 'custom-event-js';
import data from '../common/data';

export function initGridEvents(draw) {
  draw.handlers.grid = {};

  on(draw.handlers.grid, data.events.grid.hightlight.start, () => startHighlight(draw));
  on(draw.handlers.grid, data.events.grid.hightlight.stop, () => stopHighlight(draw));

  on(draw.handlers.grid, data.events.grid.color.start, () => startColor(draw));
  on(draw.handlers.grid, data.events.grid.color.stop, () => stopColor(draw));
}

function startHighlight(draw) {
  draw.grid.updateDimensions();
  draw.grid.mousemove = on(draw.grid.parent, 'mousemove', (e) => draw.grid.startHighlightLines(e.pageX, e.pageY));
  draw.grid.mouseleave = on(draw.grid.parent, 'mouseleave', () => draw.grid.stopHightLightLine());
}

function stopHighlight(draw) {
  if (!draw.grid.mousemove && ! draw.grid.mouseleave) return;

  clearId(draw.grid.mousemove);
  clearId(draw.grid.mouseleave);

  draw.grid.mousemove = null;
  draw.grid.mouseleave = null;

  draw.grid.stopHightLightLine();
}

function startColor(draw) {
  draw.color_picker.show();
}

function stopColor(draw) {
  draw.color_picker.hide();
}
