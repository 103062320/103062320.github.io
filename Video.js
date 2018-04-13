
//先取得網址字串，假設此頁網址為「index.aspx?id=U001&name=GQSM」
var url = location.href;
var ary1;
//再來用去尋找網址列中是否有資料傳遞(QueryString)
if(url.indexOf('?')!=-1)
{
     ary1 = url.split('?');
     console.log(ary1[1]);
}


$.ajax({
  url:'https://www.googleapis.com/youtube/v3/videos',
  type:'GET',
  dataType:'json',
  data: {
   'part':'snippet,contentDetails,statistics',
   'id':ary1[1],
   'key': 'AIzaSyDXpwzqSs41Kp9IZj49efV3CSrVxUDAwS0'
  },

  success: function(data){
    console.log(data);
    var video = $("#video_title_top").append('<h1 id = "title">'+data.items[0].snippet.title+'</h1>');
    var video1 = $("#video_title_bot").append('<h1 id = "title">'+data.items[0].snippet.title+'</h1>');


  }
});




//Retrieving data:
text = localStorage.getItem(ary1[1]);
obj = JSON.parse(text);

var count = Object.keys(obj.lyrics).length;

var s = ""

for(var i = 0; i < count; i++)
{
  var small_sub =  obj.lyrics[i].l + '</br>';
  var subtitle = $("#subtitle").append('<li><i class="far fa-play-circle" onclick="playAt('+obj.lyrics[i].t+','+obj.lyrics[i].d+')"></i> '+small_sub+'</li>'); 
	s += '[Start Time] ' + obj.lyrics[i].t + ' [Duration] ' + obj.lyrics[i].d + ' [Lyrics] ' + obj.lyrics[i].l + '</br>';
}





// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: ary1[1],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

}

var pt;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();  
  // pt = setInterval("put_titie()",10)
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

  if (event.data === YT.PlayerState.PLAYING){
      pt = setInterval("put_titie()",10)
  }
  if(event.data === YT.PlayerState.PAUSED){    
    clearInterval(pt);
  }
  
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   // setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}
function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function playAt(st, dr) {
  player.seekTo(st/1000);
  player.playVideo();
  setTimeout(pauseVideo, dr);
}


var time = 0;
var idx = 0;
var called = 0;
var put = new Array();
for(var i=0;i<count;i++){
  put.push(0);
} 

function put_titie(){
  called += 10;
  if(idx < count){
      if(obj.lyrics[idx].t <= called){
        if(idx > 0 && put[idx-1] === 1){
          $("#under_subtitle"+(idx-1)).remove();
        }
        var small_sub =  obj.lyrics[idx].l + '</br>';
        var under_subtitle = $("#under_subtitle").append('<span id = "under_subtitle'+idx+'">'+small_sub+'</span>');
        put[idx] = 1;
        idx++;
      }
    }
}

function getTime(obj, index)
{
	return obj.lyrics[index].t
}
function getDuration(obj, index)
{
	return obj.lyrics[index].d
}
