
Fleh.Values = new Class({

	/**
	 * @var hash
	 */
	values: {},

	initialize: function(){

		var container, element, match;

		container = $('navigation');
		element = container.getElement('.home a');
		if (element) {
			this.values.url_home = element.href;
			match = this.values.url_home.match(/\/(\d+)$/);
			this.values.id = match[1];
		}
		element = container.getElement('.career a');
		if (element) {
			this.values.url_career = element.href;
		}
		element = container.getElement('.sparetime a');
		if (element) {
			this.values.url_sparetime = element.href;
		}
		element = container.getElement('.shopping a');
		if (element) {
			this.values.url_shopping = element.href;
		}

		container = $('money');
		element = container.getElement('.cash');
		if (element) {
			this.values.cash = Fleh.Tools.parseNumber(element.get('text'));
		}
		element = container.getElement('.credits');
		if (element) {
			this.values.credits = Fleh.Tools.parseNumber(element.get('text'));
		}

		element = $('energyBar');
		this.values.energy_max = Fleh.Tools.parseNumber(element.get('data-max'));
		this.values.energy_current = Fleh.Tools.parseNumber(element.get('data-value'));

		// console.log(this.values);
	},

	/**
	 * current url
	 *
	 * @return string
	 */
	getCurrentUrl: function() {
		return window.location.protocol + '//'
		+ window.location.hostname + window.location.pathname;
	},
	
	/**
	 * link to my home
	 *
	 * @return string
	 */
	getHomeUrl: function(){
		return this.values.url_home;
	},

	/**
	 * link to my career page (list of activities)
	 *
	 * @return string
	 */
	getCareerUrl: function(){
		return this.values.url_career;
	},

	/**
	 * link to sparetime page (parties, ...)
	 *
	 * @return string
	 */
	getSparetimeUrl: function(){
		return this.values.url_sparetime;
	},

	/**
	 * link to shopping page
	 *
	 * @return string
	 */
	getShoppingUrl: function(){
		return this.values.url_shopping;
	},

	/**
	 * maximum number of energy units
	 *
	 * @return integer
	 */
	getCurrentEnergy: function(){
		return this.values.energy_current;
	},

	/**
	 * current number of energy units
	 *
	 * @return integer
	 */
	getMaxEnergy: function(){
		return this.values.energy_max;
	},

	/**
	 * my money
	 *
	 * @return integer
	 */
	getCash: function(){
		return this.values.cash;
	},

	/**
	 * my credits
	 *
	 * @return integer
	 */
	getCredits: function(){
		return this.values.credits;
	},

	/**
	 * my id
	 *
	 * @return integer
	 */
	getMyId: function(){
		return this.values.id;
	}

});
