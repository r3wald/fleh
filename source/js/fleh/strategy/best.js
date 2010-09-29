Fleh.Strategy.Best = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.Best',
	
	label: 'Besten',
	
	description: 'Es wird der optimale Job genommen.',
	
	// @todo
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		return jobs[0];
	}

});

// Fleh.Strategy.instances.push(new Fleh.Strategy.Best());

