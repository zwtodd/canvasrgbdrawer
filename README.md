# canvasrgbdrawer
*Simple app that takes user input and draws to canvas. Can add text, text shadows, adjust gradients, outputs rgb and hex values.

This app was created to aid my own learning of html5/javascript/css. If there is a way to make it better, especially the CSS file, I'd love to see how.

CanvasRGBDrawer features three canvses on top of one another. Two temporary canvses are used as placeholders for text and images, respectively. The user can edit text/image positions, color, shadows, and opacity on these temp canvses, then save the temp canvas to the main canvas when they are done.

The main canvas holds all saved data, as well as the background color and gradient (if any). The user can undo their last save, or 'commit', via the undo button. This removes the last saved temporary canvas from the main draw sequence.

All data is editable via inputs, and shown via labels/textboxes. RGB and Hex values are outputted on the right.

A custom Google Font Loader is being used to dynamically load all Google Fonts for the canvas. I made it myself and am quite proud of it =).

The project is a mixture of javascript/jQuery/CSS/HTML. It is a learning project, so some things are done one way, and others another way. For example, text drawing is nearly pure JS, while image drawing is jQuery/vanilla JS mixed. The main scripts.js is all over the place.

New functions are added when I think of them. I have a TODO list below, but it is not all inclusive. It also works as a 'features list'.


# Running the App:

I use Aprelium Abyss webserver hosted on my computer to run via localhost. Save in htdocs and navigate via browser.
- http://aprelium.com/abyssws/

Or use whatever webserver (apache, etc) you'd like, or any webhost you may have.

# Demo
You can see a demo of canvasrgbdrawer here: https://zwtodd.github.io/canvasrgbdrawer/


# TODO:
- ~Make text draggable around the canvas.~
- Prettify CSS code and see what improvements can be made. Fear of redundancy or overused/misused attributes. Flexboxes are new to me.
- See about having the app output the CSS code for use in other projects. 
- ~Add images to the canvas~ with custom sizes ~and be able to place and move on canvas~.
- Improve comments within code.
- Possibly add more color/gradient abilities. See if adding a color can be modular and "infinite".
- ~Download image that is produced.~ ~Works in Chrome, debugging for Edge/IE~
- ~Be able to 'commit' text lines when done editting so they are permanent on the image, and then be able to add more text after that, and repeat.~
- ~Also be able to move uploaded images and 'commit' them to a spot and repeat as wanted.~
- Possibly changed layout to where the canvas is above on its one section, and the options/values are displayed beneath. Maybe.
- Improve hitbox detection on image dragging.
- Make image dragging "smoother". Currently the image will redraw itself at the mouse x,y. Going to change it to smoothly draw itself from wherever it is currently drawn.
- Make images be resizable on the canvas. I found a code snippet to due that via CSS somewhere.
- ~Make undo button for previous commit (Text or image). In progress...~
- ~Add better font support.~
- ~Add opacity support for temporary canvases (image and text)~
- ~Save background color in own canvas, make mainCanvas just for saving proposes (akin to photoshop 'merge layers down' method.~

# "Borrowed Code"
This project is a learning expierence for me all around. However, learning stuff for the sake of learning can almost be like reiventing the wheel. There are snippets of code that I have taken off sites like jsfiddle and stack exchange. Each snippet is commented with a link back to where I found it within the code. Any large portions or libraries or other repos are listed below.

# External libraries
- jQuery - https://jquery.com/
- GoogleFonts (and WebFontLoader) - https://fonts.google.com/
- Download.JS - https://github.com/rndme/download
- Font Awesome by Dave Gandy - http://fontawesome.io
