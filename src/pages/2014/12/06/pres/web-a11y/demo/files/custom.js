/* From https://developer.mozilla.org/en-US/docs/DOM/document.cookie */
var CookieJar = {
  getItem: function (sKey) {
    if (!sKey || !this.hasItem(sKey)) { return null; }
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toGMTString();
          break;
      }
    }
    document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  },
  removeItem: function (sKey, sPath) {
    if (!sKey || !this.hasItem(sKey)) { return; }
    document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
    return aKeys;
  }
};

$(document).ready(function(){
  $("#mini-nav a").click(function(event){
    $("#main-nav").toggleClass("active");
    $("#mini-nav a").toggleClass("active");
    $("#search-container").removeClass("active").addClass("inactive");
    $("#mini-search a").removeClass("active").addClass("inactive");
    event.preventDefault();
  });
}); 
$(document).ready(function(){
  $("#mini-search a").click(function(event){
    $("#search-container").toggleClass("active");
    $("#mini-search a").toggleClass("active");
    $("#main-nav").removeClass("active").addClass("inactive");
    $("#mini-nav a").removeClass("active").addClass("inactive");
    event.preventDefault();
  });

  if(!CookieJar.getItem("hide_global_banner")) {
    banner = $("#global-banner");
    banner.fadeIn('fast')
    banner.on("click", ".close", function() {
      banner.fadeOut('fast', function() {
        CookieJar.setItem("hide_global_banner", true, new Date(2022, 1, 1));
      });
    });
  }
});

// Mixpanel Event Tracking
$(document).ready(function() {
  $("#mc_embed_signup form").submit(function() { mixpanel.track("Newsletter Signup");});
});
