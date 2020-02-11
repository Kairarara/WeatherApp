$(document).ready(()=>{
  let city, country, weather="Clear", weatherId, temp=0;
  
  let handleSwitch=()=>{
    $("input").click(()=>{
      if($("input").prop("checked")){
        temp=temp*9/5+32;
      } else {
        temp=(temp-32)*5/9;
      }
      $("#weather").text(temp.toFixed(1)+"°  "+weather)
    })
  }
  
  let handleIcons=()=>{
    if(weatherId>801){    //cloudy
      $("#weather-icon").append(
        '<div class="cloud2 small-cloud"></div><div class="cloud2"></div>'
      )
    } else if(weatherId>=800){  //sunny
      $("#weather-icon").append(
        '<div class="rays"><div class="ray"></div><div class="ray"></div><div class="ray"></div><div class="ray"></div></div><div class="sun"></div>'
      )
    } else if(weatherId>=770){  //harsh
      $("#weather-icon").append(
        '<div class="extreme text-center"><div class="harsh-wind"></div><div class="harsh-wind"></div><div class="harsh-wind"></div><div class="harsh-wind"></div><div class="harsh-wind"></div><div class="harsh-wind"></div><div class="harsh-wind"></div></div>'
      )
    } else if(weatherId>=700){  //misty
      $("#weather-icon").append(
        '<div class="cloud2"></div>'
      )
    } else if(weatherId>=600){  //snowy
      $("#weather-icon").append(
        '<div class="cloud2"></div><div class="snow"><div class="flake"></div><div class="flake"></div><div class="flake"></div><div class="flake"></div></div>'
      )
    } else if(weatherId>=500){  //rainy
      $("#weather-icon").append(
        '<div class="cloud2"></div><div class="rain"></div>'
      )
    } else if(weatherId>=300){  //drizzle
      $("#weather-icon").append(
        '<div class="cloud2"></div><div class="drizzle"></div>'
      )
    } else if(weatherId>=200){  //thunders
      $("#weather-icon").append(
        '<div class= "cloud2"></div><div class="thunder"><div class="bolt"></div><div class="bolt"></div></div>'
      )
    } else {
      console.log(weatherId)
    }
  }
  
  let str;
  if (navigator.geolocation) {
    let success=(pos)=>{
      let weatherUrl="https://api.openweathermap.org/data/2.5/weather?lat="+pos.coords.latitude+"&lon="+pos.coords.longitude+"&appid=61f73df782fa1c42297e8dc2f87d3ee8";
      $.getJSON(weatherUrl,(data)=>{
        city=data.name;
        country=data.sys.country;
        weather=data.weather[0].main;
        weatherId=data.weather[0].id;
        temp=data.main.temp-273.15;

        $("#location").text(city+", "+country);
        $("#weather").text(temp.toFixed(1)+"°  "+weather);
        
        handleIcons();
        handleSwitch();
        
        $("#pos-handler").css("visibility","visible");
      })
    };
    let error=(err)=>{
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success,error);
  } else {
    str = "Geolocation is not supported by this browser.";
  }
  
})