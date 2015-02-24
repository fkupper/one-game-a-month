var playState = {

	create: function() {
		this.player = game.add.sprite(game.world.centerX, game.world.height - 80, 'player');
		this.player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(this.player);

		this.cursor = game.input.keyboard.createCursorKeys();

	},

	update: function() {
		this.movePlayer();
	},

	movePlayer: function() {
		// If the left arrow key is pressed

		if (this.cursor.left.isDown) {

			// Move the player to the left

			this.player.body.velocity.x = -200;

		}

		// If the right arrow key is pressed
		else if (this.cursor.right.isDown) {

			// Move the player to the right

			this.player.body.velocity.x = 200;

		}

		// If neither the right or left arrow key is pressed
		else {

			// Stop the player

			this.player.body.velocity.x = 0;

		}

		
	}
	
};