var HomeState = {

preload: function(){},

  create: function() {
	 game.stage.backgroundColor = "#FFC300";
	  
    var background = this.game.add.sprite(0,0,'bg');
    background.inputEnabled = true;
	  
	  var btnselect = this.game.add.button(130, 520, 'button', this.select, this );
	  var btncancel = this.game.add.button(250, 580, 'button', this.cancel, this);
	  var btnok = this.game.add.button(370, 520, 'button', this.ok, this);

    background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);

	  
	
    this.game.add.text(170, 250, 'CLICK TO START!', {font: '40px VT323'});
  
  
  }
};