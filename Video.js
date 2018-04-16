
//先取得網址字串，假設此頁網址為「index.aspx?id=U001&name=GQSM」
var url = location.href;
var ary1;
//再來用去尋找網址列中是否有資料傳遞(QueryString)

//use to record the index
var idx = 0;
var now_index = 0;
var change_id = false;

if(url.indexOf('?')!=-1){
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
var half_count = count/2;



for(var i = 0; i < half_count; i++){
  var small_sub =  obj.lyrics[i].l;
  //console.log(small_sub);
  var subtitle = $("#subtitle").append('<li class = "arc'+ i +'" ><i class="far fa-play-circle" id = "icon'+i+'"  onclick="playAt('+obj.lyrics[i].t+','+obj.lyrics[i].d+')"></i> <span id = "small_sub'+i+'">'+small_sub+'</span></li>'); 
}

console.log(obj.lyrics);



// var ssss = '';
// for (var i = 0; i <10;i++){
//   console.log($('ul.arcchang li.arc'+i).position());
// }
// console.log('===============================');
// s = $('ul.arcchang li.arc1').position();
// $('#subtitle').animate({scrollTop: s['top']},0);
// for (var i = 0; i <10;i++){
//   console.log($('ul.arcchang li.arc'+i).position());
// }
// console.log('===============================');
// ss = $('ul.arcchang li.arc3').position();
// console.log(ss['top']+'!!!!!!!!!!')
// $('#subtitle').animate({scrollTop: ss['top']+ s['top']},0);
// for (var i = 0; i <10;i++){
//   console.log($('ul.arcchang li.arc'+i).position());
// }

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

var iii = 0;

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


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();  
  function updateTime() {
    var oldTime = videotime;
    if(player && player.getCurrentTime) {
      var videotime = player.getCurrentTime();
      put_titie(videotime);

      //console.log(videotime);
      // document.getElementById("time").innerHTML = videotime;
    }
    if(videotime !== oldTime) {
      onProgress(videotime);
    }
  }
  timeupdater = setInterval(updateTime, 10);
}

// when the time changes, this will be called.
function onProgress(currentTime) {
  if(currentTime > 20) {
    //console.log("the video reached 20 seconds!");
  }
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {

}
function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

var timeoutId;

function playAt(st, dr) {
  change_id = true;
  clearTimeout(timeoutId);
  player.seekTo(st/1000);
  put_titie(st/1000);
  player.playVideo();
  timeoutId = setTimeout(pauseVideo, dr);
}



var delta;//evt.deltaY || evt.wheelDelta || evt.detail;

function MouseWheel (e) {
  e = e || window.event;
  // alert(['scrolled ', (( e.wheelDelta <= 0 || e.detail > 0) ? 'down' : 'up')].join(''));
  delta = e.deltaY;
  //console.log("in func" + delta);
  return e;
}

// hook event listener on window object
if ('onmousewheel' in window) {
  window.onmousewheel = MouseWheel;
} else if ('onmousewheel' in document) {
  document.onmousewheel = MouseWheel;
} else if ('addEventListener' in window) {
  window.addEventListener("mousewheel", MouseWheel, false);
  window.addEventListener("DOMMouseScroll", MouseWheel, false);
}




// detect event model
// if (window.addEventListener) { // for modern browser
//   _addEventListener = "addEventListener";
// } else { // for IE 8 or older
//   _addEventListener = "attachEvent";
// }

// // detect available wheel event
// if (document.onmousewheel === null
//     && window.addEventListener === undefined) {
//   // IE 8 or older
//   wheel_event_name = 'onmousewheel';
// } else if (Modernizr.hasEvent('wheel') || (!!window.WheelEvent && !!window.MouseWheelEvent)) {
//   // detect if browser has DOM L3 wheel event: Firefox 17 and IE 9 or later version
//   wheel_event_name = 'wheel';
//   inverse_wheel_direction = true;
// } else if (!!window.WheelEvent) {
//   // Safari, Chrome
//   wheel_event_name = 'mousewheel';
// } else {
//   // Firefox 16 and earlier version
//   wheel_event_name = 'DOMMouseScroll';
//   inverse_wheel_direction = true;
// }
// document[_addEventListener](wheel_event_name, wheelHandler);








var s_tmp = 0;
var r = $('#subtitle').position();
function put_titie(t){
    if(idx < half_count){      
      if(obj.lyrics[idx].t > t*1000){
         for(var k = 0;k<half_count;k++){
           if(obj.lyrics[k].t > t*1000){
             if(idx === 0)
               idx = 0;
             else
               idx = k-1;
             break;
           }
         }
       }
       while(idx < half_count -1){
        if(obj.lyrics[idx+1].t <= t*1000){
          idx += 1;
        }else{
          break;
        }
       }
       // if(change_id){
       //  console.log("time = " + t);
       //  console.log("change sussess");
       //  now_index = idx - 2;
       //  change_id = false;
       //  console.log(" id = " + idx);
       // }
       if(obj.lyrics[idx].t <= t*1000){
         document.getElementById("icon"+idx).style.color="green";
        //  console.log("idx out loop : "+idx);

         for(var a = 0;a<half_count;a++){
          //  console.log("idx in loop : "+idx);
          //  console.log("a : "+a);
           
           if(a === idx)
            document.getElementById("small_sub"+a).style.backgroundColor="rgba(121, 120, 120, 0.3)";            
           else
            document.getElementById("small_sub"+a).style.backgroundColor="#e6e6e6";
         }
         
         //console.log("idx = " + idx);
         var small_sub =  obj.lyrics[idx].l + '</br>';
         var small_sub_ch =  obj.lyrics[idx+half_count].l + '</br>';
         document.getElementById("under_subtitle").innerHTML=small_sub;
         document.getElementById("under_subtitle_ch").innerHTML=small_sub_ch;
         
          //console.log(idx)  //now_index!=idx
          
             // if(now_index < idx-2 || now_index > idx ){
             //    console.log(now_index + ' '+ idx);
             //    s = $('ul.arcchang li.arc'+(idx-2)).position();
             //    //console.log(s);
             //    s_tmp+=s['top']-r['top'];
             //    //console.log(s_tmp);
             //    now_index++;
             //    $('#subtitle').animate({scrollTop: s_tmp},0);
             //  }

             if(idx > 2 && now_index != idx){
              console.log(now_index + ' ' + idx);
              s = $('ul.arcchang li.arc'+(idx-2)).position();
              s_tmp+=s['top']-r['top'];
              $('#subtitle').animate({scrollTop: s_tmp},0);
              now_index = idx;
             }
        
          
          //console.log(s)
          


         for(var k = 0;k<half_count;k++){            
           if(obj.lyrics[k].t > t*1000){
             idx = k;
             break;
           }
         }
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
