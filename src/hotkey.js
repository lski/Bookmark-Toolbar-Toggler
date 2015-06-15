const hotkeys = require("sdk/hotkeys");
const options = require('sdk/simple-prefs');

function Hotkey(enabled, combo, toggleHandler) {
    
    let _hotkey = null,
        _combo = combo,
        _toggleHandler = toggleHandler;
    
    /**
    * Enable the hotkey so that it works using the current combination
    */
    this.enable = function() {

        _hotkey = hotkeys.Hotkey({
            combo: _combo,
            onPress: _toggleHandler
        });
    };
    
    /**
    * Disable the hot key so it doesnt work anymore
    */
    this.disable = function() {
        
        if (_hotkey != null) {
            // small workaround for a bug with the sandbox not being able to travel up the proto chain
            _hotkey.__proto__.destroy.call(_hotkey);
            _hotkey = null;
        }
    };
    
    /**
    * Changes the enabled state 
    */
    this.changeState = function(state) {
        
        if(state) {
            this.enable();
        }
        else {
            this.disable();
        }
    };
    
    /**
    * Assign a new combo to this hotkey
    */
    this.assign = function(combo) {
        
        _combo = combo;
                
        // Only enable the new combo if the hot key is already enabled
        if(_hotkey != null) {

            this.disable();
            this.enable();    
        }
    };
    
    // if enabled on startup 
    if (enabled) {
        this.enable();
    }
}

exports.Hotkey = Hotkey;