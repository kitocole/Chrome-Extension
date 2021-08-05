let button = document.getElementById('changeImage');
let kanye = document.getElementById('kanye');
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
  //  const video = document.createElement('iframe');
  //  video.setAttribute('width', '420px');
  //  video.setAttribute('height', '345px');
  //  video.setAttribute('allow', 'autoplay');
  //  video.setAttribute('type', 'text/html');
  //  video.setAttribute('src',"http://www.youtube.com/embed/iik25wqIuFo?autoplay=1" );
  //  document.querySelector('body').appendChild(video)
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

kanye.addEventListener('click', async() => {
  fetch("https://api.kanye.rest/").then(response => response.json()).then(data => showQuote(data));
  let [tab] = await chrome.tabs.query( { active: true, currentWindow: true});
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: kanyefy,
  })
})

function showQuote(data) {
  let quote = document.getElementById('kanyeWord');
  quote.innerHTML = data.quote;
}

function kanyefy() {
  fetch("https://api.kanye.rest/").then(response => response.json()).then(data => {
    if(document.getElementById('quote-box')){
      document.getElementById('quote-box').remove();
    }
    const quoteBox = document.createElement('h1');
    quoteBox.style.color = 'black';
    quoteBox.style.backgroundColor = 'white';
    quoteBox.style.position = 'absolute';
    quoteBox.style.top = '0px';
    quoteBox.style.left = '0px';
    quoteBox.style.zIndex = '9999';
    quoteBox.setAttribute('id', 'quote-box');
    quoteBox.innerHTML =  data.quote;
    document.querySelector('body').appendChild(quoteBox);
  });
  
}