/**
 * Basic animation object
 * @param {string} imagePath
 * @param {int} frameCount
 * @param {float} frameSpeed
 * @param {function} imagesLoadedCallback
 * @param {bool} singleImage
 * @returns {Sprite}
 */
function Sprite(imagePath, frameCount, frameSpeed, imagesLoadedCallback, singleImage) {
    /**
     * Count of images currently loading
     * @access static
     * @var {int}
     */
    Sprite.imagesLoading = 0;

    /**
     * Number of frames
     * @access public
     * @var {int}
     */
    this.frameCount = frameCount || 0;

    /**
     * Default framespeed
     * @access public
     * @var {int}
     */
    this.frameSpeed = frameSpeed || 0;

    /**
     * Height, read only
     * @access public
     * @var {int}
     */
    this.height = 0;

    /**
     * Single sheet sprite flag
     * @access public
     * @var {bool}
     */
    this.singleImage = singleImage || false;

    /**
     * Width, read only
     * @access public
     * @var {int}
     */
    this.width = 0;

    /**
     *
     * @param {Canvas} ctx
     * @param {float} frame
     * @param {float} tarX
     * @param {float} tarY
     * @param {float} width
     * @param {float} height
     * @param {float} srcX
     * @param {float} srcY
     * @param {float} srcWidth
     * @param {float} srcHeight
     */
    Sprite.prototype.draw = function (ctx, frame, tarX, tarY, width, height, srcX, srcY, srcWidth, srcHeight) {
        frame = Math.floor(frame);
        tarX = Math.floor(tarX);
        tarY = Math.floor(tarY);
        width = width ? Math.floor(width) : this.width;
        height = height ? Math.floor(height) : this.height;
        srcX = srcX ? Math.floor(srcX) : 0;
        if (this.singleImage)
            srcX = Math.floor(srcX + (frame * this.width));
        srcY = srcY ? Math.floor(srcY) : 0;
        srcWidth = srcWidth || this.width;
        srcHeight = srcHeight || this.height;
        var img = this.singleImage ? this.images[0] : this.images[frame || 0];
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, tarX, tarY, width, height);
    };

    /**
     * Callback for when frame has loaded
     * @access protected
     */
    this.imageLoaded = function () {
        this.imageLoaded.count = this.imageLoaded.count ? this.imageLoaded.count + 1 : 1;
        if (this.imageLoaded.count === this.images.length)
            this.imagesLoaded();
    };

    /**
     * Callback when all images have loaded
     * @access protected
     */
    this.imagesLoaded = function () {
        this.width = this.singleImage ? this.images[0].width / this.frameCount : this.images[0].width;
        this.height = this.images[0].height;
        this.imagesLoadedCallback();
    };

    /**
     * Loads images for sprite
     * @param {string} imagePath
     * @param {int} imageCount
     * @param {function} imagesLoadedCallback
     * @returns {array}
     */
    this.loadImages = function (imagePath, imageCount, imagesLoadedCallback) {
        var images = [];
        var self = this;
        for (var i = 0; i < imageCount; i++) {
            var img = new Image();
            img.src = imagePath + this.zeroPad(i, 3) + '.png';
            img.addEventListener("load", function () {
                self.imageLoaded.call(self);
            });
            images.push(img);
        }
        this.imagesLoadedCallback = imagesLoadedCallback || this.imagesLoadedCallback;
        return images;
    };

    /**
     *
     * @param {string} subject
     * @param {int} width
     * @param {int} char
     * @returns {String}
     */
    this.zeroPad = function (subject, width, char) {
        char = char || '0';
        subject = subject + '';
        return subject.length >= width ? subject : new Array(width - subject.length + 1).join(char) + subject;
    };

    /**
     * Sprite images
     * @access protected
     * @var {array}
     */
    this.images = this.loadImages(imagePath, this.singleImage || !frameCount ? 1 : frameCount, imagesLoadedCallback || false);
}