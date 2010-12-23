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
//	cph: null,
//	cphb: null,
//	xph: null,
	
	max_person_count: 5,
	max_hours_count: 80,

	initialize: function(fleh){
		this.parent(fleh);
//		this.cph = this.cphb = this.xph = [];
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
			this.fleh.log.log('Keine offenen Jobs. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);
		}
	},

	filterAvailableJobs: function() {
		var jobs = this.jobs_available.filter(
				function (job)
				{
					var p,p_total,p_there,h_total;
					p = job.getElement('span.participants').get('text').split('/');
					h_total = job.retrieve('hours');
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
					if (h_total > this.max_hours_count) {
						// more hours than acceptable
						// console.log(h_total + '>'+this.max_hours_count);
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
		
		// take only available jobs I like
		jobs = this.filterAvailableJobs();
		
		// none available? quit
		if (jobs.length==0) {
			this.fleh.log.log('Keine verfügbaren Jobs. Seite wird nach 60s neu geladen.');
			Fleh.Tools.reloadAfter(60);
			return;
		}
		
		next_job = this.selectJobForCurrentStrategy(jobs);
		
		if (!next_job) {
			this.fleh.log.log('Aktuell paßt kein Job. Seite wird nach 60s neu geladen.');
			Fleh.Tools.reloadAfter(60);
			return;
		}
		
		link = next_job.getElement('div.join a');
		if (!link) {
			// console.log('error');
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
		var max_xph, max_xph_index, max_cph, max_cph_index,
			max_cphb, max_cphb_index;
		max_cph_index = max_xph_index = max_cphb_index = 0;
		max_cph = max_xph = max_cphb = 0;
		/* loop though activities, calculate */
		elements.each(function(element, index){
			if (element.retrieve('xph') > max_xph) {
				max_xph_index = index;
				max_xph = element.retrieve('xph');
			}
			if (element.retrieve('cph') > max_cph) {
				max_cph_index = index;
				max_cph = element.retrieve('cph');
			}
			if (element.retrieve('cphb') > max_cphb) {
				max_cphb_index = index;
				max_cphb = element.retrieve('cphb');
			}
//			this.cph[index] = element.retrieve('cph');
//			this.cphb[index] = element.retrieve('cphb');
//			this.xph[index] = element.retrieve('xph');
	    }.bind(this));
		
		/* loop through activities, add info */
		elements.each(function(element, index){
			var html;
			html = '<span class="cph">' + element.retrieve('cph').toFixed(2) + '$/h</span>';
			html += '  -  ';
			html += '<span class="xph">' + element.retrieve('xph').toFixed(2) + 'XP/h</span>';
			html += '</br>';
			html += 'Risiko: <span class="cphb">' + element.retrieve('cphb').toFixed(2) + '$/h</span>';
			var cssclass = 'fleh-hint';
			if (index==max_cph_index) {
				cssclass += ' fleh-hint-max-cph';
			}
			if (index==max_xph_index) {
				cssclass += ' fleh-hint-max-xph';
			}
			if (index==max_cphb_index && max_cphb > max_cph) {
				cssclass += ' fleh-hint-max-cphb';
			}
			new Element('div', {
				'class': cssclass,
				'html': html
			}).inject(elements[index]);
	    }.bind(this));
	},

	enhanceActivity: function(element){
		var e_xp, e_cash, e_hours, e_bonus,
			hours_done, hours_rest, hours_total, bonus,
			factor, xph, cph, cphb, h, text;

		e_xp	= element.getElement('.facts .xp');
		e_cash	= element.getElement('.facts .cash');
		e_hours	= element.getElement('.facts .hours');
		e_bonus	= element.getElement('.facts .bonus');

		if (e_hours) {
			/* calculate values */
			h = e_hours.get('text').split('/');
			hours_done = 0;
			hours_total = Fleh.Tools.parseNumber(h[0]);
			if (h.length === 2) {
				hours_done = Fleh.Tools.parseNumber(h[0]);
				hours_total = Fleh.Tools.parseNumber(h[1]);
			}
			hours_rest = hours_total - hours_done;
			// absolute values
			xp = Fleh.Tools.parseNumber(e_xp.get('text'));
			bonus = Fleh.Tools.parseNumber(e_bonus.get('text'));
			cash = Fleh.Tools.parseNumber(e_cash.get('text'));
			// relative values
			xph = xp / hours_total;
			cph = cash / hours_total;
			cphb = (cash + bonus) / hours_total;
			/* store values for later */
			element.store('xph', xph);
			element.store('cph', cph);
			element.store('cphb', cphb);
			/* set title attribute */
			e_xp.set('title', xph.toFixed(2) + 'XP/h');
			e_cash.set('title', cph.toFixed(2) + '$/h');
			e_bonus.set('title', cphb.toFixed(2) + '$/h');

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
