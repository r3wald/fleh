Fleh.Activities = new Class(
		{
			max: null,
			current: null,
			enabled: false,
			initialize: function()
			{
				if (window.location.href.indexOf('autopilot=0')>-1) {
					console.log('autopilot disabled via url');
					jQuery.cookie('autopilot', '0');
				} else if (window.location.href.indexOf('autopilot=1')>-1) {
					console.log('autopilot enabled via url');
					jQuery.cookie('autopilot', '1');
					this.enabled = true;
				} else if (jQuery.cookie('autopilot')==1) {
					console.log('autopilot enabled via cookie');
					this.enabled = true;
				}
				if (this.enabled) {
					// alert('autopilot enabled!');
				}
			}
		}
);
