const sequelize = require("../sequelize");
const path = require("path");
var fs = require('fs');
const MBTiles = require('@mapbox/mbtiles');

renderMap = async (req, res) => {
    res.render('index', {})
}

renderEditMap = async (req, res) => {
    res.render('edit', {})
}

buildQuery = (tableName, z, x, y) => {
    return `select concat_mvt( ARRAY['${tableName}'], ${z}, ${x}, ${y} );`
}

getVectorTile = async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query(buildQuery(req.params.table, req.params.z, req.params.x, req.params.y));
        res.writeHead(200, { 'Content-Type': 'application/protobuf' })
        res.write(results[0].concat_mvt, 'binary')
        res.end()
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

getTileStyle = async (req, res) => {
    try {
        res.header("Content-Type", 'application/json');
        res.sendFile(path.join(__dirname, '..', 'styles', `${req.params.stylename}.json`));
    } catch (error) {
        //console.log( error )
        res.status(404).send()
    }
}

updateTileStyle = async (req, res) => {
    if (!req.body.style) {
        res.status(404).send()
    }
    try {
        fs.writeFile(
            path.join(__dirname, '..', 'styles', `${req.params.stylename}.json`),
            req.body.style, 'utf8', () => { });
        res.status(200).send()
    } catch (error) {
        res.status(404).send()
    }
}

getRasterTile = (req, res) => {
    new MBTiles(path.join(__dirname, '..', 'data', 'uraricoera_terrain.mbtiles'), function (err, mbtiles) {
        if (err) console.log("error opening database");
        mbtiles.getTile(req.params.z, req.params.x, req.params.y, function (err, data, headers) {
            if (err) {
                res.set({ "Content-Type": "text/plain" });
                res.status(404).send('Tile rendering error: ' + err + '\n');
            } else {
                res.set(headers);
                res.send(data);
            }
        });
    });
}

module.exports = {
    getVectorTile,
    renderEditMap,
    renderMap,
    updateTileStyle,
    getTileStyle,
    getRasterTile
}