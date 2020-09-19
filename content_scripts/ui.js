const statBox = document.createElement('p');
statBox.style.zIndex = "999";
statBox.style.minWidth = "300px";
statBox.style.minHeight = "300px";
statBox.style.padding = "10px 5px 10px 10px";
statBox.style.borderRadius = "4px";
statBox.style.position = "absolute";
statBox.style.whiteSpace = "pre";
statBox.style.backgroundColor = "#AED3E5"
statBox.id = "colonistHUDStatBox";
statBox.textContent = JSON.stringify({});
document.body.append(statBox);

const statsWrapper = function() {
    window.colonistHUDStats = new Proxy((window.colonistHUDStats || {}), {
        set: (target, p, value, receiver) => {
            document.getElementById("colonistHUDStatBox").textContent = JSON.stringify(value, null, 4);
            return Reflect.set(target, p, value, receiver);
        }
    })
    console.log("Watching colonist HUD stats...");
};

const stringifiedCode = '(' + statsWrapper + ')();';
const scriptTag = document.createElement('script');
scriptTag.textContent = stringifiedCode;
(document.head || document.documentElement).appendChild(scriptTag);
scriptTag.remove()
