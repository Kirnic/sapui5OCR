sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  'sap/m/MessageToast'
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("temp.controller.View1", {
    onInit: function () {
      this.oVideoFrame = this.getControl('videoFrame');
      this.oCanvas = this.getControl('canvas');
      this.oCaptureBtn = this.getControl('captureBtn');
    },
    
    onAfterRendering: function () {

    },

    capturePhoto: function () {
      this.oVideoFrame.setHidden(false);
    },

    onStartRecognition: function () {

    },

    makeSnapshot: function () {
      

    },

    clearSnapShot: function () {
      this.oCanvas.hidden = true;
      document.querySelector('video').hidden = document.querySelector('video').hidden = false;
    },

    recognizeText: function (oContext) {
      Tesseract.recognize(oContext, {
        lang: 'rus'
      })
        .progress(message => console.log('progress: ', message))
        .catch(err => console.error('err: ', err))
        .then(result => MessageToast.show(result.text));
    },

    getTag: function (sId) {
      return $('#' + sId).context;
    },

    getControl: function (sId) {
      return this.byId(sId);
    }
	});

});