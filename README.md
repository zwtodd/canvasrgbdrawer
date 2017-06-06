# canvasrgbdrawer
*Simple app that takes user input and draws to canvas. Can add text, text shadows, adjust gradients, outputs rgb and hex values.

This app was created to aid my own learning of html5/javascript/css. If there is a way to make it better, especially the CSS file, I'd love to see how.

The app is simple. It takes user input in form of range inputs to adjust the rgb values of a canvas element (either a rectangle or circle).

The user can have one solid color or choose to add a second color for a gradient. Linear and radial gradients are supported.

A single line of text can be overlaid on the drawn element. Shadow effects can be applied to the text, but not the drawn element. All colors are editable.

The fonts in use are arbitrary. I chose some at random from Google Fonts that looked appealing. All fonts are loaded with the web font loader, as I found that to be the fastest due to the number of fonts in use (12 at time of writing).

RGB and Hex values are outputted to the right.

An example of the type of image produced is available on the wiki page.

Images can be downloaded from the app and saved locally. 

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
- Add images to the canvas with custom sizes and be able to place and move on canvas.
- Improve comments within code.
- Possibly add more color/gradient abilities. See if adding a color can be modular and "infinite".
- ~Download image that is produced.~ ~Works in Chrome, debugging for Edge/IE~
- Be able to 'commit' text lines when done editting so they are permanent on the image, and then be able to add more text after that, and repeat.
- Also be able to move uploaded images and 'commit' them to a spot and repeat as wanted.
