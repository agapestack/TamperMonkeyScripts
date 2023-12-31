// ==UserScript==
// @name         Youtube Short remover
// @namespace    https://github.com/agapestack
// @version      0.1
// @description  Removing Youtube shorts (only tested w/ firefox)
// @author       Agape
// @match        https://www.youtube.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

/*
Absolutly garbage in terms of performance but working great on my firefox :)
TODO: check if possible only w/ CSS
*/

(function() {
    'use strict';
    console.log("Using Youtube Short remover script...");

    var contents = document.getElementById("contents");
    const observerConfig = { attributes: true, childList: true, subtree: true };

    // TODO: optimization --> only look if child opti by looking if on --> check mdn api
    waitForElm("#contents").then((contents) => {
        const contentsCallback = (mutationList, observer) => {
           for (const mutation of mutationList) {
               if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                   mutation.addedNodes.forEach(node => {
                       // div with "YTD-RICH-SHELF-RENDERER" as tagName are Youtube shorts divs
                       if(node.tagName == 'YTD-RICH-SHELF-RENDERER'){
                           node.style.display = 'none';
                       }
                   });
               }
           }
        }
        const contentsObserver = new MutationObserver(contentsCallback);
        contentsObserver.observe(contents, observerConfig);
    });
})();

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
