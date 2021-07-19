    // let lat, lon;


    if ('geolocation' in navigator) {
      console.log('geolocation is available');
      navigator.geolocation.getCurrentPosition(async position => {
        let lat,lon,weather,air;
        try {
          lat = position.coords.latitude
          lon = position.coords.longitude
          document.getElementById('latitude').textContent = lat.toFixed(2);
          document.getElementById('longitude').textContent = lon.toFixed(2);
          // const key = `2c4bfe89a94e6e66c5410397b6b1a953`;
          // const api_url = `/sky/weather?lat=${lat}&lon=${lon}&appid=${key}`;
          const api_url = `/sky/${lat},${lon}`;
          const response = await fetch(api_url);
          const json = await response.json();
          console.log(json);
          console.log(json.air_quality.results[0]);
          air = json.air_quality.results[0];
          weather = json.weather
          document.getElementById('summary').textContent = weather.name;
          document.getElementById('temp_f').textContent = weather.main.temp;
          document.getElementById('air_parameter').textContent = air.measurements[0].parameter;
          document.getElementById('air_value').textContent = air.measurements[0].value;
          document.getElementById('air_unit').textContent = air.measurements[0].unit;
        } catch (error) {
          console.error(error);
          air = { value: -1 };
          console.log('something went wrong!');
        };

        const data = { lat, lon, weather, air };
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();
        console.log(db_json);
      });
    } else {
      console.log('geolocation is not available');
    };
