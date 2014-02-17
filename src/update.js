// GENERIC UPDATE LOGIC


var NOMINAL_UPDATE_INTERVAL = 16.666;


var g_prevUpdateDt = null;


var g_prevUpdateDu = null;


var g_isUpdateOdd = false;


function update(dt) {

    if (shouldSkipUpdate()) return;

    var original_dt = dt;
    

    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }

    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du);
    
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    
    g_isUpdateOdd = !g_isUpdateOdd;
}

var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}
