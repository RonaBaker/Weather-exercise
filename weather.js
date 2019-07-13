
let map;
let infowindow = new google.maps.InfoWindow();
let key = '0f7cb19e47a1c75aec5fc0809710f1bf';

function initMap() {
    let yoqneam = { lat: 32.6559, lng: 35.1152 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: yoqneam 
    });
    map.addListener('click', function(event){
        weatherBalloon(event.latLng.lat(),event.latLng.lng());
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
    });
}

initMap();

function weatherBalloon(lat, lon) {
   fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +lat+ '&lon=' +lon+ '&units=metric&appid=' + key)  
  .then(res => res.json()) // Convert data to json
  .then(data => {
      console.log(data);
      infowindow.setContent('<div id="content">' + data.name +
                          ', ' + data.sys.country +
                          '</br><img src=http://openweathermap.org/img/w/' + data.weather[0].icon + '.png>'+
                          '<br><b>'+ data.main.temp + '  <span>&#8451;</span>');        
  }).catch(error => console.log(error));
              
}

