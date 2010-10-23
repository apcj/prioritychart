var drawChart = function(chartDiv, nfrs) {
	
	var r = Raphael(chartDiv, 1280, 800);

	var margins = { horiz: 50, vert: 50 };
	var plotarea = { width: 1280, height: 800 };

	r.image('background.png', 0, 0, plotarea.width, plotarea.height);

	var assignPosition = function(nfr) {
		var position = {
			x: margins.horiz + ((5 - nfr.maturity) / 4) * (plotarea.width - 2*margins.horiz),
			y: r.height - (margins.vert + (nfr.importance * (plotarea.height - 2*margins.vert)))
		};
		var hasSamePosition = function(nfr) {
			return nfr.position && nfr.position.x === position.x && nfr.position.y === position.y;
		};
		var any = function(array, fun) {
			for (var i = 0; i < array.length; i++) {
				if (fun(array[i])) return true;
			}
			return false;
		}

		while (any(nfrs, hasSamePosition)) {
			position.y = position.y + 20;
		}
		nfr.position = position;
	}

	for (i = 0; i < nfrs.length; i++) {
		assignPosition(nfrs[i]);
	}

    var spots = r.set();
	for (i = 0; i < nfrs.length; i++) {
		var nfr = nfrs[i];
		spots.push(r.circle(nfr.position.x, nfr.position.y, 10));
	}
	spots.attr({fill: "#00f", stroke: "#888", "stroke-width": 3 });

	var labels = r.set();
	for (i = 0; i < nfrs.length; i++) {
		var nfr = nfrs[i];
		labels.push(r.text(nfr.position.x + 20, nfr.position.y, nfr.name));
	}
    labels.attr({font: "12px Fontin-Sans, Arial", fill: "#000", "text-anchor": "start"});
    
}
