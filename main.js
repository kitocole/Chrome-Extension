
// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/r eference/events/ for additional details.
// chrome.runtime.onInstalled.addListener(async () => {

//   //gets url
//   let url = chrome.runtime.getURL("index.html");

//   //open new tab only after we get the data from url
//   let tab = await chrome.tabs.create({ url });

  
//   console.log(`Created tab ${tab.id}`);
// });

// //Every time a new page loads, replace images with ours
// const imgURL = chrome.runtime.getURL("assets/michael.png");
// console.log('hi');
// document.querySelectorAll('img').forEach((element) => {
//   element.src = imgURL;
// })
const konami = ['ArrowUp','ArrowUp','ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA', 'Enter'];
const keyPresses = [];

document.querySelector('body').addEventListener('keydown', async (e) => {
  let [tab] = await chrome.tabs.query( { active: true, currentWindow: true});
  console.log('hi');
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: checkKonami(e),
  });
});

function checkKonami(e) {
 console.log(e); 
}
