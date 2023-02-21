import fetch from 'node-fetch'

const baseURL = 'https://api.yelp.com/v3/businesses/search?';
  
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer rugpaFug1r_Eeqt0PIgaJtSfBaXR0bKDRzn8oJ80DqqZyEnOm-OA0F9maYQQWKk_wqfaLE0ixbljSLKowLzFldGdQ0uzfrIRIAPlRx2RatIiO51osqFena7zAvfjY3Yx'
    }
};

const DEFAULT_PARAMS = {
    location: 'Irvine',
    term: 'snack',
    radius: 16000,  // in METERS
    sort_by: 'best_match',
    limit: 7,
};

function parseParams(params={}) {
    const location = params.location || DEFAULT_PARAMS.location;
    const term = params.term || DEFAULT_PARAMS.term;
    const radius = parseInt(params.radius) || DEFAULT_PARAMS.radius;
    const sort_by = params.sort_by || DEFAULT_PARAMS.sort_by;
    const limit = parseInt(params.limit) || DEFAULT_PARAMS.limit;

    return baseURL + `location=${location}&term=${term}&radius=${parseInt(radius)}&sort_by=${sort_by}&limit=${parseInt(limit)}`;
}

function searchYelp(query) {
    fetch(query, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

// Testing
searchYelp(parseParams());
