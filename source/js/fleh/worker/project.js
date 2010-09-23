Fleh.Worker.Project = new Class({
	
	Extends: Fleh.Worker,
	
	initialize: function(fleh) {
		this.parent(fleh);
		console.log('Fleh.Worker.Project');
	},
	
	enhance: function() {
		console.log('activity selected');
	},
	
	autopilot: function() {
		console.log('activity selected');
	}
	
});
