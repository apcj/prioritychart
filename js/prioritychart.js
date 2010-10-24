var edge = 100;
var steps = 5;

var calculatePositions = function(dimensions, measurement) {

	var scale0To1 = function(dimension) {
		return (1 / 2 + measurement[dimension.name] - dimension.min) / (dimension.max - dimension.min + 1);
	};
	var spot = {
		x: scale0To1(dimensions.dimension1) * edge * steps,
		y: (1 - scale0To1(dimensions.dimension2)) * edge * steps
	};
	return {
		spot: spot,
		label: {
			x: spot.x,
			y: spot.y + 20
		}
	};
}

var drawSpot = function(measurement) {
	var positions = calculatePositions(dimensions, measurement);
	
	var spot = r.circle(positions.spot.x, positions.spot.y, 10);
	var label = r.text(positions.label.x, positions.label.y, measurement.name);
	spot.attr({fill: "#00f", stroke: "#888", "stroke-width": 3 });
	label.attr({font: "12px Fontin-Sans, Arial", fill: "#000", "text-anchor": "middle"});
	measurement.spot = spot;
	measurement.label = label;
}

var drawChart = function(chartDiv, dimensions, measurements) {
	
	r = Raphael(chartDiv, edge * steps, edge * steps);

	for (x = 0; x < steps; x++) {
		for (y = 0; y < steps; y++) {
			var square = r.rect(x * edge, y * edge, edge, edge);
			var hue = ((steps - 1 - Math.min(x, steps - 1 - y)) / (steps - 1)) / 3;
			square.attr({ fill: 'hsb(' + hue + ', 1, 1)', stroke: 'none'});
		}
	}

	for (i = 0; i < measurements.length; i++) {
		drawSpot(measurements[i]);
	}
}

// var hasSamePosition = function(measurement) {
// 	return measurement.position && measurement.position.x === position.x && measurement.position.y === position.y;
// };
// var any = function(array, fun) {
// 	for (var i = 0; i < array.length; i++) {
// 		if (fun(array[i])) return true;
// 	}
// 	return false;
// }
// 
// while (any(measurements, hasSamePosition)) {
// 	position.y = position.y + 20;
// }

