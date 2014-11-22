/**
 * Basic stage for drawing to canvas
 * @param {element} canvas
 * @returns {Stage}
 */
function Stage(canvas) {
    /**
     * DOM canvas element to draw to
     * @access public
     * @var {element}
     */
    this.canvas = canvas;

    /**
     * Current calculated fps
     * @access public
     * @var {float}
     */
    this.currentFps = 0;

    /**
     * DOM canvas context
     * @access public
     * @var {element}
     */
    this.canvasContext = this.canvas.getContext("2d");

    /**
     * Debug mode flag
     * @access public
     * @var {Boolean}
     */
    this.debugMode = true;

    /**
     * Stage height
     * @access public
     * @var {int}
     */
    this.height = this.canvas.height;

    /**
     * Running flag
     * @access public
     * @var {Boolean}
     */
    this.running = false;

    /**
     * Target frames per second
     * @access public
     * @var {int}
     */
    this.targetFps = 60;

    /**
     * Available sounds
     * @access public
     * @var {array}
     */
    this.sounds = [];

    /**
     * Available sprites
     * @access public
     * @var {array}
     */
    this.sprites = [];

    /**
     * Stage width
     * @access public
     * @var {int}
     */
    this.width = this.canvas.width;

    /**
     * Start render loop
     * @param {function} renderCallback
     * @access public
     */
    Stage.prototype.start = function (renderCallback) {
        this.running = true;
        var self = this;
        var startTime = 0;
        function step(timestamp) {
            var progress = timestamp - startTime;
            startTime = timestamp;
            self.currentFps = 1000 / progress;
            self.canvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            renderCallback();
            if (self.debugMode)
                self.canvasContext.fillText("FPS: " + Math.round(this.currentFps), 5, 5);
            if (self.running)
                window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    };

    /**
     * Stop the render loop
     * @access public
     */
    Stage.prototype.stop = function () {
        this.running = false;
    };
}