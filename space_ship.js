class SpaceShip
{
  constructor(id, game) 
  {
    this.ship = $(id);
    this.game = game;
  }

  //let the space ship to move in certain direction(right or left)
  move(direction)
  {
    if(!this.game.over)
    {
      var speed = 50;
      var left=parseInt(this.ship.css('left'));
      if (direction ==='left' && left<=1100)
      {
        this.ship.css('left',(left+speed)+'px');
      }
      else if (direction ==='right' && left>=30)
      {
        this.ship.css('left',(left-speed)+'px');
      }
    }
  }

  shoot()
  {
    if (!this.game.over)
    {
      var music = new Audio('music/shoot.wav');
      music.volume = 0.38
      music.play();
      var bullet = $('<div class="bullet"></div>');
      $(".bullets").append(bullet);
      bullet.hide();
      var top = this.ship.get(0).getBoundingClientRect().top-15;
      var left = this.ship.get(0).getBoundingClientRect().left+35;
      bullet = new Bullet(bullet, top, left, this.game);
      bullet.moveUp(bullet);
    }
  }
}

