// imports of external files	
document.write("<script src='js/spritechanging2.js' type='text/javascript'></script>");
document.write("<script src='https://code.jquery.com/jquery-3.2.1.min.js' type='text/javascript'></script>");
document.write("<script src='js/spritesheet.js'></script>");


var origin = "Também";
var palavra1 = "idem";
var palavra2 = "igualmente";
var actualPlayer = -1;

var canvas3 = " ";
var player1 = " ";
var player2 = " ";
var torcida =" ";
var c = "";

var audioGame = " ";
var audioWin = " ";

var nvitoriasP1 = 0;
var nvitoriasP2 = 0;
var nPartidas = 0;
var some;

function init(){	

	
	some = new URLSearchParams(window.location.search);
	if(some.get('nvp1')!=null)
	nvitoriasP1 = some.get('nvp1'); // 'mdn query string'
	some = new URLSearchParams(window.location.search);
	if(some.get('nvp2')!=null)
	nvitoriasP2 = some.get('nvp2'); // 'mdn query string'
	some = new URLSearchParams(window.location.search);
	if(some.get('np')!=null)
	nPartidas = some.get('np'); // 'mdn query string'
	
	
	
	//$('#header').load('hello.php');
	/*
	$.post('hello.php', { num: 5 }, function(result) { 
		
		
		var r = result*
		2;
		//alert(r); 
		
	});
	*/
	
	
	
	
	
	// boneco 1 e animação dele (o objeto Boneco está no código boneco.js)
	var canvas = document.getElementById('myCanvas');
	// para animar o boneco, é necessário passar o canvas, a imagem/spritesheet
	// também a largura e a altura de cada frame e o total de frames da animação
	player1 = new SpriteSheet(canvas, 0, 60, 'images/boy_happy.jpg', 115, 125, 0, 130, 3);
	// depois é só chamar o setInterval para repetir o método de animação escolhido
	window.setInterval(player1.animar, 500);	
			
	// boneco 2 e animação dele
	var canvas2 = document.getElementById('myCanvas2');
	player2 = new SpriteSheet(canvas2, 0, 60, 'images/girl_happy.jpg', 176, 125, 0 , 130, 3);
	window.setInterval(player2.animar, 500);	

	canvas3 = document.getElementById('myCanvas3');
	torcida = new SpriteChanging2(canvas3,'images/torcida1.png','images/torcida2.png');
	window.setInterval(torcida.change, 500);
		
	audioGame = new Audio('sounds/game.mp3');
	audioGame.loop = true;
	audioGame.play();
		
	audioWin = new Audio('sounds/win.wav');
		
	

	//Carrega o banco de dados
	loadData();

	//Seta no header a palavra Chave
	$("#header").html(origin);

	//Qual player e qual a palavra que será reconhecida como sinonimos
	buildInputs(1, palavra1);
	buildInputs(2, palavra2);

	actualPlayer = (palavra1.length > palavra2.length ? 1:2 );
	setPlayer(actualPlayer);

	// Ao clicar em alguma opcao
	$('input[type=button]').click(function(){
		if(!$(this).hasClass('inactive')){
			//alert($(this).val()+" : "+$(this).parent().parent().parent().attr("id"));
			findLetter(actualPlayer, $(this).val());
			$(this).attr("disabled","true");
			verifyVictory();
			togglePlayer();
		}
	});


	$('#result input[type=button]').click(function(){
		window.location.assign("./index.html");
	});
}

function buildInputs(player, word){
	var doc = $("#Player"+player+"Content");

	for(var a=0; a<word.length; a++){
		$(doc).find('.inputs').append('<input type="text" right="'+word.charAt(a)+'" name="" id="" class="campo">');
	}
}

function findLetter(player,letter){
	var doc = $("#Player"+player+"Content");

	for(var a=0; a<$(doc).find('.campo').length; a++){
		if($($(doc).find('.campo').get(a)).attr("right").toUpperCase() == letter.toUpperCase()){
			$($(doc).find('.campo').get(a)).val(letter.toUpperCase());
			//tocar audio de acerto aqui
			//tocar animação de aplausos da torcida aqui 

			//torcida.img1 = new Image() ;
			torcida.setImg1("images/aplausos1.png");
			torcida.setImg2("images/aplausos2.png");
			var audio = new Audio('sounds/aplause.mp3');
			audio.play();
			
			setTimeout(function () {
				torcida.setImg1("images/torcida1.png");
				torcida.setImg2("images/torcida2.png");
			}, 3000);

		}
	}
	
	// se não encontrar a letra
	// tocar animação de zangado aqui
	
	
	
}


function loadData(){
	// o Objeto dados tem um atributo data
	var aWord = Math.floor(Math.random() * (dados.data.length - 0)) + 0;
	origin = dados.data[aWord].palavra;
	var bWord = Math.floor(Math.random() * (dados.data[aWord].sinonimos.length - 0)) + 0;
	var cWord = Math.floor(Math.random() * (dados.data[aWord].sinonimos.length - 0)) + 0;
	palavra1 = dados.data[aWord].sinonimos[bWord];
	palavra2 = dados.data[aWord].sinonimos[cWord];
}


function setPlayer(number){
	if(number == 1){
		$('#Player1Content .letters input[type=button]').removeClass("inactive");
		$('#Player2Content .letters input[type=button]').addClass("inactive");
	} else {
		$('#Player1Content .letters input[type=button]').addClass("inactive");
		$('#Player2Content .letters input[type=button]').removeClass("inactive");
	}
}

function togglePlayer(){
	actualPlayer = (actualPlayer == 1 ? 2:1);
	setPlayer(actualPlayer);
}

function verifyVictory(){


	for(var b =1; b<3; b++){


		var found = false;

		var doc = $("#Player"+b+"Content");


		for(var a=0; a<$(doc).find('.campo').length; a++){
			if(!$($(doc).find('.campo').get(a)).attr("right").toUpperCase() == $($(doc).find('.campo').get(a)).val().toUpperCase()){
				found = true;
			}
		}

		if(!found){
			//alert("venceu");
			/*
			$("#result").css("display","block");
			$("#result #nomeVencedor").html("Jogador "+b+" Venceu!");
			$("#wordsFeedback").html(origin+"<br />"+palavra1+"<br />"+palavra2);
			*/
					
			torcida = new SpriteChanging2(canvas3,'images/aplausos1.png','images/aplausos2.png');

			audioGame.pause();
			audioWin.play();

			if(b==2){
				player1.setSprite("images/boy_angry.jpg");
				nvitoriasP2++;
			}else if(b==1){
				player2.setSprite("images/girl_angry.jpg");
				nvitoriasP1++;
			}			
		
			//alert(nvitoriasP1 + " " + nvitoriasP2);		
			//init();
			if(nvitoriasP1>=5 || nvitoriasP2>=5){
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "fim.html";
				}, 4000);
			}else{
			if(nPartidas==1){
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "atividade_1.html?nvp1="+nvitoriasP1+"&nvp2="+nvitoriasP1+"&np="+nPartidas;
					npartidas++;
				}, 4000);
				
			}
			if(nPartidas==2){
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "atividade_2.html?nvp1="+nvitoriasP1+"&nvp2="+nvitoriasP1+"&np="+nPartidas;
					npartidas++;
				}, 4000);				
			}
			if(nPartidas==3){
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "atividade_3.html?nvp1="+nvitoriasP1+"&nvp2="+nvitoriasP1+"&np="+nPartidas;
					npartidas++;
				}, 4000);				
			}
			if(nPartidas==4){
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "atividade_4.html?nvp1="+nvitoriasP1+"&nvp2="+nvitoriasP1+"&np="+nPartidas;
					npartidas++;
				}, 4000);				
			}
			}
			/*
			else{
				setTimeout(function(){ 
					//Example The url ?param1=param1Value&param2=param2Value can be called like:
					window.location.href = "index.html?nvp1=" + nvitoriasP1 + "&nvp2=" + nvitoriasP2;
				}, 4000);
			}
			*/
			
		}
	}

}

/*$('.letter').click(function(){
	$(this).attr("disabled", "true");
});
*/
