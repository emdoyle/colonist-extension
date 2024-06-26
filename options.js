const saveButton = document.getElementById("saveButton");
const statusDiv = document.getElementById("status");
const serverPathInput = document.getElementById("serverPathInput");

chrome.storage.sync.get("colonistHUDServerPath", function(data) {
    serverPathInput.value = data.colonistHUDServerPath
});

saveButton.onclick = function(element) {
    chrome.storage.sync.set({"colonistHUDServerPath": serverPathInput.value}, function(data) {
    	statusDiv.textContent = "Server path saved."
    	setTimeout(() => statusDiv.textContent = '', 750)
    })
};
