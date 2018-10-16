/**
 * Use the tiles seed object to generete the full array of tiles
 * @param {Object[]} seed 
 */
const getFullSortedTiles = seed => {

    // Can't use spread operator here
    return seed.concat(JSON.parse(JSON.stringify(seed)))
}

/**
 * Shuffle the full tiles sorted object using Durstenfeld shuffle algorithm
 * @param {Object[]} tiles 
 */
function getShuffledTiles(tilesSeed) {

    let tiles = getFullSortedTiles(tilesSeed)

    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }

    return tiles
}

export default getShuffledTiles