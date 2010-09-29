
/**
 * Fleh.LocalStorage uses the localStorage attribute from HTML5 web storage.
 *
 * @see http://dev.w3.org/html5/webstorage/
 */
Fleh.LocalStorage = new Class({

	/**
	 * @var storageName
	 */
	storageName: null,

	/**
	 * Constructor defined here to enable standalone use of this class.
	 *
	 * @param string storageName
	 */
	initialize: function(storageName){
		this.storageName = storageName;
	},

	/**
	 * Load any data which was saved before in localStorage
	 *
	 * @return value saved before, otherwise null
	 */
	load: function(name){
		var saved;
		try {
			saved = JSON.decode(window.localStorage.getItem(this.storageName + '#' + name));
		} catch(e) {
			console.log(e);
		}
		return saved;
	},

	/**
	 * Save data
	 *
	 * @param mixed input
	 */
	save: function(name,input){
		this.remove();
		window.localStorage.setItem(this.storageName + '#' + name, JSON.encode(input));
	},

	/**
	 * Remove any data from storageName
	 */
	remove: function(name){
		window.localStorage.removeItem(this.storageName + '#' + name);
	}

});
