'use strict';

var noble = require('noble');
noble.on('stateChange', function (state) {
    console.log('state', state);
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

function flashColors(characteristic, index) {
    var colors = [[0xff, 0, 0], [0, 0xff, 0], [0, 0, 0xff]];
    index = index || 0;
    var color = colors[index % colors.length];
    characteristic.write(new Buffer([0x56].concat(color, [0x00, 0xf0, 0xaa])));
    setTimeout(() => flashColors(characteristic, index + 1), 1000);
}

noble.on('discover', function (peripheral) {
    if (peripheral.advertisement.serviceUuids.indexOf('ffe5') >= 0) {
        peripheral.connect(function (err) {
            console.log('Connected!', err);
            peripheral.discoverAllServicesAndCharacteristics((err, svc, chars) => {
                if (err) {
                    console.error('discoverAllServicesAndCharacteristics failed', err);
                    return;
                }
                let char = chars.filter(char => char.uuid === 'ffe9')[0];
                flashColors(char);
            });
        });
    }
    console.log('Found device with local name: ' + peripheral.advertisement.localName);
    console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
    console.log();
});

console.log('we are ready...');
