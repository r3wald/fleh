Fleh.Worker.Project = new Class({

	Extends: Fleh.Worker,

	initialize: function(fleh){
		this.parent(fleh);
	},

	enhance: function() {
		this.parent();
	},

	autopilot: function(){
		var container = $('activityActionContainer');
		var rightbar = $('rightBar');

		if (container && container.getElement('#timeSlider.busy')) {
			this.fleh.log.log('Mit diesem Job beschäftigt. Seite wird nach 30 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(30);

		} else if (container && container.getElement('#timeSlider')) {
			// find max energy value, set and submit
			var meter = container.getElement('#timeSlider .meter');
			var input = $('fe-amount');
			var form = $('submitForm');
			var value = meter.get('data-max');
			// value = 1; // just for developing
			// meter.set('data-value',value); // doesn't work
			input.value = value;
			form.submit();

		} else if (container && container.getElement('.jobFinishedContainer')) {
			console.log('project done.');
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() > 0) {
			console.log('your job is done.');
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() == 0) {
			console.log('no energy.');
			Fleh.Tools.reloadAfter(30);

		} else if (container && container.getElement('.busy')) {
			this.fleh.log.log('Anderweitig beschäftigt. Seite wird nach 30 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(30);

		} else if (rightbar && rightbar.getElement('.actionButtons a.green span').get('text') == 'Teilnehmen') {
			console.log('start new job!');
			var buttons = $$('.projectHeader .actionButtons a.green');
			if (!buttons.length) {
				// error
				return;
			}
			link = buttons[0].href;
			if (!link.match(/\/apply/)) {
				return;
			}
			Fleh.Tools.load(link);

		} else {
			console.log('???');
			Fleh.Tools.reloadAfter(30);
		}
	}

});
