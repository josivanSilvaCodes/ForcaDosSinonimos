
 function SpriteSheet(cv, x, y, srcImg, w, h, sh, sv, qtdFrames) {

	var context = cv.getContext('2d');
	var imageObj = new Image();
	imageObj.src = srcImg;
			
	var shiftH = sh;
	var shiftV = sv;
	var frameWidth = w;
	var frameHeight = h;
	var totalFrames = qtdFrames;
	var currentFrame = 1;	
	var posX = x;
	var posY = y;

	this.animar = function () {	
		context.clearRect(0, 0, frameWidth, frameHeight);
		
		if(currentFrame==totalFrames){
			currentFrame = 1;
			shiftH = 0;
			shiftV = 0;
		}
		context.drawImage(imageObj, shiftH, shiftV, frameWidth, frameHeight, posX, posY, frameWidth, frameHeight);
		shiftH+= sh;
		shiftV+= sv;	
		currentFrame++;		
		
	};	
	
	this.setSprite = function (src) {	
		imageObj.src = src;
	};
	//setInterval(animar, 1000);
};
			