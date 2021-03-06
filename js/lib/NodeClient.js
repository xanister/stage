define(['socket.io'], function (io) {
    /**
     * NodeClient
     * @returns {NodeClient}
     */
    function NodeClient() {
        /**
         * IO socket
         * @access private
         * @var {Object}
         */
        var socket;

        /**
         * Connected flag
         * @access public
         * @var {Boolean}
         */
        this.connected = false;

        /**
         * Data synced to server
         * @access public
         * @var {Object}
         */
        this.data = {};

        /**
         * Client id
         * @access public
         * @var {String}
         */
        this.id = false;

        /**
         * Client inputs
         * @access public
         * @var {Object}
         */
        this.inputs = {touchX: 0, touchY: 0, touchStartX: 0, touchStartY: 0, touchCount: 0};

        /*
         * Server time update was last run
         * @access public
         * @var {Date}
         */
        this.lastInputTime = false;

        /**
         * Update server with client inputs
         */
        this.inputUpdate = function () {
            socket.emit("clientInput", this.inputs);
        };

        /**
         * Connection callback
         * @param {Object} response
         */
        this.connectCallback = function (response) {
            console.log("Connection opened. ID: " + response.id);
        };

        /**
         * Disconnect callback
         */
        this.disconnectCallback = function () {
            console.log("Connection closed");
        };

        /**
         * Error callback
         * @param {Object} response
         */
        this.errorCallback = function (response) {
            console.log(response.error);
        };

        /**
         * Message recieved callback
         * @param {String} response
         */
        this.messageCallback = function (response) {
            console.log(response.message);
        };

        /**
         * Welcome recieved callback
         * @param {String} response
         */
        this.welcomeCallback = function (response) {
            console.log(response.message);
        };

        /**
         * Update data callback
         */
        this.updateCallback = false;

        /**
         * Open connection and bind server/input callback events
         * @param {String} serverAddress
         * @param {function} welcomeCallback
         */
        this.start = function (serverAddress, welcomeCallback) {
            this.welcomeCallback = welcomeCallback || false;

            // Open connection
            socket = io.connect(serverAddress, {'sync disconnect on unload': true});

            // Bind events
            var nodeClient = this;

            /**
             * On error
             * @param {Object} response
             */
            socket.on('error', function (response) {
                nodeClient.errorCallback(response);
            });

            /**
             * On message
             * @param {String} response
             */
            socket.on('message', function (response) {
                nodeClient.messageCallback(response);
            });

            /**
             * On welcome
             * @param {String} response
             */
            socket.on('welcome', function (response) {
                if (nodeClient.welcomeCallback)
                    nodeClient.welcomeCallback(response);
            });

            /**
             * On connection
             * @param {Object} response
             */
            socket.on("connection", function (response) {
                nodeClient.id = response.id;
                nodeClient.connected = true;
                nodeClient.connectCallback(response);
            });

            /**
             * On disconnect
             * TODO: stop gracefully when server disappears unexpectedly
             */
            socket.on('disconnect', function () {
                socket.disconnect();
                nodeClient.connected = false;
                nodeClient.disconnectCallback();
            });

            /**
             * On update
             * @param {Object} response
             */
            socket.on("update", function (response) {
                nodeClient.data = response.data;
                nodeClient.lastUpdateTime = response.time;
                if (nodeClient.updateCallback)
                    nodeClient.updateCallback(response.data);
            });

            /**
             * Client keydown
             * @param {Event} event
             */
            document.onkeydown = function (event) {
                var keyPressed = String.fromCharCode(event.keyCode);
                nodeClient.inputs[keyPressed] = true;
                nodeClient.inputUpdate();
            };

            /**
             * Client keyup
             * @param {Event} event
             */
            document.onkeyup = function (event) {
                var keyPressed = String.fromCharCode(event.keyCode);
                nodeClient.inputs[keyPressed] = false;
                nodeClient.inputUpdate();
            };

            /**
             * Client touchstart
             * @param {Event} event
             */
            document.addEventListener("touchstart", function (event) {
                event.preventDefault();
                nodeClient.inputs["touchCount"]++;
                nodeClient.inputs["touchX"] = event.changedTouches[0].clientX;
                nodeClient.inputs["touchY"] = event.changedTouches[0].clientY;
                nodeClient.inputs["touchStartX"] = event.changedTouches[0].clientX;
                nodeClient.inputs["touchStartY"] = event.changedTouches[0].clientY;
                nodeClient.inputUpdate();
            });

            /**
             * Client touchmove
             * @param {Event} event
             */
            document.addEventListener("touchmove", function (event) {
                event.preventDefault();
                nodeClient.inputs["touchX"] = event.changedTouches[0].clientX;
                nodeClient.inputs["touchY"] = event.changedTouches[0].clientY;
                nodeClient.inputUpdate();
            });

            /**
             * Client touchend
             * @param {Event} event
             */
            document.addEventListener("touchend", function (event) {
                event.preventDefault();
                nodeClient.inputs["touchCount"]--;
                nodeClient.inputs["touchX"] = event.changedTouches[0].clientX;
                nodeClient.inputs["touchY"] = event.changedTouches[0].clientY;
                nodeClient.inputUpdate();
            });
        };
    }

    return NodeClient;
});