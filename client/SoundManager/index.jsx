class SoundManager {

	constructor (game, onSoundsLoaded) {
		this.game = game;
		this.soundsLoaded = false;
		this.onSoundsLoaded = onSoundsLoaded;
		this.sounds = [];
	}

	preload () {
        this.game.load.audio('game-start', '/sounds/game-start.mp3');
        this.game.load.audio('game-end', '/sounds/game-end.mp3');
        this.game.load.audio('goal-1', '/sounds/goal-1.mp3');
        this.game.load.audio('goal-2', '/sounds/goal-2.mp3');
        this.game.load.audio('people-oh', '/sounds/people-oh.mp3');
        this.game.load.audio('public-1', '/sounds/public-1.mp3');
        this.game.load.audio('kick', '/sounds/kick.mp3');
	}

	create () {
		this.gameStart = this.game.add.audio('game-start');
		this.sounds.push(this.gameStart);

		this.gameEnd = this.game.add.audio('game-end');
		this.sounds.push(this.gameEnd);

		this.goal1 = this.game.add.audio('goal-1');
		this.sounds.push(this.goal1);

		this.goal2 = this.game.add.audio('goal-2');
		this.sounds.push(this.goal2);

		this.peopleOh = this.game.add.audio('people-oh');
		this.sounds.push(this.peopleOh);

		this.public1 = this.game.add.audio('public-1');
		this.sounds.push(this.public1);

		this.kick = this.game.add.audio('kick', 0.3);
		this.sounds.push(this.kick);

		this.game.sound.setDecodedCallback(this.sounds, () => {
			console.log("sounds loaded");
			this.soundsLoaded = true;
			if(this.onSoundsLoaded) {
				console.log("executed callback");
				this.onSoundsLoaded();
			}

		}, this);
	}

	startPublic() {
		this.public1.volume = 0.5
		this.public1.fadeIn(500, true);
	}

	kick() {
		if(!this.kick.isPlaying)
			this.kick.play();
	}


	endPublic() {
		this.public1.fadeOut(500);
	}

	startMatch() {
		this.gameStart.play();
	}

	endMatch() {
		this.gameEnd.play();
		this.endPublic();
	}

	goal() {
		this.goal1.play();
	}

	reaction () {
		this.peopleOh.play();
	}
}

export default SoundManager;