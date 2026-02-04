(function(global){
	
	if(!(typeof(Function.prototype.bind) == "function")){
		Function.prototype.bind = function(object) {
		    var method = this
		    return function() {
		        return method.apply(object, arguments) 
		    }
		}	
	}
	
	function MapController(){
			var location = window.navigator.geolocation;
			var options = {
				enableHighAccuracy: false,
				timeout: 60000,
				maximumAge: 600000
			}
			this.position = location.getCurrentPosition(this.locationSuccess.bind(this),this.locationFail.bind(this),options);
	}
	
	MapController.prototype.locationSuccess = function(event){
	
		document.querySelector(".mapContainer").style.background="none";	
		
		var myLatlng = new google.maps.LatLng(event.coords.latitude, event.coords.longitude);
		var myOptions = {
			zoom: 16,
			center: myLatlng,
			navigationControl: true,
			scaleControl: false,
			mapTypeControl: false,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var map = new google.maps.Map(document.querySelector(".mapContainer"), myOptions);
		
		var marker = new google.maps.Marker({
			position: myLatlng, 
			map: map,
			title:"Мы – тут!",
			icon: "img/home.png"
		});   
	}
	
	MapController.prototype.locationFail = function(error){
		switch(error.code){
			case 1:
				alert("Произошла ошибка: пользователем запрещено определение координат.");
				break;
			case 2:
				alert("Произошла ошибка: не удается определить текущую позицию.");
				break;
			case 3:
				alert("Произошла ошибка: достигнуто максимальное время ожидания и получение координат прервано.");
				break;
		}
	}
		
	var DOMContentLoaded = function(){
		global.MC = new MapController();
	}
	
	document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false);

})(this)