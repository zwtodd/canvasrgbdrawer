// GLOBALS
var savedCanvas = [];

// automatically update the canvas every 33.33ms (approx 30fps)
function init() {
	return setInterval(changeCanvas, 33.33);
}


function drawCanvas( rgb, rgbgrad ) { // rgb/rgbgrad is optional parameter to be used after intial drawing on page load
	rgb = rgb || 0;
	rgbgrad = rgbgrad || 0;
	var canvas = document.getElementById( 'mainCanvas' );
	var context = canvas.getContext( '2d' );
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var linearX = document.getElementById( 'linearColorStopID' ).value;
	var radius = 250;
	var grd = 0; // slotted for type of gradient later, if not used, skipped at drawing
	// gradient check, rgbgrad will equal zero if gradient is not turned on
	if ( rgbgrad !== 0 ) {
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
	if ( rgbgrad === 0 ) {
		if ( rgb !== 0 ) {
			context.fillStyle = rgb;
		} else {
			context.fillStyle = "rgb(91,111,192)"; // default color on page load
		}
	} else {
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
			context.drawImage(savedCanvas[len], 0, 0); //the true context of the canvas
			len++;
		}
	}

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
function saveTempCanvas(canvas,whichCanvas) {		// canvas = which temp canvasto save from. whichCanvas signifies what specific inputs to clear. if text is committed, clears the text input, or if image is comitted, clears the file input
	var tcanvas = document.getElementById( canvas );
	var tcxt = tcanvas.getContext('2d');
	var timg = new Image();
	timg.src = tcanvas.toDataURL("image/png");
	savedCanvas.push(timg);
	if(whichCanvas === 1) {
		document.getElementById('addTxtBxID').value = "";  // remove text from input field
		reInitTextVars(); // from dragtext.js, resets the x and y of text coords back to original spots
	}else if(whichCanvas === 2) {
		document.getElementById('file-upload').value = ""; //set input for image upload to null to clear
		imgCommitted = true;		//imgCommitted is declared as global in dragimg.js
		tcxt.clearRect( 0, 0, tcanvas.width, tcanvas.height );
	}
}

function undoCommit() {
	savedCanvas.pop();
}

// jquery: handles the toggling of div visibility based on which option is chosen.
$(document).ready(function() {
		$( '#gradientCheckBoxID' ).change( function() {
				$( "#colorTwoSlidersID" ).toggleClass("hide");
				$( "#colorTwoSlidersID" ).toggleClass("colorSlidersCls");
				$( "#gradientOptionsID" ).toggleClass("hide");
				$( "#gradientOptionsID" ).toggleClass("gradientOptionsCls");
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
				if(document.getElementById('textCheckBoxID').checked) {
					$('#textCheckBoxID').prop('checked', false);
					$( "#textOptionsID" ).toggleClass("hide");
					$( "#textCanvas" ).toggleClass("hide");
				}
			} );
			
		$('input[type="checkbox"]').click(function () {
				if ($('#textCheckBoxID').is(':checked') || $('#imgCheckBoxID' ).is(':checked')) $('#undoButtonDivID').show();
				if ($('#textCheckBoxID').is(':not(:checked)') && $('#imgCheckBoxID' ).is(':not(:checked)')) $('#undoButtonDivID').hide();
			});
	} );

/*	
function returnElId(id) { return document.getElementById(id); }

$(document).ready(function() {
document.getElementById("file-upload").addEventListener("change", drawImgs, false);
});

*/