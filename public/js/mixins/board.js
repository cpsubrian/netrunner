module.exports = {
  ui: {
    playmat: '.playmat',
    hud: '.hud',
    singles: '.single'
  },
  onRender: function () {
    console.log(this.ui.singles);
  }
};