sap.ui.define([
  'sap/ui/core/Control'
], function (Control) {
  'use strict';
  return Control.extend('temp.zlib.Canvas', {
    metadata: {
      properties: {
        width: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "none"
        },
        height: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "none"
        }
      }
    },

    init: function () {

    },

    setWidth: function (sValue) {
      this.setProperty("width", sValue, true);
      // this.$().css("width", this.getWidth());

      return this;
    },

    getWidth: function () {
      return this.getProperty("width");
    },

    setHeight: function (sValue) {
      this.setProperty("height", sValue, true);
      // this.$().css("height", this.getHeight());

      return this;
    },

    getHeight: function () {
      return this.getProperty("height");
    },

    _getTag: function () {
      return this.$().context;
    },

    renderer: function (oRm, oControl) {
      oRm.write('<canvas ');
      oRm.writeControlData(oControl);

      oRm.writeAttribute('width', oControl.getWidth());
      oRm.writeAttribute('height', oControl.getHeight());

      oRm.write('></canvas>');
    }
  })
});