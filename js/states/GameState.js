//this game will have only 1 state
var GameState = {
	
preload: function(){
	this.load.image('glitch', 'sprites/glitch.png');
	

},

  //executed after everything is loaded
  create: function() {     
	 game.stage.backgroundColor = "#FFC300";
	  
	// game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);
    this.background = this.game.add.sprite(0, 0, 'bg');
  	var btnselect = this.game.add.button(130, 520, 'button', this.select, this );
	this.selector = 0;
	var btncancel = this.game.add.button(250, 580, 'button', this.cancel, this);
	var btnok = this.game.add.button(370, 520, 'button', this.ok, this);

	  
	//stuff to select
	  this.food = this.game.add.image(150, 450, 'foodg');
	  this.play = this.game.add.image(220, 450, 'playg');
	  this.medicine = this.game.add.image(290, 450, 'medicineg');
	  this.clean = this.game.add.image(350, 450, 'cleang');
	  
	  
	  //timer to change status variables.
	  this.timer = game.time.create(false);
	  
	  //timer does soemthing every 5 seconds (for now)
	  this.timer.loop(3000, this.timerGo, this);
	  //start timer
	  
	  //starting variables
	  this.hunger = 10;
	  this.fun = 10;
	  this.health = 10;
	  this.cleanliness = 10;
	  this.life = 0;
	  this.wasfed = false;
	  this.isteen = false;
	  this.isadult = false;
	  
	  //starts on load: break the egg after 4 seconds
	  this.firstTimer = game.time.events.add(Phaser.Timer.SECOND * 4, this.breakegg, this);
	  
	  //character
	  this.tama = this.game.add.image(200, 200, 'egg');
	  this.tamaSet = false;
	  
	  //text
	  this.lifetext=  this.game.add.text(200, 50, 'Life: ' + this.life, {font: '40px VT323'});
	  	  
	  		  //audio
	 
	this.eatSound = game.sound.add('eatfx');
	this.healthySound = game.sound.add('goodx');
	this.cleanSound = game.sound.add('cleanfx');
	this.funSound = game.sound.add('happyfx');
	  
	 this.boredSound = game.sound.add('boredfx');
	this.hungrySound =   game.sound.add('hungryfx');
	this.sickSound =  game.sound.add('sickfx');
	this.dirtySound =  game.sound.add('dirty');
	this.bornSound = game.sound.add('bornfx');
	  this.deadSound = game.sound.add('deadfx');

	  this.glitch = game.add.image(430, 200, 'glitch');
	  
	  
},
	
	//egg braks just changes animation for 1/2 second then calls hatch	
	breakegg: function(){
		this.tama.loadTexture('hatch');
		this.newTimer= game.time.events.add(Phaser.Timer.SECOND * .5, this.hatchegg, this);
		this.life = 1;
		this.lifetext.setText("Life: " + this.life);
		
	},
	
	//hatch shows the baby born and calls the next timeer
	hatchegg: function(){
		this.tama.loadTexture('birth');
		//starts on load: we are going to be a baby for the first X seconds of the game. babies don't get sick just wait for food
		this.babyTimer = game.time.events.add(Phaser.Timer.SECOND * 4, this.beyoung, this);
		this.finalTimer(); 
		this.life = 2;
		this.lifetext.setText("Life: " + this.life);
		this.bornSound.play();
		
	},
	
	//finaltimer creates a new timer that starts the game counter that has character jump back and forth on screen
	finalTimer: function(){
		this.finaltime = game.time.create(false);
		this.finaltime.loop(1000, this.tweener, this);
		this.finaltime.start();
		this.life = 3;
		this.lifetext.setText("Life: " + this.life);
		
}, 
	
	tweener: function(){
		if(this.tamaSet === false){
			//starting position
			this.tamaSet = true;
			this.game.add.tween(this.tama).to({x: 240}, 500, Phaser.Easing.Bounce.Out, true);
		}
		else{
			this.tamaSet = false;
			this.game.add.tween(this.tama).to({x: 200}, 500, Phaser.Easing.Bounce.Out, true);
		}
		
		
	},
	
	//beyoung is baby time for first ten seconds, then load the teen
	beyoung: function(){
		this.life = 4;
		
		this.lifetext.setText("Life: " + this.life);
		this.tama.loadTexture('young');
		this.teenTimer = game.time.events.add(Phaser.Timer.SECOND * 5, this.beteen, this);
	},
	
	//beteen loads after baby is finished. game timer starts: timerstart calls timerGo
	beteen: function(){
		this.tama.loadTexture('teen');
		this.isteen = true;
		this.timer.start();
		this.life = 5;
		
		this.lifetext.setText("Life: " + this.life);
	},
	
//called every second by timer, this increases life every second
	timerGo: function(){
				
		this.life ++;

		//choose a random thing to deduct every 5 seconds
		this.number = this.game.rnd.integerInRange(0, 4);
		//subtract from vars depending on random number
		
		if(this.number === 1){
			this.hunger --;
			this.glitch.loadTexture('hungry');
			this.hungrySound.play();
			
		}
		else if(this.number === 2){
			this.fun --;
			this.glitch.loadTexture('bored');
			this.boredSound.play();
			
		}
		else if(this.number ===3){
			this.health --;
			this.glitch.loadTexture('sicky');
			this.sickSound.play();
						
		}
			else if(this.number ===4){
				this.cleanliness--;
				this.glitch.loadTexture('poop');
				this.dirtySound.play();
		}
		
		
		//check vars chcks all of our variables every second for significant change
	this.checkvars();

	},
	
	//checks all variabes. called every second by timerGo
	checkvars: function(){
		//check if life is les than 1 minute and show teenager if so
		
		//update text
		this.lifetext.setText("Life: " + this.life);
		
		// -->CHANGE THIS VAR
		if(this.life <= 20){
			this.isteen = true;
			this.isadult = false;
		}
		else{
			this.isadult = true;
			this.isteen = false;
		}
		
		//if hunger drops below 5 change anim
		if(this.hunger <= 5 && this.hunger > 0){
			console.log('hungry');
				if(this.isteen){
					this.tama.loadTexture('teenangry');
				}
				else{
					this.tama.loadTexture('angry');
				}
		}
		//if hunger reaches 0 game over
		else if(this.hunger === 0){
			this.tama.loadTexture('dead');
			this.gameover();
		}
		
		//if health is less than 5 change anim
		if(this.health <= 5 && this.health > 0){
			if(this.isteen){
					this.tama.loadTexture('teensick');
				}
				else{
					this.tama.loadTexture('sick');
				}	
		}
		//if heealth reaches zeero playeer dies
		else if(this.health ===0){
			this.tama.loadTexture('dead');
			this.gameover();
			}

		// fun drop below 5 change anim
		if(this.fun <=5 && this.fun > 0){
				if(this.isteen){
					this.tama.loadTexture('teensad');
				}
				else{
				this.tama.loadTexture('sad');
				}
		}
		//if zero player dies
		else if(this.fun ===0){
			this.tama.loadTexture('dead');
			this.gameover();
		}
		
		//if dirty below 5 change anim
		if(this.cleanliness <=5 && this.cleanliness > 0){
		
			if(this.isteen){
				this.tama.loadTexture('teensick');
			}
			else{
				this.tama.loadTexture('sick');
			}
		}
		//if dirty is 0 playeer dies
		else if(this.cleanliness ===0){
			this.tama.loadTexture('dead');
			this.gameover();
		}

},

	//changes texture back to normal. checks age first
	backtonormal: function(){
		this.checkvars();
		if(this.isDead){
			this.tama.loadTexture('dead');
		}
		else{
		//change texture back to normal check age first
		if(this.isteen){
			this.tama.loadTexture('teen');
		}
		else{	this.tama.loadTexture("grownup");
		}
		}
	},
	//select is triggered by player selecting one of items to feed
	select: function(){
		//increase selection
		this.selector += 1;
			
		if(this.selector ===1){
			//select food
			this.food.loadTexture('food');
			//deselect allothers
			this.play.loadTexture('playg');
			this.medicine.loadTexture('medicineg');
			this.clean.loadTexture('cleang');
		}
		else if(this.selector ===2){
			//select play
			this.play.loadTexture('play');
			//deselect allothers
			this.food.loadTexture('foodg');
			this.medicine.loadTexture('medicineg');
			this.clean.loadTexture('cleang');
			
		}
		else if(this.selector ===3){
			//select medicine
			this.medicine.loadTexture('medicine');
			
				//deselect allothers
			this.food.loadTexture('foodg');
			this.play.loadTexture('playg');
			this.clean.loadTexture('cleang');
		}
		
		else if(this.selector ===4){
			
			this.clean.loadTexture('clean');
			//deselect allothers
			this.food.loadTexture('foodg');
			this.medicine.loadTexture('medicineg');
			this.play.loadTexture('playg');
			}
		else{
			this.selector = 0;
			this.select();
		}
		
		
		
	},
	
	cancel: function(){
		//reset buttons to start
		this.selector =1;
		//deselect all
		this.food.loadTexture('foodg');
		this.play.loadTexture('playg');
		this.medicine.loadTexture('medicineg');
		this.clean.loadTexture('cleang');
		
		
	},
	ok: function(){
		//enter: what is current selection? add to actions.
		if(this.selector === 1){
			//add food
			this.hunger ++;
			this.eatSound.play();
			
			//check age and change char
				if(this.isteen){
					this.tama.loadTexture('teeneat');
					//wait for a moment, then swap back
					this.eatTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
				}
					else if (this.isadult){
					this.tama.loadTexture('eat');
					this.eatTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
				}
			
					
		}
		else if(this.selector === 2){
			this.fun ++;
			this.funSound.play();
			if(this.isteen){
				this.tama.loadTexture('teenhappy');
				this.playTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
			else if(this.isadult){
				this.tama.loadTexture('happy');
				this.playTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
			
		}
		
		else if(this.selector === 3){
				//medicine
			this.health ++;
			this.healthySound.play();
			if (this.isteen){
				this.tama.loadTexture('teenhappy');
				this.healthTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
			else if(this.isadult){
				this.tama.loadTexture('happy');
				this.healthTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
	
			
		}
		else if(this.selector === 4){
				//clean
			this.cleanliness ++;
			this.cleanSound.play();
						
			if(this.isteen){
				this.tama.loadTexture('teenhappy');
				this.cleanTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
			else if(this.isadult){
				this.tama.loadTexture('happy');
				this.cleanTimer = game.time.events.add(Phaser.Timer.SECOND * 1, this.backtonormal, this);
			}
				}
	},
	
	gameover: function(){
		this.isDead = true;
		this.deadSound.play();
		this.timer.stop();
		this.finaltime.stop();
		//show dead animation
		this.tama.kill();
		this.tamadead = this.game.add.image(200, 200, 'dead');
		this.game.add.text(200, 80, 'You killed him!', {font: '40px VT323'});
		this.game.add.text(200, 120, "Final age: " + this.life, {font: '40px VT323'});
	},
	
	update:function(){}

	
};