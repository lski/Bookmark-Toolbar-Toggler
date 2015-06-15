const buttons = require('sdk/ui/button/action');

function Button(toggleHandler) {

    let _button = buttons.ActionButton({
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

exports.Button = Button;