Fleh.Strategy.Shorties = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.Shorties',
	
	label: 'Shorties',
	
	description: 'Es werden nur einstündige Jobs angenommen.',
	
	// @todo
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		return jobs[0];
	}

});

//Fleh.Strategy.instances.push(new Fleh.Strategy.Shorties());

