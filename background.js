chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({colonistHUDServerPath: 'wss://0x63problems.dev/ws/api/game/catan/'}, function() {
        console.log("The server path is 'wss://0x63problems.dev/ws/api/game/catan/'.");
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