var manifest = {};
var c = 0;

function loadChapter(){
	var target = document.getElementById("textContain");
	target.innerHTML = "";

	var mt = document.createElement("h1")
	mt.innerHTML = "SSH Inception"
	target.appendChild(mt)

	var t = document.createElement("h4")
	t.innerHTML = manifest.chapters[c].sectionTitle
	target.appendChild(t)

	fetch('http://0.0.0.0:8888/static/books/ssh_inception/' + manifest.chapters[c].fileName)
		.then(function(response) {
			return response.text()
		})
		.then(function(text) {
			text.split('\n\n').map(function(item) {
				var p = document.createElement("p")
				p.innerHTML = item
				target.appendChild(p) 
				return;
			})
			return;
		})

	if(c < manifest.chapters.length - 1) { //button control case 1
		document.getElementById("bNext").hidden = false;
		document.getElementById("bNext").innerHTML = "Next: " + manifest.chapters[c + 1].sectionTitle
	} else {
		document.getElementById("bNext").hidden = true
	}

	if(c > 0) { //button control case 2
		document.getElementById("bPrev").hidden = false;
		document.getElementById("bPrev").innerHTML = "Back: " + manifest.chapters[c - 1].sectionTitle 
	} else {
		document.getElementById("bPrev").hidden = true
	}
}

window.onload = function(){
	fetch('http://0.0.0.0:8888/static/books/ssh_inception/manifest.json')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(myJson) {
	    manifest = myJson; //save off 
	    loadChapter();
	    return;
	  });
}

document.getElementById("bPrev").onclick = function(){ //prev button click
	console.log("prev")
	c--;
	loadChapter();
}

document.getElementById("bNext").onclick = function(){ //next button click 
	console.log("next")
	c++;
	loadChapter();
}