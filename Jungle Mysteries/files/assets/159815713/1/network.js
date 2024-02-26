var Network = pc.createScript('network');

var ambi_light_status = false;
var ambi_solution_status = false;

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.socket = io.connect('https://junglemysteries.glitch.me/');
    var app = this.app;
    try{
        this.light1 = app.root.findByName("Ambi_Light");
    }catch(e){
        console.error(e);
    }
    
};

// update code called every frame
Network.prototype.update = function(dt) {
    var socket = this.socket;
    
    socket.on('ambi_data', function(message) {
        ambi_light_status = Boolean(message);
    });

    socket.on('ambi_solution', function(message){
        ambi_solution_status = message;
    });

    if(ambi_solution_status){
        ambi_solution_status = false;
        window.global_slide_counter = 5;
        this.app.scenes.changeScene('Slides');
    }
    
    try{
        this.light1.light.enabled = ambi_light_status;
    } catch(e){
        console.error(e)
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// Network.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/
