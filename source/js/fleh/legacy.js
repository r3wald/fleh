Fleh.Autopilot = new Class(
		{
			
			findCurrentActivityAndSwitch: function()
			{
				var current, link, href;
				current = $$('ul.activities li.orange');
				console.log('current jobs',current);
				if (!current.length) {
					// keine aktiven Jobs
					return;
				}
				current = current.first();
				console.log('current job',current);
				link = current.find('div.proceed a');
				if (!link.length) {
					// Fehler, keinen Link gefunden
					return;
				}
				link = $(link[0])[0];
				href = link.href;
				window.location.href = href;
			},
			
			handleActivity: function(id)
			{
				var container = $('activityActionContainer');
				
				if (container.find('#timeSlider.busy').length) {
					console.log('you are busy doing this project.');
					this.reloadAfter(35);
					
				} else if (container.find('#timeSlider').length) {
					// find max energy value, set and submit
					var meter = $(container.find('#timeSlider .meter')[0]);
					var max = meter.attr('data-max');
					var input = $('fe-amount');
					input.val(max);
					// input.val(1); // developing
					var form = $('submitForm');
					form.submit();
					
				} else if (container.find('.unable').length) {
					console.log('project done or no energy.');
					this.reloadAfter(35);
					
				} else if (container.find('.busy').length) {
					console.log('you are busy.');
				
				} else if ($('rightBar .actionButtons a.green span').text()=='Teilnehmen') {
					console.log('new job!');
					var buttons = $$('.projectHeader .actionButtons a.green');
					if (!buttons.length) {
						return;
					}
					link = buttons[0].href;
					if (!link.match(/\/apply/)) {
						return;
					}
					this.load(link);
					
				} else {
					console.log('???');
					this.reloadAfter(35);
					
				}			
			}
		}
);
