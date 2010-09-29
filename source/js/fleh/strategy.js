Fleh.Strategy = new Class({

	name: null,
	
	label: null,
	
	description: null,
	
	initialize: function(){
	},

	getOption: function() {
		var option;
		option = new Element(
			'option', {
				'value': this.name,
				'title': this.description,
				'text': this.label
			}
		);
		option.store('object',this);
		return option;
	},
	
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		return jobs[0];
	}
	
});

Fleh.Strategy.instances = [];
