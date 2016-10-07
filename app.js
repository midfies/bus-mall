'use strict';
//**********************global variables****************************************
var itemsArray = [];
var count = 0;
var selectionDisplay = document.getElementById('selectionDisplay');
var choices = document.getElementById('choices');
var results = document.getElementById('results');
var complete = document.getElementById('complete');
var chartData = document.getElementById('displayCharts');

//**********************intialize catalog***************************************
var localStorageArray = localStorage.getItem('itemsArray');
if (localStorageArray){
  itemsArray = JSON.parse(localStorageArray);
} else{
  new BusMallItem('img/banana.jpg', 'Banana Slicer', 'banana');
  new BusMallItem('img/bathroom.jpg', 'Bathroom Device Stand', 'bathroom');
  new BusMallItem('img/boots.jpg', 'Toeless Rain Boots', 'boots');
  new BusMallItem('img/breakfast.jpg', 'Toaster Pan Pot', 'breakfast');
  new BusMallItem('img/bubblegum.jpg', 'Meatball BubbleGum', 'bubblegum');
  new BusMallItem('img/chair.jpg', 'Uncomfortable Chair', 'chair');
  new BusMallItem('img/cthulhu.jpg', 'Cthulhu', 'cthulhu');
  new BusMallItem('img/dog-duck.jpg', 'Dog Duck Beak', 'dog-duck');
  new BusMallItem('img/dragon.jpg', 'Dragon Meat', 'dragon');
  new BusMallItem('img/pen.jpg', 'Pen Cap Utensils', 'pen');
  new BusMallItem('img/pet-sweep.jpg', 'Pet Sweep Slippers', 'pet-sweep');
  new BusMallItem('img/scissors.jpg', 'Pizza Scissors', 'scissors');
  new BusMallItem('img/shark.jpg', 'Shark Sleeping Bag', 'shark');
  new BusMallItem('img/sweep.png', 'Baby Sweeper PJs', 'sweep');
  new BusMallItem('img/tauntaun.jpg', 'Tauntaun Sleeping Bag', 'tauntaun');
  new BusMallItem('img/unicorn.jpg', 'Unicorn Meat', 'unicorn');
  new BusMallItem('img/usb.gif', 'Tentical USB', 'usb');
  new BusMallItem('img/water-can.jpg', 'Self Filling Water Can', 'water-can');
  new BusMallItem('img/wine-glass.jpg', 'Spillful Wineglass', 'wine-glass');
}
console.log(itemsArray);
//**********************item constructor****************************************
function BusMallItem(imgSrc, displayName, name){
  this.imageSource = imgSrc;
  this.displayName = displayName;
  this.name = name;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  this.recentlyUsed = false;

  itemsArray.push(this);
}
//**********************get three items*****************************************
function getThreeItems(){
  var threeItemArray = [];
  var indexArray = [];
  var validItem = true;
  while(threeItemArray.length !== 3){
    var item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    for (var i = 0; i < threeItemArray.length; i++){
      if (threeItemArray[i].name === item.name){
        console.log('Doubles Prevented ' + item.name);
        validItem = false;
      }
    }
    if (validItem && item.recentlyUsed !== true){
      indexArray.push(findIndexByName(item.name));
      threeItemArray.push(item);
      item.timesDisplayed += 1;
    }
    else {
      console.log('Did not add ' + item.name);
      validItem = true;
    }
  }
  clearRecentlyUsed();
  itemsArray[indexArray[0]].recentlyUsed = true;
  itemsArray[indexArray[1]].recentlyUsed = true;
  itemsArray[indexArray[2]].recentlyUsed = true;
  return threeItemArray;
}
//************ Helper Functions for getThreeItems()***************************
function findIndexByName(name){
  for (var i = 0; i < itemsArray.length; i++){
    if (itemsArray[i].name === name){
      return i;
    }
  }
  return -1;
}

function clearRecentlyUsed(){
  for (var i = 0; i < itemsArray.length; i++){
    itemsArray[i].recentlyUsed = false;
  }
}

function displayThreeItems(){
  choices.innerHTML = '';
  var threeItems = getThreeItems();
  for (var i = 0; i < 3; i++){
    displayItem(threeItems[i]);
  }
}
function displayItem(item){
  var lineElement = document.createElement('li');
  var imageElement = document.createElement('img');
  imageElement.src = item.imageSource;
  imageElement.alt = item.name;
  lineElement.appendChild(imageElement);
  choices.appendChild(lineElement);
}
function runMain(){
  displayThreeItems();
}

//**********************eventHandler********************************************
function handleClickEvent(event){
  if(event.target.id === 'choices'){
    console.log('Invalid Click Response');
    return alert('You must Click on an Image!');
  }

  var choice = event.target.alt;
  for (var i = 0; i < itemsArray.length; i++){
    if(itemsArray[i].name === choice){
      itemsArray[i].timesClicked += 1;
    }
  }
  var arrayToStore = JSON.stringify(itemsArray);
  localStorage.setItem('itemsArray',arrayToStore);
  displayThreeItems();
  count++;
  if (count === 25){
    removeListenerAndUpdate();
  }
}
function clearLocalStorage(){
  localStorage.clear();
}
function reloadPage(){
  location.reload();
}

//**********************remove eventHandler*************************************
function removeListenerAndUpdate(){
  selectionDisplay.removeEventListener('click',handleClickEvent);
  complete.textContent = 'See Results';
}
//**********************display results*****************************************
function displayResults(){
  // results.innerHTML = '';
  // for (var i = 0; i < itemsArray.length; i++){
  //   var lineElement = document.createElement('li');
  //   lineElement.setAttribute('class', 'disp');
  //   lineElement.textContent = itemsArray[i].name + ': Clicked/Displayed - ' + itemsArray[i].timesClicked + '/' + itemsArray[i].timesDisplayed;
  //   results.appendChild(lineElement);
  // }
  prepareLabelsAndData();
  drawChart();
}
//**********************eventListeners******************************************
selectionDisplay.addEventListener('click', handleClickEvent);
complete.addEventListener('click',displayResults);
reset.addEventListener('click',clearLocalStorage);
tryAgain.addEventListener('click',reloadPage);
//**********************Charting Data*******************************************
var labelArray = [];
var dataArray = [];
function prepareLabelsAndData(){
  for (var i = 0; i < itemsArray.length; i++){
    labelArray[i] = itemsArray[i].name;
    labelArray[i] = labelArray[i].charAt(0).toUpperCase() + labelArray[i].slice(1);
    dataArray[i] = itemsArray[i].timesClicked;
  }
  console.log(labelArray + ' ' + dataArray);
}

var data = {
  labels: labelArray,
  datasets: [
    {
      data: dataArray,
      label: 'Clicks Per Item',
      backgroundColor: [
        'red', 'orange','yellow', 'green', 'blue', 'indigo','violet', 'magenta',
        'brown', 'navy', 'turquoise', 'steelblue', 'tomato', 'pink', 'olive',
        'maroon', 'lime', 'hotpink', 'gold'
      ],
    }]
};

function drawChart() {

  var voteChart = new Chart(chartData,{
    type: 'bar',
    data: data,
    options: {responsive: false},
    scales: [{ticks:{ beginAtZero:true}}] });
  console.log(voteChart);
}

//**********************RUN THE CODE********************************************
runMain();
