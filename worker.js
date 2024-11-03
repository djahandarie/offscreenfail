let backgroundPort = null;

onconnect = function (e) {
    console.log('worker.js: onconnect');
    const port = e.ports[0];

    port.onmessage = function (e) {
        console.log(e);
        if (e.data === 'registerBackground') {
            console.log('worker.js: received registerBackground');
            backgroundPort = port;
        } else if (e.data === 'connectToBackground1') {
            console.log('worker.js: received connectToBackground1');
            backgroundPort.postMessage('connectToBackground2', [port]);
        }
    };
};
