const tsVscode = acquireVsCodeApi();

var svg = document.getElementById('diagram'),
    progress = document.getElementById('progress');

// Interaction stuff
var scale = 1,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = { x: 0, y: 0 },
    zoom = document.getElementById("zoom");

function setTransform() {
  zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
}

zoom.onmouseup = function (e) {
  panning = false;
}

zoom.onmousemove = function (e) {
  e.preventDefault();
  if (!panning) {
    return;
  }
  pointX = (e.clientX - start.x);
  pointY = (e.clientY - start.y);
  setTransform();
}

zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
  (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;

  setTransform();
}

function fitZoom() {
  setTimeout(function() {
    var svgRect = svg.getBBox();
  
    var fitScale = Math.min(
      zoom.offsetHeight / svgRect.height,
      zoom.offsetWidth / svgRect.width,
    );

    scale = fitScale; 
    setTransform();
  }, 100)
}

// Rendering stuff
new RegexperLib.Parser(
  svg, 
  function(isLoading) {
    if(!isLoading) {
      fitZoom();

      svg.style.opacity = '1';
      progress.style.opacity = '0';

      setTimeout(function(){
        progress.remove();
      }, 1000)
    }
  }, 
  function(progressPercentage) {
      progress.innerHTML = `${progressPercentage}%`;
  })
  .parse(expression)
  .then(parser => {
    parser.render();
  })
  .catch(err => {
    tsVscode.postMessage({type: 'onError', message: err.message});
  });