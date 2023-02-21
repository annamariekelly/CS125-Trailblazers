import { parseParams, searchYelp } from './yelp.js'

/**
 * The `CATEGORIES` object is an array of indexable objects representing different types of activities
 * that a user can select. Each category contains a `name` and an array of `search_terms` that can be
 * used to query the Yelp API.
 */   
const CATEGORIES = [
    {
        name: "Foodie Finds",
        search_terms: ["snacks", "food trucks", "cafes"]
    },
    { 
        name: "Nature Navigators", 
        search_terms: ["botanical gardens", "parks"] 
    },
    { 
        name: "Adventure Seeker", 
        search_terms: ["hike", "trail"] 
    },
    { 
        name: "Metropolis Marvels", 
        search_terms: ["skyscrapers", "landmarks"] 
    }
];

// Maps sorting methods to yelp term
const SORT_METHODS = {
    "a": "name",         // alphabetical order
    "d": "distance",     // distance from current location
    "p": "price",        // number of $ (out of 4)
    "r": "rating",       // number of stars (out of 5)
}

/**
 * Get Yelp search results for a specific category.
 * @param {number} category_index - The index representing the corresponding category to search.
 * @returns {Promise<Array>} - A promise that resolves to an array of Yelp search results.
 */
 async function findResults(category_index) {
    // Log the current category being searched.
    console.log(`Getting results for ${CATEGORIES[category_index].name}`);
  
    // Map over the search terms for the current category and create a promise for each.
    const promises = CATEGORIES[category_index].search_terms.map(term => {
      // Construct the search query for the current term.
      // TODO: INCLUDE location to search (and maybe radius?)
      const query = {
        term: term,
        limit: 3,
      };
  
      // Execute the search and return the resulting promise.
      return searchYelp(parseParams(query));
    });
  
    // Wait for all of the promises to resolve, and return the results as an array.
    const results = await Promise.all(promises);
    return results.flat();
}


/**
 * Sorts the results array based on the specified sorting method, which defaults to rating.
 * The sorting method is specified using a single letter code as defined in the SORT_METHODS object.
 * @param {Array} results - The array of Yelp search results to sort
 * @param {String} sort_by - The letter code representing the sorting method (default is "r")
 * @returns {Array} - The sorted array of Yelp search results
*/
function sortResults(results, sort_by = "r") {
    // Get the Yelp term corresponding to the specified sorting method
    const sortTerm = SORT_METHODS[sort_by];

    // Sort the results array using the sortTerm as the key
    results.sort((a, b) => {
      return (a[sortTerm] < b[sortTerm]) ? 1 : -1;
    });
  
    return results;
}
  
    
/**
 * keeping this to demonstarte how to iterate/extract info from results
 */
function getResultInfo(results) {
    // loop through each array within results
    for (const result of results) {
    // log the name and rating of the restaurant
        console.log(`${result.name}\nrating: ${result.rating}\nprice: ${result.price}\ncoordinates: (${result.coordinates.latitude}, ${result.coordinates.longitude})\n`);
    }
}
  
// TESTING
const results = await findResults(0);
getResultInfo(results);
console.log(sortResults(results));
