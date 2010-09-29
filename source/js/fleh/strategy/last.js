Fleh.Strategy.Last = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.Last',
	
	label: 'Letzten',
	
	description: 'Es wird immer der letzte Job genommen. Damit werden kleinere Jobs bevorzugt.',
	
	select: function(jobs) {
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		return jobs.pop();
	}

});

Fleh.Strategy.instances.push(new Fleh.Strategy.Last());

