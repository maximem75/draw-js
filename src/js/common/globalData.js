const globalData = {
  dimensions: {
    color_picker: {
      width: 185,
      height: 190,
      padding: 5
    },
    color_block: {
      width: 150,
      height: 150
    },
    color_strip: {
      width: 30,
      height: 150
    },
    color_render: {
      width: 50,
      height: 30
    },
    block_lines: 1.2
  },
  class_list: {
    svg: 'svg-element',
    pixel: 'pixel',
    line: 'line-element',
    grid: 'grid',
    group_line: 'group-grid-line',
    group_pixel: 'group-grid-pixel',
    menu: 'menu',
    menu_button: 'menu-button',
    color_picker: 'color-picker',
    color_picker_block: 'color-picker-block',
    color_picker_strip: 'color-picker-strip',
    color_render: 'color-picker-render'
  },
  events: {
    grid: {
      hightlight: {
        start: 'start.highlight',
        stop: 'stop.highlight'
      },
      color: {
        start: 'start.choose.color',
        stop: 'stop.choose.color'
      }
    }
  },
  namespaces: {
    svg: 'http://www.w3.org/2000/svg'
  }
};

export default globalData;