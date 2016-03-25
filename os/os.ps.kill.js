'use strict';
(function () {
    os._internals.ps.kill = killProcess;
    
    function killProcess(pid) {
        var i = 0;
        while (i < os._internals.ps.pcb.length && 
            os._internals.ps.pcb[i].id === pid) 
            i++;
        if (i === os._internals.ps.pcb.length) 
            return { status: -1 };
        var removedProcess = os._internals.ps.pcb.splice(i, 1);
        removedProcess["status"] = 0;
        return removedProcess;
    }
})();