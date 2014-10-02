module.exports = function j2x(obj) {
	console.log(JSON.stringify(obj, null, ' '))

	var attrsString = obj.attrs ? parseAttr(obj.attrs) : '';

	var textString = obj.text || '';

	var childrenString = '';
	if(obj.children)
		for(i in obj.children)
			childrenString += j2x(obj.children[i]);

	return '<' + obj.name + ' ' + attrsString + '>' + textString + childrenString + '</' + obj.name + '>';
}

function parseAttr(attrs){
	var str = '';
	for(attr in attrs){
		var ch = attr[attr.search(/[A-Z]/)];
		var attrConent = attrs[attr];

		if(ch)
			attr = attr.replace(ch, '-' + ch.toLowerCase());

		str += attr + '=' + '"' + attrConent + '" ';
	}

	return str;
}