var VAST = require('vast-xml')
  , data = require('./data.json')
;

var vast = new VAST();
data.ads.forEach(function(Ad) {
  var ad = vast.attachAd({ 
      id : Ad.id
    , structure : Ad.structure
    , sequence : Ad.sequence
    , AdTitle : Ad.AdTitle
    , AdSystem : Ad.AdSystem
  })
  Ad.impressions.forEach(function(impression){
    ad.attachImpression({ id: impression.id, url: impression.url })
  });
  Ad.creatives.forEach(function(Creative) {
    var creative = ad.attachCreative(Creative.type, {
        AdParameters: Creative.AdParameters
      , Duration: Creative.Duration
    });
    Creative.TrackingEvents.forEach(function(TrackingEvent){
      creative.attachTrackingEvent(TrackingEvent.type, TrackingEvent.url);
    });
    Creative.VideoClicks.forEach(function(VideoClick){
      creative.attachVideoClick(VideoClick.type, VideoClick.url);
    });
    Creative.MediaFiles.forEach(function(MediaFile) {
      creative.attachMediaFile(MediaFile.url, {
          type: MediaFile.type
        , bitrate: MediaFile.bitrate
        , minBitrate: MediaFile.minBitrate
        , maxBitrate: MediaFile.maxBitrate
        , width: MediaFile.width
        , height: MediaFile.height
        , scalable: MediaFile.scalable
        , maintainAspectRatio: MediaFile.maintainAspectRatio
        , codec: MediaFile.codec
        , apiFramework: MediaFile.apiFramework
      });
    });
  });

});
var result = vast.xml({ pretty : true, indent : '  ', newline : '\n' });
console.log(result);