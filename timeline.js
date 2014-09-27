var items = require('./skilltree.json').items;
// var insert = require('./insert.js');
var render = require('./renderTL.js');

var current = 2014;

var oldest = Math.min.apply(null, items.map(function (item){ return item.timeStamp[0]}));

var table = {
	"startYear": -1,
	"endYear": -1,
	"segments": [], // element like {year:2013, segment: [1, 10]} means 1-10 is occupied in 2013
	"insert": function(item){
		var width = Math.ceil(item.exPoints / (item.timeStamp[1] - item.timeStamp[0] + 1));
		var start = item.timeStamp[0] - this.startYear;
		var end = item.timeStamp[1] - this.startYear;
		var newElement = [0, width-1];

		// console.log(start + ":" + end);

		for(i=start; i<= end; i++) {
			// console.log(i);
			if(this.segments[i]) {
				var flag = false;
				for(j=0; j< this.segments[j].length - 1; j++){
					var interval = this.segments[i][i+1][0] - this.segments[i][i][1];

					if(interval - 2 >= width){
						newElement = [this.segments[i][i][1] + 1, this.segments[i][i][1] + 1 + width];
						this.segments[i] = this.segments[i].slice(0, i+1).concat(newElement,this.segments[i].slice(i+1));
						flag = true;
						break;
					}
				}

				if(!flag) {
					var add = this.segments[i][this.segments[i].length-1][1];
					newElement = [add + 1, add + width + 1];
					this.segments[i].push(newElement);
				}
			}
			else
				this.segments[i] = [newElement];
		}
	}
}


table.startYear = oldest;
table.endYear = current;

items.forEach(function(item) {
	if(item.timeStamp[1] == -1)
		item.timeStamp[1] = current;

	table.insert(item);
});

render(table.segments);
// console.log(table.segments);