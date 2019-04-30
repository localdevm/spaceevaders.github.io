//TODO ###############################################################################
// Add mute button
// Fix collision / maak beter
// High score met database


//####################################################################################

//Declareren van variabelen
var canvas, ctx;
var lander1 = new lander(0, 600); //Nieuw opbject lander1
var asteroids = []; //Aanmaken array asteroids
var leven = 0;
var score = 0;
var audio = new Audio('explosion.mp3');
var background = new Audio('background.mp3');

function lander(wx, wy){ //Aanmaken functie lander
	var vm = this; //vm toewijzen aan .this functie om verwarring te voorkomen
	var img = new Image(); 				//
	img.src = "LunarLander.png";	//Aanmaken IMG1 en Source meegven
	vm.wx = wx;										//
	vm.wy = wy;										//
	vm.breedte = 250;							//Meegeven public variabelen wx, wy en breedte
	vm.wwidth = 100;
	vm.wheight = 100;

	vm.Draw = function(ctx){
		ctx.drawImage(img, vm.wx, vm.wy,vm.wwidth,vm.wheight); //Maken functie Draw op canvas context, deze dan tekenen
	}
}

function asteroid(){
	var rm = this;
	var img2 = new Image();
	img2.src = "Asteroid.png";
	rm.ax = Math.floor(Math.random()*1800); //Aanmaken van ax en random x-waarde meegeven tussen 0 en 1800
	rm.ay = Math.floor(Math.random()*-1000);//aanmaken van ay en random y-waarde meegeven tussen 0 en -1000
	rm.speed = 3;
	rm.awidth = 25;
	rm.aheight = 25;

	rm.Draw = function(ctx){
		ctx.drawImage(img2, rm.ax, rm.ay, 50, 50);
	}
}

$(window).load(function(){
	console.log("This works function load");
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	background.play();

	document.onkeypress = function (e) {

		leven = 1;
	};

	$("body").mousemove(function (arg)
	{

		//if((!(arg.pageY-100 > canvas.height-lander1.height))&&(!(arg.pageY < canvas.height)))
		//lander1.wy = arg.pageY-200; //aangezien het canvas niet volledig tegen de rand van het scherm staat moeten we 10px aftrekken van de y-waarde van de muispositie
		//de x-coördinaat van de heks wordt aangepast naar het x-argument van de eventhandler zolang de gebruiker niet links of rechts het canvas gaat
		if((!(arg.pageX-100 > canvas.width-lander1.breedte))&&(!(arg.pageX-30 < 0)))
		lander1.wx = arg.pageX-30; //aangezien het canvas niet volledig tegen de rand van het scherm staat moeten we 10px aftrekken van de x-waarde van de muispositie
	});


	Welkom();
});

function Gameover(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ctx.font = "200px Sans-Serif";
	ctx.fillStyle = "cyan";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER",canvas.width/2,canvas.height/2);
	ctx.fillText("score " + score,canvas.width/2,canvas.height/2 + 220);
	ctx.font = "50px Sans-Serif";
	ctx.fillText("Press any key to continue",canvas.width/2,canvas.height/2 + 340);


	console.log("Het werkt");
	if (leven == 1){
		for (var i = 0; i < 30; i++)
			asteroids[i] = new asteroid();
		score = 0;
		setTimeout(Animate, 15);
	}
	else
	setTimeout(Gameover, 15);

}

function Welkom(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	ctx.font = "200px Sans-Serif";
	ctx.fillStyle = "cyan";
	ctx.textAlign = "center";
	ctx.fillText("SPACE EVADERS",canvas.width/2,canvas.height/2);
	ctx.fillText("By Maarten Wachters",canvas.width/2,canvas.height/2 + 220);
	ctx.font = "50px Sans-Serif";
	ctx.fillText("Press any key to continue",canvas.width/2,canvas.height/2 + 340);


	console.log("Het werkt");
	if (leven == 1){
		for (var i = 0; i < 30; i++)
			asteroids[i] = new asteroid();
		score = 0;
		setTimeout(Animate, 15);
	}
	else
	setTimeout(Welkom, 15);

}

function Animate(){
	ctx.clearRect(0, 0, 1900, 800);
	for(var i = 0; i < 30; i++)

	{


		if (asteroids[i] != undefined && asteroids[i].ay > 800) { //Altijd check voor undefined eerst -> anders crasht hij voor hij kan checken
			score = score + 5;
		}
		if (asteroids[i] == undefined || asteroids[i].ay > 800) {
			asteroids[i] = new asteroid();
		}//Als object niet bestaat of uit scherm is, maken we het aan
		if (asteroids[i].ax < lander1.wx + lander1.wwidth &&
			asteroids[i].ax + asteroids[i].awidth > lander1.wx &&
			asteroids[i].ay < lander1.wy + lander1.wheight &&
			asteroids[i].aheight + asteroids[i].ay > lander1.wy){

				console.log("Boom");
				leven = 0;
				audio.play();


			}

			asteroids[i].Draw(ctx);
			asteroids[i].ay += asteroids[i].speed;
			asteroids[i].speed += Math.floor(Math.random()*3) - 1;
			if (asteroids[i].speed < 4)
			asteroids[i].speed = 4;
			if (asteroids[i].speed > 8 + score/100)
			asteroids[i].speed = 8 + score/100;

			//		asteroids[i].Draw
		}
		$(".score").text(score);
		lander1.Draw(ctx);
		console.log(leven);
		//zorgt ervoor dat constant loopt
		if (leven == 1)
		setTimeout(Animate,15);
		else {
			setTimeout(Gameover,15);
		}
	}

	/*
	function update() {
	// spawn shit here
	setTimeout( update,  deltaTimed);
}
function render() {
requestAnimationFrame(render);
// render all sprites here
}

*/




//Function move lander
//Function drop star
