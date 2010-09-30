Fleh.Strategy.Null = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.Null',
	
	label: 'Keine neuen Jobs',
	
	description: 'Es werden nur angefangene Jobs beendet und keine neuen gestartet.',
	
	select: function(jobs) {
		return null;
	}

});

Fleh.Strategy.instances.push(new Fleh.Strategy.Null());

