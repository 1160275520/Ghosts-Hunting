class Game
{
  constructor(main, level, score, lives)
  {
      this.level = level;
      this.score = score;
      this.numLives = lives;
      this.startGame();
      this.main = main;
      this.spaceShip = new SpaceShip('#space_ship', this);
      this.monstersMatrix = this.createMonsterMatrix();
      this.numMonsters = this.countMonsters();
      this.gameOver = false;
      this.canShoot = true;
  } 

  spaceShipWaitToShoot(self){
    setTimeout(function(){self.canShoot=true}, 500)
  }

  createMonsterMatrix()
  {
    if(this.level==1)
    {
      this.monsterRow3 = new MonsterRow('.yellows', this, 'yellows', 40);
      this.monsterRow2 = new MonsterRow('.donuts', this, 'donuts', 55);
      this.monsterRow = new MonsterRow('.mushrooms', this, 'mushrooms', 55);
      return [this.monsterRow, this.monsterRow2, this.monsterRow3]
    }
    else if(this.level==2)
    {
      this.monsterRow4 = new MonsterRow('.yellows', this, 'yellows', 40);
      this.monsterRow3 = new MonsterRow('.donuts', this, 'donuts', 55);
      this.monsterRow2 = new MonsterRow('.mushrooms', this, 'mushrooms', 55);
      this.monsterRow = new MonsterRow('.ghosts', this, 'ghosts', 70);
      return [this.monsterRow, this.monsterRow2, this.monsterRow3, this.monsterRow4];
    }
    else if(this.level==3)
    {
      this.monsterRow5 = new MonsterRow('.yellows', this, 'yellows', 40);
      this.monsterRow4 = new MonsterRow('.donuts', this, 'donuts', 55);
      this.monsterRow3 = new MonsterRow('.mushrooms', this, 'mushrooms', 55);
      this.monsterRow2 = new MonsterRow('.ghosts', this, 'ghosts', 70);
      this.monsterRow = new MonsterRow('.pinkmans', this, 'pinkmans', 70);
      return [this.monsterRow, this.monsterRow2, this.monsterRow3, this.monsterRow4, this.monsterRow5];
    }
    else 
    {
      this.monsterRow6 = new MonsterRow('.yellows', this, 'yellows', 40);
      this.monsterRow5 = new MonsterRow('.donuts', this, 'donuts', 55);
      this.monsterRow4 = new MonsterRow('.mushrooms', this, 'mushrooms', 55);
      this.monsterRow3 = new MonsterRow('.ghosts', this, 'ghosts', 70);
      this.monsterRow2 = new MonsterRow('.pinkmans', this, 'pinkmans', 70);
      this.monsterRow = new MonsterRow('.carrots', this, 'carrots', 65);
      return [this.monsterRow, this.monsterRow2, this.monsterRow3, this.monsterRow4, this.monsterRow5, this.monsterRow6];
    }
  }

  countMonsters()
  {
    if (this.level==1)
    {
      return 30;
    }
    else if (this.level==2)
    {
      return 40;
    }
    else if (this.level==3)
    {
      return 50
    }
    else
    {
      return 60;
    }
  }

  startGame()
  {
    this.setBackground();
    this.livesHTML()
    $('.level').append('<div>Level: '+this.level+'</div>');
    $('.score').append('<div>Score: '+this.score+'</div>');
    $('#space_ship').append('<img id="space_ship_image" src="pic/space_ship.gif" width="50px">');
    var self = this;
    setTimeout(function(){self.monsterShoot(self)}, 1000);
  }

  livesHTML()
  {
    $('.lives').append('<div>Lives:</div>');
    if (this.numLives==3)
    {
      $('.lives').append('<div><img id="1st" src="pic/life.gif" width="30px"></div>');
      $('.lives').append('<div><img id="2nd" src="pic/life.gif" width="30px"></div>');
      $('.lives').append('<div><img id="3rd" src="pic/life.gif" width="30px"></div>');
    }
    else if (this.numLives==2)
    {
      $('.lives').append('<div><img id="1st" src="pic/life.gif" width="30px"></div>');
      $('.lives').append('<div><img id="2nd" src="pic/life.gif" width="30px"></div>');
    }
    else
    {
      $('.lives').append('<div><img id="1st" src="pic/life.gif" width="30px"></div>');
    }
  }

  setBackground()
  {
    if (this.level<=10)
    {
      $('body').css('background-image', 'url(pic/background'+this.level+'.jpg)');        
    }
    else
    {
      var backgroundNum = Math.floor((Math.random() * 10))+1;
      $('body').css('background-image', 'url(pic/background'+backgroundNum+'.jpg)');        
    }

  }

  //update the number of lives and the picture of lives on page
  loseLife(self)
  {
    if(self.numLives==3)
    {
       $('#3rd').remove();
       self.numLives=2;
    }
    else if (self.numLives==2)
    {
       $('#2nd').remove();
       self.numLives=1;
    }
    else
    {
       $('#1st').remove();
       self.numLives=0;
       setTimeout(self.main.gameOver(self),1500);
    }
  }

  updateScore()
  {
    this.score = this.score+10;
    $('.score').text("Scores: "+this.score);
  }

  checkMonstersLeft()
  {
    this.numMonsters = this.numMonsters-1;
    if (this.numMonsters==0)
    {
      this.main.continue(this);
    }
  }

  shoot(monster, game)
  { 
    var top = monster.image.get(0).getBoundingClientRect().bottom-10;
    var left = monster.image.get(0).getBoundingClientRect().left+35;
    var bullet = $('<div class="bullet"></div>');
    $(".bullets").append(bullet);
    bullet.hide();
    var bullet = new Bullet(bullet, top, left, game);
    bullet.moveDown(bullet);
  }

  monsterShoot(self)
  {
    if (!self.gameOver)
    {
      var waitToShoot = true;
      while(waitToShoot && self.numLives!=0 && self.numMonsters!=0)
      {
        var colNum = Math.floor((Math.random() * 10));
        for (var rowNum = 0; rowNum < self.monstersMatrix.length; rowNum++)
        {
          var monster = self.monstersMatrix[rowNum].monstersInARow[colNum];
          if (monster.alive)
          {
            self.shoot(monster,self);
            waitToShoot = false;
            break;
          }
        }
            
      }
      setTimeout(function(){self.monsterShoot(self)}, 1000);
    }     
  }
}




