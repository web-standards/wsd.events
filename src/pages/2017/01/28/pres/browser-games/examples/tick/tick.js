
var AREA = [600, 500];
var CIRCLE_SIZE = 50;
var BASE_SPEED = 100;

class Circle {

    constructor(options) {
        this._direction = options.direction;
        this._speed = options.speed; // pixels per seond
        this._position = options.position;
        this._bounds = options.bounds;
        this._size = CIRCLE_SIZE;
    }

    update(timeDelta) {
    
        if (!this._elem) {
            this._elem = document.createElement('div');
            this._elem.className = 'circle';
            document.getElementById('container').appendChild(this._elem);
        }

        // calculate new position
        this._position[0] += (timeDelta * this._speed) * this._direction[0];
        this._position[1] += (timeDelta * this._speed) * this._direction[1];

        this._checkCollisionWithBounds();

        // redraw
        this._elem.style.left = this._position[0] + 'px';
        this._elem.style.top = this._position[1] + 'px';
    }

    _checkCollisionWithBounds () {
        if (this._position[0] < this._size / 2) {
            this._direction[0] *= -1;
            this._position[0] = this._size / 2;
        }
        if (this._position[1] < this._size / 2) {
            this._direction[1] *= -1;
            this._position[1] = this._size / 2;
        }
        if (this._position[0] > this._bounds[0] - this._size / 2) {
            this._direction[0] *= -1;
            this._position[0] = this._bounds[0] - this._size / 2;
        }
        if (this._position[1] > this._bounds[1] - this._size / 2) {
            this._direction[1] *= -1;
            this._position[1] = this._bounds[1] - this._size / 2;
        }
    }
}


// create circles
var i = 200;
while(--i>-1) {
    gameObjects.push(
        new Circle({
            position: [AREA[0] / 2, AREA[1] / 2], 
            direction: getRandDirection(),
            speed: BASE_SPEED + Math.random() * 200, 
            bounds: AREA
        })
    );
};

// calculate random direction
function getRandDirection () {
    var rand = Math.PI * 2 * Math.random();
    return [
        Math.cos(rand),
        Math.sin(rand)
    ];
}