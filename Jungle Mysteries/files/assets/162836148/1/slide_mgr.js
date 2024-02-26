var SlideMgr = pc.createScript('slideMgr');

var slides = {
    1: "Slide1.png",
    2: "Slide2.png",
    3: "Slide3.png",
    4: "Slide4.png",
    5: "Slide5.png",
    6: "Slide6.png",
    7: "Slide7.png",
    8: "Slide8.png",
    9: "Slide9.png",
};

var voice_overs = {
    2: "v_slide2.mp3",
    3: "v_slide3.mp3",
    4: "v_slide4.mp3",
    5: "v_slide5.mp3",
    6: "v_slide6.mp3",
    7: "v_slide7.mp3"
};

// initialize code called once per entity
SlideMgr.prototype.initialize = function() {
    this.slide_plane = this.app.root.findByName('slide_plane');
    if(window.global_slide_counter == null){
        window.slide_counter = 1;
    } else {
        window.slide_counter = window.global_slide_counter;
    }
    this.slide_plane.element.textureAsset = this.app.assets.find(slides[window.slide_counter]);
    
    if(voice_overs[window.slide_counter]){
            this.entity.sound.slot("Voiceovers").asset = this.app.assets.find(voice_overs[window.slide_counter]);
            this.entity.sound.slot("Voiceovers").play()
    }

};

// update code called every frame
SlideMgr.prototype.update = function(dt) {
    var app = this.app;

    if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
        this.entity.sound.slot("Voiceovers").stop()
        if(window.slide_counter == 9){
            return;
        }

        if(window.slide_counter == 4){
            this.app.scenes.changeScene("AmbiLight");
        }else if(window.slide_counter == 5){
            this.app.scenes.changeScene("Maze");
        }else if(window.slide_counter == 6){
            this.app.scenes.changeScene("Blower");
        }else{
            window.slide_counter+=1;
            this.slide_plane.element.textureAsset = this.app.assets.find(slides[window.slide_counter]);
        }

        if(voice_overs[window.slide_counter]){
            this.entity.sound.slot("Voiceovers").asset = this.app.assets.find(voice_overs[window.slide_counter]);
            this.entity.sound.slot("Voiceovers").play()
        }
    }
};

// swap method called for script hot-reloading
// inherit your script state here
// SlideMgr.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/