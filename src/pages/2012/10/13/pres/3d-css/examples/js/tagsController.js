(function(global){

  function tagsController(){}

  tagsController.prototype.reposTags = function(event){
    
    var tags = $(".article-widget>.vertical-wrapper>.column-2>.tag-widget");
    if(tags.length==0){
      return;
    }
    var elements = $(".article-widget>.vertical-wrapper>.column-2>*");
    var index = elements.length;
    var height = 0;
    while(index--){
      height+=$(elements[index]).outerHeight(true);
    }
    
    var img_top = $(".article-widget .article-text img.article-end").offset().top;
    var article_height = img_top-$(".article-widget .article-text").offset().top;
    
    tags.stop().animate({
      top:article_height-clone_height
    })
  };

  tagsController.prototype.init = function(){

    if(
      ($(".tag-widget").length==0)||
      ($(".article-widget .article-text img.article-end").length==0)
    ){
      return;
    }
  
    var elements = $(".article-widget>.vertical-wrapper>.column-2>*");
    var index = elements.length;
    var height = 0;
    while(index--){
      height+=$(elements[index]).outerHeight(true);
    }
  
    var img_top = $(".article-widget .article-text img.article-end").offset().top;
    var article_height = img_top-$(".article-widget .article-text").offset().top;
  
    if(article_height<height){
      return;
    }
  
    var tags = $(".article-widget .tag-widget");
    var clone = tags.clone(true);
    clone.css("visibility","hidden");
  
    $(".article-widget>.vertical-wrapper>.column-2").append(clone);
    clone_height = clone.outerHeight(true);
    height+=clone_height;
  
    if(article_height<height){
      clone.remove();
      return;
    }
  
    tags.remove();
    clone.css({
      position:"absolute",
      top:article_height-clone_height,
      visibility: "visible"
    });
  
  };
  
  $(window).load(function () {
	  window.tagsController.reposTags();
	});
	
global.tagsController = new tagsController();
})(this);