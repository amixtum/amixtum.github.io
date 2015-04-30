var left = 37;
var up = 38;
var right = 39;
var down = 40;

var a = 65;
var w = 87;
var s = 83;
var d = 68;

var translateDistance = 1;
var rotateDistance = 0.01;

var movingForward;
var movingBack;
var movingLeft;
var movingRight;
var movingUp;
var movingDown;

var rotatingRight;
var rotatingLeft;

function initializeMovementValues() {
	movingForward = false;
	movingBack = false;
	movingLeft = false;
	movingRight = false;
	movingUp = false;
	movingDown = false;
	
	rotatingRight = false;
	rotatingLeft = false;
}

function translateCamera(direction, distance) {
	var translateMatrix = new THREE.Matrix4();
	
	var up = new THREE.Vector3();
	var right = new THREE.Vector3();
	var forward = new THREE.Vector3();
	
	getCamera().matrix.extractBasis(right, up, forward);
	
	if (direction == a) {
		translateMatrix.makeTranslation(-right.x, 0, -right.z);
	}
	if (direction == s) {
		translateMatrix.makeTranslation(forward.x, 0, forward.z); 
	}
	if (direction == w) {
		translateMatrix.makeTranslation(-forward.x, 0, -forward.z);
	}
	if (direction == d) {
		translateMatrix.makeTranslation(right.x, 0, right.z);
	}
	if (direction == up) {
		translateMatrix.makeTranslation(0, up.y, 0);
	}
	if (direction == down) {
		translateMatrix.makeTranslation(0, -up.y, 0);
	}
	
	getCamera().applyMatrix(translateMatrix);
}

function rotateCamera(direction, distance) {
	var axis;
	if (direction == left) {
		axis = new THREE.Vector3(0, 1, 0);
	}
	if (direction == right) {
		axis = new THREE.Vector3(0, -1, 0);
	}
	getCamera().rotateOnAxis(axis, distance);
}

function handleInput() {
	if (movingForward) {
		console.log("should move forward");
		translateCamera(w, translateDistance);
	}
	if (movingBack) {
		translateCamera(s, translateDistance);
	}
	if (movingLeft) {
		translateCamera(a, translateDistance);
	}
	if (movingRight) {
		translateCamera(d, translateDistance);
	}
	if (movingUp) {
		translateCamera(up, translateDistance);
	}
	if (movingDown) {
		translateCamera(down, translateDistance);
	}
	if (rotatingLeft) {
		rotateCamera(left, rotateDistance);
	}	
	if (rotatingRight) {
		rotateCamera(right, rotateDistance);
	}
}

function keyDownHandler(event) {
	console.log("in key down handler");
	
	//console.log(event.charCode);
	
	if (event.keyCode == w) {
		movingForward = true;
	}
	if (event.keyCode == a) {
		movingLeft = true;
	}
	if (event.keyCode == s) {
		movingBack = true;
	}
	if (event.keyCode == d) {
		movingRight = true;
	}
	if (event.keyCode == up) {
		movingUp = true;
	}
	if (event.keyCode == down) {
		movingDown = true;
	}
	if (event.keyCode == right) {
		rotatingRight = true;
	}
	if (event.keyCode == left) {
		rotatingLeft = true;
	}
}

function keyUpHandler(event) {
	if (event.keyCode == w) {
		movingForward = false;
	}
	if (event.keyCode == a) {
		movingLeft = false;
	}
	if (event.keyCode == s) {
		movingBack = false;
	}
	if (event.keyCode == d) {
		movingRight = false;
	}
	if (event.keyCode == up) {
		movingUp = false;
	}
	if (event.keyCode == down) {
		movingDown = false;
	}
	if (event.keyCode == right) {
		rotatingRight = false;
	}
	if (event.keyCode == left) {
		rotatingLeft = false;
	}
}

function isTranslation(keyCode) {
	return (keyCode == w || keyCode == a || keyCode == s 
		|| keyCode == d || keyCode == up || keyCode == down);
}

function isRotation(keyCode) {
	return (keyCode == left || keyCode == right);
}