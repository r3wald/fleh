
var Fleh = new Class({

	id: null,
	autopilot: null,
	fv: null,

	initialize: function(){
		this.fv = new Fleh.Values();
		this.checkforAutopilot();
		this.updateEnergyBar();
		this.checkUrl();
		this.createControls();
	},

	createControls: function(){
		var hook = $('header');
		var fleh = new Element('div', {
			'id': 'fleh'
		});
		var autopilot = new Element('div', {
			'id': 'fleh-autopilot',
			'html': 'Autopilot: <button>Anschalten</button>'
		});
		var log = new Element('div', {
			'id': 'fleh-log'
		});
		fleh.grab(autopilot).grab(log);
		hook.grab(fleh);
		this.log = log;
		this.logMessage('start');
	},

	logMessage: function(text){
		var time = new Date().format('%H:%M:%S');
		var msg = new Element('p', {
			'text': '[' + time + ']: ' + text
		});
		this.log.grab(msg);
	},

	checkforAutopilot: function(){
		this.autopilot = false;
		if (window.location.href.indexOf('autopilot=0')>-1) {
			console.log('autopilot disabled via url');
			Cookie.write('autopilot', '0');
			this.autopilot = true;
		} else if (window.location.href.indexOf('autopilot=1')>-1) {
			console.log('autopilot enabled via url');
			Cookie.write('autopilot', '1');
			this.autopilot = true;
		} else if (Cookie.read('autopilot')==1) {
			console.log('autopilot enabled via cookie');
			this.autopilot = true;
		} else {
			console.log('autopilot disabled');
		}
	},

	updateEnergyBar: function(){
		var e,full,time,text;
		if (this.fv.getMaxEnergy()>this.fv.getCurrentEnergy()) {
			e = $('energyBar');
			full = new Date();
			full.setTime(full.getTime() + 1000 * 60 * 10 * (this.fv.getMaxEnergy()-this.fv.getCurrentEnergy()));
			time = full.getHours() + ":" + (full.getMinutes()>9?"":0) + full.getMinutes();
			text = "Energie: " + this.fv.getCurrentEnergy() + " von " + this.fv.getMaxEnergy() + "\n";
			text += e.get('title') + "\n";
			text += "volle Energie um " + time;
			e.set('title', text);
		}
	},

	checkUrl: function(){
		var url, worker;
		url = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
		if (url==this.fv.getHomeUrl()) {
			console.log('@home');
		} else if (url==this.fv.getCareerUrl()) {
			worker = new Fleh.Worker.Career(this);
		} else if (url==this.fv.getSparetimeUrl()) {
			console.log('@sparetime');
		} else if (url==this.fv.getShoppingUrl()) {
			console.log('@shopping');
		} else if (url.match(/^http:\/\/fliplife.com\/companies\/(\d+)\/projects\/(\d+)$/)) {
			worker = new Fleh.Worker.Project(this);
		} else {
			console.log('no match :-( (' + url + ')');
		}
		if (worker) {
			if (worker.enhance) {
				worker.enhance();
			}
			if (this.autopilot && worker.autopilot) {
				worker.autopilot();
			}
		}
	}

});
