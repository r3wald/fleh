
Fleh.Energy = new Class({

	Implements: [Events],

	id: 'energyBar',
	max: null,
	current: null,
	element: null,

	initialize: function(){
		this.element = $(this.id);
		this.max = parseInt(this.element.get('data-max'));
		this.current = parseInt(this.element.get('data-value'));
		this.enhance();
	},

	appendToTitle: function(text){
		var e = this.element;
		var title = e.get('title');
		title = (title) ? title + text : text;
		e.set('title', title);
	},

	getMax: function(){
		return this.max;
	},

	getCurrent: function(){
		return this.current;
	},

	enhance: function(){
		var text, time, full;
		if (this.max > this.current) {
			full = new Date();
			full.setTime(full.getTime() + 1000 * 60 * 10 * (this.max - this.current));
			time = full.getHours() + ':' + (full.getMinutes() > 9 ? '' : 0) + full.getMinutes();
			text = 'Energie: ' + this.current + ' von ' + this.max + "\n";
			text += 'volle Energie um ' + time;
			this.appendToTitle(text);
		}
	}

});
