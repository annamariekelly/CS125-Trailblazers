export const TERRAIN_TYPES = ['Foodie Finds', 'Nature Navigators', 'Adventure Seekers', 'Metropolis Marvels'];

const buildRatings = () => {
    const ratings = [];
    for (let i = 0; i <= 5; i += 0.5) {
        ratings.push(i);
    }
    return ratings
}
export const RATINGS = buildRatings();

export const INTENSITIES = ['Brave Trailblazer (you run)', 'Steady Explorer (you jog/speedwalk)', 'Curious Wanderer (you walk)'];

export const TIMES = [5, 10, 20, 45, 60, 120, 180];
