import axios from 'axios';

const apiKey = 'AIzaSyBRwhJtV1LGxuM1OoB8JTTJ_WbsBMYL_I4';
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}`;

if (navigator.geolocation) { // only works when called for browser?
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        axios.get(`${apiUrl}&latlng=${latitude},${longitude}`).then(response => {
            const location = response.data.results[0].formatted_address;
            console.log(`Current location: ${location}`);
        }).catch(error => {
            console.log(`Error: ${error}`);
        });
    });
} else {
    console.log('Geolocation is not supported by this browser.');
}
