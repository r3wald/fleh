Fleh.Worker.Project = new Class({

	Extends: Fleh.Worker,

	initialize: function(fleh){
		this.parent(fleh);
	},

	autopilot: function(){
		var container = $('activityActionContainer');
		var rightbar = $('rightBar');

		if (container && container.getElement('#timeSlider.busy')) {
			this.fleh.log.log('Mit diesem Job beschäftigt. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('#timeSlider') && this.fleh.fv.getCurrentEnergy()>1) {

			// find max energy value, set and submit
			var meter = container.getElement('#timeSlider .meter');
			var input = $('fe-amount');
			var form = $('submitForm');
			var value = parseInt(meter.get('data-max')) - 1;
			if (value==0) {
				value = 1;
			}
			// value = 1; // just for developing
			// meter.set('data-value',value); // doesn't work
			input.value = value;
			form.submit();

		} else if (container && container.getElement('#timeSlider')) {
			this.fleh.log.log('1 Energie Partyreserve. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('.jobFinishedContainer')) {
			console.log('project done.');
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() > 0) {
			console.log('your job is done.');
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() == 0) {
			this.fleh.log.log('Keine Energie. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('.busy')) {
			this.fleh.log.log('Anderweitig beschäftigt. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

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
		}
		Fleh.Tools.reloadAfter(60);
	}

});
