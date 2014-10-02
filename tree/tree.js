var buildTree = require('./treeLib.js');
var categories = require('../skillInfo.json').categories;
var items = require('./skillInfo.json').items;
var render = require('./renderTree.js')

var tree = buildTree({
	'name': 'skill-tree',
	'categories': categories
});

items.forEach(function(item){
	item.fathers.forEach(function(father){
		tree.addChild(father, item);
	})
});

tree.output(0);

render(tree);