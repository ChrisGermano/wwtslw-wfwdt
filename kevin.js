(function() {

walk(document.body);

function classNameToList(classes) {
  return classes.split(" ");
}

function walk(node)
{
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	if (node.tagName != null && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea')
	    || (node.classList != null && node.classList.contains('ace_editor'))) {
		return;
	}

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{

  var conjunctions = ["for","and","nor","but","or","yet","so"];
  var articles = ["a","the","an","some","my","your","his","her","their","our"];
  var prepositions = ["on","in","at","by"];
  var extras = ["is"];

  var wordlist = conjunctions.concat(articles.concat(prepositions.concat(extras)));

	var v = textNode.nodeValue;

  for (var i = 0; i < wordlist.length; i++) {
    var wordRegex = new RegExp('\\b' + wordlist[i] + '\\b','g');
    v = v.replace(wordRegex, "");
  }

  /*
	v = v.replace(/\bThe Cloud\b/g, "My Butt");
	v = v.replace(/\bThe cloud\b/g, "My butt");
	v = v.replace(/\bthe Cloud\b/g, "my Butt");
	v = v.replace(/\bthe cloud\b/g, "my butt");
  */

	textNode.nodeValue = v;
}


})();
