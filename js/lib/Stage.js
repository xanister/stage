define(['Sprite'], function (Sprite) {
    /**
     * Basic stage for drawing to canvas
     * @returns {Stage}
     */
    function Stage() {
        /**
         * DOM canvas element to draw to
         * @access public
         * @type {Element}
         */
        this.canvas = false;

        /**
         * Current calculated fps
         * @access public
         * @type {Number}
         */
        this.currentFps = 0;

        /**
         * DOM canvas context
         * @access public
         * @type {Canvas.context}
         */
        this.canvasContext = false;

        /**
         * Debug mode flag
         * @access public
         * @type {Boolean}
         */
        this.debugMode = true;

        /**
         * Running flag
         * @access public
         * @type {Boolean}
         */
        this.running = false;

        /**
         * Target frames per second
         * @access public
         * @type {Number}
         */
        this.targetFps = 60;

        /**
         * Available sounds
         * @access public
         * @type {Array}
         */
        this.sounds = [];

        /**
         * Available sprites
         * @access public
         * @type {Array}
         */
        this.sprites = [];

        /**
         * Create and initialize canvas element
         * @access public
         * @param {Element} container
         */
        Stage.prototype.init = function (container) {
            container = container || document.body;
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);

            this.canvas.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            this.canvas.height = window.innerHeight > 0 ? window.innerHeight : screen.height;
            this.canvasContext = this.canvas.getContext("2d");
        };

        /**
         * Basic asyncronous project specific asset
         * loader with callback
         * @param {Number} assetCount
         * @param {Function} loaderFunction
         * @param {Function} assetsLoadedCallback
         * @returns {undefined}
         */
        Stage.prototype.loadAssets = function (assetCount, loaderFunction, assetsLoadedCallback) {
            loaderFunction(function () {
                assetCount--;
                if (assetCount === 0) {
                    assetsLoadedCallback();
                }
            });
        };

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

    return Stage;
});