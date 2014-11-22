var Sprites = false;
var Sounds = false;

function loadAssets(assetsLoadedCallback) {
    var assetsToLoad = 13;
    function assetLoaded() {
        assetsToLoad--;
        if (assetsToLoad === 0)
            assetsLoadedCallback();
    }

    Sprites = {
        bgNight: new Sprite('assets/sprites/bg-night/bg-night_', 1, 0, assetLoaded),
        bgClouds: new Sprite('assets/sprites/bg-clouds/bg-clouds_', 1, 0, assetLoaded),
        bgMountains: new Sprite('assets/sprites/bg-mountains/bg-mountains_', 1, 0, assetLoaded),
        bgMountainsMidground: new Sprite('assets/sprites/bg-mountains-midground/bg-mountains-midground_', 1, 0, assetLoaded),
        bgTrees: new Sprite('assets/sprites/bg-trees/bg-trees_', 1, 0, assetLoaded),
        bgGround: new Sprite('assets/sprites/bg-ground/bg-ground_', 1, 0, assetLoaded),
        sprMan: new Sprite("assets/sprites/man-single/man-single_", 1, 0, assetLoaded, true, 6),
        sprCoin: new Sprite("assets/sprites/coin/coin_", 1, 0, assetLoaded)
    };

    Sounds = {
        bgMusic: new Howl({
            urls: ['assets/sounds/bgMusic.mp3'],
            loop: true,
            volume: 0.5,
            onload: assetLoaded
        }),
        coin: new Howl({
            urls: ['assets/sounds/coin.wav'],
            loop: false,
            volume: 1,
            onload: assetLoaded
        }),
        end: new Howl({
            urls: ['assets/sounds/end.wav'],
            loop: false,
            volume: 1,
            onload: assetLoaded
        }),
        jump: new Howl({
            urls: ['assets/sounds/jump.mp3'],
            loop: false,
            volume: 0.5,
            onload: assetLoaded
        }),
        running: new Howl({
            urls: ['assets/sounds/running.mp3'],
            loop: true,
            volume: 0.5,
            onload: assetLoaded
        }),
        start: new Howl({
            urls: ['assets/sounds/start.mp3'],
            loop: false,
            volume: 1,
            onload: assetLoaded
        })
    };
}