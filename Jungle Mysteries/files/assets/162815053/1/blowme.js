var Blowme = pc.createScript('blowme');

var blow_status = false;
var blow_solution_status = false;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// initialize code called once per entity
Blowme.prototype.initialize = function() {
    this.socket = io.connect('https://junglemysteries.glitch.me/');
    this.blow_bush = this.app.root.findByTag('blow_bush')
};

// update code called every frame
Blowme.prototype.update = function(dt) {
    var socket = this.socket;
    socket.on('blow_data', function(message){
        blow_status = true;
    });

    socket.on('blow_solution', function(message){
        blow_solution_status = true;
    });

    if(blow_status){
        for (let i = 0; i < this.blow_bush.length; i++) {
            this.blow_bush[i].translateLocal(getRandomInt(7), getRandomInt(7), getRandomInt(7));
        }
    }

    if(blow_solution_status){
        blow_solution_status = false;
        window.global_slide_counter = 7;
        this.app.scenes.changeScene('Slides');
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Blowme.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/