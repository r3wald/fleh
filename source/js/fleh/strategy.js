Fleh.Strategy = new Class({

	name: null,
	
	label: null,
	
	description: null,
	
	initialize: function(){
	},

	getOption: function(selected) {
		var option;
//				'title': this.description,
		option = new Element(
			'option', {
				'value': this.name,
				'text': this.label,
				'selected': selected ? true : false
			}
		);
//		option.store('object',this);
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
