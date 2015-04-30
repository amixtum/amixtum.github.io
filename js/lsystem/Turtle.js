function Turtle(turtle, forwardDistance, turnAngle) {
	this.turtle = turtle;
	
	this.forwardDistance = forwardDistance;
	
	this.turnAngle = turnAngle;
	
	this.savedPositions = [];
}

Turtle.prototype.moveForward = function () {
	var rotateMatrix = new THREE.Matrix4();
	rotateMatrix.extractRotation(this.turtle.matrix);
	
	var forward = new THREE.Vector3(0, 0, 1);
	forward.applyMatrix4(rotateMatrix);
	
	this.turtle.translateOnAxis(forward, this.forwardDistance);
}

Turtle.prototype.turn = function (direction) {
	var rotationMatrix = new THREE.Matrix4();
	rotationMatrix.extractRotation(this.turtle.matrix);
	
	var axis = new THREE.Vector3();
	
	switch (direction) {
		case "^":
			axis.set(1, 0, 0);
			break;
		case "v":
			axis.set(-1, 0, 0);
			break;
		case "<":
			axis.set(0, 1, 0);
			break;
		case ">":
			axis.set(0, -1, 0);
			break;
		default:
			console.log("Invalid Direction");
			break;
	}
	
	axis.applyMatrix4(rotationMatrix);
	
	this.turtle.rotateOnAxis(axis, this.turnAngle);
}

Turtle.prototype.savePosition = function () {
	var position = this.turtle.position;
	savedPositions.push(position);
}

Turtle.prototype.returnToSavedPosition = function() {
	if (savedPositions.length < 0) {
		this.turtle.position.copy(savedPositions.pop());
	}
	else {
		console.log("trying to return to a postition that"
					 + " may not have been saved");
	}
}

Turtle.prototype.placeObject = function(scn, mesh) {
	mesh.position.copy(this.turtle.position);
	//console.log(mesh.position);
	scn.add(mesh);
}

Turtle.prototype.executeSequence = function(sequence, scn, meshGen) {
	for (var i = 0; i < sequence.length; ++i) {
		switch (sequence[i]) {
			case "^":
				this.turn("^");
				break;
			case "v":
				this.turn("v");
				break;
			case "<":
				this.turn("<");
				break;
			case ">":
				this.turn(">");
				break;
			case "F":
				this.moveForward();
				break;
			case "P":
				this.placeObject(scn, meshGen());
				break;
		}
	}
}