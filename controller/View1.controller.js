sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  'sap/m/MessageToast'
], function (Controller, JSONModel, MessageToast) {
	"use strict";

  return Controller.extend("temp.controller.View1", {
    onInit: function () {
      this._oVideoFrame = this._getControl('videoFrame');
      this._oOutputText = this._getControl('recognizedText');
      this._oCanvas = this._getControl('snapShot');

      this._oCamTurnBtn = this._getControl('enableCamBtn');
      this._oCaptureBtn = this._getControl('videoCaptureBtn');
      this._oRecognizeBtn = this._getControl('recognizeBtn');

      this._oProgressBar = this._getControl('recognizeProgressBar');
    },
    
    onEnableCamera: function () {
      if (this._oCamTurnBtn.getPressed()) {
        this._openWebCam();
        this._setupCanvas();
      } else {
        this._closeWebCam();
        this._closeEditPanel();
        this._destroyCanvas();
        this._clearOutput();
      }
    },

    onCaptureVideo: function () {
      this._prepareCanvas();
      this._makeSnapShot();
      this._crop();
    },

    onResetCrop: function () {
      this.cropper.destroy();
      this._destroyCanvas();
      this._closeEditPanel();
      this._oCamTurnBtn.setPressed(false);
    },

    onSubmitCrop: function () {
      var cropped = this.cropper.getCroppedCanvas();
      this.cropper.destroy();
      this._closeEditPanel();
      this._destroyCanvas();
      this._showOutput();
      this._recognizeText(cropped);
    },

    _openWebCam: function () {
      this._getControl('videoCapturePanel').setVisible(true);
    },

    _setupCanvas: function () {
      this._getControl('snapShotPanel').setVisible(true);
    },

    _showEditPanel: function () {
      this._getControl('editPanel').setVisible(true);
    },

    _showOutput: function () {
      this._getControl('outputField').setVisible(true);
    },

    _closeWebCam: function () {
      this._getControl('videoCapturePanel').setVisible(false);
    },

    _destroyCanvas: function () {
      this._getControl('snapShotPanel').setVisible(false);
    },

    _clearOutput: function () {
      this._oOutputText.setValue('');
      this._getControl('outputField').setVisible(false);
    },

    _prepareCanvas: function () {
      var w = this._oVideoFrame.$().width();
      var h = this._oVideoFrame.$().height();

      document.querySelector('canvas').width = w;
      document.querySelector('canvas').height = h;
    },

    _makeSnapShot: function () {
      var w = this._oVideoFrame.$().width();
      var h = this._oVideoFrame.$().height();

      this._closeWebCam();

      this.oCtx = this._oCanvas._getTag().getContext('2d');
      this.oCtx.drawImage(this._oVideoFrame._getTag(), 0, 0, w, h);
    },

    _crop: function () {
      this._showEditPanel();
      this.cropper = new Cropper(this._oCanvas._getTag(), {
        zoomable: false
      });
    },

    _recognizeText: function (oContext) {
      this._loading();
      Tesseract.recognize(oContext, {
        lang: 'rus'
      }).progress(stat => this._showProgress(stat))
        .catch(err => {
          this._loading();
          MessageToast.show('err: ' + err);
        })
        .then(result => {
          this._loading();
          this._oOutputText.setValue(result.text);
        });
    },

    _loading: function () {
      var state = this._oOutputText.getBusy();
      this._oOutputText.setBusy(!state);
    },

    _showProgress: function (oProgress) {
      this._oProgressBar.setDisplayValue(oProgress.status + ' : ' + Math.round(oProgress.progress * 100) + '%');
    },
    
    _getControl: function (sId) {
      return this.byId(sId);
    },

    _closeEditPanel: function () {
      this._getControl('editPanel').setVisible(false);
    }

  });
});