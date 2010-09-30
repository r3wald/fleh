Fleh.Strategy.First = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.First',
	
	label: 'Nimm ersten Job',
	
	description: 'Es wird immer der erste verfügbare Job genommen. Damit werden größere Jobs bevorzugt.',
	
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
			return null;
		}
		return jobs[0];
	}

});

Fleh.Strategy.instances.push(new Fleh.Strategy.First());

