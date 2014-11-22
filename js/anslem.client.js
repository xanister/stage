var app = {
    /**
     * Parallax backgrounds in
     * format [{sprite: {Sprite}, speed: 1.0},...]
     * @access public
     * @var {array}
     */
    backgrounds: {}
};

var stage = new Stage(document.getElementById("primary-canvas"));
$(document).ready(function () {
    loadAssets(function () {
        stage.start(function () {
            Sprites.bgNight.draw(stage.canvasContext, 0, 20, 20);
        });
    });
});