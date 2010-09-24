
Fleh.Worker.Project = new Class({

	Extends: Fleh.Worker,

	initialize: function(fleh){
		this.parent(fleh);
		console.log('Fleh.Worker.Project');
	},

	enhance: function(){
		this.parent();
	},

	autopilot: function(){
		var container = $('activityActionContainer');

		if (container.getElement('#timeSlider.busy')) {
			console.log('you are busy doing this project.');
			Fleh.Tools.reloadAfter(35);

		} else if (container.getElement('#timeSlider')) {
			// find max energy value, set and submit
			var meter = container.getElement('#timeSlider .meter');
			var input = $('fe-amount');
			var form = $('submitForm');
			var value = meter.get('data-max');
			// value = 1; // just for developing
			// meter.set('data-value',value); // doesn't work
			input.value = value;
			form.submit();

		} else if (container.getElement('.jobFinishedContainer')) {
			console.log('project done.');
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container.getElement('.unable')) {
			console.log('project done or no energy.');
			Fleh.Tools.reloadAfter(35);

		} else if (container.getElement('.busy')) {
			console.log('you are busy.');

//		} else if ($('rightBar .actionButtons a.green span').text()=='Teilnehmen') {
//			console.log('new job!');
//			var buttons = $$('.projectHeader .actionButtons a.green');
//			if (!buttons.length) {
//				return;
//			}
//			link = buttons[0].href;
//			if (!link.match(/\/apply/)) {
//				return;
//			}
//			this.load(link);

		} else {
			console.log('???');
			Fleh.Tools.reloadAfter(35);
		}
	}

});
