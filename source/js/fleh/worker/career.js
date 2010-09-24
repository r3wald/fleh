
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
		var self=this;
		this.jobs_available.each(
			function(element){
				self.enhanceActivity(element);
			}
		);
		this.jobs_open.each(
			function(element){
				self.enhanceActivity(element);
			}
		);
		this.markBestActivity(this.jobs_available);
	},

	/**
	 * @todo: no open jobs -> choose available job and start working
	 */
	autopilot: function(){
		if (this.jobs_open.length) {
			this.resumeJob();
		} else if (this.jobs_available.length) {
			this.startJob();
		} else {
			this.fleh.logMessage('keine offenen Jobs. Seite wird nach 30s neu geladen.');
			Fleh.Tools.reloadAfter(30);
		}
	},

	startJob: function() {
		console.log(this.jobs_available);
		var jobs = [];
		this.jobs_available.each(function(element,index) {

		});
	},

	resumeJob: function() {
		var next_job = this.jobs_open[0];
		//console.log('first:',next_job);
		this.jobs_open.each(function (element) {
			if (element.hasChild('.working')) {
				//console.log('working:',element);
				next_job = element;
				break;
			}
		});
		//console.log('next:',next_job);
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
		$each(elements,function(element, index){
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
