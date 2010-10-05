Fleh.Strategy.Shorties = new Class({

	Extends: Fleh.Strategy,

	name: 'Fleh.Strategy.Shorties',
	
	label: 'Shorties',
	
	description: 'Es werden nur einstündige Jobs angenommen.',
	
	/**
	 * just return jobs with one hour
	 */
	select: function(jobs) {
		var result = null;
		if (!jobs || jobs.length<1) {
			console.error('no jobs given!');
		}
		// console.log(jobs.length,jobs);
		jobs = jobs.filter(function(job) {
			var hours = job.getElement('.facts .hours').get('text');
			return (hours==1);
		});
		if (jobs.length>0) {
			result = jobs[0];
		}
		// console.log(jobs.length,jobs);
		return result;
	}

});

Fleh.Strategy.instances.push(new Fleh.Strategy.Shorties());

