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



