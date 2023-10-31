const express = require("express");
const router = express.Router();
const {
    getVectorTile,
    renderEditMap,
    renderMap,
    getRasterTile
} = require("../controllers");


router.get('/', renderMap)

router.get('/edit', renderEditMap)

//router.get('/api/v1/tiles/vector/:table/:z/:x/:y.pbf', getVectorTile);

router.get('/api/v1/tiles/raster/:z/:x/:y.png', getRasterTile);

router.route('/api/v1/tiles/style/:stylename')
    .get(getTileStyle)
    .post(updateTileStyle);

module.exports = router
