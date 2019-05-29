import { fire } from 'custom-event-js';
import data from '../common/data';

export function getMenuConfig(draw) {
  return [
    {
      id: 'btn_highlight',
      label: 'Highlight',
      startEvent: () => fire(draw.handlers.grid, data.events.grid.hightlight.start),
      stopEvent: () => fire(draw.handlers.grid, data.events.grid.hightlight.stop)
    },
    {
      id: 'btn_color',
      label: 'Color',
      startEvent: () => fire(draw.handlers.grid, data.events.grid.color.start),
      stopEvent: () => fire(draw.handlers.grid, data.events.grid.color.stop)
    }
  ];
}
