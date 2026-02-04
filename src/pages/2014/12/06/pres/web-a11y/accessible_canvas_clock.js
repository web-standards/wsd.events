var currentClockImage;
var hourAngle;
var minAngle;
var secAngle;
var startMouseX;
var startMouseY;
var startHour;
var startMinute;

function loadAllImages() {
  var loadCount = 0;
  var img = new Image();
  img.onload = function() {
    currentClockImage = img;
    drawClock();
  };
  img.src = 'blank-clock-150.png';
}

function drawClockAtTime(hh, mm, ss) {
  if (!currentClockImage) {
    loadAllImages();
    return;
  }

  var ctx = document.getElementById('clock').getContext('2d');
  ctx.drawImage(currentClockImage, 0, 0);

  // Move the hour by the fraction of the minute
  hh = (hh % 12) + (mm / 60);

  // Move the minute by the fraction of the second
  mm += (ss / 60);

  hourAngle = 2 * Math.PI * hh / 12;
  minAngle = 2 * Math.PI * mm / 60;
  secAngle = 2 * Math.PI * ss / 60;

  ctx.save();
  ctx.translate(75, 77);

  // Transparent outline underneath hour and minute hands.

  ctx.lineWidth = 5;
  ctx.strokeStyle = '#ffffff';
  ctx.globalAlpha = 0.6;

  ctx.save();
  ctx.rotate(hourAngle);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, -20);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate(minAngle);
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(0, -32);
  ctx.stroke();
  ctx.restore();

  // Hour and minute hands.

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#696969';
  ctx.globalAlpha = 1.0;

  ctx.save();
  ctx.rotate(hourAngle);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, -20);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate(minAngle);
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(0, -32);
  ctx.stroke();
  ctx.restore();

  // Hour and minute focus rings.

  if (ctx.drawSystemFocusRing) {
    ctx.save();
    ctx.rotate(hourAngle);
    ctx.beginPath();
    ctx.rect(-2, -22, 4, 28);
    ctx.drawSystemFocusRing(document.getElementById('hour'));
    ctx.restore();

    ctx.save();
    ctx.rotate(minAngle);
    ctx.beginPath();
    ctx.rect(-2, -34, 4, 44);
    ctx.drawSystemFocusRing(document.getElementById('minute'));
    ctx.restore();
  }

  // Second hand.

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#990000';
  ctx.globalAlpha = 1.0;

  ctx.save();
  ctx.rotate(secAngle);
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.lineTo(0, -40);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawClock() {
  var hourHand = document.getElementById('hour');
  if (hourHand.getAttribute('aria-valuetext') != hourHand.value) {
    hourHand.setAttribute('aria-valuetext', hourHand.value);
  }
  var minuteHand = document.getElementById('minute');
  if (minuteHand.getAttribute('aria-valuetext') != minuteHand.value) {
    minuteHand.setAttribute('aria-valuetext', minuteHand.value);
  }
  var d = new Date();
  var seconds = d.getSeconds() + 0.001 * d.getMilliseconds();
  var hourValue = parseInt(hourHand.value, 10);
  var minuteValue = parseInt(minuteHand.value, 10);
  drawClockAtTime(hourValue, minuteValue, seconds);
  var str = (hourValue < 10 ? '0' + hourValue : hourValue) + ':' +
            (minuteValue < 10 ? '0' + minuteValue : minuteValue);
  document.getElementById('time').innerText = str;
}

function onMouseDown(evt) {
  var hour = document.getElementById('hour');
  var minute = document.getElementById('minute');
  startHour = parseInt(hour.value, 10);
  startMinute = parseInt(minute.value, 10);

  var bounds = document.getElementById('clock').getBoundingClientRect();
  var x = evt.x - bounds.left - 75;
  var y = evt.y - bounds.top - 77;
  startMouseX = x;
  startMouseY = y;

  var hx = x * Math.cos(-hourAngle) - y * Math.sin(-hourAngle);
  var hy = y * Math.cos(-hourAngle) + x * Math.sin(-hourAngle);
  var hny = hy < -20 ? -20 : (hy > 4 ? 4 : hy);
  var dhsq = (hx * hx + (hy - hny) * (hy - hny));

  var mx = x * Math.cos(-minAngle) - y * Math.sin(-minAngle);
  var my = y * Math.cos(-minAngle) + x * Math.sin(-minAngle);
  var mny = my < -32 ? -32 : (my > 8 ? 8 : my);
  var dmsq = (mx * mx + (my - mny) * (my - mny));

  if (dhsq < dmsq && dhsq < 10) {
    hour.focus();
  } else if (dmsq < 10) {
    minute.focus();
  } else if (document.activeElement == hour || document.activeElement == minute) {
    document.body.focus();
  }
  evt.stopPropagation();
  evt.preventDefault();
};

function onMouseMove(evt) {
  var hour = document.getElementById('hour');
  var minute = document.getElementById('minute');
  var active = document.activeElement;
  if (startMouseX != null && (active == hour || active == minute)) {
    var bounds = document.getElementById('clock').getBoundingClientRect();
    var x = evt.x - bounds.left - 75;
    var y = evt.y - bounds.top - 77;
    var initialAngle = Math.atan2(startMouseX, startMouseY);
    var newAngle = Math.atan2(x, y);

    var delta = (initialAngle - newAngle) / (2 * Math.PI);
    if (active == hour) {
      var newHour = Math.floor(startHour + delta * 12 + 0.5) % 12;
      if (newHour == 0)
        newHour = 12;
      hour.value = newHour;
    }
    if (active == minute) {
      var newMinute = Math.floor(startMinute + delta * 60 + 0.5) % 60;
      minute.value = newMinute;
    }
  }
  evt.stopPropagation();
  evt.preventDefault();
};

function onMouseUp(evt) {
  startMouseX = null;
  evt.stopPropagation();
  evt.preventDefault();
};

function onClick(evt) {
  evt.stopPropagation();
  evt.preventDefault();
};

function load() {
  var clock = document.getElementById('clock');
  var ctx = clock.getContext('2d');
  if (!ctx.drawSystemFocusRing) {
    document.getElementById('unsupported').hidden = false;
  }

  var hourHand = document.getElementById('hour');
  var minuteHand = document.getElementById('minute');

  var d = new Date();
  hourHand.value = d.getHours();
  minuteHand.value = d.getMinutes();

  drawClock();
  setInterval(drawClock, 100);

  clock.addEventListener('mousedown', onMouseDown, false);
  document.body.addEventListener('mousemove', onMouseMove, false);
  document.body.addEventListener('mouseup', onMouseUp, false);

  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(evt) {
      document.getElementById('click').innerText +=
          'Click on button ' + evt.target.outerHTML + '\n';
    }, false);
  }
}
