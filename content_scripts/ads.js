const ads = function() {
    function removeChildren(element) {
        if (!element){return}
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }
    function removeAds() {
        const adIds = [
            "lobby_ad_left",
            "lobby_ad_right",
            "in-game-ad-left",
            "in-game-ad-right"
        ];
        adIds.forEach(adId => removeChildren(document.getElementById(adId)))
    }
    setInterval(removeAds, 500);
};

injectCode(ads)
