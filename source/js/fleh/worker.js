
Fleh.Worker = new Class({

	fleh: null,

	initialize: function(fleh){
		this.fleh = fleh;
	},

	enhance: function(){
		this.updateEnergyBar();
	},

	autopilot: function(){
		this.closeOverlayFinishedJob();
//		this.closeOverlayBonusMaterial();
	},

	updateEnergyBar: function(){
		var e, full, time, text;
		e = $('energyBar');
		if (this.fleh.fv.getMaxEnergy() == this.fleh.fv.getCurrentEnergy()) {
			text = "volle Energie";
			this.fleh.log.log(text);
		} else if (this.fleh.fv.getMaxEnergy() > this.fleh.fv.getCurrentEnergy()) {
			full = new Date();
			full.setTime(full.getTime() + 1000 * 60 * 10 * (this.fleh.fv.getMaxEnergy() - this.fleh.fv.getCurrentEnergy()));
			time = full.getHours() + ":" + (full.getMinutes() > 9 ? "" : 0) + full.getMinutes();
			text = "volle Energie (" + this.fleh.fv.getMaxEnergy() + ") um " + time;
			this.fleh.log.log(text);
		}
	},
	
	closeOverlayFinishedJob: function() {
		var overlays, overlay, button;
		overlays = $$('div.overlay.professionFinished');
		if (0==overlays.length) {
			return;
		}
		overlay = overlays[0];
		button = overlay.getElement('button.close.red');
		if (!button) {
			return;
		}
		Fleh.Tools.clickButton(button);
	},
	
	closeOverlayBonusMaterial: function() {
		var overlays, overlay, item1;
		overlays = $$('div.overlay.bonusMaterial');
		if (0==overlays.length) {
			return;
		}
		overlay = overlays[0];
		item1 = overlay.getElement('#option-one');
		if (!item1) {
			return;
		}
//		Fleh.Tools.clickButton(item1);
	}
});
