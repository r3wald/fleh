Fleh.Worker.Sparetime = new Class({
	
	Extends: Fleh.Worker,
	
	initialize: function(fleh) {
		this.parent(fleh);
		console.log('Fleh.Worker.Sparetime');
	},
	
	enhance: function() {
				this.parent();
	},
	
	autopilot: function() {
	}
	
});
