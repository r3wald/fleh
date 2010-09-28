
Fleh.Autopilot = new Class({

	Implements: Fleh.LocalStorage,

	/**
	 * @var storageName
	 */
	storageName: 'fleh-autopilot',

	/**
	 * @var boolean
	 */
	enabled: false,

	/**
	 * @var Fleh
	 */
	fleh: null,

	/**
	 * @var Div
	 */
	control: null,

	initialize: function(fleh){
		this.fleh = fleh;
		this.setInitialState();
		this.createControl();
	},

	setInitialState: function(){
		if (window.location.search.indexOf('autopilot=0') > -1) {
			this.save(0);
			console.log('disabled via url');
		} else if (window.location.search.indexOf('autopilot=1') > -1) {
			this.enabled = true;
			this.save(1);
			console.log('enabled via url');
		} else if (this.load() == 1) {
			console.log('enabled via cookie');
			this.enabled = true;
		} else {
			console.log('disabled');
			// disabled
		}
	},

	isEnabled: function(){
		return this.enabled;
	},

	enable: function(){
		this.enabled = true;
		this.save(1);
		this.updateControl();
		this.fleh.log.log('Autopilot aktiviert');
		// this.fleh.startAutopilot(); // doesn't work -> reload instead
		Fleh.Tools.reload();
	},

	disable: function(){
		this.enabled = false;
		this.save(0);
		this.updateControl();
		this.fleh.log.log('Autopilot deaktiviert');
		// this.fleh.stopAutopilot(); // cancel ongoing actions
	},

	createControl: function(){
		var button = new Element('button');
		button.addEvent('click', function(){
			if (this.enabled) {
				this.disable();
			} else {
				this.enable();
			}
		}.bind(this));
		this.control = new Element('div', {
			'id': 'fleh-autopilot',
			'text': 'Autopilot: '
		});
		this.control.grab(button);
		this.setButtonState();
	},

	setButtonState: function(){
		var button = this.control.getFirst('button');
		if (this.enabled) {
			button.set({
				'class': 'fleh-switch-off',
				'text': 'Ausschalten'
			});
		} else {
			button.set({
				'class': 'fleh-switch-on',
				'text': 'Einschalten'
			});
		}
	},

	updateControl: function(){
		this.setButtonState();
	}

});
