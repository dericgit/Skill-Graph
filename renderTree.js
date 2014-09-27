var fs = require('fs');
var markdown = require( "markdown" ).markdown;

module.exports = function(tree) {
	console.log(markdown.toHTML(getContent(tree)));
}

function getContent(tree){
	var indent = '   ';
	var tag = '* ';
	var content = tag + tree.value + '\n';
	tree.children.forEach(function(child){
		content += getSubContent(child, 1, indent, tag);
	});
	return content
}

function getSubContent(node, depth, indent, tag){
	if(node.name)
		return getIndent(depth, indent) + tag + node.name + ' ' + node.exPoints;
	else {
		var content = getIndent(depth, indent) + tag + node.value + '\n';
		node.children.forEach(function(child){
			content += getSubContent(child, depth + 1, indent, tag) + '\n';
		});
		return content
	}
}

function getIndent(depth, indent){
	var buf = '';
	while(depth--)
		buf += indent;
	return buf;
}