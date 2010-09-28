Fleh.Worker.Career = new Class({

	Extends: Fleh.Worker,

	strategies: {
		takeFirstJob: {
			label: 'immer den ersten',
			description: 'Damit werden größere Jobs bevorzugt.',
			method: 'takeFirstJob'
		},
		takeLastJob: {
			label: 'immer den letzten',
			description: 'Damit werden kleinere Jobs bevorzugt.',
			method: ''			
		},
		takeShorties: {
			label: 'nur Einstünder',
			description: 'Damit werden ausschließlich einstündige Jobs genommen.',
			method: 'takeShorties'			
		}
	},
	
	/**
	 * @var array
	 */
	jobs_open: null,

	/**
	 * @var array
	 */
	jobs_done: null,

	/**
	 * @var array
	 */
	jobs_available: null,

	/**
	 * @var array
	 */
	jobs_locked: null,

	initialize: function(fleh){
		this.parent(fleh);
		console.log('Fleh.Worker.Career');
		this.jobs_done = $$('ul.activities div.deadlineReached').getParent();
		this.jobs_open = $$('ul.activities li.orange');
		this.jobs_locked = $$('ul.activities li.locked');
		this.jobs_available = $$('ul.activities').getLast().getElements('li[class!="locked"]');
	},

	enhance: function(){
		this.parent();
		this.jobs_available.each(function(element){
			this.enhanceActivity(element);
		}, this);
		this.jobs_open.each(function(element){
			this.enhanceActivity(element);
		}, this);
		this.markBestActivity(this.jobs_available);
	},

	autopilot: function() {
		if (this.jobs_open.length>0) {
			this.resumeJob();
		} else if (this.jobs_available.length>0) {
			this.startJob();
		} else {
			this.fleh.log.log('Keine offenen Jobs. Seite wird nach 30s neu geladen.');
			Fleh.Tools.reloadAfter(30);
		}
	},

	startJob: function() {
		var max_cph_index, max_xph_index, max_cph, max_xph, next_job, jobs, people, strategy, strategy2;
		// calculate jobs for only one person
		jobs = [];
		this.jobs_available.each(function(element,index) {
			people = element.getElement('span.participants').get('text').split('/');
			if (people[1]-people[0]==1) {
				jobs.push(element);
			}
		});
		// none available? quit
		if (jobs.length==0) {
			this.fleh.log.log('Keine verfügbaren Jobs. Seite wird nach 30s neu geladen.');
			Fleh.Tools.reloadAfter(30);
		}
		max_cph=0;
		max_xph=0;
		jobs.each(function(element,index) {
			console.log(
					element.getElement('strong').get('text') +
					' (' +
					Math.round(element.retrieve('cph')) +
					'/' +
					Math.round(element.retrieve('xph')) +
					')'
			);
			if (element.retrieve('cph')>max_cph) {
				max_cph=element.retrieve('cph');
				max_cph_index=index;
			}
			console.log(element.retrieve('xph'),max_xph);
			if (element.retrieve('xph')>max_xph) {
				max_xph=element.retrieve('xph');
				max_xph_index=index;
				console.log('!');
			}
		});
		
		startegy = 'takeBestJob';
		strategy2 = 'takeLastJob';
		
		next_job = this.takeBestJob(jobs); // take best jobs - ?
		if (!next_job) {
			next_job = this.takeLastJob(jobs); // take last job - prefer smaller jobs
		}
		if (!next_job) {
			console.log('no suitable job found!');
			return;
		}
		link = next_job.getElement('div.join a');
		if (!link) {
			console.log('error');
			// Fehler, keinen Link gefunden
			return;
		}
		this.fleh.log.log(
				next_job.getElement('strong').get('text') + ' (' +
				Math.round(next_job.retrieve('cph')) + '/' +
				Math.round(next_job.retrieve('xph')) + ')'
		);
		Fleh.Tools.load(link.href);
	},

	takeFirstJob: function(jobs) {
		var job = jobs[0];
		return job;
	},
	
	takeLastJob: function(jobs) {
		var job = jobs.pop();
		return job;
	},
	
	takeBestJob: function(jobs) {
		return;
	},
	
	takeJobWithMostXp: function(jobs) {
		return;
	},
	
	takeJobWithMostMoney: function(jobs) {
		return;
	},
	
	takeShorties: function(jobs) {
		return;
	},
	
	resumeJob: function() {
		var next_job = this.jobs_open[0];
		this.jobs_open.each(function (element) {
			// if (element.hasChild('div.working')) { // doesn't work
			if (element.getElement('div.working')) {
				next_job = element;
				return;
			}
		});
		console.log('next:',next_job);
		link = next_job.getElement('div.proceed a');
		if (!link) {
			// Fehler, keinen Link gefunden
			return;
		}
		Fleh.Tools.load(link.href);
	},

	markBestActivity: function(elements){
		var max_xph, max_xph_index, max_cph, max_cph_index, max_xphb,
			max_xphb_index, max_cphb, max_cphb_index;
		max_cph_index = max_xph_index = max_cphb_index = max_xphb_index = 0;
		max_cph = max_xph = max_cphb = max_xphb = 0;
		/* loop though activities */
		elements.each(function(element, index){
			if (element.retrieve('xph') > max_xph) {
				max_xph_index = index;
				max_xph = element.retrieve('xph');
			}
			if (element.retrieve('cph') > max_cph) {
				max_cph_index = index;
				max_cph = element.retrieve('cph');
			}
			if (element.retrieve('xphb') > max_xphb) {
				max_xphb_index = index;
				max_xphb = element.retrieve('xphb');
			}
			if (element.retrieve('cphb') > max_cphb) {
				max_cphb_index = index;
				max_cphb = element.retrieve('cphb');
			}
	    });
		/* add info */
		new Element('div', {
			'class': 'fleh-hint-max-cph',
			'html': max_cph.toFixed(2) + '$/h'
		}).inject(elements[max_cph_index]);

		new Element('div', {
			'class': 'fleh-hint-max-xph',
			'html': max_xph.toFixed(2) + 'XP/h'
		}).inject(elements[max_xph_index]);

		if (max_cphb > max_cph) {
			new Element('div', {
				'class': 'fleh-hint-max-cphb',
				'html': 'Risiko! ' + max_cphb.toFixed(2) + '$/h'
			}).inject(elements[max_cphb_index]);
		}

		if (max_xphb > max_xph) {
			new Element('div', {
				'class': 'fleh-hint-max-xphb',
				'html': 'Risiko! ' + max_xphb.toFixed(2) + 'XP/h'
			}).inject(elements[max_xphb_index]);
		}
	},

	enhanceActivity: function(element){
		var e_xp, e_cash, e_hours, e_bonus,
			hours_done, hours_rest, hours_total, bonus,
			factor, xph, cph, xphb, cphb, h, text;

		e_xp	= element.getElement('.facts .xp');
		e_cash	= element.getElement('.facts .cash');
		e_hours	= element.getElement('.facts .hours');
		e_bonus	= element.getElement('.facts .bonus');

		if (e_hours) {
			/* calculate values */
			h = e_hours.get('text').split('/');
			hours_done = 0;
			hours_total = h[0];
			if (h.length === 2) {
				hours_done = h[0];
				hours_total = h[1];
			}
			hours_rest = hours_total - hours_done;
			bonus = parseFloat(e_bonus.get('text').replace('%',''));
			factor = 1.0 + bonus / 100;
			xph = e_xp.get('text')/hours_total;
			cph = e_cash.get('text')/hours_total;
			xphb = factor * e_xp.get('text')/hours_total;
			cphb = factor * e_cash.get('text')/hours_total;
			/* store values for later */
			element.store('xph', xph);
			element.store('xphb', xphb);
			element.store('cph', cph);
			element.store('cphb', cphb);
			/* set title attribute */
			e_xp.set('title', xph.toFixed(2) + 'XP/h');
			e_cash.set('title', cph.toFixed(2) + '$/h');
			e_bonus.set('title', xphb.toFixed(2) + 'XP/h - ' + cphb.toFixed(2) + '$/h');

			text = 'Restzeit: ' + Fleh.Tools.formatTime(12.0 * hours_rest - 2.0 * this.fleh.fv.getCurrentEnergy());
			text += ' = ' + Fleh.Tools.formatTime(2.0 * hours_rest) + ' Arbeit';
			text += ' + ' + Fleh.Tools.formatTime(10.0 * hours_rest) + ' Erholung';

			if (this.fleh.fv.getCurrentEnergy() > 0) {
				text += ' - ' + Fleh.Tools.formatTime(2.0*this.fleh.fv.getCurrentEnergy()) + ' Restenergie';
			}

			e_hours.set('title',text);
		}
	}

});
