Fleh.Tools = {
	
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
