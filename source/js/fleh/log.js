
Fleh.Log = new Class({

	/**
	 * @var Storage name
	 */
	storageName: 'fleh-log',

	/**
	 * @var Output element id
	 */
	outputId: 'fleh-log',

	/**
	 * @var Age of log messages in minutes before they are deleted
	 */
	maxLogAge: 10,

	/**
	 * @var Logged messages
	 */
	messages: [],

	/**
	 * @var Div
	 */
	output: null,

	initialize: function(){
		this.createControl();
		this.messages = this.load();
		if (this.messages.length > 0) {
			this.messages.each(function(item){
				var time = Date.parse(item.time);
				if (time.diff(new Date(), 'minute') > this.maxLogAge) {
					this.messages.erase(item);
				} else {
					this.pushMessage(item.time, item.text);
				}
			}, this);
		}
		this.save();
	},

	createControl: function(){
		this.output = new Element('div', {
			'id': this.outputId
		});
	},

	load: function(){
		var savedLogs;
		try {
			savedLogs = JSON.decode(window.localStorage.getItem(this.storageName));
		} catch(e) {
			console.log(e);
			savedLogs = [];
		}
		return savedLogs;
	},

	save: function(){
		this.remove();
		window.localStorage.setItem(this.storageName, JSON.encode(this.messages));
	},

	remove: function(){
		window.localStorage.removeItem(this.storageName);
	},

	log: function(text){
		var timestamp = new Date().getTime();
		this.messages.push(new Hash({
			'time': timestamp,
			'text': text
		}));
		this.save();
		this.pushMessage(timestamp, text);
	},

	pushMessage: function(timestamp, entry){
		var time = Date.parse(timestamp).format('%H:%M:%S');
		var msg = new Element('p', {
			'text': '[' + time + ']: ' + entry
		});
		if (this.output) {
			this.output.grab(msg);
			var size = this.output.getScrollSize();
			this.output.scrollTo(size.x, size.y);
		}
	}

});
