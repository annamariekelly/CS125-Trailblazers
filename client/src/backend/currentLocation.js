import axios from 'axios';

const apiKey = 'AIzaSyBRwhJtV1LGxuM1OoB8JTTJ_WbsBMYL_I4';
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}`;

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          axios
            .get(`${apiUrl}&latlng=${latitude},${longitude}`)
            .then(response => {
              const location = response.data.results[0].formatted_address;
              resolve(location);
            })
            .catch(error => {
              reject(`Error: ${error}`);
            });
        });
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

