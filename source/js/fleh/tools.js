
Fleh.Tools = {

		clickButton: function(button){
			var event = document.createEvent( "MouseEvents" );
			event.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, button);
			button.dispatchEvent( event );		
		},

		load: function(url){
			window.location.href=url;
		},

		reload: function(){
			this.load(window.location.href);
		},

		reloadAfter: function(seconds){
			setTimeout(
					function(){
						this.reload();
					}.bind(this),
					1000 * seconds
			);
		},

		formatTime: function(minutes){
			var result, hours;
			result = minutes.toString() + 'min';
			if (minutes > 60) {
				hours = Math.ceil(minutes / 60);
				minutes = minutes % 60;
				result = hours + ':' + (minutes < 10 ? '0' : '') + minutes + 'h';
			}
			return result;
		},

		parseNumber: function(value) {
			return parseInt(value.replace('.','').replace('%',''));
		}

};
