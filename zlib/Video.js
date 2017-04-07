sap.ui.define([
  'sap/ui/core/Control',
  'sap/m/MessageToast'
], function (Control, MessageToast) {
  return Control.extend('temp.zlib.Video', {
    metadata: {
      properties: {
        width: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "none"
        },
        height: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "none"
        },
        streamUrl: {
          type: 'string'
        },
        fitInContainer: {
          type: 'boolean',
          defaultValue: false
        },
        hidden: {
          type: 'boolean',
          defaultValue: true
        }
      }
    },

    init: function () {
      this.initCamera();
    },

    initCamera: function () {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: {
            exact: 'environment'
          }
        }
      }).then((oMediaStream) => this._handleStream(oMediaStream))
        .catch((e) => MessageToast.show(e.message))
    },

    _handleStream: function (oMediaStream) {
      var streamUrl = window.URL.createObjectURL(oMediaStream);
      this.setStreamUrl(streamUrl);
    },

    setHidden: function (bMode) {
      this.$().context.hidden = bMode;
    },

    renderer: function (oRm, oControl) {
      oRm.write('<video');
      oRm.writeControlData(oControl);
      oRm.writeAttribute('autoplay', '');
      oRm.writeAttribute('hidden', oControl.getHidden());
      if(oControl.getFitInContainer()){
        var oContainer = oControl.$().parent(); 
        oRm.writeAttribute('width', oContainer.width());
        oRm.writeAttribute('height', oContainer.height());

      } else {
        oRm.writeAttribute('width', oControl.getWidth());
        oRm.writeAttribute('height', oControl.getHeight());
      }
      if(oControl.getStreamUrl()){
        oRm.writeAttribute('src', oControl.getStreamUrl());
      }
      oRm.write('></video>');
    }
  })
});