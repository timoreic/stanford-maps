'use strict';

var mapsInfoArray = [
  { filename: 'map-s.gif' },
  { filename: 'map-m.gif' },
  { filename: 'map-l.gif' },
  { filename: 'map-xl.gif' },
];

var mapsArray = new Array();
var count = 1;
var isDragging = false;
var currentX;
var currentY;

for (var i = 0; i < mapsInfoArray.length; i++) {
  mapsArray[i] = new Image();
  mapsArray[i].src = mapsInfoArray[i].filename;
}

function handleResize() {
  changeDivSizes();
  var outerSectionElement = document.getElementById('outerSection');
  var controlSectionElement = document.getElementById('controlSection');
  var outerSectionStyles = document.defaultView.getComputedStyle(
    document.getElementById('outerSection'),
    ''
  );
  var mapSectionStyles = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var outerSectionWidthHalf = parseInt(outerSectionStyles.width) / 2;
  var outerSectionHeightHalf = parseInt(outerSectionStyles.height) / 2;
  let outerLeft = windowWidth / 2 - outerSectionWidthHalf;
  let outerTop = windowHeight / 2 - outerSectionHeightHalf;
  var controlLeft = outerLeft + parseInt(mapSectionStyles.width);
  outerSectionElement.style.setProperty('left', String(outerLeft) + 'px');
  outerSectionElement.style.setProperty('top', String(outerTop) + 'px');
  controlSectionElement.style.setProperty('left', String(controlLeft) + 'px');
}

function changeDivSizes() {
  var outerSectionElement = document.getElementById('outerSection');
  var mapSectionElement = document.getElementById('mapSection');
  var controlSectionElement = document.getElementById('controlSection');
  outerSectionElement.style.setProperty('width', '90%');
  outerSectionElement.style.setProperty('height', '90%');
  mapSectionElement.style.setProperty('width', '80%');
  mapSectionElement.style.setProperty('height', '100%');
  controlSectionElement.style.setProperty('width', '20%');
  controlSectionElement.style.setProperty('height', '100%');
}

function getMapHeight() {
  var mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  var mapHeight =
    parseInt(mapSectionStyle.height) - 60; /* 60 = 2*border of 30px */
  return mapHeight;
}

function getMapWidth() {
  var mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  var mapWidth =
    parseInt(mapSectionStyle.width) - 60; /* 60 = 2*border of 30px */
  return mapWidth;
}

function getMapTop() {
  var outerSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('outerSection'),
    ''
  );
  var topMap = parseInt(outerSectionStyle.top) + 30;
  return topMap;
}

function getMapLeft() {
  var outerSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('outerSection'),
    ''
  );
  var leftMap = parseInt(outerSectionStyle.left) + 30;
  return leftMap;
}

function inMap(x, y) {
  return (
    x >= getMapLeft() &&
    x <= getMapLeft() + getMapWidth() &&
    y >= getMapTop() &&
    y <= getMapTop() + getMapHeight()
  );
}

function handleMouseDown(evt) {
  if (inMap(evt.clientX, evt.clientY)) {
    isDragging = true;
    currentX = evt.clientX;
    currentY = evt.clientY;
    evt.preventDefault();
  }
}

function handleMouseUp(evt) {
  if (isDragging) {
    let map = document.getElementById('map');
    map.style.cursor = 'default';
    let mapStyle = document.defaultView.getComputedStyle(
      document.getElementById('map'),
      ''
    );
    let moveX = evt.clientX;
    let moveY = evt.clientY;
    let differenceX = currentX - moveX;
    let differenceY = currentY - moveY;
    let x = parseInt(mapStyle.left) - differenceX;
    let y = parseInt(mapStyle.top) - differenceY;
    map.style.transition = 'none';
    map.style.left = x + 'px';
    map.style.top = y + 'px';
    currentX = moveX;
    currentY = moveY;
    isDragging = false;
  }
}

function handleMouseMove(evt) {
  if (isDragging) {
    let map = document.getElementById('map');
    let mapStyle = document.defaultView.getComputedStyle(
      document.getElementById('map'),
      ''
    );
    let moveX = evt.clientX;
    let moveY = evt.clientY;
    let differenceX = currentX - moveX;
    let differenceY = currentY - moveY;
    let x = parseInt(mapStyle.left) - differenceX;
    let y = parseInt(mapStyle.top) - differenceY;
    map.style.transition = 'none';
    map.style.left = x + 'px';
    map.style.top = y + 'px';
    map.style.cursor = 'move';
    currentX = moveX;
    currentY = moveY;
    evt.preventDefault();
  }
}

function centerViewArea(evt) {
  let map = document.getElementById('map');
  let outerSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('outerSection'),
    ''
  );
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  let mapSectionWidth = parseInt(outerSectionStyle.width) / 2 - 30;
  let mapSectionHeight = parseInt(outerSectionStyle.height) / 2 - 30;
  let leftMap = windowWidth / 2 - mapSectionWidth;
  let topMap = windowHeight / 2 - mapSectionHeight;
  let mapSectionHalfWidth = (parseInt(mapSectionStyle.width) - 60) / 2;
  let mapSectionHalfHeight = (parseInt(mapSectionStyle.height) - 60) / 2;
  let centerX = leftMap + mapSectionHalfWidth;
  let centerY = topMap + mapSectionHalfHeight;
  let clickedX = evt.clientX;
  let clickedY = evt.clientY;
  let differenceX = centerX - clickedX;
  let differenceY = centerY - clickedY;
  let x = parseInt(mapStyle.left) + differenceX;
  let y = parseInt(mapStyle.top) + differenceY;
  map.style.transition = 'left 3s, top 3s';
  map.style.left = x + 'px';
  map.style.top = y + 'px';
}

function zoomIn() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );
  var ratio;
  let mapSectionHalfWidth = (parseInt(mapSectionStyle.width) - 60) / 2;
  let mapSectionHalfHeight = (parseInt(mapSectionStyle.height) - 60) / 2;

  if (Math.sign(parseInt(mapStyle.left)) == -1) {
    var currentLeftCenter =
      Math.abs(parseInt(mapStyle.left)) + mapSectionHalfWidth;
  } else {
    var currentLeftCenter = mapSectionHalfWidth - parseInt(mapStyle.left);
  }

  if (Math.sign(parseInt(mapStyle.top)) == -1) {
    var currentTopCenter =
      Math.abs(parseInt(mapStyle.top)) + mapSectionHalfHeight;
  } else {
    var currentTopCenter = mapSectionHalfHeight - parseInt(mapStyle.top);
  }

  if (count === 0) {
    ratio = 2047 / 1283;
  } else if (count === 1) {
    ratio = 3063 / 2047;
  } else if (count === 2) {
    ratio = 4084 / 3063;
  }
  let newLeftCenter = currentLeftCenter * ratio;
  let newTopCenter = currentTopCenter * ratio;
  map.src = mapsInfoArray[count + 1].filename;
  count++;
  map.style.transition = 'none';
  map.style.left =
    parseInt(mapStyle.left) - (newLeftCenter - currentLeftCenter) + 'px';
  map.style.top =
    parseInt(mapStyle.top) - (newTopCenter - currentTopCenter) + 'px';
}

function zoomOut() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );
  var ratio;
  let mapSectionHalfWidth = (parseInt(mapSectionStyle.width) - 60) / 2;
  let mapSectionHalfHeight = (parseInt(mapSectionStyle.height) - 60) / 2;
  if (Math.sign(parseInt(mapStyle.left)) == -1) {
    var currentLeftCenter =
      Math.abs(parseInt(mapStyle.left)) + mapSectionHalfWidth;
  } else {
    var currentLeftCenter = mapSectionHalfWidth - parseInt(mapStyle.left);
  }

  if (Math.sign(parseInt(mapStyle.top)) == -1) {
    var currentTopCenter =
      Math.abs(parseInt(mapStyle.top)) + mapSectionHalfHeight;
  } else {
    var currentTopCenter = mapSectionHalfHeight - parseInt(mapStyle.top);
  }
  if (count === 3) {
    ratio = 3063 / 4084;
  } else if (count === 2) {
    ratio = 2047 / 3063;
  } else if (count === 1) {
    ratio = 1283 / 2047;
  }
  let newLeftCenter = currentLeftCenter * ratio;
  let newTopCenter = currentTopCenter * ratio;
  map.src = mapsInfoArray[count - 1].filename;
  count--;
  map.style.transition = 'none';
  map.style.left =
    parseInt(mapStyle.left) + (currentLeftCenter - newLeftCenter) + 'px';
  map.style.top =
    parseInt(mapStyle.top) + (currentTopCenter - newTopCenter) + 'px';
}

function moveUp() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );

  let mapSectionHalfHeight = (parseInt(mapSectionStyle.height) - 60) / 2;

  map.style.transition = 'left 3s, top 3s';
  map.style.top = parseInt(mapStyle.top) + mapSectionHalfHeight + 'px';
}

function moveRight() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );

  let mapSectionHalfWidth = (parseInt(mapSectionStyle.width) - 60) / 2;

  map.style.transition = 'left 3s, top 3s';
  map.style.left = parseInt(mapStyle.left) - mapSectionHalfWidth + 'px';
}

function moveDown() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );

  let mapSectionHalfHeight = (parseInt(mapSectionStyle.height) - 60) / 2;

  map.style.transition = 'left 3s, top 3s';
  map.style.top = parseInt(mapStyle.top) - mapSectionHalfHeight + 'px';
}

function moveLeft() {
  let map = document.getElementById('map');
  let mapSectionStyle = document.defaultView.getComputedStyle(
    document.getElementById('mapSection'),
    ''
  );
  let mapStyle = document.defaultView.getComputedStyle(
    document.getElementById('map'),
    ''
  );

  let mapSectionHalfWidth = (parseInt(mapSectionStyle.width) - 60) / 2;

  map.style.transition = 'left 3s, top 3s';
  map.style.left = parseInt(mapStyle.left) + mapSectionHalfWidth + 'px';
}

window.addEventListener('load', handleResize, false);
window.addEventListener('resize', handleResize, false);

document.addEventListener('mousedown', handleMouseDown, false);
document.addEventListener('mouseup', handleMouseUp, false);
document.addEventListener('mousemove', handleMouseMove, false);

document
  .getElementById('map')
  .addEventListener('dblclick', centerViewArea, false);

document.getElementById('zoomIn').addEventListener('click', zoomIn, false);
document.getElementById('zoomOut').addEventListener('click', zoomOut, false);

document.getElementById('up').addEventListener('click', moveUp, false);
document.getElementById('right').addEventListener('click', moveRight, false);
document.getElementById('down').addEventListener('click', moveDown, false);
document.getElementById('left').addEventListener('click', moveLeft, false);
