//? get latitude and longitude
//? then use it for give it for openWeatherMap api
//? return the data as json

//* Done by shajin november/12/2021
// -----------------------------------------------------------------

import GetLocation from 'react-native-get-location';

function Get() {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      // api key
      const api_key = '15f958d72a82ae04f2b70568b2a8e082';
      // url
      const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${api_key}`;
      fetch(uri)
        .then(response => {
          response.json().then(json => {
            return json;
          });
        })
        .catch(() => {
          return false;
        });
    })
    .catch(() => {
      return false;
    });
}

export default Get;
