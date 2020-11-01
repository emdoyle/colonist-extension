chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({colonistHUDServerPath: 'ws://localhost:8000/ws/api/game/catan/'}, function() {
        console.log("The server path is 'ws://localhost:8000/ws/api/game/catan/'.");
    });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'colonist.io'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});