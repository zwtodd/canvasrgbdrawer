// GLOBALS
var savedCanvas = [],			// array to hold committed canvas (aka layers, in a sense)
savedBgCanvas = 0,			// holds the bg canvas. only one needed, is drawn first before savedCanas[],
imgDrawInterval,			// set to 33.33ms when adding images for 30fps during mouse movement (Except in IE for whatever reason)
maxFontSize = 122;			// max font size allowed during font size lst creation

// automatically update the canvas every 33.33ms (approx 30fps) and populate drop down lists with options
function init() {
	setFontSizeDropDown();
	setFontFaceDropDown()
	return setInterval(changeCanvas, 33.33);
}

// create options for fontSize drop down
function setFontSizeDropDown() {
	let selectInput = document.getElementById('addTxtFontSizeID');
	let count = 2;
	while(count <= maxFontSize) {
		if(count === 32) {
			selectInput.options[selectInput.options.length] = new Option(count, count + 'px', true, true);
		} else {
			selectInput.options[selectInput.options.length] = new Option(count, count + 'px');
		}
		count = count + 2;
	}
	loadFont('Sail');	// load the default selection for the text drop box to prevent hangup and displaying incorrect font
}
/* This will autopopulate the drop down list with each google font name from the array*/
function setFontFaceDropDown() {
	let selectInput = document.getElementById('addTxtFontID');
	for(a in googleFontsArray) {
		if(googleFontsArray[a] === 'Sail') {
			selectInput.options[selectInput.options.length] = new Option(googleFontsArray[a], googleFontsArray[a], true, true);
		} else {
			selectInput.options[selectInput.options.length] = new Option(googleFontsArray[a], googleFontsArray[a]);
		}
	}
}
function drawCanvas( rgb, rgbgrad ) { // rgb/rgbgrad is optional parameter to be used after intial drawing on page load
	rgb = rgb || 0;
	rgbgrad = rgbgrad || 0;
	var canvas = document.getElementById( 'bgCanvas' );
	var context = canvas.getContext( '2d' );
	var mainCanvas = document.getElementById( 'mainCanvas' );
	var mainContext = mainCanvas.getContext( '2d' );
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var linearX = document.getElementById( 'linearColorStopID' ).value;
	var radius = 250;
	var grd = 0; // slotted for type of gradient later, if not used, skipped at drawing

	if ( rgbgrad !== 0 ) {

		// gradient check, rgbgrad will equal zero if gradient is not turned on
		// Radii of the inner color.
		var innerRadius = document.getElementById( 'radialInnerMaxID' ).value;
		var outerRadius = document.getElementById( 'radialOuterMaxID' ).value;
		var type = gradientTypeFunc();
		// determine linear/radial gradient and create accordingly
		switch ( type ) {
			case '1': // 1 (ONE) is linear
			grd = context.createLinearGradient( 0, 0, linearX, 0 );
			break;
			case '2': // 2 is radial
			grd = context.createRadialGradient( centerX, centerY, innerRadius, centerX, centerY, outerRadius );
			break;
		}
		grd.addColorStop( 0, rgb );
		grd.addColorStop( 1, rgbgrad );
	}
	context.beginPath();
	mainContext.beginPath();
	if(savedBgCanvas !== 0) {						// draws the saved background to the main canvas
		mainContext.clearRect( 0, 0, mainCanvas.width, mainCanvas.height );
		mainContext.drawImage(savedBgCanvas,0,0);
	}
	
	if ( rgbgrad === 0 ) {			// if no gradient, draw one color background
		context.fillStyle = rgb;
	} else {						// with gradient
		context.fillStyle = grd; // fill gradient
	}
	//checks to see if user wants a circle or rectangle drawn
	if ( document.getElementById( "drawCircleCheckBoxID" ).checked ) {
		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.arc( centerX, centerY, radius, 0, 2 * Math.PI, false );
	} else {
		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.fillRect( 0, 0, canvas.width, canvas.height );
	}
	
	context.fill();
	
	
	if ( document.getElementById( "textCheckBoxID" ).checked ) { 
		drawText();
	}
	
	if(savedCanvas.length > 0) {
		let len = 0;
		while(len < savedCanvas.length) {
			mainContext.drawImage(savedCanvas[len], 0, 0);	// writes saved canvas in order of commit to both canvas
			len++;
		}

	}
	
	if(document.getElementById('changeColorsCheckBoxID').checked) {		// if user changing bg of the canvas, make the temporary canvas for committed images and text visible so it will display commits
		drawtextAndImageSavesCanvas();
	} else if(!($ ('#textAndImageSavesCanvas').hasClass('hide'))) {		// if not changing the background of canvas, hide this canvas.
		$ ('#textAndImageSavesCanvas').addClass('hide');
	}
	
	mainContext.closePath();
	context.closePath();

} // END OF drawCanvas()

function changeCanvas() {
	var rgbAll = [ document.getElementById( "colorOneSlideRedID" ).value, document.getElementById( "colorOneSlideGreenID" ).value, document.getElementById( "colorOneSlideBlueID" ).value ].join( ',' );
	var rgbLong = 'rgb(' + rgbAll + ')';
	var hex = rgb2hex( rgbLong );
	var hexUpper = hex.toUpperCase(); // create two <var>Upper variables to utilize toUpperCase string method
	var rgbGradientAll = 0;
	var rgbGradientLong = 0;
	var hexGradient = 0;
	var hexGradientUpper = 0;
	if ( document.getElementById( 'gradientCheckBoxID' ).checked ) {
		rgbGradientAll = [ document.getElementById( "colorTwoSlideRedID" ).value, document.getElementById( "colorTwoSlideGreenID" ).value, document.getElementById( "colorTwoSlideBlueID" ).value ].join( ',' );
		rgbGradientLong = 'rgb(' + rgbGradientAll + ')';
		hexGradient = rgb2hex( rgbGradientLong );
		hexGradientUpper = hexGradient.toUpperCase();
	}
	// Updates text areas with new rgb/hex values
	document.getElementById( "colorOneRGBValue" ).value = rgbLong;
	document.getElementById( "colorOneHexValue" ).value = hexUpper;
	document.getElementById( "colorTwoRGBValue" ).value = rgbGradientLong;
	document.getElementById( "colorTwoHexValue" ).value = hexGradientUpper;

	//draw to canvas
	drawCanvas( rgbLong, rgbGradientLong );
}

function gradientTypeFunc() {
	var radios = document.getElementsByName( 'linearOrRadial' );
	for ( var i = 0, length = radios.length; i < length; i++ ) {
		if ( radios[ i ].checked ) {
			return radios[ i ].value;
		}
	}
}

//converts rgb notation to hex color code
/* This function was stolen and barely modified from a jsfiddle
link: http://jsfiddle.net/Mottie/xcqpF/1/light/
*/
function rgb2hex( rgbX ) {
	rgbX = rgbX.match( /^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i );
	return ( rgbX && rgbX.length === 4 ) ? "#" + ( "0" + parseInt( rgbX[ 1 ], 10 ).toString( 16 ) ).slice( -2 ) + ( "0" + parseInt( rgbX[ 2 ], 10 ).toString( 16 ) ).slice( -2 ) + ( "0" + parseInt( rgbX[ 3 ], 10 ).toString( 16 ) ).slice( -2 ) : '';
}

// Simple function to set variables to be used in download(), proved by download.js 
// download.js : https://github.com/rndme/download
function downloadCanvas() {
	var canvasDL = document.getElementById('mainCanvas');
	var data = canvasDL.toDataURL();
	var strFileName = 'myImage.png';
	var strMimeType = 'image/png';
	download(data, strFileName, strMimeType);
}

// saves the temporary canvas (img or text) into the saved canvas array for later redrawing in drawCanvas()
function saveTempCanvas(canvas,whichCanvas) {		// canvas = which temp canvas to save from. whichCanvas signifies what specific inputs to clear. if text is committed, clears the text input, or if image is comitted, clears the file input
	/* whichCanvas values:
	1 - Text
	2 - images
	3 - background
	*/
	var tcanvas = document.getElementById( canvas );
	var tcxt = tcanvas.getContext('2d');
	var timg = new Image();
	timg.src = tcanvas.toDataURL("image/png");
	if(whichCanvas !== 3) {
		savedCanvas.push(timg);
	} else {
		savedBgCanvas = timg;
	}
	switch(whichCanvas) {
		case 1:
		document.getElementById('addTxtBxID').value = "";  // remove text from input field
		reInitTextVars(); // from dragtext.js, resets the x and y of text coords back to original spots
		break;
		
		case 2:
		document.getElementById('file-upload').value = ""; //set input for image upload to null to clear
		imgCommitted = true;		//imgCommitted is declared as global in dragimg.js
		tcxt.clearRect( 0, 0, tcanvas.width, tcanvas.height );
		break;
		
		/* When committing the background, hide all the associated divs */
		case 3:
		document.getElementById('changeColorsCheckBoxID').checked = false;
		document.getElementById('gradientCheckBoxID').checked = false;
		if(!$('#bgCanvas').hasClass('hide')) {
			$( "#bgCanvas" ).addClass("hide");
		}
		if(!$('#drawCircleDivID').hasClass('hide')) {
			$( "#drawCircleDivID" ).addClass("hide");
		}
		if(!$('#gradientDivID').hasClass('hide')) {
			$( "#gradientDivID" ).addClass("hide");
		}
		if(!$('#saveBgDivID').hasClass('hide')) {
			$( "#saveBgDivID" ).addClass("hide");
		}
		if(!$('#colorOneSlidersID').hasClass('hide')) {
			$( "#colorOneSlidersID" ).addClass("hide");
		}
		if(!$('#colorTwoSlidersID').hasClass('hide')) {
			$( "#colorTwoSlidersID" ).addClass("hide");
		}
		if(!$('#gradientOptionsID').hasClass('hide')) {
			$( "#gradientOptionsID" ).addClass("hide");
		}
		if(!$('#colorOneValues').hasClass('hide')) {
			$( "#colorOneValues" ).addClass("hide");
		}
		if(!$('#colorTwoValues').hasClass('hide')) {
			$( "#colorTwoValues" ).addClass("hide");
		}
		break;
	}	// end switch statement for canvas types
	
	//reset opacity slider and value textbox to full opacity
	document.getElementById('opacityRangeID').value = 1;
	document.getElementById('opacityRangeValID').value = 1;
	
}

// clears the last commit saved to savedCanvas[]. This will remove it from the drawing sequence in drawCanvas()
function undoCommit() {
	savedCanvas.pop();
}

// Clears the main canvas of all commits, and the temp textAndImageSaves canvas of held data
function clearMainCanvas() {
	var canvas = document.getElementById('mainCanvas');
	var context = canvas.getContext('2d');
	var bgcanvas = document.getElementById('bgCanvas');
	var bgcontext = bgcanvas.getContext('2d');
	var textAndImageSavesCanvas = document.getElementById('textAndImageSavesCanvas');
	var textAndImageSavesCtx = textAndImageSavesCanvas.getContext('2d');
	savedBgCanvas = 0;
	savedCanvas = [];
	context.clearRect( 0, 0, canvas.width, canvas.height );
	textAndImageSavesCtx.clearRect( 0, 0, canvas.width, canvas.height );
	bgcontext.fillStyle = 'rgb(255,255,255)';
	bgcontext.fillRect(0, 0, bgcanvas.width, bgcanvas.height);
	bgcontext.fill();
	if($(bgcanvas).hasClass('hide')) {
		$(bgcanvas).removeClass('hide');
	}
}


/*
** This canvas is visible when the user is changing the background
** it fakes keeping all commits to the front layer so they are still
** visible when altering the background. It is hidden when user is not
** actively changing the background.
*/
function drawtextAndImageSavesCanvas() {
	var canvas = document.getElementById('textAndImageSavesCanvas');
	var ctx = textAndImageSavesCanvas.getContext('2d');
	if($ ('#textAndImageSavesCanvas').hasClass('hide')) {
		$ ('#textAndImageSavesCanvas').removeClass('hide');
	}
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(savedCanvas.length > 0) {
		let len = 0;
		while(len < savedCanvas.length) {
			ctx.drawImage(savedCanvas[len], 0, 0);	// writes saved canvas in order of commit to both canvas
			len++;
		}
	}

}

// Container for WebFontLoader for Google Fonts
var loadFont = function(font) {
	WebFont.load({
			google: {
				families: [font]
			}
		});
};

// jquery: handles the toggling of div visibility based on which option is chosen.
$(document).ready(function() { 
		$( '#changeColorsCheckBoxID' ).change( function() {
				$( "#bgCanvasID" ).toggleClass("hide");

				if(document.getElementById('changeColorsCheckBoxID').checked == false) {
					document.getElementById('gradientCheckBoxID').checked = false; 
					if(!$('#bgCanvas').hasClass('hide')) {
						$( "#bgCanvas" ).toggleClass("hide");
					}
					if(!$('#drawCircleDivID').hasClass('hide')) {
						$( "#drawCircleDivID" ).addClass("hide");
					}
					if(!$('#gradientDivID').hasClass('hide')) {
						$( "#gradientDivID" ).addClass("hide");
					}
					if(!$('#saveBgDivID').hasClass('hide')) {
						$( "#saveBgDivID" ).addClass("hide");
					}
					if(!$('#colorOneSlidersID').hasClass('hide')) {
						$( "#colorOneSlidersID" ).addClass("hide");
					}
					if(!$('colorTwoSlidersID').hasClass('hide')) {
						$( "#colorTwoSlidersID" ).addClass("hide");
					}
					if(!$('#gradientOptionsID').hasClass('hide')) {
						$( "#gradientOptionsID" ).addClass("hide");
					}
					if(!$('#colorOneValues').hasClass('hide')) {
						$( "#colorOneValues" ).addClass("hide");
					}
					if(!$('#colorTwoValues').hasClass('hide')) {
						$( "#colorTwoValues" ).addClass("hide");
					}
				}
				if(document.getElementById('changeColorsCheckBoxID').checked == true){
					if($('#bgCanvas').hasClass('hide')) {
						$( "#bgCanvas" ).toggleClass("hide");
					}
					if($('#drawCircleDivID').hasClass('hide')) {
						$( "#drawCircleDivID" ).toggleClass("hide");
					}
					if($('#gradientDivID').hasClass('hide')) {
						$( "#gradientDivID" ).toggleClass("hide");
					}
					if($('#saveBgDivID').hasClass('hide')) {
						$( "#saveBgDivID" ).toggleClass("hide");
					}
					if($('#colorOneSlidersID').hasClass('hide')) {
						$( "#colorOneSlidersID" ).toggleClass("hide");
					}
					if($('#colorOneValues').hasClass('hide')) {
						$( "#colorOneValues" ).toggleClass("hide");
					}
				}
			} );
			
		$( '#gradientCheckBoxID' ).change( function() {
				$( "#colorTwoSlidersID" ).toggleClass("hide");
				$( "#gradientOptionsID" ).toggleClass("hide");
				$( "#colorTwoValues" ).toggleClass("hide");
			} );

		$("[name=linearOrRadial]").click(function(){
				$('.hideClassJQ').hide();
				$("#gradient-"+$(this).val()).show();
			});

		$( '#addTxtShadowID' ).change( function() {
				$( "#txtShadowOptionsID" ).toggleClass("hide");
			} );

		$( '#textCheckBoxID' ).change( function() {
				$( "#textOptionsID" ).toggleClass("hide");
				$( "#textCanvas" ).toggleClass("hide");
				if(document.getElementById('imgCheckBoxID').checked) {
					$('#imgCheckBoxID').prop('checked', false);
					$( "#imgDivID" ).toggleClass("hide");
					$( "#imgCanvas" ).toggleClass("hide");
				}
			} );

		$( '#imgCheckBoxID' ).change( function() {
				$( "#imgDivID" ).toggleClass("hide");
				$( "#imgCanvas" ).toggleClass("hide");
				if ($('#imgCheckBoxID' ).is(':checked')) imgDrawInterval = setInterval($.drawImage(), 33.33);
				else clearInterval(imgDrawInterval);
				if(document.getElementById('textCheckBoxID').checked) {
					$('#textCheckBoxID').prop('checked', false);
					$( "#textOptionsID" ).toggleClass("hide");
					$( "#textCanvas" ).toggleClass("hide");
				}
			} );
		
		// if either the add text or add image checkbox is checked, display the undo button
		// if neigther is checked, hide the undo button
		$("input:checkbox.textAndImgClass").click(function () {
				if ($('#textCheckBoxID').is(':checked') || $('#imgCheckBoxID' ).is(':checked')) $('#textAndImgOptionsDiv').show();
				if ($('#textCheckBoxID').is(':not(:checked)') && $('#imgCheckBoxID' ).is(':not(:checked)')) $('#textAndImgOptionsDiv').hide();
			});
			
		// check for change to font face dropdown and load font accordingly
		$('#addTxtFontID').change (function() {
				let font = this.value;
				loadFont(this.value);				
			});

	} );