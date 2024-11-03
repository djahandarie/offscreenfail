console.log(chrome.runtime.getURL('worker.js'));
const worker = new SharedWorker(chrome.runtime.getURL('worker.js'));

worker.port.onmessage = async (event) => {
    if (event.data === 'connectToBackground3') {
        console.log('iframe.js: received connectToBackground3');

        const backgroundPort = event.ports[0];

        // test case 1 (succeeds)
        backgroundPort.postMessage('Hello, world!');

        // test case 2 (succeeds)
        const a = new Uint8Array(10);
        backgroundPort.postMessage(a, [a.buffer]);

        // test case 3 (fails silently)
        const canvas = document.createElement('canvas');
        const offscreen = canvas.transferControlToOffscreen();
        backgroundPort.postMessage(offscreen, [offscreen]);
    }
};
worker.port.postMessage('connectToBackground1');
