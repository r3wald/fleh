Fleh.Worker.Project = new Class({

	Extends: Fleh.Worker,

	initialize: function(fleh){
		this.parent(fleh);
	},

	autopilot: function(){
		var container = $('activityActionContainer');
		var rightbar = $('rightBar');

		if (container && container.getElement('#timeSlider.busy')) {
			// busy
			this.fleh.log.log('Mit diesem Job beschäftigt. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('#timeSlider') && this.fleh.fv.getCurrentEnergy()>1) {

			// find max energy value, set and submit
			var meter = container.getElement('#timeSlider .meter');
			var input = $('fe-amount');
			var form = $('submitForm');
			var value = parseInt(meter.get('data-max'));
			if (value==0) {
				value = 1;
			}
			// value = 1; // just for developing
			// meter.set('data-value',value); // doesn't work
			input.value = value;
			form.submit();

//		} else if (container && container.getElement('#timeSlider')) {
//			this.fleh.log.log('1 Energie Partyreserve. Seite wird nach 60 Sekunden neu geladen.');
//			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('.jobFinishedContainer')) {
			// project done.
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() > 0) {
			// your job is done. project not finished yet.
			Fleh.Tools.load(this.fleh.fv.getCareerUrl());

		} else if (container && container.getElement('.unable') && this.fleh.fv.getCurrentEnergy() == 0) {
			// no energy
			this.fleh.log.log('Keine Energie. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if (container && container.getElement('.busy')) {
			// busy
			this.fleh.log.log('Anderweitig beschäftigt. Seite wird nach 60 Sekunden neu geladen.');
			Fleh.Tools.reloadAfter(60);

		} else if ($('btnJoinActivity') && this.fleh.fv.getCurrentEnergy() > 0) {
			// start job
			var button = $('btnJoinActivity');
			Fleh.Tools.clickButton(button);
			
		} else {
			// don't know what to do
			// console.log('???');
		}
		Fleh.Tools.reloadAfter(60);
	}

});
