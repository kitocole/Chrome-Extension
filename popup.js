let button = document.getElementById('changeImage');

const konami = ['ArrowUp','ArrowUp','ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
let keyPresses = [];

document.querySelector('body').addEventListener('keydown', async (e) => {
  let [tab] = await chrome.tabs.query( { active: true, currentWindow: true});
  //console.log(e);
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: checkKonami(e.key),
  });
});

async function checkKonami(key) { 
  console.log(key);
 if(!keyPresses[0] && key === 'ArrowUp'){
    keyPresses.push(key);
 }else if(key === konami[keyPresses.length]){
   keyPresses.push(key)
 }else {
   keyPresses = [];
 }
 if(keyPresses[10] === konami[10]){
   console.log('YOU CHEATED');
   //let url = chrome.runtime.getURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
   //open new tab only after we get the data from url
   let tab = await chrome.tabs.create({'url':"https://www.youtube.com/watch?v=dQw4w9WgXcQ"});
   //console.log(`Created tab ${tab.id}`);
   
 }
 console.log(keyPresses);
}


button.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query( { active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: changeImages,
  });
});

function changeImages() {
  const imgURL = "https://codesmith.io/81ff5ac1c752947addbb16c2c7c84381.jpg" //chrome.runtime.getURL("assets/michael.png");
  console.log(imgURL);
  document.querySelectorAll('img').forEach((element) => {
    console.log(element);
    element.setAttribute('src', imgURL);
  } );
}