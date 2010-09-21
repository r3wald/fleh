Fleh.Autopilot = Class.create(
		{
			max: null,
			
			homeUrl: null,
			
			enabled: false,
			
			init: function()
			{
				if (window.location.href.indexOf('autopilot=0')>-1) {
					console.log('autopilot disabled via url');
					jQuery.cookie('autopilot', '0');
					this.enabled = true;
				} else if (window.location.href.indexOf('autopilot=1')>-1) {
					console.log('autopilot enabled via url');
					jQuery.cookie('autopilot', '1');
					this.enabled = true;
				} else if (jQuery.cookie('autopilot')==1) {
					console.log('autopilot enabled via cookie');
					this.enabled = true;
				}
				if (!this.enabled) {
					return;
				}
				var match;
				if (match = window.location.href.match(/^http:\/\/fliplife.com\/companies\/(\d)$/)) {
					// übersicht activities
					// aktiven Job finden und dahin wechseln
					this.findCurrentActivityAndSwitch();
					
				} else if (match = window.location.href.match(/^http:\/\/fliplife.com\/companies\/(\d)\/projects\/(\d+)$/)) {
					// activity
					this.handleActivity();
				}
			},
			
			load: function(url)
			{
				window.location.href=url;
			},
			
			reload: function()
			{
				this.load(window.location.href);
			},
			
			reloadAfter: function(seconds)
			{
				var self = this;
				setTimeout(
					function() {
						self.reload();
					},
					1000 * seconds
				);
			},
			
			findCurrentActivityAndSwitch: function()
			{
				var current, link, href;
				current = $('ul.activities li.orange');
				if (!current.length) {
					// keine aktiven Jobs
					return;
				}
				current = $(current[0]);
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
				var container = jQuery('#activityActionContainer');
				
				if (container.find('#timeSlider.busy').length) {
					console.log('you are busy doing this project.');
					this.reloadAfter(35);
					
				} else if (container.find('#timeSlider').length) {
					// find max energy value, set and submit
					var meter = $(container.find('#timeSlider .meter')[0]);
					var max = meter.attr('data-max');
					var input = jQuery('#fe-amount');
					input.val(max);
					// input.val(1); // developing
					var form = jQuery('#submitForm');
					form.submit();
					
				} else if (container.find('.unable').length) {
					console.log('project done or no energy.');
					this.reloadAfter(35);
					
				} else if (container.find('.busy').length) {
					console.log('you are busy.');
				
				} else if (jQuery('#rightBar .actionButtons a.green span').text()=='Teilnehmen') {
					console.log('new job!');
					var buttons = jQuery('.projectHeader .actionButtons a.green');
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
