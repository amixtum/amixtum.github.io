var left = 37;
var up = 38;
var right = 39;
var down = 40;

var a = 65;
var w = 87;
var s = 83;
var d = 68;

function cameraMover(event) {
	
}

function isTranslation(keyCode) {
	return (keyCode == w || keyCode == a || keyCode == s || keyCode == d);
}

function isRotation(keyCode) {
	return (keyCode == left || keyCode == right || keyCode == up || keyCode == down);
}