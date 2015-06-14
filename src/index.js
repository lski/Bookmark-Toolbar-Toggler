"use strict;";

const BOOKMARK_TOOLBAR_SELECTOR = "#PersonalToolbar";
const HOTKEY_ENABLED_OPTION = 'hotkeyEnabled';
const HOTKEY_OPTION = "hotkeys";

const buttons = require('sdk/ui/button/action');
const utils = require('sdk/window/utils');
const hotkeys = require("sdk/hotkeys");
const options = require('sdk/simple-prefs');

var hotkey = initHotkey(),
    button = initButton();

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

function getWindows() {
    return [utils.getMostRecentBrowserWindow()];
}

function getBookmarkToolbars(windows) {

    let toolbars = windows.map((w) => {
        return w.document.querySelector(BOOKMARK_TOOLBAR_SELECTOR);
    });

    return toolbars;
}

function enableHotkey() {

    return hotkeys.Hotkey({
            combo: options.prefs[HOTKEY_OPTION],
            onPress: toggleHandler
        });
}

function disableHotkey(hotkey) {

    if (hotkey != null) {
        // small workaround for a bug with the sandbox not being able to travel up the proto chain
        hotkey.__proto__.destroy.call(hotkey);
    }

    return null;
}

function initButton() {

    return buttons.ActionButton({
        id: "btn-show",
        label: "Show/Hide Bookmarks Toolbar",
        icon: {
            "16": "./icon-16.png",
            "32": "./icon-32.png",
            "64": "./icon-64.png"
        },
        onClick: toggleHandler
    });
}

function initHotkey() {

    // Handle both the option changes the same as both require new hotkey objects
    options.on("", hotkeyOptionsChangedHandler);

    if (options.prefs[HOTKEY_ENABLED_OPTION]) {
        return enableHotkey();
    }
}

function toggleHandler(state) {
    toggleBookmarkToolbars();
}

function hotkeyOptionsChangedHandler() {
    // look at the fact we are not destorying the old hot key
    hotkey = options.prefs[HOTKEY_ENABLED_OPTION] ? enableHotkey() : disableHotkey(hotkey);
}
