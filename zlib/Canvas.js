sap.ui.define([
  'sap/ui/core/Control'
], function (Control) {
  return Control.extend('temp.zlib.Canvas', {
    metadata: {
      properties: {
        width: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "0px"
        },
        height: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "0px"
        },
        fitInContainer: {
          type: 'boolean',
          defaultValue: false
        }
      }
    },

    init: function () {

    },

    renderer: function (oRm, oControl) {
      oRm.write('<canvas');
      oRm.writeControlData(oControl);

      oRm.writeAttribute('width', oControl.getWidth());
      oRm.writeAttribute('height', oControl.getHeight());

      
      oRm.write('></canvas>');
    }
  })
});