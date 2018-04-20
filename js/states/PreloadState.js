var PreloadState = {
	//load the game assets before the game starts
  preload: function() {
	  
	  game.scale.pageAlignHorizontally = true;
	  game.scale.refresh();
	  
	  
	this.load.image('preloadBar', 'assets/images/bar.png');
	  
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('bg', 'bg.png');    
    this.load.image('button', 'sprites/button.png');    
    this.load.image('angry', 'sprites/angry.png');
	 this.load.image('birth', 'sprites/biirth.png');
	  this.load.image('clean', 'sprites/clean.png');
	  this.load.image('dead', 'sprites/dead.png');
	  this.load.image('eat', 'sprites/eat.png');
	  this.load.image('egg', 'sprites/egg.png');
	  this.load.image('food', 'sprites/food.png');
	  this.load.image('grownup', 'sprites/grownup.png'); 
	  
	   this.load.image('happy', 'sprites/happy.png');
	   
	  this.load.image('hatch', 'sprites/hatch.png');
	  this.load.image('medicine', 'sprites/medicine.png');
	  this.load.image('play', 'sprites/play.png');
	   
	   this.load.image('sad', 'sprites/sad.png');
	   this.load.image('sick', 'sprites/sick.png');
	   this.load.image('teen', 'sprites/teen.png');
	  this.load.image('young', 'sprites/young.png');
	
	  
	  this.load.image('teenhappy', 'sprites/teenhappy.png');
	  this.load.image('teenangry', 'sprites/teenangry.png');
	  this.load.image('teensad', 'sprites/teensad.png');
	  this.load.image('teeneat', 'sprites/teeneat.png');
	  this.load.image('teensick', 'sprites/teensick.png');
	  
	  
	  this.load.image('playg', 'sprites/playg.png');
	   this.load.image('medicineg', 'sprites/medicineg.png');
	  this.load.image('cleang', 'sprites/cleang.png');
	  this.load.image('foodg', 'sprites/foodg.png');
	  
	  //status
	  this.load.image('poop', 'sprites/poop.png');
	  this.load.image('bored', 'sprites/bored.png');
	  this.load.image('hungry', 'sprites/hungry.png');
	  this.load.image('sicky', 'sprites/sickicon.png');
	  
	  
	  //audio
	  game.load.audio('boredfx', 'sound/bad.mp3');
	   game.load.audio('eatfx', 'sound/eat.mp3');
	     game.load.audio('happyfx', 'sound/happy.mp3');
	   game.load.audio('boredfx', 'sound/sad.mp3');
	  game.load.audio('hungryfx', 'sound/sick.mp3');
	   game.load.audio('sickfx', 'sound/sicker.mp3');
	   game.load.audio('dirty', 'sound/vbad.mp3');
	   game.load.audio('cleanfx', 'sound/clean.mp3');
	   game.load.audio('goodfx', 'sound/good.mp3');
	  game.load.audio('deadfx', 'sound/dead.mp3');
	  game.load.audio('bornfx', 'sound/born.mp3');
	  game.load.audio('cleanx', 'sound/cleanx.mp3');
	  game.load.audio('goodx', 'sound/goodx.mp3');
	  
  },
  create: function() {
    this.state.start('HomeState');
  }
};