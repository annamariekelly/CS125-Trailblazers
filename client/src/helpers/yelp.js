import fetch from 'node-fetch'

const baseURL = 'https://api.yelp.com/v3/businesses/';
  
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer rugpaFug1r_Eeqt0PIgaJtSfBaXR0bKDRzn8oJ80DqqZyEnOm-OA0F9maYQQWKk_wqfaLE0ixbljSLKowLzFldGdQ0uzfrIRIAPlRx2RatIiO51osqFena7zAvfjY3Yx'
    }
};

const DEFAULT_PARAMS = {
    location: '3641 Baylor Street, Irvine, CA',
    term: 'snack',
    radius: 16000,  // in METERS
    sort_by: 'best_match',
    limit: 5,
};

export function parseSearchParams(params={}) {
    const location = params.location || DEFAULT_PARAMS.location;
    const term = params.term || DEFAULT_PARAMS.term;
    const radius = parseInt(params.radius) || DEFAULT_PARAMS.radius;
    const sort_by = params.sort_by || DEFAULT_PARAMS.sort_by;
    const limit = parseInt(params.limit) || DEFAULT_PARAMS.limit;

    return baseURL + `search?location=${location}&term=${term}&radius=${parseInt(radius)}&sort_by=${sort_by}&limit=${parseInt(limit)}`;
}

function queryYelp(query) {
    return fetch(query, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function searchYelp(query) {
    return queryYelp(query)
        .then(response => response.businesses)
        .catch(err => console.error(err));
}

export function getBusinessInfo(businesses_id) {
    const query = `${baseURL}${businesses_id}`;
    return fetch(query, options)
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.error(error));
}

// Testing
console.log(await searchYelp(parseSearchParams()));
console.log(await getBusinessInfo('o6ziktvJIlqumDpggkS-dQ'))
