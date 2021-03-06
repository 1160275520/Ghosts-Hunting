class Bullet
{
   constructor(id, top, left, game)
   {
      this.speed=15;
      this.bullet= id;
      this.top = top;
      this.left = left;
      this.game = game;
      this.monstersMatrix = this.game.monstersMatrix;
      this.showBullet();
   }

   //show bullet at the specified position
   showBullet()
   {
    this.bullet.css('left', this.left+'px');
    this.bullet.css('top', this.top+'px');
    this.bullet.show();
   }

   //move up the bullet multiple times
   moveUp(self)
   {
      if(!self.game.gameOver)
      {
        //move up the bullet one time
        var top=parseInt(self.bullet.css('top'));
        self.bullet.css('top',(top-this.speed)+'px');
        //if the bullet does not shoot the space ship and it is still in the space of the screen, 
        //the bullet continue to move
        if (!self.checkShootMonster() && top > -250)
        {
          setTimeout(function(){self.moveUp(self)}, 100);
        } 
        //otherwise, the bullet disappears
        else
        {
          self.bullet.remove();
        }
      }
   }

   moveDown(self)
   {

    if(!self.game.gameOver)
    {
      var top=parseInt(self.bullet.css('top'));
      self.bullet.css('top',(top+this.speed)+'px');
      if (!this.checkShootSpaceShip() && top < 900)
      {
        setTimeout(function(){self.moveDown(self)},100);
      }
      else
      {
        self.bullet.remove();
      }
    }
   }

   //check if the bullet shoot the monster 
   checkShootMonster()
   {
      var bulletTop=parseInt(this.bullet.position().top)-20;
      var bulletLeft=parseInt(this.bullet.position().left);

      //check for everyrow
      for (var j=0; j<this.monstersMatrix.length; j++)
      {
        var monsterRow = this.monstersMatrix[j];
        //check for every monster in the row
        for (var i=0; i<10;i++)
        {
          var monster = monsterRow.monstersInARow[i];
          var targetTop = parseInt(monster.image.position().top)+ parseInt($('.'+monsterRow.name).position().top)+20;
          var targetLeft = parseInt(monster.image.position().left)+parseInt($('.'+monsterRow.name).position().left)+6;

          //the the bullet is in the same position range of the monster, the monster dies
          if(bulletTop<targetTop && bulletTop>targetTop-60 && bulletLeft>targetLeft-2 && bulletLeft<targetLeft+42 && monster.alive == true)
          {
            //add animation effects when monster dies
            monster.alive = false;
            monster.image.attr('src','pic/death.gif');
            setTimeout(function(){monster.image.attr('src','pic/transparent.png')},500);
            setTimeout(function(){monster.image.remove()},500);

            //update score 
            this.game.updateScore();

            //call another function to check if all the monsters are died. 
            this.game.checkMonstersLeft();

            //add sound effect when monster dies
            var music = new Audio('music/death1.mp3');
            music.volume = 0.4
            music.play();

            //call another function to update the information of number of monsters in a row. 
            monsterRow.killMonster();
            return true;           
          }
        }
      }
      return false;
   }

   //check if the bullet shoot the spaceship 
   checkShootSpaceShip()
   {
      var bulletTop=parseInt(this.bullet.css('top'))+10;
      var bulletLeft=parseInt(this.bullet.css('left'));
      var top = this.game.spaceShip.ship.get(0).getBoundingClientRect().top;
      var left = this.game.spaceShip.ship.get(0).getBoundingClientRect().left;

      //the the bullet is in the same position range of the monster, the monster dies
      if(bulletTop>top && bulletTop<top+70 && bulletLeft>left+4 && bulletLeft<left+46)
      {
        //add animation effects when spaceship is shooted
        var image = $('#space_ship_image');
        image.attr('src','pic/death.gif');
        setTimeout(function(){image.attr('src','pic/space_ship.gif')},1000);

        //call another function to update the life of the monster
        this.game.loseLife(this.game);

        //add sound effects when spaceship is shooted
        var music = new Audio('music/death2.wav');
        music.volume = 0.6
        music.play();
        return true;
      }
      return false;
   }
}
