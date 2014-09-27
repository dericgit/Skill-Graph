var buildTree = require('./treeLib.js');
var categories = require('./skilltree.json').categories;
var items = require('./skilltree.json').items;
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