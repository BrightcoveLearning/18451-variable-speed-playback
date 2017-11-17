videojs.registerPlugin('variableSpeedPlayback', function(settings) {
  var myPlayer = this,
      options = {};

  options = videojs.mergeOptions(options, settings);

  if (Array.isArray(options.playbackRates)) {
    // Set sourceOrder to false - this means old browsers that support HLS in Flash but not HTML5/MSE will use MP4
    // IE will use MP4/HTML5 before HLS/Flash
    myPlayer.options_.sourceOrder = false;

    if (myPlayer.controlBar.playbackRateMenuButton) {
      // Update the existing playback rate menu button in the control bar
      var playbackControl = myPlayer.controlBar.playbackRateMenuButton;
      playbackControl.removeChild(playbackControl.menu);
      playbackControl.options_.playbackRates = options.playbackRates;
      playbackControl.addChild(playbackControl.createMenu());
      playbackControl.updateLabel();
      playbackControl.updateVisibility();
    } else {
      // Add the playback rate menu button to the control bar
      myPlayer.controlBar.playbackRateMenuButton = myPlayer.controlBar.addChild('PlaybackRateMenuButton', {
        playbackRates: options.playbackRates
      });
      myPlayer.controlBar.playbackRateMenuButton.updateVisibility();
    }
  }

  // +++ Support for IE browsers +++
  // This section is to keep the selected rate value from resetting to 1x when you pause and play in IE
  if (videojs.browser.IE_VERSION){
    console.log("IE_VERSION")
    //get method for selected playback rate value
    function getPlayBackRate(){
      rateEl = document.getElementsByClassName('vjs-playback-rate-value')[0];
      rateValue = rateEl.innerText.substr( 0, rateEl.innerText.length-1 );
      return rateValue;
    }
    //get playback value when paused
    myPlayer.on('pause', function(){
      rateValue = getPlayBackRate();
    });
    myPlayer.on('ratechange',function(){
      //get new playback rate if the player is paused
      if(myPlayer.paused()){
        rateValue = getPlayBackRate();
      }
    })
    //set backuped playback rate when playback starts
    myPlayer.on('play', function(){
      myPlayer.playbackRate(rateValue);
    });
  }

});
