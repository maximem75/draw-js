import { fire } from 'custom-event-js';
import globalData from '../common/globalData';

export function getMenuConfig(draw) {
  return [
    {
      id: 'btn_highlight',
      label: 'Highlight',
      startEvent: () => fire(draw.handlers.grid, globalData.events.grid.hightlight.start),
      stopEvent: () => fire(draw.handlers.grid, globalData.events.grid.hightlight.stop)
    },
    {
      id: 'btn_color',
      label: 'Color',
      startEvent: () => fire(draw.handlers.grid, globalData.events.grid.color.start),
      stopEvent: () => fire(draw.handlers.grid, globalData.events.grid.color.stop)
    }
  ];
}
