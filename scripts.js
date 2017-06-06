// automatically update the canvas every 100ms (1/10th second)
function init() {
	return setInterval(changeCanvas, 33.33);
}


function drawCanvas( rgb, rgbgrad ) { //rgb/rgbgrad is optional parameter to be used after intial drawing on page load
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
	if ( rgbgrad == 0 ) {
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
	if ( rgbgrad == 0 ) {
		if ( rgb !== 0 ) {
			context.fillStyle = rgb;
		} else {
			context.fillStyle = "rgb(91,111,192)"; // default color on page load
		}
	} else {
		context.fillStyle = grd; // fill gradient
	}
	
	context.fill();
	context.closePath();
	
	if ( document.getElementById( "textCheckBoxID" ).checked ) { 
		drawText();
	}



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

	if(document.getElementById("textCheckBoxID".checked)) {
		textDragInit(); // init for text drawing and dragging
	}	
	
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


//jquery: toggle second color div and gradient options when gradient checkbox is checked
$( document ).ready( function() {
		$( '#gradientCheckBoxID' ).change( function() {
				$( "#colorTwoSlidersID" ).toggleClass("hide");
				$( "#colorTwoSlidersID" ).toggleClass("colorSlidersCls");
				$( "#gradientOptionsID" ).toggleClass("hide");
				$( "#gradientOptionsID" ).toggleClass("gradientOptionsCls");
				$( "#colorTwoValues" ).toggleClass("hide");

			} );
	} );
	

/* 
*  The following function to download the canvas as a png file was stolen from this jsfiddle: http://jsfiddle.net/wboykinm/fL0q2uce/
*  Author notes are below. Code was modified a bit to fit into this app. Pressing link on right side of screen will initiate download.
*
*    Ken Fyrstenberg Nilsen
*    Abidas Software
*/

/**
* This is the function that will take care of image extracting and
* setting proper filename for the download.
* IMPORTANT: Call it from within a onclick event.
*/
function downloadCanvas() {
	var link = document.getElementById("downloadLinkID");
	var canvasId = 'mainCanvas';
	var filename = 'myImage.png';
	link.href = document.getElementById(canvasId).toDataURL();
	link.download = filename;
}

// jquery: toggles visibility of gradient options divs when selecting between linear/radial div (linear or radialradio buttons)	
$(document).ready(function() {
		$("[name=linearOrRadial]").click(function(){
				$('.hideClassJQ').hide();
				$("#gradient-"+$(this).val()).show();
			});
	});
 
$( document ).ready( function() {
		$( '#textCheckBoxID' ).change( function() {
				$( "#textOptionsID" ).toggleClass("hide");
			} );
	} );
 
$( document ).ready( function() {
		$( '#addTxtShadowID' ).change( function() {
				$( "#txtShadowOptionsID" ).toggleClass("hide");
			} );
	} );