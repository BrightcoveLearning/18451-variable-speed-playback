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

});
