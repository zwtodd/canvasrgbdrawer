/* Code to draw text and then drag it around based on mouse events. The code to drag the text around was mercilessly
stolen from this jsfiddle: http://jsfiddle.net/a8wL475x/. 
(Everything else is original, unless otherwise noted.)
The code was heavily modified, and is still under construction. I am not a fan of global variables such as defined below this comment.*/

//Globals
var dragCanvas;
var dragContext;
var dragX = 250;
var dragY = 250;
var WIDTH, HEIGHT, text, textLength;
var dragOk = false;

//initializes the text data
function textDragInit() {
	dragCanvas = document.getElementById("textCanvas");
	dragContext = dragCanvas.getContext("2d");
	WIDTH = dragCanvas.width;
	HEIGHT = dragCanvas.height;
	text = document.getElementById("addTxtBxID").value;
	textLength = dragContext.measureText(text).width;
	dragCanvas.onmousedown = myDown;
	dragCanvas.onmouseup = myUp;
}


//resets text coordinates after user commits line to the image
function reInitTextVars() {
	dragX = 250;
	dragY = 250;
}


function drawText() {
	textDragInit();
	var userText = text;
	var userFontSelect = document.getElementById('addTxtFontID');
	var userFontSizeSelect = document.getElementById('addTxtFontSizeID');
	var userFontColor = document.getElementById('addTxtColorID').value;
		
	var userFont = userFontSelect.options[userFontSelect.selectedIndex].value;
	var userFontSize = userFontSizeSelect.options[userFontSizeSelect.selectedIndex].value;
	
	dragContext.beginPath();
	dragContext.font = userFontSize + " " + userFont;
	dragContext.fillStyle = userFontColor;
	dragContext.textAlign = "center";
		
	//checks if user wants a shadow on the text, if no shadow is selected, sets attributes equal to 0
	if(document.getElementById('addTxtShadowID').checked) {
		dragContext.save(); // save the context before drawing shadows, and restore it later, otherwise shadows will be drawn on all elements of canvas (circle/rect)
		dragContext.shadowOffsetX = document.getElementById('shadowXOffID').value;
		dragContext.shadowOffsetY = document.getElementById('shadowYOffValID').value;
		dragContext.shadowBlur = document.getElementById('shadowBlurValID').value;
		dragContext.shadowColor = document.getElementById('shadowColorID').value;
	} else {
		dragContext.shadowOffsetX = 0;
		dragContext.shadowOffsetY = 0;
		dragContext.shadowBlur = 0;
		dragContext.shadowColor = 0;
	}
		
	//Fill text in
	dragContext.clearRect( 0, 0, dragCanvas.width, dragCanvas.height );
	dragContext.fillText(userText, dragX, dragY);
	dragContext.restore(); // restore state of context
	dragContext.closePath();
}

function myMove(e) {
	if (dragOk) {
		dragX = e.pageX - dragCanvas.offsetLeft;
		dragY = e.pageY - dragCanvas.offsetTop;
	}
}

function myDown(e) {
	if (e.pageX < dragX + textLength + dragCanvas.offsetLeft && e.pageX > dragX - textLength + dragCanvas.offsetLeft && e.pageY < dragY + 15 + dragCanvas.offsetTop &&
		e.pageY > dragY - 15 + dragCanvas.offsetTop) {
		dragX = e.pageX - dragCanvas.offsetLeft;
		dragY = e.pageY - dragCanvas.offsetTop;
		dragOk = true;
		dragCanvas.onmousemove = myMove;
	}
}

function myUp() {
	dragOk = false;
	dragCanvas.onmousemove = null;
}