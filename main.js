class Main
{

  playAgain()
  {
    $('body').append('<div class="play_game"></div>');
    $('.play_game').append('<div class="game_state"></div>');
    $('.game_state').append('<div class="text level"></div>');
    $('.game_state').append('<div class="text score"></div>');
    $('.game_state').append('<div class="text lives"></div>');
    $('.play_game').append('<div id="space_ship"></div>');
    $('.play_game').append('<div class="bullets"></div>');
  }

  continue(game)
  {
    game.gameOver=true;
    $('.play_game').remove();
    var picNum = Math.floor((Math.random() * 10)) + 1;
    $('body').append('<div class="continue"></div>')
    $('.continue').append('<div class="text title">You kill all the monsters!</div>');
    $('.continue').append('<div id="welcome_image"><img src="'+picNum+'.gif" width="400px"></div>');
    $('.continue').append('<div class="container topBotomBordersOut" id="continue"><a>Continue</a></div>');
    $('#continue').click(function(){
      main.nextGame(game);
    });
  }

  nextGame(game)
  {
    $('.continue').remove();
    var level = game.level+1;
    var score = game.score;
    var lives = game.numLives;
    main.playAgain();
    game = new Game(main, level, score, lives);
    $(document).keydown(function(e)
    {
      if(e.which===37)
      {
        game.spaceShip.move('right');
      }
      else if(e.which===39)
      {
        game.spaceShip.move('left');
      }    
      else if(e.which==38)
      { 
        if(game.canShoot==true)
        {
          game.spaceShip.shoot();
          game.canShoot=false;
          game.spaceShipWaitToShoot(game);
        }
      }
    });
  }

  gameOver(game)
  {
    playAgain=true;
    game.gameOver = true;
    $('.play_game').remove();
    this.gameOverHTML(game.score);
    submitScore(game.score);
  }

  gameOverHTML(score)
  {
    var picNum = Math.floor((Math.random() * 10)) + 1;
    $('body').append('<div class="game_over"></div>')
    $('.game_over').append('<div class="text title">Game Over</div>');
    $('.game_over').append('<div id="game_over_image"><img src="pic/'+picNum+'.gif" width="400px"></div>');
    $('.game_over').append('<div class = "scores"></div>');
    $('.scores').append('<div class = "text" id="score">Your Score: '+score+'</div>');
    $('.game_over').append('<div class="container topBotomBordersOut" id="game_over"><a>Play Again</a></div>');
    $('#game_over').click(function(){
      music.pause();
      $('.game_over').remove();
      welcomeHTML();
    });
  }
}
      

$(document).ready(function(){
  playAgain = false;
  welcomeHTML();
});

function welcomeHTML()
{
  var picNum = Math.floor((Math.random() * 10)) + 1;
  $('body').append('<div class="welcome"></div>')
  $('.welcome').append('<div class="text title">GHOSTS HUNTING</div>');
  $('.welcome').append('<div id="welcome_image"><img src="pic/'+picNum+'.gif" width="400px"></div>');
  $('.welcome').append('<div class="container topBotomBordersOut" id="start"><a>Start Game</a></div>');
  $('#start').click(function(){
    $('.welcome').remove();
    playGame();
  });
}


function playGame(){
  music = new Audio('music/music.mp3');
  music.play();
  main = new Main();
  if(playAgain)
  {
    main.playAgain();
  }
  game = new Game(main, 1, 0, 3);
  $(document).keydown(function(e)
  {
    if(e.which===37)
    {
      game.spaceShip.move('right');
    }
    else if(e.which===39)
    {
      game.spaceShip.move('left');
    }    
    else if(e.which==38)
    { 
        if(game.canShoot==true)
        {
          game.spaceShip.shoot();
          game.canShoot=false;
          game.spaceShipWaitToShoot(game);
        }
    }
  });
}

