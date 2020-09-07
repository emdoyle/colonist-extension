const websocketWrapper = function(serverPath) {
    'use strict';
    const serverWS = new window.WebSocket(serverPath);
    setInterval(function () {
        serverWS.send(JSON.stringify({"recv": true}))
    }, 1000);

    // proxy the window.WebSocket object
    const WebSocketProxy = new Proxy(window.WebSocket, {
        construct: function (target, args) {
            // create WebSocket instance
            const instance = new target(...args);

            // WebSocket "onopen" handler
            const openHandler = (event) => {
                console.log('Open', event);
            };

            // WebSocket "onmessage" handler
            const messageHandler = (event) => {
                console.log('Message', event);
                serverWS.send(event.data);
            };

            // WebSocket "onclose" handler
            const closeHandler = (event) => {
                console.log('Close', event);
                // remove event listeners
                instance.removeEventListener('open', openHandler);
                instance.removeEventListener('message', messageHandler);
                instance.removeEventListener('close', closeHandler);
            };

            // add event listeners
            instance.addEventListener('open', openHandler);
            instance.addEventListener('message', messageHandler);
            instance.addEventListener('close', closeHandler);

            // proxy the WebSocket.send() function
            const sendProxy = new Proxy(instance.send, {
                apply: function (target, thisArg, args) {
                    console.log('Send', args);
                    target.apply(thisArg, args);
                }
            });

            // replace the native send function with the proxy
            instance.send = sendProxy;

            // return the WebSocket instance
            return instance;
        }
    });

    // replace the native WebSocket with the proxy
    window.WebSocket = WebSocketProxy;
};
chrome.storage.sync.get(
    "colonistHUDServerPath",
    (data) => {
        const stringifiedCode = '(' + websocketWrapper + ')(' + JSON.stringify(data.colonistHUDServerPath) + ');';
        const scriptTag = document.createElement('script');
        scriptTag.textContent = stringifiedCode;
        (document.head || document.documentElement).appendChild(scriptTag);
        scriptTag.remove()
    }
);
