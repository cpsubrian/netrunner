define("plugins/math", function (require, exports, module) {
  module.exports = {
  
    // Return either the missing width or height for card aspect ratios.
    cardSize: function (w, h) {
      if (w) {
        return w * (418/300);
      }
      if (h) {
        return h * (300/418);
      }
    }
  
  };
});