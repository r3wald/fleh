
Fleh.LocalStorage = new Class({

	/**
	 * @var Storage name
	 */
	storageName: null,

	initialize: function(storageName){
		this.storageName = storageName;
	},

	load: function(){
		var saved;
		try {
			saved = JSON.decode(window.localStorage.getItem(this.storageName));
		} catch(e) {
			console.log(e);
			saved = [];
		}
		return saved;
	},

	save: function(input){
		this.remove();
		window.localStorage.setItem(this.storageName, input);
	},

	remove: function(){
		window.localStorage.removeItem(this.storageName);
	}

});
