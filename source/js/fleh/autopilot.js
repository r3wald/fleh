
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
		if (this.load('enabled') == 1) {
			this.enabled = true;
		}
	},

	isEnabled: function(){
		return this.enabled;
	},

	enable: function(){
		this.enabled = true;
		this.save('enabled', 1);
		this.updateControl();
		this.fleh.log.log('Autopilot aktiviert');
		this.saveCurrentStrategy();
		// this.fleh.startAutopilot(); // doesn't work -> reload instead
		Fleh.Tools.reloadAfter(2);
	},

	disable: function(){
		this.enabled = false;
		this.save('enabled', 0);
		this.updateControl();
		this.fleh.log.log('Autopilot deaktiviert');
		// this.fleh.stopAutopilot(); // cancel ongoing actions
	},

	createControl: function(){
		var button, select;
		button = new Element('button');
		button.addEvent('click', function(){
			if (this.enabled) {
				this.disable();
			} else {
				this.enable();
			}
		}.bind(this));
		this.control = new Element('div', {
			'id': 'fleh-autopilot'
		});
		select = this.buildStrategiesSelect();
		this.control.grab(select);
		this.control.grab(button);
		this.setButtonState();
	},

	setButtonState: function(){
		var button = this.control.getFirst('button');
		if (this.enabled) {
			button.set({
				'class': 'fleh-switch-off',
				'text': 'Autopilot Aus'
			});
		} else {
			button.set({
				'class': 'fleh-switch-on',
				'text': 'Autopilot Ein'
			});
		}
	},

	updateControl: function(){
		this.setButtonState();
	},

	buildStrategiesSelect: function() {
		var checked, select, strategy;
		strategy = this.load('strategy');
		select = new Element('select', {
			'id': 'fleh-strategy',
			'name': 'strategy'
		});
		Fleh.Strategy.instances.each(function(s) {
			checked = s.name == strategy;
			select.grab(s.getOption(checked));
		});
		select.addEvent('change',function() {
			this.saveCurrentStrategy();
		}.bind(this));
		return select;
	},

	saveCurrentStrategy: function() {
		var name, strategy;
		name = $('fleh-strategy').value;
		console.log(name);
		strategy = eval("new "+name+"()");
		this.fleh.log.log("Strategie: " + strategy.description);
		this.save('strategy', name);
	}

});
