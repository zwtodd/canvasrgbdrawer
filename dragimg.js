// image upload code stolen from https://gist.github.com/steveosoule/5980212
// and merged with https://stackoverflow.com/a/28520835/8015340 for validation of file type 
// heavily modified to fit this app..
$(document).ready(function() {

		var	image = document.getElementById('file-upload'),
		canvas = document.getElementById('imgCanvas'),
		context = canvas.getContext('2d'),
		fileReader = new FileReader(),
		img = new Image(),
		x = 1,
		y = 1, 
		neww,newh;
		
		var canvasOffset=$("#imgCanvas").offset();
		var offsetX=canvasOffset.left;
		var offsetY=canvasOffset.top;
		var canvasWidth=canvas.width;
		var canvasHeight=canvas.height;
		var isDragging=false;
		var canMouseX, canMouseY;

		fileReader.onload = function (e) {
			img.src = e.target.result;
		};

		img.onload = function() {
		
			var maxWidth = 500; // Max width for the image
			var maxHeight = 500;    // Max height for the image
			var ratio = 0;  // Used for aspect ratio
			var width = img.width;    // Current image width
			var height = img.height;    // Current image width
			neww = img.width;    // Current image width, will be used if no resizing done.
			newh = img.height;    // Current image height, will be used if no resizing done.
			canMouseX = neww;
			canMouseY = newh;

			// Check if the current width is larger than the max
			if(width > maxWidth){
				ratio = maxWidth / width;   // get ratio for scaling image
				newh = Math.round(height * ratio);    // Reset height to match scaled image
				neww = Math.round(width * ratio);    // Reset width to match scaled image
				console.log('neww1: ' + neww);
				console.log('newh1: ' + newh);
			}

			// Check if current height is larger than max
			if(newh > maxHeight){
				ratio = maxHeight / height; // get ratio for scaling image
				newh = Math.round(height * ratio);    // Reset height to match scaled image
				neww = Math.round(width * ratio);    // Reset width to match scaled image
				console.log('neww2: ' + neww);
				console.log('newh2: ' + newh);
				
			}

			drawImage();
		};

		image.addEventListener('change', function() {
				var file = this.files[0];  
				return file && fileReader.readAsDataURL(file); 
			});

		canvas.addEventListener('dragover', function(event) {
				event.preventDefault();
			});

		canvas.addEventListener('drop', function(event) {
				event.preventDefault();
				fileReader.readAsDataURL(event.dataTransfer.files[0]);
			});

		function drawImage() {
			var dataUrl;
			context.clearRect(0,0,canvasWidth,canvasHeight);
   
			if (img.width) {
				image_width = neww;
				image_height = newh;

				
				context.drawImage(img, x, y, neww, newh);			
			}
			dataUrl = canvas.toDataURL();
		}

		function handleMouseDown(e){
			// detect hitbox for image to drag. needs improvement.
			//if(e.pageX > canMouseX - neww + canvas.offsetLeft && e.pageX < canMouseX + neww + canvas.offsetLeft&& e.pageY > canMouseY - newh + canvas.offsetTop&& e.pageY < canMouseY + newh + canvas.offsetTop) {
			isDragging=true;
			//}
		}

		function handleMouseUp(e){
			isDragging=false;
		}

		function handleMouseOut(e){
			isDragging=false;
		}

		function handleMouseMove(e){
			// if the drag flag is set, clear the canvas and draw the image
			// TODO: need to find way to not redraw image from mouse position, but smoothly from whatever position it is currently at.
			if(isDragging){
				context.clearRect(0,0,canvasWidth,canvasHeight);
				canMouseX = e.pageX - canvas.offsetLeft;
				canMouseY = e.pageY - canvas.offsetTop;
				context.drawImage(img,canMouseX,canMouseY, neww, newh);
			}
		}

		$("#imgCanvas").mousedown(function(e){handleMouseDown(e);});
		$("#imgCanvas").mousemove(function(e){handleMouseMove(e);});
		$("#imgCanvas").mouseup(function(e){handleMouseUp(e);});
		$("#imgCanvas").mouseout(function(e){handleMouseOut(e);});


		drawImage();
		

	});