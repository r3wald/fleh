Fleh.Values = new Class({
	
	energy_max: null,
	energy_current: null,
	cash: null,
	credits: null,
	url_home: null,
	url_career: null,
	url_sparetime: null,
	url_shopping: null,
	
	initialize: function() {
		var element, elements;
		element = $('navigation');
		elements = element.getElements('.home a');
		if (elements.length) {
			this.url_home = elements[0].href;
		}
		elements = element.getElements('.career a');
		if (elements.length) {
			this.url_career = elements[0].href;
		}
		elements = element.getElements('.sparetime a');
		if (elements.length) {
			this.url_sparetime = elements[0].href;
		}
		elements = element.getElements('.shopping a');
		if (elements.length) {
			this.url_shopping = elements[0].href;
		}
		element = $('money');
		elements = element.getElements('.cash');
		if (elements.length) {
			this.cash = parseInt(elements[0].get('text').replace('.',''));
		}
		elements = element.getElements('.credits');
		if (elements.length) {
			this.credits = parseInt(elements[0].get('text').replace('.',''));
		}
		element = $('energyBar');
		this.energy_max = parseInt(element.get('data-max'));
		this.energy_current = parseInt(element.get('data-value'));
	},
	
	getHomeUrl: function() {
		return this.url_home;
	},
	
	getCareerUrl: function() {
		return this.url_career;
	},
	
	getSparetimeUrl: function() {
		return this.url_sparetime;
	},
	
	getShoppingUrl: function() {
		return this.url_shopping;
	},

	getCurrentEnergy: function() {
		return this.energy_current;
	},
	
	getMaxEnergy: function() {
		return this.energy_max;
	},
	
	getCash: function() {
		return this.cash;
	},
	
	getCredits: function() {
		return this.credits;
	}
	
});