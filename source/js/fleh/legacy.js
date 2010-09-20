function formatTime(minutes) {
	var result, hours;
	result = minutes.toString() + 'min';
	if (minutes > 60) {
		hours = Math.ceil(minutes / 60);
		minutes = minutes % 60;
		result = hours + ':' + (minutes < 10 ? '0' : '') + minutes + 'h';
	}
	return result;
}

function enhanceActivities(activities) {

	activities.each(function (index, element) {

		var e_activity, e_xp, e_cash, e_bonus, e_hours, hours_done, hours_rest, hours_total, bonus, factor, xph, cph, xphb, cphb, h, text;

		e_activity = jQuery(element);
		e_xp	= e_activity.find('.facts .xp').first();
		e_cash	= e_activity.find('.facts .cash').first();
		e_hours	= e_activity.find('.facts .hours').first();
		e_bonus	= e_activity.find('.facts .bonus').first();

		if (e_hours) {
			/* Werte ausrechnen */
			h = e_hours.text().split('/');
			hours_done = hours_total = h[0];
			if (h.length === 2) {
				hours_total = h[1];
			}
			hours_rest = hours_total - hours_done;
			bonus = parseFloat(e_bonus.text().replace('%',''));
			factor = 1.0 + bonus / 100;
			xph = e_xp.text()/hours_total;
			cph = e_cash.text()/hours_total;
			xphb = factor * e_xp.text()/hours_total;
			cphb = factor * e_cash.text()/hours_total;

			/* title-Attribute setzen */
			e_xp.attr('title',xph.toFixed(2) + 'XP/h');
			e_cash.attr('title',cph.toFixed(2) + '$/h');
			e_bonus.attr('title',xphb.toFixed(2) + 'XP/h - ' + cphb.toFixed(2) + '$/h');

			text = 'Restzeit: ' + formatTime(12.0 * hours_rest - 2.0 * fe.getCurrent());
			text += ' = ' + formatTime(2.0 * hours_rest) + ' Arbeit';
			text += ' + ' + formatTime(10.0 * hours_rest) + ' Erholung';
			if (fe.getCurrent()>0) {
				text += ' - ' + formatTime(2.0*fe.getCurrent()) + ' Restenergie';
			}
			e_hours.attr('title',text);
		}
	});	
}

function enhanceAllActivities() {

	var lists, list_available, list_current;

	/* alle Listen von Aktivitäten finden */
	lists = jQuery('ul.activities');

	current_activities = lists.first().find('li.orange');
	available_activities = lists.last().find('li[class!="locked"]');

	enhanceActivities(current_activities,'current');
	enhanceActivities(available_activities,'available');

}

function markBestActivities() {

	var
	lists, activities, e_activity,
	max_cph_index=0, max_xph_index=0, max_cphb_index=0, max_xphb_index=0,
	max_cph=0, max_xph=0, max_cphb=0, max_xphb=0,
	xp, cash, hours, bonus,
	b, xph, cph, xphb, cphb;

	/* alle Listen von Aktivitäten finden */
	lists = jQuery('ul.activities');

	/* nimm die letzte Liste -> verfügbare Jobs */
	activities = lists.last().children('li');

	/* alle Aktivitäten durchgehen */
	activities.each(function (index,element) {

		e_activity = jQuery(element);

		if (e_activity.hasClass('locked')) {
			return;
		}

		xp =	e_activity.find('.facts .xp').first();
		cash =	e_activity.find('.facts .cash').first();
		hours = e_activity.find('.facts .hours').first();
		bonus = e_activity.find('.facts .bonus').first();

		if (hours) {
			/* Werte ausrechnen */
			b = 1.0 + parseFloat(bonus.text().replace('%','')) / 100;
			xph = xp.text()/hours.text();
			cph = cash.text()/hours.text();
			xphb = b * xp.text()/hours.text();
			cphb = b * cash.text()/hours.text();

			/* Maximum finden */
			if (xph > max_xph) {
				max_xph_index = index;
				max_xph = xph;
			}
			if (cph > max_cph) {
				max_cph_index = index;
				max_cph = cph;
			}
			if (xphb > max_xphb) {
				max_xphb_index = index;
				max_xphb = xphb;
			}
			if (cphb > max_cphb) {
				max_cphb_index = index;
				max_cphb = cphb;
			}
		}

	});

	/* Maximum hervorheben */
	var text = '<div class="fleh-hint-max-cph">' + max_cph.toFixed(2) + '$/h</div>';
	jQuery(activities[max_cph_index]).append(text);

	text = '<div class="fleh-hint-max-xph">' + max_xph.toFixed(2) + 'XP/h</div>';
	jQuery(activities[max_xph_index]).append(text);

	if (max_cphb > max_cph) {
		text = '<div class="fleh-hint-max-cphb">Risiko! ' + max_cphb.toFixed(2) + '$/h</div>';
		jQuery(activities[max_cphb_index]).append(text);
	}
	if (max_xphb > max_xph) {
		text = '<div class="fleh-hint-max-xphb">Risiko! ' + max_xphb.toFixed(2) + 'XP/h</div>';
		jQuery(activities[max_xphb_index]).append(text);
	}
}
