Fleh.Worker.Home = new Class({
	
	Extends: Fleh.Worker,
	
	initialize: function(fleh) {
		this.parent(fleh);
		console.log('Fleh.Worker.Home');
	},
	
	enhance: function() {
		this.parent();
	},
	
	autopilot: function() {
		Fleh.Tools.load(this.fleh.fv.getCareerUrl());
	}
	
});
