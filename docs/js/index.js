$(document).ready(function() {
  var long;
  var lat;
  
  $.getJSON("http://ip-api.com/json",function(data2){
    lat=data2.lat;
    long= data2.lon;
  
    // API URL with geolocation
    var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=20f9701230babdc5f5b826bc30da9ccd';

    $.getJSON(api, function(data) {
      var fTemp;
      var cTemp;
      var kTemp;
      var iconNo;
      var tempSwap = true;

      // JSON call for Open Weather API
      var weatherMain = data.weather[0].main;
      var weatherType = data.weather[0].description;
      var weatherIcon = data.weather[0].icon;
      var windSpeed = data.wind.speed;
      var city = data.name;

      // Temperture in Kelvin
      kTemp = data.main.temp;
      // Temp in F
      // Show in HTML:  &#8457;
      fTemp = (kTemp*(9/5)-459.67).toFixed(1);
      // Temp in C
      // Show in HTML:  &#8451;
      cTemp = (kTemp-273).toFixed(1);
      // Change Wind Speed from meters to miles per hour
      windSpeed = (2.237*(windSpeed)).toFixed(1);
      
      // Create Icon number from weatherIcon
      iconNo = weatherIcon.substring(0,2);

      $("#lonlat").html("latitude: " + lat + "<br>longitude: " + long);
      $("#iconNo").html(iconNo);
      $("#city").html(city);
      $("#weatherType").html(weatherType);
      $("#weatherMain").html(weatherMain);
      $("#weatherIcon").html("<img src=http://openweathermap.org/img/w/" + weatherIcon + ".png>");
      $("#temp").html(fTemp + " &#8457;");
      $("#temp").click(function() {
        if (tempSwap === false) {
          $("#temp").html(fTemp + " &#8457;");
          tempSwap = true;
        } else {
          $("#temp").html(cTemp + " &#8451;");
          tempSwap = false;
        }
      });

      $("#windSpeed").html(windSpeed + " mph");

      if (iconNo === "01") { // clear sky
        $('body').css('background-image', 'url("http://cdn.wallpapersafari.com/27/84/Ksduob.jpg")');
      } else if (iconNo === "02") { // few clouds
        $('body').css('background-image', 'url("http://tedconfblog.files.wordpress.com/2013/07/cloud-angelo-storari-_-ancona-italy.jpg")');
      } else if (iconNo === "03") { // scattered clouds
        $('body').css('background-image', 'url("http://wallpapers-diq.org/wallpapers/42/Sunset_off_the_Pacific_Coast_of_Baja%2C_Mexico.jpg")');
      } else if (iconNo === "04") { // broken clouds
        $('body').css('background-image', 'url("http://www.vanderbilt.edu/travelfellowship/blogs/russell/wp-content/uploads/DSC01587.jpg")');
      } else if (iconNo === "09") { // shower rain
        $('body').css('background-image', 'url("http://wallpapercave.com/wp/ZwhP4fb.jpg")');
      } else if (iconNo === "10") { // rain
        $('body').css('background-image', 'url("http://wallpapercave.com/wp/tHUebMB.jpg")');
      } else if (iconNo === "11") { // thunderstorm
        $('body').css('background-image', 'url("http://wallpapercave.com/wp/2aVHHg1.jpg")');
      } else if (iconNo === "13") { // snow
        $('body').css('background-image', 'url("http://1.bp.blogspot.com/-npeXt42RMeU/Vg7SczeZjXI/AAAAAAAAFgU/RJuI0aAkbWQ/s1600/6999941-beautiful-snow-path.jpg")');
      } else if (iconNo === "50") { // mist
        $('body').css('background-image', 'url("http://cdn.wallpapersafari.com/27/84/Ksduob.jpg")');
      } else {
        $('body').css('background-image', 'url("")');
      }
    });
  });
});