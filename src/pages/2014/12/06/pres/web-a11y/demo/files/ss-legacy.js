/*
* Symbolset
* www.symbolset.com
* Copyright © 2012 Oak Studios LLC
* 
* Upload this file to your web server
* and place this before the closing </body> tag.
* <script src="path/to/this/file/ss-legacy.js" />
*/

if (/(MSIE [7-9]\.|Opera.*Version\/(11|12)\.|Chrome\/([5-9]|10)\.|Version\/(4)[\.0-9]+ Safari\/|Version\/(4|5\.0)[\.0-9]+? Mobile\/.*Safari\/)/.test(navigator.userAgent)) {

  var ss_legacy = function(node) {
  
    if (!node instanceof Object) return false;
    
    if (node.length) {
      for (var i=0; i<node.length; i++) {
        ss_legacy(node[i]);
      }
      return;
    };
    
    if (node.value) {
      node.value = ss_liga(node.value);
    } else if (node.nodeValue) {
      node.nodeValue = ss_liga(node.nodeValue);
    } else if (node.innerHTML) {
      node.innerHTML = ss_liga(node.innerHTML);
    }
      
  };
  
  var ss_getElementsByClassName = function(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
  };
  
  var ss_liga = function(that) {
    var re = new RegExp(ss_keywords.join('|'),"gi");
    return that.replace(re, function(v) { 
      return ss_icons[v.toLowerCase()];
    });
  };
  
  var ss_icons={'notifications disabled':'\uD83D\uDD15','notificationsdisabled':'\uD83D\uDD15','notification disabled':'\uD83D\uDD15','notificationdisabled':'\uD83D\uDD15','telephone disabled':'\uE300','telephonedisabled':'\uE300','writing disabled':'\uE071','writingdisabled':'\uE071','pencil disabled':'\uE071','calendar remove':'\uF071','remove calendar':'\uF071','pencildisabled':'\uE071','phone disabled':'\uE300','battery medium':'\uEA11','medium battery':'\uEA11','cloud download':'\uEB00','calendarremove':'\uF071','removecalendar':'\uF071','calendar check':'\uF072','check calendar':'\uF072','navigate right':'\u25BB','phonedisabled':'\uE300','call disabled':'\uE300','female avatar':'\uD83D\uDC67','shopping cart':'\uE500','batterymedium':'\uEA11','mediumbattery':'\uEA11','battery empty':'\uEA13','empty battery':'\uEA13','clouddownload':'\uEB00','notifications':'\uD83D\uDD14','bell disabled':'\uD83D\uDD15','calendarcheck':'\uF072','checkcalendar':'\uF072','navigateright':'\u25BB','navigate down':'\uF501','navigate left':'\u25C5','calldisabled':'\uE300','femaleavatar':'\uD83D\uDC67','shoppingcart':'\uE500','fast forward':'\u23E9','skip forward':'\u23ED','mobile phone':'\uD83D\uDCF1','battery full':'\uD83D\uDD0B','full battery':'\uD83D\uDD0B','battery high':'\uEA10','high battery':'\uEA10','batteryempty':'\uEA13','emptybattery':'\uEA13','cloud upload':'\uEB40','rotate right':'\u21BB','notification':'\uD83D\uDD14','belldisabled':'\uD83D\uDD15','calendar add':'\uF070','add calendar':'\uF070','navigatedown':'\uF501','navigateleft':'\u25C5','thumbs down':'\uD83D\uDC4E','male avatar':'\uD83D\uDC64','female user':'\uD83D\uDC67','credit card':'\uD83D\uDCB3','volume high':'\uD83D\uDD0A','high volume':'\uD83D\uDD0A','photographs':'\uD83C\uDF04','videocamera':'\uD83D\uDCF9','fastforward':'\u23E9','skipforward':'\u23ED','rotate left':'\u21BA','mobilephone':'\uD83D\uDCF1','batteryfull':'\uD83D\uDD0B','fullbattery':'\uD83D\uDD0B','batteryhigh':'\uEA10','highbattery':'\uEA10','battery low':'\uEA12','low battery':'\uEA12','cloudupload':'\uEB40','rotateright':'\u21BB','information':'\u2139','calendaradd':'\uF070','addcalendar':'\uF070','remove date':'\uF071','navigate up':'\uF500','screenshot':'\u2316','visibility':'\uD83D\uDC40','attachment':'\uD83D\uDCCE','disapprove':'\uD83D\uDC4E','thumbsdown':'\uD83D\uDC4E','half heart':'\uE1A0','eyedropper':'\uE200','maleavatar':'\uD83D\uDC64','femaleuser':'\uD83D\uDC67','creditcard':'\uD83D\uDCB3','navigation':'\uE670','directions':'\uE672','microphone':'\uD83C\uDFA4','volume low':'\uD83D\uDD09','low volume':'\uD83D\uDD09','volumehigh':'\uD83D\uDD0A','highvolume':'\uD83D\uDD0A','photograph':'\uD83C\uDF04','rotateleft':'\u21BA','cell phone':'\uD83D\uDCF1','smartphone':'\uD83D\uDCF1','batterylow':'\uEA12','lowbattery':'\uEA12','connection':'\uEB85','pull quote':'\u201C','removedate':'\uF071','check date':'\uF072','navigateup':'\uF500','down right':'\u2B0A','crosshair':'\u2316','paperclip':'\uD83D\uDCCE','backspace':'\u232B','thumbs up':'\uD83D\uDC4D','halfheart':'\uE1A0','half star':'\uE1A1','telephone':'\uD83D\uDCDE','male user':'\uD83D\uDC64','bar chart':'\uD83D\uDCCA','pie chart':'\uE570','musicnote':'\u266B','volumelow':'\uD83D\uDD09','lowvolume':'\uD83D\uDD09','skip back':'\u23EE','cellphone':'\uD83D\uDCF1','pullquote':'\u201C','checkmark':'\u2713','dashboard':'\uF000','stopwatch':'\u23F1','checkdate':'\uF072','briefcase':'\uD83D\uDCBC','downright':'\u2B0A','down left':'\u2B0B','unlocked':'\uD83D\uDD13','insecure':'\uD83D\uDD13','trashcan':'\uE0D0','keywords':'\uE100','bookmark':'\uD83D\uDD16','thumbsup':'\uD83D\uDC4D','favorite':'\u22C6','halfstar':'\uE1A1','end call':'\uE300','facetime':'\uE320','envelope':'\u2709','maleuser':'\uD83D\uDC64','barchart':'\uD83D\uDCCA','piechart':'\uE570','navigate':'\uE670','signpost':'\uE672','location':'\uE6D0','pictures':'\uD83C\uDF04','skipback':'\u23EE','notebook':'\uD83D\uDCD3','computer':'\uD83D\uDCBB','download':'\uEB01','document':'\uD83D\uDCC4','typeface':'\uED01','contract':'\uEE01','subtract':'\u002D','dropdown':'\u25BE','settings':'\u2699','calendar':'\uD83D\uDCC6','add date':'\uF070','previous':'\u25C5','up right':'\u2B08','downleft':'\u2B0B','visible':'\uD83D\uDC40','compose':'\uD83D\uDCDD','private':'\uD83D\uDD12','keyword':'\uE100','approve':'\uD83D\uDC4D','dislike':'\uD83D\uDC4E','windows':'\uE202','endcall':'\uE300','comment':'\uD83D\uDCAC','package':'\uD83D\uDCE6','compass':'\uE671','dictate':'\uD83C\uDFA4','speaker':'\uD83D\uDD08','airplay':'\uE800','picture':'\uD83C\uDF04','shuffle':'\uD83D\uDD00','desktop':'\uD83D\uDCBB','display':'\uD83D\uDCBB','monitor':'\uD83D\uDCBB','battery':'\uD83D\uDD0B','refresh':'\u21BB','syncing':'\uEB82','loading':'\uEB83','warning':'\u26A0','caution':'\u26D4','checked':'\u2713','adddate':'\uF070','upright':'\u2B08','forward':'\u27A1','up left':'\u2B09','retweet':'\uF600','cursor':'\uE001','search':'\uD83D\uDD0E','attach':'\uD83D\uDCCE','pencil':'\u270E','eraser':'\u2710','locked':'\uD83D\uDD12','secure':'\uD83D\uDD12','unlock':'\uD83D\uDD13','public':'\uD83D\uDD13','target':'\u25CE','tagged':'\uE100','sample':'\uE200','layers':'\uE202','avatar':'\uD83D\uDC64','locate':'\uE670','volume':'\uD83D\uDD08','camera':'\uD83D\uDCF7','images':'\uD83C\uDF04','photos':'\uD83C\uDF04','videos':'\uD83D\uDCF9','record':'\u25CF','rewind':'\u23EA','repeat':'\uD83D\uDD01','replay':'\u21BA','laptop':'\uEA00','tablet':'\uEA01','iphone':'\uD83D\uDCF1','mobile':'\uD83D\uDCF1','upload':'\uEB41','folder':'\uD83D\uDCC1','layout':'\uEDA0','action':'\uEE00','expand':'\u2922','hyphen':'\u002D','remove':'\u002D','delete':'\u2421','upleft':'\u2B09','write':'\u270E','erase':'\u2710','trash':'\uE0D0','heart':'\u2665','zelda':'\uE1A0','phone':'\uD83D\uDCDE','reply':'\u21A9','email':'\u2709','inbox':'\uD83D\uDCE5','globe':'\uD83C\uDF0E','earth':'\uD83C\uDF0E','world':'\uD83C\uDF0E','music':'\u266B','audio':'\u266B','sound':'\uD83D\uDD08','image':'\uD83C\uDF04','photo':'\uD83C\uDF04','video':'\uD83D\uDCF9','pause':'\uE8A0','eject':'\u23CF','merge':'\uEB81','nodes':'\uEB85','quote':'\u201C','share':'\uEE00','visit':'\uEE00','alert':'\u26A0','minus':'\u002D','check':'\u2713','close':'\u2421','clock':'\u23F2','timer':'\u23F1','cloud':'\u2601','right':'\u27A1','view':'\uD83D\uDC40','look':'\uD83D\uDC40','link':'\uD83D\uDD17','move':'\uE070','lock':'\uD83D\uDD12','tags':'\uE100','flag':'\u2691','like':'\uD83D\uDC4D','love':'\u2665','star':'\u22C6','crop':'\uE201','call':'\uD83D\uDCDE','mail':'\u2709','chat':'\uD83D\uDCAC','talk':'\uD83D\uDCAC','user':'\uD83D\uDC64','cart':'\uE500','home':'\u2302','play':'\u25B6','stop':'\u25A0','skip':'\u23ED','undo':'\u21BA','grid':'\uE9A0','rows':'\uE9A1','ipad':'\uEA01','cell':'\uD83D\uDCF1','fork':'\uEB80','redo':'\u21BB','sync':'\uEB82','wifi':'\uEB84','file':'\uD83D\uDCC4','page':'\uD83D\uDCC4','text':'\uED00','font':'\uED01','list':'\uED50','info':'\u2139','plus':'\u002B','gear':'\u2699','bell':'\uD83D\uDD14','time':'\u23F2','date':'\uD83D\uDCC6','work':'\uD83D\uDCBC','next':'\u25BB','down':'\u2B07','left':'\u2B05','back':'\u2B05','eye':'\uD83D\uDC40','key':'\uD83D\uDD11','ban':'\uD83D\uDEAB','tag':'\uE100','rss':'\uE310','box':'\uD83D\uDCE6','pin':'\uD83D\uDCCD','mic':'\uD83C\uDFA4','out':'\uEE00','add':'\u002B','cog':'\u2699','up':'\u2B06'};
  
  var ss_keywords = [];
  for (var k in ss_icons) { ss_keywords.push(k); };
  
  if (document.getElementsByClassName) {
    ss_legacy(document.getElementsByClassName('ss-icon'));
  } else {
    ss_legacy(ss_getElementsByClassName(document.body, 'ss-icon'));
  }

}