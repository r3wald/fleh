Fleh.Worker = new Class({
	
	fleh: null,
	
	initialize: function(fleh) {
		this.fleh = fleh;
	},

	enhance: function() {
		this.updateEnergyBar();
	},
	
	autopilot: function() { },
	
	updateEnergyBar: function(){
		var e,full,time,text;
		if (this.fleh.fv.getMaxEnergy()>this.fleh.fv.getCurrentEnergy()) {
			e = $('energyBar');
			full = new Date();
			full.setTime(full.getTime() + 1000 * 60 * 10 * (this.fleh.fv.getMaxEnergy()-this.fleh.fv.getCurrentEnergy()));
			time = full.getHours() + ":" + (full.getMinutes()>9?"":0) + full.getMinutes();
			text = "Energie: " + this.fleh.fv.getCurrentEnergy() + " von " + this.fleh.fv.getMaxEnergy() + "\n";
			this.fleh.logMessage(text);
			text = "volle Energie um " + time;
			this.fleh.logMessage(text);
		}
	}
	
});
