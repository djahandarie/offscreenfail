const worker = new SharedWorker(chrome.runtime.getURL('worker.js'));
worker.port.postMessage('registerBackground');
worker.port.onmessage = (event) => {
    if (event.data === 'connectToBackground2') {
        console.log('background.js: received connectToBackground2');
        const iframePort = event.ports[0];

        const { port1, port2 } = new MessageChannel();
        port1.onmessage = (e) => {
            console.log('background.js: received', e.data);
        }
        iframePort.postMessage('connectToBackground3', [port2]);
    } else {
        console.log('Message from iframe:', event.data);
    }
};
