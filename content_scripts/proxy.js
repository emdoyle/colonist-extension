const websocketWrapper = function(serverPath) {
    'use strict';
    const serverWS = new window.WebSocket(serverPath);
    serverWS.initialized = false;

    window.colonistHUDStats = {"data": {}};
    const colonistHUDServerMessageHandler = (event) => {
        const jsonData = JSON.parse(event.data);
        if (jsonData["id"] === -2) {
            localStorage.setItem("colonistHUDToken", jsonData["data"]["token"])
            serverWS.initialized = true;
        } else {
            window.colonistHUDStats.data = {...window.colonistHUDStats.data, ...jsonData};
        }
    }

    const colonistHUDServerOpenHandler = () => {
        const token = localStorage.getItem("colonistHUDToken");
        const data = token ? {"token": token} : {};
        serverWS.send(JSON.stringify({"id": -2, "data": data}));
    }

    serverWS.addEventListener('message', colonistHUDServerMessageHandler)
    serverWS.addEventListener('open', colonistHUDServerOpenHandler)

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
                if (serverWS.initialized) {
                    serverWS.send(event.data);
                }
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

            // return the WebSocket instance
            return instance;
        }
    });

    // replace the native WebSocket with the proxy
    window.WebSocket = WebSocketProxy;
    window.colonistHUDServerWS = serverWS;

    // set up observers and proxy the stats object
    window.colonistHUDStats = new Proxy((window.colonistHUDStats || {}), {
        set: (target, p, value, receiver) => {
          (window.colonistHUDStatsObservers || []).forEach(observer => observer(value))
          return Reflect.set(target, p, value, receiver);
        }
    })
    console.log("Watching colonist HUD stats...");
};

function injectCode(jsFunction, ...args) {
    const stringifiedCode = '(' + jsFunction + ')(' + args.map(arg => JSON.stringify(arg)).join(", ") + ');';
    const scriptTag = document.createElement('script');
    scriptTag.textContent = stringifiedCode;
    (document.head || document.documentElement).appendChild(scriptTag);
    scriptTag.remove()
}

chrome.storage.sync.get(
    "colonistHUDServerPath",
    (data) => {
        injectCode(websocketWrapper, data.colonistHUDServerPath);
    }
);
