var drawChart = function(chartDiv, dimensions, measurements) {
	
	var r = Raphael(chartDiv, 1280, 800);

	var margins = { horiz: 50, vert: 50 };
	var plotarea = { width: 1280, height: 800 };

	r.image('background.png', 0, 0, plotarea.width, plotarea.height);

	var assignPosition = function(measurement) {
		var scale0To1 = function(dimension) {
			return (measurement[dimension.name] - dimension.min) / (dimension.max - dimension.min);
		};
		var position = {
			x: margins.horiz + scale0To1(dimensions.dimension1) * (plotarea.width - 2*margins.horiz),
			y: r.height - (margins.vert + scale0To1(dimensions.dimension2) * (plotarea.height - 2*margins.vert))
		};
		var hasSamePosition = function(measurement) {
			return measurement.position && measurement.position.x === position.x && measurement.position.y === position.y;
		};
		var any = function(array, fun) {
			for (var i = 0; i < array.length; i++) {
				if (fun(array[i])) return true;
			}
			return false;
		}

		while (any(measurements, hasSamePosition)) {
			position.y = position.y + 20;
		}
		measurement.position = position;
	}

	for (i = 0; i < measurements.length; i++) {
		assignPosition(measurements[i]);
	}

    var spots = r.set();
	for (i = 0; i < measurements.length; i++) {
		var measurement = measurements[i];
		spots.push(r.circle(measurement.position.x, measurement.position.y, 10));
	}
	spots.attr({fill: "#00f", stroke: "#888", "stroke-width": 3 });

	var labels = r.set();
	for (i = 0; i < measurements.length; i++) {
		var measurement = measurements[i];
		labels.push(r.text(measurement.position.x + 20, measurement.position.y, measurement.name));
	}
    labels.attr({font: "12px Fontin-Sans, Arial", fill: "#000", "text-anchor": "start"});
    
}
