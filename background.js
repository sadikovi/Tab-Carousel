var toggle_left = "toggle-tab-left";
var toggle_right = "toggle-tab-right";

document.addEventListener('DOMContentLoaded', function () {
    chrome.commands.onCommand.addListener(function(command) {
        console.log(command);
        if (command == toggle_left) {
            selectTab(true);
        } else if (command == toggle_right) {
            selectTab(false);
        }
    });
});

function selectTab(goLeft) {
    chrome.tabs.query({"currentWindow":true}, function(tabs) {
        for (var i=0; i<tabs.length; i++) {
            if (tabs[i].active && tabs[i].selected) {
                var index = i;
                if (goLeft && i>0) {
                    index = i-1;
                } else if (!goLeft && i<tabs.length-1) {
                    index = i+1;
                }
                if (index != i) {
                    chrome.tabs.update(tabs[i].id, {"active":false, "highlighted":false, "selected":false});
                    chrome.tabs.update(tabs[index].id, {"active":true, "highlighted":true, "selected":true});
                }
                return false;
            }
        }
    });
}
