Fleh.Worker.Career = new Class({

	Extends: Fleh.Worker,

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
	
	/**
	 * @var array
	 */
	cph: null,
	cphb: null,
	xph: null,
	xphb: null,
	
	max_person_count: 5,

	initialize: function(fleh){
		this.parent(fleh);
		this.cph = this.cphb = this.xph = this.xphb = [];
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
		/* if (this.fleh.fv.getCurrentEnergy()==0) {
			this.fleh.log.log('Keine Energie. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);
		} else */
		if (this.jobs_open.length>0) {
			this.resumeJob();
		} else if (this.jobs_available.length>0) {
			this.startJob();
		} else {
			this.fleh.log.log('Keine offenen Jobs. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);
		}
		Fleh.Tools.reloadAfter(60);
	},

	filterAvailableJobs: function() {
		var jobs = this.jobs_available.filter(
				function (job)
				{
					var p,p_total,p_there;
					p = job.getElement('span.participants').get('text').split('/');
					p_there = p[0];
					p_total = p[1];
					if (p_total - p_there != 1) {
						// more than one participant needed
						// console.log(p_total + '/' + p_there);
						return false;
					}
					if (p_total > this.max_person_count) {
						// more participants than acceptable
						// console.log(p_total + '>'+this.max_person_count);
						return false;
					}
					return true;
				}.bind(this)
		);
		return jobs;
	},
	
	/**
	 * calculate some values, select strategy and start a job
	 */
	startJob: function() {
		var max_cph_index, max_xph_index, max_cph, max_xph, next_job, jobs, people;
		// take only available jobs where one person is needed
		jobs = this.filterAvailableJobs();
		// none available? quit
		if (jobs.length==0) {
			this.fleh.log.log('Keine verfügbaren Jobs. Seite wird nach 60s neu geladen.');
			Fleh.Tools.reloadAfter(60);
			return;
		}
		max_cph=0;
		max_xph=0;
		jobs.each(function(element,index) {
//			console.log(
//					element.getElement('strong').get('text') +
//					' (' +
//					Math.round(element.retrieve('cph')) +
//					'/' +
//					Math.round(element.retrieve('xph')) +
//					')'
//			);
			if (element.retrieve('cph')>max_cph) {
				max_cph=element.retrieve('cph');
				max_cph_index=index;
			}
//			console.log(element.retrieve('xph'),max_xph);
			if (element.retrieve('xph')>max_xph) {
				max_xph=element.retrieve('xph');
				max_xph_index=index;
//				console.log('!');
			}
		});

		next_job = this.selectJobForCurrentStrategy(jobs);
		
		if (!next_job) {
			this.fleh.log.log('Aktuell paßt kein Job. Seite wird nach 60s neu geladen.');
			Fleh.Tools.reloadAfter(60);
			return;
		}
		
		link = next_job.getElement('div.join a');
		if (!link) {
			console.log('error');
			// Fehler, keinen Link gefunden
			return;
		}
		
		Fleh.Tools.load(link.href);
	},

	selectJobForCurrentStrategy: function(jobs) {
		var name, strategy, job;
		name = $('fleh-strategy').value;
		this.fleh.fa.saveCurrentStrategy();
		strategy = eval('new ' + name+ '()');
		job = strategy.select(jobs);
		return job;
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
//		console.log('next:',next_job);
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
			this.cph[index] = element.retrieve('cph');
			this.cphb[index] = element.retrieve('cphb');
			this.xph[index] = element.retrieve('xph');
			this.xphb[index] = element.retrieve('xphb');
	    }.bind(this));
		
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
		console.log(this.cph);
		console.log(this.cphb);
		console.log(this.xph);
		console.log(this.xphb);
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
