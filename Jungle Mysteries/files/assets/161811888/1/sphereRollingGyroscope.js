var SphereRollingGyroscope = pc.createScript('sphereRollingGyroscope');

var global_hori = 0;
var global_vert = 0;
var gyro_solution_status = false;

SphereRollingGyroscope.attributes.add('speed', {
    type: 'number',
    default: 10
})

// initialize code called once per entity
SphereRollingGyroscope.prototype.initialize = function() {
    this.socket = io.connect('https://junglemysteries.glitch.me/');
};

// update code called every frame
SphereRollingGyroscope.prototype.update = function(dt) {
    var socket = this.socket;
    var rb = this.entity.rigidbody;
    var moveHoriz = 0;
    var moveVert = 0;

    console.log(gyro_solution_status)

    socket.on('gyro_solution', function(message){
        gyro_solution_status = true;
    });

    if (gyro_solution_status){
        gyro_solution_status = false;
        window.global_slide_counter = 6;
        this.app.scenes.changeScene('Slides');
    }

    socket.on('gyro_data', function(message) {
        let beta = message.beta;
        let gamma = message.gamma;

        if(beta > 25){
            global_vert = 1;
        }else if (beta < -25){
            global_vert = -1;
        }

        if(gamma > 25){
            global_hori = 1;
        }else if (gamma < -25){
            global_hori = -1;
        }
    });

    moveHoriz = global_hori;
    moveVert = global_vert;

    var moveVect = new pc.Vec3(moveHoriz, 0, moveVert);
    rb.applyForce(moveVect.scale(this.speed));

    var position = this.entity.getPosition();

    if(position.z < -10){
        var code_planes = this.app.root.findByTag("code");
        for (let i = 0; i < code_planes.length; i++) {
            code_planes[i].enabled = true;
        }
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// SphereRollingGyroscope.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/