class MonsterRow
{
  constructor(id, game, name, size)
  {
    $('.play_game').append('<div class="'+name+'"></div>')
    this.monsterRow = $(id);
    this.game = game;
    this.name = name;
    this.size = size;
    this.monstersInARow = this.createMonsters();
    this.move(25);
    this.allDead = false;
    this.monsterNumber = 10;
  }

  createMonsters()
  {
    var monsters=[];
    for(var index=0; index<10; index++)
    {
      var monsterID = $('<div class="image"><img id="'+this.name+index+'" src="pic/'+this.name+'.gif" width="'+this.size+'px" height="75px"></div>');
      $('.'+this.name).append(monsterID);
      var monster = new Monster('#'+this.name+index);
      monsters.push(monster);    
    }
    return monsters;
  }

  move(speed)
  {
    if(!this.game.gameOver)
    {
      this.moveRight(this, speed);
    }
  }

  moveDown()
  {
    if(!this.game.gameOver)
    {
      var top=parseInt(this.monsterRow.css('top'));
      this.monsterRow.css('top', top+15+'px');
      this.monsterInvade();
    }
  }

  //move the row leftward
   moveRight(self, speed)
   {
      if(!self.game.gameOver)
      {
        //move the row right one time
        var left=parseInt(self.monsterRow.css('left'));
        self.monsterRow.css('left',(left+speed)+'px');

        if (left <= 140) 
        {
          setTimeout(function(){self.moveRight(self, speed)}, 1000);
        } 
        else 
        {
          self.moveDown();
          setTimeout(function(){self.moveLeft(self, speed)}, 1000);
        }
      }
   }

  //move the row leftward
   moveLeft(self, speed)
   { 
      if(!self.game.gameOver)
      {
        //move the row left one time
        var left=parseInt(self.monsterRow.css('left'));
        self.monsterRow.css('left',(left-speed)+'px');
        if (left >= 30) 
        {
          setTimeout(function(){self.moveLeft(self, speed)}, 1000);
        } 
        else 
        {
          self.moveDown();
          setTimeout(function(){self.moveRight(self, speed)}, 1000);
        }
      }
   }
   monsterInvade()
   {
    if(!this.allDead)
    {
      if(this.name=="yellows" && parseInt(this.monsterRow.css('top'))>=500)
      {
        this.game.main.gameOver(this.game);
            console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
      else if(this.name=="donuts" && parseInt(this.monsterRow.css('top'))>=430)
      {
        this.game.main.gameOver(this.game);
            console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
      else if(this.name=="mushrooms" && parseInt(this.monsterRow.css('top'))>=360)
      {
        this.game.main.gameOver(this.game);
            console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
      else if(this.name=="ghosts" && parseInt(this.monsterRow.css('top'))>=290)
      {
        this.game.main.gameOver(this.game);
            console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
      else if(this.name=="pinkmans" && parseInt(this.monsterRow.css('top'))>=220)
      {
        this.game.main.gameOver(this.game);
            console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
      else if(this.name=="carrots" && parseInt(this.monsterRow.css('top'))>=160)
      {
        this.game.main.gameOver(this.game);
                  console.log(this.name)
      console.log(parseInt(this.monsterRow.css('top')))
      }
    }
   }

   killMonster()
   {
      this.monsterNumber=this.monsterNumber-1;
      if (this.monsterNumber==0)
      {
        this.allDead=true;
      }
   }

}

