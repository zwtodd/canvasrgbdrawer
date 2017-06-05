# canvasrgbdrawer
*Simple app that takes user input and draws to canvas. Can add text, text shadows, adjust gradients, outputs rgb and hex values.

This app was created to aid my own learning of html5/javascript/css. If there is a way to make it better, especially the CSS file, I'd love to see how.

The app is simple. It takes user input in form of range inputs to adjust the rgb values of a canvas element (either a rectangle or circle).
The user can have one solid color or choose to add a second color for a gradient. Linear and radial gradients are supported.

A single line of text can be overlain the drawn element. Shadow effects can be applied to the text, but not the drawn element. All colors are editable.
The fonts in use are arbitrary. I chose some at random from Google Fonts that looked appearling. All fonts are loaded with the web font loader,
as I found that to be the fastest due to the number of fonts in use (12 at time of writing).

RGB and Hex values are outputted to the right.

An example of the type of image produced is available on the wiki page.

TODO:
- Make text draggable around the canvas.
- Prettify CSS code and see what improvements can be made. Fear of redundancy or overused/misused attributes. Flexboxes are new to me.
- See about having the app output the CSS code for use in other projects. 
- Custom image overlays.
- Improve comments within code.
- Possibly add more color/gradient abilities. See if adding a color can be modular and "infinite".
- Download image that is produced.
