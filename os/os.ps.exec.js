'use strict';
(function () {
    os._internals.ps.exec = initProcess;
    
    function initProcess(name, cb) {
        os._internals.ps.pcb.push({
            id: os._internals.ps.pcb.length,
            name: name,
            state: os._internals.ps.states.START,
            entryPoint: cb
        });
    }
})();