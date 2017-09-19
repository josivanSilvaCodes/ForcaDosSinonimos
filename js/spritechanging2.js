
 function SpriteChanging2(cv, srcImg1, srcImg2) {

	
	
	var context = cv.getContext('2d');
	
	var img1 = new Image();
	img1.src = srcImg1;
	
	var img2 = new Image();
	img2.src = srcImg2;
	
	//alert("ok");

	var currentFrame = 1;

	this.change = function () {	
		context.clearRect(0, 0, 1024, 150);
		
		if(currentFrame>2){
			currentFrame = 1;
		}
		if(currentFrame==1){
				context.drawImage(img1, 0, 0);
			}else{
				context.drawImage(img2, 0, 0);
			}
		currentFrame++;		
	};	

	this.setImg1 = function (url) {
		img1.src = url;
	};	
	
	this.setImg2 = function (url) {
		img2.src = url;
	};	
	//setInterval(animar, 1000);
};
			