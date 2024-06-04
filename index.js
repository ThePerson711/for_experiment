const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fps = 50;
const game_interval = 100;
const Space = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,1,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,1,1],
    [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
const SpaceCol = [
    "green",
    "gray",
    "blue",
    "red"
]
let Player1 = {
    self: document.getElementById("palyer1"),
    x: 9,
    y: 2,
    left: false,
    up: false,
    right: false,
    down: false,
    shot: false,
    direction: 0,
    add_pos: {
        x: 0,
        y: 0
    },
    img: document.getElementById("tank_1"),
    f_cd: 0,
    lives: 99
}
let Player2 = {
    self: document.getElementById("palyer2"),
    x: 9,
    y: 7,
    left: false,
    up: false,
    right: false,
    down: false,
    shot: false,
    direction: 2,
    add_pos: {
        x: 0,
        y: 0
    },
    img: document.getElementById("tank_2"),
    f_cd: 0,
    lives: 99
}
let Shoots = [];
const Step = 0.2;
const Shoot_speed = 0.4;
const colldown = 400;

Player1.self.style.width = `${canvas.clientWidth/Space[0].length}px`;
Player1.self.style.height = `${canvas.clientHeight/Space.length}px`;
Player1.add_pos.y = (canvas.offsetHeight-canvas.clientHeight)/2;
Player1.add_pos.x = (canvas.offsetWidth-canvas.clientWidth)/2;

Player2.self.style.width = `${canvas.clientWidth/Space[0].length}px`;
Player2.self.style.height = `${canvas.clientHeight/Space.length}px`;
Player2.add_pos.y = (canvas.offsetHeight-canvas.clientHeight)/2;
Player2.add_pos.x = (canvas.offsetWidth-canvas.clientWidth)/2;

DrawPlayer();
DrawSpace(); 
NewGame();

document.addEventListener('keydown', function(event) {
    if (event.code === "ArrowLeft") {
        Player1.left = true;
    } else if (event.code === "ArrowUp") {
        Player1.up = true;
    } else if (event.code === "ArrowRight") {
        Player1.right = true;
    } else if (event.code === "ArrowDown") {
        Player1.down = true;
    } else if (event.code === "Enter") {
        Player1.shot = true;
        PlayerShoot(1);
    }
    //
    if (event.code === "KeyA") {
        Player2.left = true;
    } else if (event.code === "KeyW") {
        Player2.up = true;
    } else if (event.code === "KeyD") {
        Player2.right = true;
    } else if (event.code === "KeyS") {
        Player2.down = true;
    } else if (event.code === "CapsLock") {
        Player2.shot = true;
        PlayerShoot(2);
    }
});
//
document.addEventListener('keyup', function(event) {
    if (event.code === "ArrowLeft") {
        Player1.left = false;
    } else if (event.code === "ArrowUp") {
        Player1.up = false;
    } else if (event.code === "ArrowRight") {
        Player1.right = false;
    } else if (event.code === "ArrowDown") {
        Player1.down = false;
    } else if (event.code === "Enter") {
        Player1.shot = false;
    }
    if (event.code === "KeyA") {
        Player2.left = false;
    } else if (event.code === "KeyW") {
        Player2.up = false;
    } else if (event.code === "KeyD") {
        Player2.right = false;
    } else if (event.code === "KeyS") {
        Player2.down = false;
    } else if (event.code === "CapsLock") {
        Player2.shot = false;
    }
});
//
//
//
function NewGame() {
    Player1.lives = 3;
    Player2.lives = 3;
    Player1.x = 9;
    Player1.y = 2;
    Player2.x = 9;
    Player2.y = 7;
    id_GAMESTART = setInterval(() => {
        if (Player1.down && Math.round(Player1.x) === Player1.x 
            && Space[Math.floor(Player1.y)+1][Player1.x] === 0) {
                Player1.direction = 2;
                Player1.y+=Step;
        } 
        if (Player1.up && Math.round(Player1.x) === Player1.x 
            && Space[Math.ceil(Player1.y)-1][Player1.x] === 0) {
                Player1.direction = 0;
                Player1.y-=Step;
        }
        if (Player1.left && Math.round(Player1.y) === Player1.y 
            && Space[Player1.y][Math.ceil(Player1.x)-1] === 0) {
                Player1.direction = 3;
                Player1.x-=Step;
        }
        if (Player1.right && Math.round(Player1.y) === Player1.y 
            && Space[Player1.y][Math.floor(Player1.x)+1] === 0) {
                Player1.direction = 1;
                Player1.x+=Step;
        }
        Player1.x = Math.round(Player1.x*100)/100;
        Player1.y = Math.round(Player1.y*100)/100;
        //
        if (Player2.down && Math.round(Player2.x) === Player2.x 
        && Space[Math.floor(Player2.y)+1][Player2.x] === 0) {
            Player2.direction = 2;
            Player2.y+=Step;
        } 
        if (Player2.up && Math.round(Player2.x) === Player2.x 
            && Space[Math.ceil(Player2.y)-1][Player2.x] === 0) {
                Player2.direction = 0;
                Player2.y-=Step;
        }
        if (Player2.left && Math.round(Player2.y) === Player2.y 
            && Space[Player2.y][Math.ceil(Player2.x)-1] === 0) {
                Player2.direction = 3;
                Player2.x-=Step;
        }
        if (Player2.right && Math.round(Player2.y) === Player2.y 
            && Space[Player2.y][Math.floor(Player2.x)+1] === 0) {
                Player2.direction = 1;
                Player2.x+=Step;
        }
        Player2.x = Math.round(Player2.x*100)/100;
        Player2.y = Math.round(Player2.y*100)/100;
        //
        if (Player1.shot) {
            PlayerShoot(1);
        }
        if (Player2.shot) {
            PlayerShoot(2);
        }
        Shoots.forEach(element => {
            if (element.move) {
                if (element.direction === 0) {
                    element.y-=Shoot_speed;
                } else if (element.direction === 1) {
                    element.x+=Shoot_speed;
                } else if (element.direction === 2) {
                    element.y+=Shoot_speed;
                } else if (element.direction === 3) {
                    element.x-=Shoot_speed;
                }
                if (Space[Math.floor(element.y+0.5)][Math.floor(element.x+0.5)] !== 0) {
                    element.move = false;
                } else if (element.type === "player2" 
                    && (element.x-0.5 < Player1.x && Player1.x < element.x+0.5)
                    && (element.y-0.5 < Player1.y && Player1.y < element.y+0.5) ){
                        Player1.lives--;
                        element.move = false;
                } else if (element.type === "player1" 
                    && (element.x-0.5 < Player2.x && Player2.x < element.x+0.5)
                    && (element.y-0.5 < Player2.y && Player2.y < element.y+0.5) ){
                        Player2.lives--;
                        element.move = false;                
                }
            }
        });
        document.getElementById("pl_1_lives").innerHTML = `Lives: ${Player1.lives}`;
        if (Player1.lives === 0 || Player2.lives === 0) {
            alert("GAME OVER");
            NewGame();
            clearInterval(id_GAMESTART);
        }
        DrawSpace();
        ResetDisplay();
;    }, game_interval);
}
//
//
//
function PlayerGo(number_, direction_) {
    if (number_ === 1) {

    }
}
//
//
//
function PlayerShoot(number_) {
    if (number_ === 1) {
        if (Player1.f_cd ===  0) {
            Shoots.push({   x: Player1.x,
                            y: Player1.y,
                            direction: Player1.direction,
                            type: "player1",
                            move: true
            })
            Player1.f_cd = Math.round(colldown/game_interval);
        } else {
            Player1.f_cd-=1;
        }
    } else if (number_ === 2) {
        if (Player2.f_cd === 0) {
            Shoots.push({   x: Player2.x,
                            y: Player2.y,
                            direction: Player2.direction,
                            type: "player2",
                            move: true
            })
            Player2.f_cd = Math.round(colldown/game_interval);
        } else {
            Player2.f_cd-=1;
        }
    }
}
//
//
//
function DrawPlayer() {
    if (Player1.lives > 0) {
        Player1.self.style.transform = 
            `translate(${Player1.add_pos.x+Player1.x*(canvas.clientWidth/Space[0].length)}px, 
            ${Player1.add_pos.y+Player1.y*(canvas.clientHeight/Space.length)}px)`;
        Player1.img.style = `transform: rotate(${Player1.direction*90}deg);`        ;
    } else {
        Player1.self.style.opacity = 0;
        Player1.x = 0;
        Player1.y = 0;
    }
    if (Player2.lives > 0) {
        Player2.self.style.transform = 
            `translate(${Player2.add_pos.x+Player2.x*(canvas.clientWidth/Space[0].length)}px, 
            ${Player2.add_pos.y+Player2.y*(canvas.clientHeight/Space.length)}px)`;
        Player2.img.style = `transform: rotate(${Player2.direction*90}deg);`;
    } else {
        Player2.self.style.opacity = 0;
        Player2.x = 0;
        Player2.y = 0;
    }
}
//
//
//
function ResetDisplay() {
    //document.getElementById("palyer1_lives").innerHTML = 
   ////     `palyer1-lives => ${Player1.lives}`;
   // document.getElementById("palyer2_lives").innerHTML = 
   //     `palyer2-lives => ${Player2.lives}`;
}
//
//
//
function DrawSpace() {
    BL = {
        width: 1000/Space[0].length,
        height: 1000/Space.length
    }
    for (let col = 0; col < Space.length; col++) {
        for (let row = 0; row < Space[0].length; row++) {
            Rectangle({ x1: row*BL.width, 
                        y1: col*BL.height,
                        x2: BL.width,
                        y2: BL.height,
                        LineCol: "red",
                        LineW: 0.1,
                        SpaceCol: SpaceCol[Space[col][row]]
            })
        }
    }    
    Shoots.forEach(shoot => {
        if (shoot.move) {
            ctx.beginPath();
            ctx.arc((shoot.x+0.5)*BL.width, (shoot.y+0.5)*BL.height, BL.width/5, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }
    });
    DrawPlayer();
}
//
//
//
function Rectangle(rec) {
    ctx.beginPath();
    ctx.lineWidth = rec.LineW;
    ctx.strokeStyle = rec.LineCol;
    ctx.rect(rec.x1, rec.y1, rec.x2, rec.y2);
    ctx.closePath();
    ctx.fillStyle = rec.SpaceCol;
    ctx.fill();
    ctx.stroke();
}

//
//
//
//
//
//
var stick1 = document.getElementById('stick1');
var stick2 = document.getElementById('stick2');
//
    //var direction1 = document.getElementById('direction1');
    //var direction2 = document.getElementById('direction2');
//
stick1.addEventListener('touchstart', handleTouchStart.bind(null, stick1, 1), false);
stick1.addEventListener('touchmove', handleTouchMove.bind(null, stick1, 1), false);
stick1.addEventListener('touchend', handleTouchEnd.bind(null, stick1, 1), false);
//
    //stick2.addEventListener('touchstart', handleTouchStart.bind(null, stick2, direction2), false);
    //stick2.addEventListener('touchmove', handleTouchMove.bind(null, stick2, direction2), false);
    //stick2.addEventListener('touchend', handleTouchEnd.bind(null, stick2, direction2), false);
//
var initialX = {};
var initialY = {};
//
function handleTouchStart(stick, direction, evt) {
    initialX[stick.id] = evt.touches[0].clientX - stick.offsetLeft;
    initialY[stick.id] = evt.touches[0].clientY - stick.offsetTop;
   // direction.innerHTML = "Touch";

}
function handleTouchMove(stick, direction, evt) {
    if (initialX[stick.id] === undefined || initialY[stick.id] === undefined) {
        return;
    }
    var newX = evt.touches[0].clientX - initialX[stick.id];
    var newY = evt.touches[0].clientY - initialY[stick.id];

    var boundingRect = stick.parentElement.getBoundingClientRect();
    var maxX = boundingRect.width;// - stick.offsetWidth;
    var maxY = boundingRect.height;// - stick.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    stick.style.left = newX + 'px';
    stick.style.top = newY + 'px';


    var deltaX = newX - stick.offsetLeft;
    var deltaY = newY - stick.offsetTop;

    if (newY < maxY/2 && 
      ((newX <= maxX/2 && newX/newY > 1) || (newX > maxX/2 && (maxX-newX)/newY > 1))) {
      //direction.innerHTML = "Direction: UP";
      Player1.up = false;
      Player1.right = false;
      Player1.down = false;
      Player1.left = true;
    } 
    //
    if (newY > maxY/2 && 
      ((newX <= maxX/2 && newX/(maxY-newY) > 1) || (newX > maxX/2 && (maxX-newX)/(maxY-newY) > 1))) {
      //direction.innerHTML = "Direction: Down";
      Player1.up = false;
      Player1.right = true;
      Player1.down = false;
      Player1.left = false;
    } 
    //
    if (newX < maxX/2 && 
      ((newY <= maxY/2 && newY/newX > 1) || (newY > maxY/2 && (maxY-newY)/newX > 1))) {
      //direction.innerHTML = "Direction: LEFT";
      Player1.up = false;
      Player1.right = false;
      Player1.down = true;
      Player1.left = false;
    } 
    //
    if (newX > maxX/2 && 
      ((newY <= maxY/2 && newY/(maxX-newX) > 1) || (newY > maxY/2 && (maxY-newY)/(maxX-newX) > 1))) {
      //direction.innerHTML = "Direction: RIGHT";
      Player1.up = true;
      Player1.right = false;
      Player1.down = false;
      Player1.left = false;
    } 
    evt.preventDefault();
}
function handleTouchEnd(stick, direction) {
    initialX[stick.id] = undefined;
    initialY[stick.id] = undefined;
    stick.style.left = '50%';
    stick.style.top = '50%';
    Player1.up = false;
    Player1.right = false;
    Player1.down = false;
    Player1.left = false;
    //direction.innerHTML = "Direction: Center";
}
//
//
//
