var writeFile = require('fs').writeFile;
var j2x = require('./j2x.js');

module.exports = function (itemsInfo) {
	var xScale = 5;
	var yScale = 50;

	var colors = ['red', 'blue', 'green', 'yellow'];

	var svg = {
		name : 'svg',
		attrs : 
		{
			version : "1.1",
			baseProfile : "full",
			width : '100',
			height : '100',
			xmlns : "http://www.w3.org/2000/svg"
		},
		children : []
	};

	var rect = function (x, y, width, height, color){
		this.name = 'rect';
		this.attrs = {
			x : x,
			y : y,
			width : width,
			height : height,
			fill : color
		};
	}

	var text = function (x, y, text){
		this.name = 'text';
		this.attrs = {
			x : x,
			y : y
		};
		this.text = text;
	}


	var hLine = function (x, y){
		this.name = 'line';
		this.attrs = {
			x1 : 0,
			x2 : x,
			y1 : y,
			y2 : y,
			fill : 'transparent',
			stroke : 'orange',
			strokeWidth : 2
		}
	}

	var colorCode = 0;
	var svgWidth = 0;
	var svgHeight = 0;
	itemsInfo.forEach(function(item){
		// [[Left, Top], [Right, Bottom]]

		var x = item.geoInfo[0][0] * xScale;
		var y = item.geoInfo[0][1] * yScale;
		var width = (item.geoInfo[1][0] - item.geoInfo[0][0]) * xScale;
		var height = (item.geoInfo[1][1] - item.geoInfo[0][1] + 1) * yScale;

		svg.children.push(new rect(x, y, width, height, colors[colorCode]));
		svg.children.push(new text(x + width / 4, y + height/2, item.name));

		colorCode = (colorCode + 1) % 4;
		svgHeight = Math.max(y + height, svgHeight);
		svgWidth = Math.max(x + width, svgWidth);
		linesNum ++;
	});

	var linesNum = 2014 - 2002 + 1;
	while(linesNum--)
		svg.children.push(new hLine(svgWidth, yScale * (linesNum + 1)));

	var textNum = 2014 - 2002 + 1;
	while(textNum--)
		svg.children.push(new text(svgWidth, yScale * (textNum + 0.5), 2002 + textNum));

	svg.children.push(new text(100, 100, "Hello world! This is Skill Graph -- Timeline"));

	svg.attrs.width = svgWidth + 100;
	svg.attrs.height = svgHeight + 100;

	writeFile('timeline.svg', j2x(svg));
}