Bookmark Toolbar Toggler
========================

A simple Firefox addon to allow the user to toggle the visibility of the bookmarks toolbar. Designed to make the toolbar more useful for storing bookmarks/bookmarklets without taking up lots of screen space. It can be toggled by either a button on the main toolbar or via key combinations.

I built it as there is not currently any key combination short cut for toggling the bookmarks toolbar in Firefox. 

### User Options

- Enabling keyboard short cuts, by default: __true__
- The key combination for the short cut if enabled, by default: __Ctrl + Alt + B__

Both these options can be changed in the addon's option screen in Firefox

#### Building

I built the extension using the jpm (node version) of the extension builder for restartless addons which can be installed using npm:

To install the builder:
- npm install -g jpm

Then to run the extension:
- navigate to the application root
- In console type: jpm run
- A new browser window will load with the extention installed, its that simple

Note to debug the running test application:
  - Got to options >  addons in the browser
  - On the window that opens select the 'Extensions' tab
  - Press the 'Debug' button next to the extension
  - When asked click ok to the server request (its the node link to the browser to allow debugging)
  - You then have access to the debug window in the browser

__Please Note__ the jpm is not built by myself, but by Mozilla, if you have any issues raise it at https://www.npmjs.com/package/jpm.
