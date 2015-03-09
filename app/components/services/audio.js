angular.module('bconfApp').factory('Audio', function($document) {
  var audioElement = $document[0].getElementById('audio');
  audioElement.autoPlay = true; // as per your requirement

  return {
    audioElement: audioElement,

    play: function(filename) {
      audioElement.src = filename;
      audioElement.play();
    },
    resume: function() {
      audioElement.play();
    },
    pause: function() {
      audioElement.pause();
    },
    stop: function() {
      audioElement.pause();
      audioElement.src = audioElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
    },
    incVol: function() {
      if (audioElement.volume < 1) {
        audioElement.volume = (audioElement.volume + 0.1).toFixed(2);
      }
      return audioElement.volume;
    },
    decVol: function() {
      if (audioElement.volume > 0) {
        audioElement.volume = (audioElement.volume - 0.1).toFixed(2);
      }
      return audioElement.volume;
    },
    timer: function(callback) {
      audioElement.ontimeupdate = function() {
        callback(audioElement.duration, audioElement.currentTime)
      };
    },
  }
});
