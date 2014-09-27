module.exports = function (data) {
	data.forEach(function(entry){
		var output = '';

		if(entry.length != 1) {
			for(i=0; i<entry.length-1; i++){
				var occupied = (entry[i][1] - entry[i][0]);
				for(;occupied >= 0; occupied -= 2)
					output += '-';

				var notOccupied = (entry[i+1][0] - entry[i][1]);
				while(notOccupied--)
					output += ' ';
			}
		} else {
			var occupied = (entry[0][1] - entry[0][0]);
			for(;occupied >= 0; occupied -= 2)
				output += '-';
		}
		console.log(output);
	});
}