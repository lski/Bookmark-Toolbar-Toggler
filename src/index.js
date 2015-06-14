"use strict;";

const BOOKMARK_TOOLBAR_SELECTOR = "#PersonalToolbar";

const buttons = require('sdk/ui/button/action');
const utils = require('sdk/window/utils');
const hotkeys = require("sdk/hotkeys");

var button = createButton();
var hotkey = createHotkey();

function handler(state) {
	toggleBookmarkToolbars();
}

function toggleBookmarkToolbars() {
    
    let toolbars = getBookmarkToolbars(getWindows());
    
    if(!toolbars.length) {
        return;
    }
    
    let visible = null;

    for(let toolbar of toolbars){
        
        if(visible === null) {
            visible = !!toolbar.collapsed;
        }
        
        toolbar.ownerGlobal.setToolbarVisibility(toolbar, visible);
    }
}

function getWindows() {
    return [utils.getMostRecentBrowserWindow()];
}

function getBookmarkToolbars(windows) {

    let toolbars = windows.map((w) => { 
        return w.document.querySelector(BOOKMARK_TOOLBAR_SELECTOR); 
    });
    
	return toolbars;
}

function createHotkey() {
    
    hotkeys.Hotkey({
        combo: "control-alt-b",
        onPress: handler
    })
}

function createButton(){
    
    return buttons.ActionButton({
      id: "btn-show",
      label: "Show/Hide Bookmarks Toolbar",
      icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
      },
      onClick: handler
    });
}