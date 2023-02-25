import {findResults, sortResults} from "./yelpDataProcessor.js"

//Maps intensity to corresponding speed in meters/second
const INTENSITIES = {
    0: 66,
    1: 84,
    2: 102
};


/**
 * Recommends a list of desired locations based on the user's location, terrain preference, desired maximum length, and intensity.
 *
 * @param {Object} currentLocation - The user's current location as an object with latitude and longitude properties.
 * @param {number} terrainPreference - The user's preferred type of walk. Check yelpDataProcessor.js for indexes and their corresponding meanings.
 * @param {number} maxTime - The user's desired maximum walk time in minutes
 * @param {number} intensity - The user's desired intensity level.
 * @returns {Promise} A promise that resolves to an array of location recommendations
 */
export async function getRecList(currentLocation, terrainPreference, maxTime, intensity) {
    const searchRadius = calcSearchRadius(maxTime, intensity);
    let results = await findResults(currentLocation, terrainPreference, searchRadius); //add current location and search radius

    //pre-processing
    let sortedResults = sortResults(results, "d");
    let trimmedResults = trimResults(sortedResults);

    return trimmedResults;
}


/**
 * @param {number} maxTime - The user's maximum desired walking time in minutes
 * @param {number} intensity - The user's desired intensity level.
 * @returns {number} Returns search radius
 */
function calcSearchRadius(maxTime, intensity= 0){
    return maxTime * INTENSITIES[intensity];
}


/**
 * Trims off excess categories received from the Yelp API query and
 * removes locations based on previous user rating if the user has seen
 * the location before.
 *
 * @param {Array} results - Yelp API Results
 * @returns {Array} Returns trimmed results list
 */
function trimResults(results){
    function Location(id, name, image_url, street, city, url, distance, rating){
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.street = street;
        this.city = city;
        this.url = url;
        this.distance = distance;
        this.rating = rating;
    }
    let trimmedResults = []
    for (const result of results){
        if (calcChance(result)){
            trimmedResults.push(new Location(result.id, result.name, result.image_url,
                result.location.address1, result.location.city, result.url, result.distance, result.rating));
        }
    }
    return trimmedResults
}


/**
 * Calculates the chance an individual location will stay on the recommendation list.
 *
 * @param {Object} location - Individual location
 * @returns {number} Returns 1 if the RNG has determined the location will stay
 * on the recommendation list. 0 otherwise.
 */
function calcChance(location){
    return 1;
}


//TESTING
//let recList = getRecList('3641 Baylor Street, Irvine, CA', 0, 30, 0);
//console.log(recList);