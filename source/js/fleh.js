
var Fleh = new Class({

	Implements: Events,

	/**
	 * @var Fleh.Autopilot
	 */
	fa: null,

	/**
	 * @var Fleh.Values
	 */
	fv: null,

	/**
	 * @var Fleh.Log
	 */
	log: null,

	/**
	 * @var Fleh.Worker
	 */
	worker: null,

	initialize: function(){
		this.fv = new Fleh.Values(this);
		this.fa = new Fleh.Autopilot(this);
		this.log = new Fleh.Log();
		this.createControls();
		this.setWorkerForCurrentUrl();
		this.startWorker();
		this.startAutopilot();
	},

	createControls: function(){
		var hook, fleh;
		hook = $('header');
		fleh = new Element('div', {
			'id': 'fleh'
		});
		fleh.grab(this.fa.control);
		fleh.grab(this.log.output);
		hook.grab(fleh);
		fleh.makeDraggable({
			handle: this.fa.control,
			modifiers: {
				'x': 'margin-left',
				'y': 'top'
			}
		});
	},

	setWorkerForCurrentUrl: function(){
		var url_current, url_project;
		url_current = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
		url_project = '^' + this.fv.getCareerUrl() + '/projects/[0-9]+$';
		if (url_current==this.fv.getHomeUrl()) {
			this.worker = new Fleh.Worker.Home(this);

		} else if (url_current==this.fv.getCareerUrl()) {
			this.worker = new Fleh.Worker.Career(this);

		} else if (url_current==this.fv.getSparetimeUrl()) {
			this.worker = new Fleh.Worker.Sparetime(this);

		} else if (url_current==this.fv.getShoppingUrl()) {
			this.worker = new Fleh.Worker.Shopping(this);

		} else if (url_current.match(url_project)) {
			this.worker = new Fleh.Worker.Project(this);

		} else {
			console.log('no match :-( (' + url_current + ')');
		}
	},

	startWorker: function(){
		if (!this.worker) {
			console.log('no worker set');
			return;
		}
		if (!this.worker.enhance) {
			console.log('no enhancements defined for worker');
			return;
		}
		this.worker.enhance();
	},

	startAutopilot: function(){
		if (!this.worker) {
			console.log('no worker set');
			return;
		}
		if (!this.worker.autopilot) {
			console.log('no autopilot defined for worker');
			return;
		}
		if (!this.fa.isEnabled()) {
			console.log('autopilot not enabled');
			return;
		}
		this.worker.autopilot();
	}

});
