'use strict';

(function () {
    os.ps.register('DeviceDriverTest', main);

    function main(stdout, stdin) {
        console.log('fuck');
        stdout.appendToBuffer('Wow its bed time\n');

        stdout.appendToBuffer('Hey its really bed time now\n');

        stdout.appendToBuffer('Okay im done now\n');
    }
})();