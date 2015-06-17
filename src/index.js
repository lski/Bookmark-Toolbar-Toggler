"use strict;";

const BOOKMARK_TOOLBAR_SELECTOR = "#PersonalToolbar";
const HOTKEY_ENABLED_OPTION = 'hotkeyEnabled';
const HOTKEY_OPTION = "hotkeys";

const utils = require('sdk/window/utils');
const options = require('sdk/simple-prefs');
const { Hotkey } = require('./hotkey.js');
const { Button } = require('./button.js');

let button = null,
    hotkey = null;

exports.main = load;
exports.onUnload = unload;

function load(ops) {
    
    console.log('load', ops.loadReason);
    
    if(/install|enable/i.test(ops.loadReason)){
        
        button = new Button(toggleHandler);
        hotkey = new Hotkey(options.prefs[HOTKEY_ENABLED_OPTION], options.prefs[HOTKEY_OPTION], toggleHandler);
        
        options.on(HOTKEY_OPTION, hotkeyChangedHandler);
        options.on(HOTKEY_ENABLED_OPTION, hotkeyEnabledChangedHandler);
    }
}

function unload(reason) {
    
    console.log('unload', reason);
    
    button = hotkey = null;

    options.off(HOTKEY_OPTION, hotkeyChangedHandler);
    options.off(HOTKEY_ENABLED_OPTION, hotkeyEnabledChangedHandler);
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

function toggleHandler(state) {
    toggleBookmarkToolbars();
}

function hotkeyChangedHandler() {
    hotkey.assign(options.prefs[HOTKEY_OPTION]);
}

function hotkeyEnabledChangedHandler() {
    hotkey.changeState(options.prefs[HOTKEY_ENABLED_OPTION]);
}

function toggleBookmarkToolbars() {

    let toolbars = getBookmarkToolbars(getWindows());

    if (!toolbars.length) {
        return;
    }

    let visible = null;

    for (let toolbar of toolbars) {

        if (visible === null) {
            visible = !!toolbar.collapsed;
        }

        toolbar.ownerGlobal.setToolbarVisibility(toolbar, visible);
    }
}