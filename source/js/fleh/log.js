
/**
 * Log class for Fleh.
 */
Fleh.Log = new Class({

	Implements: Fleh.LocalStorage,

	/**
	 * @var Storage name
	 */
	storageName: 'fleh-log',

	/**
	 * @var Output element id
	 */
	outputId: 'fleh-log',

	/**
	 * @var Div
	 */
	output: null,

	/**
	 * @var Age of log messages in minutes before they are deleted
	 */
	maxLogAge: 10,

	/**
	 * @var Logged messages
	 */
	messages: [],

	initialize: function(){
		this.createControl();
		this.messages = this.load('messages') || [];
		this.updateMessages();
		this.save('messages',this.messages);
	},

	/**
	 * Create the div element where the log message will be inserted into.
	 */
	createControl: function(){
		this.output = new Element('div', {
			'id': this.outputId
		});
	},

	/**
	 * Log a message and trigger save and push.
	 *
	 * @param text
	 */
	log: function(text){
		var timestamp = new Date().getTime();
		this.messages.push(new Hash({
			'time': timestamp,
			'text': text
		}));
		this.save('messages',this.messages);
		this.pushMessage(timestamp, text);
	},

	/**
	 * Push a log message to the output div element.
	 *
	 * @param timestamp
	 * @param text
	 */
	pushMessage: function(timestamp, text){
		var time = Date.parse(timestamp).format('%H:%M:%S');
		var msg = new Element('p', {
			'text': '[' + time + ']: ' + text
		});
		if (this.output) {
			this.output.grab(msg);
			var size = this.output.getScrollSize();
			this.output.scrollTo(size.x, size.y);
		}
	},

	/**
	 * Updates the output and removes old messages from stack
	 */
	updateMessages: function(){
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
	}

});
