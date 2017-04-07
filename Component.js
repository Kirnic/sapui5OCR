sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("temp.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);

		}
	});

});