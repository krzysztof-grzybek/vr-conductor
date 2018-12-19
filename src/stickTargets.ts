AFRAME.registerComponent('stick-targets', {
  init: function() {
    const items = [
      {
        position: [-0.1, 0, 0],
        id: 'left'
      },
      {
        position: [0.1, 0, 0],
        id: 'right'
      }
    ];
    this.el.setAttribute('single-stick-target', { items });
  }
});

