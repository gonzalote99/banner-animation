home_animation = (function() {
  var boundEvents = {};

  function bind(elem, eventName, callback) {
    if(elem.addEventListener) {
      elem.addEventListener(eventName, callback, false);
    }
    else if(elem.attachEvent) {
      var eID = elem.attachEvent('on'+ eventName, callback);
      boundEvents[eID] = {name: eventName, callback : callback}
    }
  }

  function unbind (elem, eventName, callback) {
    if(elem.removeEventListener){
      elem.removeEventListener(eventName, callback, false);
    }
    else if(elem.detachEvent) {
      for(var eID in boundEvents) {
        if((boundEvents[eID].name === eventName) && 
        (boundEvents[eID].callback === callback)) {
          elem.detachEvent(eID);
          delete boundEvents[eID];
        }
      }
    }
  }

  function init() {
    TweenLite.to(end_frame_heart,0,{scaleX: 0, scaleY: 0});
    frame1();

    bind(document.getElementById('container'), 'click', function(e) {
      e.preventDefault();
      Enabler.exit('clickTag1')
    });
  }

  var leftHeart = document.getElementById('left_heart');
  var rightHeart = document.getElementById('right_heart');
  var main_text = document.getElementById('main_text');
  var end_frame_heart = document.getElementById('end_frame_heart');

  document.getElementById('left_heart').style.display = 'block';
  document.getElementById('right_heart').style.display = 'block';

  function frame1() {
    TweenLite.from(leftHeart, 0.3, {right: 308, delay: 0.6, ease: Quad.easeOut});
    TweenLite.from(rightHeart, 0.3, {right: -124, delay: 0.6, ease: Quad.easeOut});

    TweenLite.delayedCall(2.8, frame2)

  }

  function frame2() {
    TweenLite.to(leftHeart, 0.3, {top: 300, delay: 0, ease: Quad.easeOut});
    TweenLite.to(rightHeart, 0.3, {top: 300, delay: 0, ease: Quad.easeOut});

    TweenLite.to(together, 0.3, {top: 100, delay: 0.1, ease: Quad.easeOut});
    TweenLite.delayedCall(3, frame3)
  }

  function frame3() {
    TweenLite.to(together, 0.3, {top: 300, delay: 0.2, ease: Quad.easeOut});
    TweenLite.to(main_text, 0.3, {top: 65, delay: 0.2, ease: Quad.easeOut});
    TweenLite.delayedCall(3.4, frame4)
  }

  function frame4() {
    TweenLite.to(main_text, 0.3, {top: 300, delay: 0.1, ease: Quad.easeOut});
    TweenLite.to(end_frame_back, 0.4, {top: 0, delay: 0.1, ease: Quad.easeOut});
    TweenLite.to(containers, 0.5, {top: 0, delay: 0.7, ease: Quad.easeOut});
    TweenLite.delayedCall(3.4, frame5)
  }

  function frame5() {
    TweenLite.to(containers, 0.2, {opacity: 0});
    TweenLite.to(end_frame_heart, 0.5, {scaleX: 1, scaleY: 1, delay: 0.6, ease: Quad.easeOut});
    TweenLite.to(together_end_frame, 0.5, {delay: 0.9, opacity: 1});
    TweenLite.to(learn_more, 0.5, {delay: 1, opacity: 1});
    TweenLite.to(logo, 0.5, {delay: 1.3, opacity: 1});
    TweenLite.to(tag, 0.5, {delay: 1.4, opacity: 1});

  }

  init();
});

window.onload = function() {
  if(Enabler.isInitialized()) {
    enablerInitHandler();
  }else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler)
  }
}

function enablerInitHandler() {
  home_animation();
}