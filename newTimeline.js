var items = require('./skilltree.json').items;
var render = require('./renderTL.js');

var currentYear = 2014;
var initialYear = Math.min.apply(null, items.map(function (item){ return item.timeStamp[0]}));

var geoTable = []; 
var segmentsDisTable = [];

items.forEach(function (item){

	if(item.timeStamp[1] == -1)
		item.timeStamp[1] = currentYear; // "-1" is "not finished yet"

	var width = Math.ceil(item.exPoints / (item.timeStamp[1] - item.timeStamp[0] + 1));
	var startYear = item.timeStamp[0] - initialYear;
	var endYear = item.timeStamp[1] - initialYear;

	var geoInfo = update(segmentsDisTable, width, startYear, endYear);

	geoTable.push({
		name : item.name,
		geoInfo: geoInfo
	});
});

console.log(segmentsDisTable);

function update(segmentsDisTable, width, start, end){
	var validSpacesAll = [];

	for(var i = start; i <= end; i++)
		segmentsDisTable[i] ?
			validSpacesAll.push(findValidSpaces(segmentsDisTable[i], width)) :
			validSpacesAll.push([[-1, -1]]); // Wild Card Sign

	var isAllUntouched = validSpacesAll.every(function (spaces){ 
		return spaces.length != 0 && spaces[0][0] == -1; 
	})

	if(isAllUntouched)
		return insert(segmentsDisTable, [0, width - 1], start, end);

	var validSpaces = analyzeValidSpace(validSpacesAll);

	if(validSpaces)
		validSpaces = validSpaces
			.filter(function (space){
				return (space[1] - space[0] >= width);
			})
			.map(function (space){
				return [space[0], space[0] + width];
			});

	var validSpace = (!validSpaces || validSpaces.length == 0) ?
		findCommonTail(segmentsDisTable, start, end, width) :
		validSpaces[0];

	return insert(segmentsDisTable, validSpace, start, end);
}


function findValidSpaces(segmentsDis, width){
	var validSpaces = [];

	for(var i = 0; i < segmentsDis.length - 1; i++){
		var intervalLength = segmentsDis[i+1][0] - segmentsDis[i][1];

		if(intervalLength - 2 >= width) // Fitting
			validSpaces.push([segmentsDis[i][1] + 1, segmentsDis[i+1][0] - 1]);
	}

	return validSpaces;
}

function analyzeValidSpace(validSpacesAll){
	if(validSpacesAll.length == 1)
		return validSpacesAll[0][0];

	var validPoints = [];

	validSpacesAll = validSpacesAll.filter(function(spaces){
		return spaces.length == 0 || spaces[0][0] != -1;
	})

	var points = getScanning(validSpacesAll[0]);

	for(i in points){
		var isShared = validSpacesAll.some(function (validSpaces){
			return findPoint(validSpaces, points[i]);
		});

		if(isShared)
			validPoints.push(points[i]);
	}

	return concat(validPoints);
}

function deleteElem(arr, index){
	return arr.slice(0, index).concat(arr.slice(index + 1));
}

function concat(points){
	var spaces = [];

	points.push(-1);

	var start = 0;
	while(start < points.length - 1){
		var current = start;

		while(points[current + 1] == points[current] + 1)
			current++;

		spaces.push([points[start], points[current]]);
		start = current + 1;
	}

	return spaces;
}

function findPoint(spaces, point){
	return spaces.some(function (space){
		return point <= space[1] && point >= space[0];
	})
}

function getScanning(spaces){
	var points = [];

	for(var i in spaces)
		for(var j = spaces[i][0]; j <= spaces[i][1]; j++)
			points.push(j);

	return points;
}

function findCommonTail(segmentsDisTable, startYear, endYear, width){
	var max = - 1;

	for(var i = startYear; i <= endYear; i++)
		if(segmentsDisTable[i]) {

			var seg = segmentsDisTable[i];
			if(max < seg[seg.length-1][1])
				max = seg[seg.length-1][1];
		}

	return [max + 1, max + width + 1];
}

function insert(segmentsDisTable, validSpace, startYear, endYear){
	for(var i = startYear; i <= endYear; i++){

		if(!segmentsDisTable[i]){
			segmentsDisTable[i] = new Array(validSpace);
			continue;
		}

		var seg = segmentsDisTable[i];
		var pos = -1;

		if(seg[0][0] > validSpace[1])
			pos = 0;
		else 
			for(var j in seg)
				if(seg[j][0] > validSpace[1]){
					pos = j;
					break;
				}

		pos == -1 ?
			seg.push(validSpace):
			seg = seg.splice(0, pos, [validSpace]);

		segmentsDisTable[i] = seg;
	}
	return [[validSpace[0], startYear], [validSpace[1], endYear]];
}