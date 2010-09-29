Fleh.Strategy.First = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.First',
	
	label: 'Ersten',
	
	description: 'Es wird immer der erste Job genommen. Damit werden größere Jobs bevorzugt.',
	
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		return jobs[0];
	}

});

Fleh.Strategy.instances.push(new Fleh.Strategy.First());

