sap.ui.define([
  'sap/ui/core/Control',
  'sap/m/MessageToast'
], function (Control, MessageToast) {
  'use strict';
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

    _stopStream: function () {
      this.setStreamUrl("#"); 
    },

    setWidth: function (sValue) {
      this.setProperty("width", sValue, true);
      this.$().css("width", this.getWidth());

      return this;
    },

    getWidth: function () {
      return this.getProperty("width");
    },

    setHeight: function (sValue) {
      this.setProperty("height", sValue, true);
      this.$().css("height", this.getHeight());

      return this;
    },

    getHeight: function () {
      return this.getProperty("height");
    },

    _getTag: function () {
      return this.$().context;
    },
    
    renderer: function (oRm, oControl) {
      oRm.write('<video ');
      oRm.writeControlData(oControl);
      oRm.writeAttribute('autoplay', '');

      oRm.writeAttribute('width', oControl.getWidth());
      oRm.writeAttribute('height', oControl.getHeight());

      if(oControl.getStreamUrl()){
        oRm.writeAttribute('src', oControl.getStreamUrl());
      }
      oRm.write('></video>');
    }
  })
});