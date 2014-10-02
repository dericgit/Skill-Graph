function node(value){
	this.value = value;
	this.children = [];
	this.output = function(depth){
		console.log(getIndent(depth) + this.value);
		this.children.forEach(function(child){
			if(child.value)
				child.output(depth + 1);
			else
				console.log(getIndent(depth + 1) + child.name + "  " + child.exPoints);
		})
	};
}

function getIndent(depth){
	buf = '';
	while(depth--)
		buf += '--';
	return buf;
}

node.prototype.insert = function(value) {
	this.children.push(new node(value));
};

node.prototype.addChild = function(parentValue, newChild){
	if(this.value == parentValue){
		this.children.push(newChild);
		return true;
	}
	else if(this.children){
		return this.children.some(function(child){
			if(child.name) //item
				return false;
			else
				return child.addChild(parentValue, newChild);
		})
	}
	return false;
}

var build = function(json) {
	var tree = new node(json.name);
	if(json.categories.length != 0)
		json.categories.forEach(function(category){
			tree.children.push(build(category));
		});
	return tree;
};

// var category = {
// 	name : 'p1',
// 	categories : [
// 		{
// 			name: 'p2',
// 			categories: []
// 		},
// 		{
// 			name: 'p3',
// 			categories: []
// 		}
// 	]
// }


// var tree = build(category);
// tree.output(0);	
module.exports = build;