Fleh.Energy = Class.create(
		{
			id: '#energyBar',
			max: null,
			current: null,
			element: null,
			init: function()
			{
				this.element = jQuery(this.id);
				this.max = parseInt(this.element.attr('data-max'));
				this.current = parseInt(this.element.attr('data-value'));
				this.enhance();
			},
			appendToTitle: function(text)	
			{
//				var e = this.element.find('.energy');
				var e = this.element;
				var title = e.attr('title');
				e.attr('title',title + text);
			},
			getMax: function()
			{
				return this.max;
			},
			getCurrent: function()
			{
				return this.current;
			},
			enhance: function()
			{
				var text, time, full;
				if (this.max>this.current)
				{
					full = new Date();
					full.setTime(full.getTime() + 1000 * 60 * 10 * (this.max-this.current));
					time = full.getHours() + ":" + (full.getMinutes()>9?"":0) + full.getMinutes(); 
					text = "volle Energie um " + time;
					this.appendToTitle(text);
				}
			}
		}
);
