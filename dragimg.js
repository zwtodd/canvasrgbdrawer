// stolen from https://gist.github.com/steveosoule/5980212
// and merged with https://stackoverflow.com/a/28520835/8015340
// heavily modified to fit this app..
$(document).ready(function() {

		var	image = document.getElementById('file-upload'),
		canvas = document.getElementById('imgCanvas'),
		context = canvas.getContext('2d'),
		fileReader = new FileReader(),
		img = new Image(),
		x = 10,
		y = 10, 
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
			console.log('neww: ' + neww);
			console.log('newh: ' + newh);
			console.log("img.width: " + img.width);
			console.log("img.height: " + img.height);
			// Check if the current width is larger than the max
			if(width > maxWidth){
				ratio = maxWidth / width;   // get ratio for scaling image
				newh = height * ratio;    // Reset height to match scaled image
				neww = width * ratio;    // Reset width to match scaled image
			}

			// Check if current height is larger than max
			if(height > maxHeight){
				ratio = maxHeight / height; // get ratio for scaling image
				newh = height * ratio;    // Reset height to match scaled image
				neww = width * ratio;    // Reset width to match scaled image
			}
			
			/* old code that reset height/width to canvas w/h no matter what:
			if (rw > rh)
			{
			newh = Math.round(img.height / rw);
			neww = canvas.width;
			}
			else
			{
			neww = Math.round(img.width / rh);
			newh = canvas.height;
			}
			*/

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
				console.log('img : ' + img);
				console.log('x: ' + x);
				console.log('y: ' + y);
				console.log('neww: ' + neww);
				console.log('newh: ' + newh);
			}
			dataUrl = canvas.toDataURL();
		}

		function handleMouseDown(e){
			//canMouseX=parseInt(e.clientX);
			//canMouseY=parseInt(e.clientY);
			// set the drag flag
			if(e.pageX > canMouseX - neww + canvas.offsetLeft && e.pageX < canMouseX + neww + canvas.offsetLeft&& e.pageY > canMouseY - newh + canvas.offsetTop&& e.pageY < canMouseY + newh + canvas.offsetTop) {
				isDragging=true;
			}
		}

		function handleMouseUp(e){
			//canMouseX=parseInt(e.clientX);
			//canMouseY=parseInt(e.clientY);
			// clear the drag flag
			isDragging=false;
		}

		function handleMouseOut(e){
			//canMouseX=parseInt(e.clientX);
			//canMouseY=parseInt(e.clientY);
			// user has left the canvas, so clear the drag flag
			isDragging=false;
		}

		function handleMouseMove(e){
			//canMouseX=parseInt(e.clientX);
			//canMouseY=parseInt(e.clientY);
			// if the drag flag is set, clear the canvas and draw the image
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