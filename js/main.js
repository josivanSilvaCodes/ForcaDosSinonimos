	// imports of external files	
	document.write("<script src='js/spritesheet.js' type='text/javascript'></script>");
	
	//global variables
	var canvas;
	var ctx; 
	var background;
	var width = 1024;
	var height = 768;
 
	var cloud;
	var cloud_x;
	var cloud_on;
 
	function start(cloudOn, bgSrc) {

		cloud_on = cloudOn;
		background = new Image();
		background.src = 'images/' + bgSrc;	

		// acessando um canvas do arquivo menu.html
		canvas = document.getElementById("cloud_demo_canvas");
		width = canvas.width;
		height = canvas.height;
		
		ctx = canvas.getContext("2d");	

		var canvas0 = document.getElementById('fly');
		canvas0.style.top  = 460;
		canvas0.style.left = -330;	
		// para animar o boneco, é necessário passar o canvas, a imagem/spritesheet
		// também a largura e a altura de cada frame e o total de frames da animação
		var b = new SpriteSheet(canvas0, 0, 0, 'images/butterfly_.png', 44, 42, 44, 0, 7);				
		// depois é só chamar o setInterval para repetir o método de animação escolhido
		window.setInterval(b.animar, 150);	
		
		// boneco 1 e animação dele (o objeto Boneco está no código boneco.js)
		var canvas0 = document.getElementById('fly');
		canvas0.style.top  = 460;
		canvas0.style.left = -330;	
		// para animar o boneco, é necessário passar o canvas, a imagem/spritesheet
		// também a largura e a altura de cada frame e o total de frames da animação
		var b = new SpriteSheet(canvas0, 0, 0, 'images/butterfly_.png', 44, 42, 44, 0, 7);				
		// depois é só chamar o setInterval para repetir o método de animação escolhido
		window.setInterval(b.animar, 150);					

		var canvas1 = document.getElementById('sun');
		canvas1.style.top  = 10;
		canvas1.style.left = 20;
		
		var c = new SpriteSheet(canvas1, 0, 0, 'images/sadsun.png', 84, 77, 84, 0, 2);
		window.setInterval(c.animar, 250);
				
		var canvas2 = document.getElementById('corvo');	
		canvas2.style.top  = 265;
		canvas2.style.left = -470;	
		canvas2.style.zIndex = 15;	
		var d = new SpriteSheet(canvas2, 0, 0, 'images/corvo.png', 54, 97, 54, 0, 5);
		window.setInterval(d.animar, 250);
				
		var sound1 = document.getElementById("audio1");
		sound1.play();
		
		// init cloud
		cloud = new Image();
		if(cloud_on==true){
			
			cloud.src = 'images/nuvens_.png';
			cloud_x = -cloud.width;
		}
	
		
		main_loop();

		return setInterval(main_loop, 10);
	}
 
	function update(){	
		if(cloud_on==true){
			cloud_x += 0.5;
			if (cloud_x > width ) {
				cloud_x = -cloud.width;
			}
		}
	}
 
	function draw() {
		ctx.drawImage(background,0,0);
		if(cloud_on==true){
			ctx.drawImage(cloud, cloud_x, 0);
		}
	}
 
	function main_loop() {
		draw();
		update();
	}
 