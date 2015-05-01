function Turtle(turtle, forwardDistance, turnAngle) {
	this.turtle = turtle;
	
	this.forwardDistance = forwardDistance;
	
	this.turnAngle = turnAngle;
	
	this.savedPositions = [];
}

Turtle.prototype.moveForward = function () {
	this.turtle.translateZ(this.forwardDistance);
}

Turtle.prototype.turn = function (direction) {
	var axis = new THREE.Vector3();
	var mat = new THREE.Matrix4();
	mat.extractRotation(this.turtle.matrix);
	
	switch (direction) {
		case "<":
			axis.set(0, 0, 1);
			break;
		case ">":
			axis.set(0, 0, -1);
			break;
		case "^":
			axis.set(1, 0, 0);
			break;
		case "v":
			axis.set(-1, 0, 0);
			break;
	}
	
	axis.applyMatrix4(mat);
	
	this.turtle.rotateOnAxis(axis, this.turnAngle);
}

Turtle.prototype.savePosition = function () {
	var position = this.turtle.position;
	this.savedPositions.push(position);
}

Turtle.prototype.returnToSavedPosition = function() {
	if (this.savedPositions.length < 0) {
		this.turtle.position.copy(this.savedPositions.pop());
	}
	else {
		console.log("trying to return to a postition that"
					 + " may not have been saved");
	}
}

Turtle.prototype.placeObject = function(scn, mesh) {
	mesh.position.copy(this.turtle.position);
	//console.log("[" + mesh.position.x + ", " + mesh.position.y + ", " + mesh.position.z + "]");
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
				this.placeObject(scn, meshGen());
				break;
			case "P":
				this.placeObject(scn, meshGen());
				break;
		}
	}
}