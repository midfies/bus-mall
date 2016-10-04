'use strict';

var itemsArray = [];
var count = 0;
// var selectionDisplay = document.getElementById('selectionDisplay');
var choices = document.getElementById('choices');
var results = document.getElementById('results');
var complete = document.getElementById('complete');

new BusMallItem('img/banana.jpg', 'Banana Slicer', 'banana');
new BusMallItem('img/bathroom.jpg', 'Bathroom Device Stand', 'bathroom' );
new BusMallItem('img/boots.jpg', 'Toeless Rain Boots', 'boots' );
new BusMallItem('img/breakfast.jpg', 'Toaster Pan Pot', 'breakfast' );
new BusMallItem('img/bubblegum.jpg', 'Meatball BubbleGum', 'bubblegum' );
new BusMallItem('img/chair.jpg', 'Uncomfortable Chair', 'chair' );
new BusMallItem('img/cthulhu.jpg', 'Cthulhu', 'cthulhu' );
new BusMallItem('img/dog-duck.jpg', 'Dog Duck Beak', 'dog-duck' );
new BusMallItem('img/dragon.jpg', 'Dragon Meat', 'dragon' );
new BusMallItem('img/pen.jpg', 'Pen Cap Utensils', 'pen' );
new BusMallItem('img/pet-sweep.jpg', 'Pet Sweep Slippers', 'pet-sweep' );
new BusMallItem('img/scissors.jpg', 'Pizza Scissors', 'scissors' );
new BusMallItem('img/shark.jpg', 'Shark Sleeping Bag', 'shark' );
new BusMallItem('img/sweep.png', 'Baby Sweeper', 'sweep' );
new BusMallItem('img/tauntaun.jpg', 'Tauntaun Sleeping Bag', 'tauntaun' );
new BusMallItem('img/unicorn.jpg', 'Unicorn Meat', 'unicorn' );
new BusMallItem('img/usb.gif', 'Tentical USB', 'usb' );
new BusMallItem('img/water-can.jpg', 'Self Filling Water Can', 'water-can' );
new BusMallItem('img/wine-glass.jpg', 'Useless Wineglass', 'wine-glass' );
console.log(itemsArray);
// for (var i = 0; i < itemsArray.length; i++){
//   itemsArray[i].displayItem();
// }

function BusMallItem(imgSrc, displayName, name){
  this.imageSource = imgSrc;
  this.displayName = displayName;
  this.name = name;
  this.timesDisplayed = 0;
  this.timesClicked = 0;
  this.recentlyUsed = false;

  this.displayItem = function(){
    var lineElement = document.createElement('li');
    var imageElement = document.createElement('img');
    imageElement.src = this.imageSource;
    imageElement.alt = this.name;
    imageElement.setAttribute('width','auto');
    imageElement.setAttribute('height','auto');
    lineElement.appendChild(imageElement);
    choices.appendChild(lineElement);
  };
  itemsArray.push(this);
}

function getThreeItems(){
  var threeArray = [];
  var indexArray = [];
  var validItem = true;
  while(threeArray.length != 3){
    var item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    for (var i = 0; i < threeArray.length; i++){
      if (threeArray[i].name === item.name){
        console.log('Doubles Prevented ' + item.name);
        validItem = false;
      }
    }
    if (validItem && item.recentlyUsed !== true){
      indexArray.push(findIndexByName(item.name));
      threeArray.push(item);
      item.timesDisplayed += 1;
    }
    else {
      console.log('Did not add ' + item.name);
      validItem = true;
    }
  }
  console.log(indexArray);
  clearRecentlyUsed();
  itemsArray[indexArray[0]].recentlyUsed = true;
  itemsArray[indexArray[1]].recentlyUsed = true;
  itemsArray[indexArray[2]].recentlyUsed = true;
  return threeArray;
}
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
    threeItems[i].displayItem();
  }
}

function handleClickEvent(event){
  if(event.target.alt === undefined){ // eslint-disable-line
    // console.log('You have to click on an image!!');
    return alert('You must Click on an Image!');
  }

  var choice = event.target.alt;
  for (var i = 0; i < itemsArray.length; i++){
    if(itemsArray[i].name === choice){
      itemsArray[i].timesClicked += 1;
    }
  }

  displayThreeItems();
  count++;
  // console.log(count);
  if (count === 25){
    removeListenerAndUpdate();
  }
  //displayResults();
}

function removeListenerAndUpdate(){
  selectionDisplay.removeEventListener('click',handleClickEvent);
  complete.textContent = 'See Results';
}

function displayResults(){
  results.innerHTML = '';
  for (var i = 0; i < itemsArray.length; i++){
    var lineElement = document.createElement('li');
    lineElement.setAttribute('class', 'disp');
    lineElement.textContent = itemsArray[i].name + ': Clicked/Displayed - ' + itemsArray[i].timesClicked + '/' + itemsArray[i].timesDisplayed;
    results.appendChild(lineElement);
  }
}

selectionDisplay.addEventListener('click', handleClickEvent);
complete.addEventListener('click',displayResults);

displayThreeItems();
