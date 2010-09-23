Fleh.Tools = {
		
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
	
	formatTime: function(minutes) {
		var result, hours;
		result = minutes.toString() + 'min';
		if (minutes > 60) {
			hours = Math.ceil(minutes / 60);
			minutes = minutes % 60;
			result = hours + ':' + (minutes < 10 ? '0' : '') + minutes + 'h';
		}
		return result;
	}
};
