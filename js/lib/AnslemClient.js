define(['Stage', 'Sprite', 'howler'], function (Stage, Sprite) {
    var AnslemClient = {
        stage: new Stage(),
        start: function () {
            AnslemClient.stage.init();
            AnslemClient.stage.loadAssets(14,
                    function (assetLoadedCallback) {
                        AnslemClient.stage.sprites = {
                            bgNight: new Sprite('assets/sprites/bg-night/bg-night_', 1, 0, assetLoadedCallback),
                            bgClouds: new Sprite('assets/sprites/bg-clouds/bg-clouds_', 1, 0, assetLoadedCallback),
                            bgMountains: new Sprite('assets/sprites/bg-mountains/bg-mountains_', 1, 0, assetLoadedCallback),
                            bgMountainsMidground: new Sprite('assets/sprites/bg-mountains-midground/bg-mountains-midground_', 1, 0, assetLoadedCallback),
                            bgTrees: new Sprite('assets/sprites/bg-trees/bg-trees_', 1, 0, assetLoadedCallback),
                            bgGround: new Sprite('assets/sprites/bg-ground/bg-ground_', 1, 0, assetLoadedCallback),
                            sprMan: new Sprite("assets/sprites/man-single/man-single_", 1, 0, assetLoadedCallback, true, 6),
                            sprCoin: new Sprite("assets/sprites/coin/coin_", 1, 0, assetLoadedCallback)
                        };
                        AnslemClient.stage.sounds = {
                            bgMusic: new Howl({
                                urls: ['assets/sounds/bgMusic.mp3'],
                                loop: true,
                                volume: 0.5,
                                onload: assetLoadedCallback
                            }),
                            coin: new Howl({
                                urls: ['assets/sounds/coin.wav'],
                                loop: false,
                                volume: 1,
                                onload: assetLoadedCallback
                            }),
                            end: new Howl({
                                urls: ['assets/sounds/end.wav'],
                                loop: false,
                                volume: 1,
                                onload: assetLoadedCallback
                            }),
                            jump: new Howl({
                                urls: ['assets/sounds/jump.mp3'],
                                loop: false,
                                volume: 0.5,
                                onload: assetLoadedCallback
                            }),
                            running: new Howl({
                                urls: ['assets/sounds/running.mp3'],
                                loop: true,
                                volume: 0.5,
                                onload: assetLoadedCallback
                            }),
                            start: new Howl({
                                urls: ['assets/sounds/start.mp3'],
                                loop: false,
                                volume: 1,
                                onload: assetLoadedCallback
                            })
                        };
                    },
                    function () {
                        AnslemClient.stage.start(function () {
                            AnslemClient.stage.sprites.sprCoin.draw(AnslemClient.stage.canvasContext, 0, 0, 0);
                        });
                    }
            );
        }
    };

    return AnslemClient;
});
