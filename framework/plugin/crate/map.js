var RevealMap = (function() {

    map = new OpenLayers.Map({
      div: "mapdiv",
      eventListeners: {
        featureover: function(e) {
            var info = document.getElementById('info');
            info.innerHTML = 'Mountain: ' + e.feature.data.mountain + ' / Num Docs: ' + e.feature.data.num_docs;
            info.style.display = 'block';
        },
        featureout: function(e) {
          var info = document.getElementById('info');
          info.style.display = 'none';
        }
      }
    });
    map.addLayer(new OpenLayers.Layer.OSM());

    // create layer switcher widget in top right corner of map.
    var layer_switcher= new OpenLayers.Control.LayerSwitcher({});
    map.addControl(layer_switcher);

    //Set start centrepoint and zoom
    var lonLat = new OpenLayers.LonLat( 12.30278, 46.51917 )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
    var zoom=8;
    map.setCenter (lonLat, zoom);

    var crateMapQuerySelector = '[map-crate]';

    var nodesLayer = new OpenLayers.Layer.Vector('Sprinters (translated labels)', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: 'http://dev.openlayers.org/examples/img/mobile-loc.png',
            graphicOpacity: 1.0,
            graphicWith: 16,
            graphicHeight: 26,
            graphicYOffset: -26
        })
    });
    map.addLayer(nodesLayer);

    var crateAddress = 'st1.p.fir.io';
    var cratePort = 44200;
    var crate = require('node-crate'),
        sqlSections = document.querySelectorAll(crateMapQuerySelector);
    crate.connect(crateAddress, cratePort);
    crate.execute("select * from sys.cluster").error(function(e) {
      console.error("could not connect to crate server", e);
    });

    for (var i = 0; i < sqlSections.length; i++) {
        var sqlSection = sqlSections[i];

        if(sqlSection.tagName.toUpperCase() === "CODE") {
          sqlSection.setAttribute("style", "cursor:pointer;");

          sqlSection.addEventListener('click', function(event) {
            var code = event.target;
            while (code.tagName.toUpperCase() !== "CODE") {
              code = code.parentNode;
            }

            var sqlCommand = code.textContent;
            if (sqlCommand.charAt(sqlCommand.length - 1) === ';') {
              sqlCommand = sqlCommand.substr(0, sqlCommand.length - 1)
            }
            console.log(sqlCommand);

            crate.execute(sqlCommand).success(function(res) {
                nodesLayer.addFeatures(getFeatures(res.json));
                res.rows.forEach(function(row) {
                    var latLong = row[0];
                    var mountain = row[1];
                });
            });
          });
        }
    }


})();

function getFeatures(json) {

    var featureDetails = [];

    for (i = 0; i < json.length; i++) {

      var transformedCoordinate = new OpenLayers.LonLat( json[i].coordinates )
            .transform(
              new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
              map.getProjectionObject() // to Spherical Mercator Projection
            );

      featureDetails.push({'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [transformedCoordinate.lon, transformedCoordinate.lat]},
          'properties': {'mountain': json[i].mountain, 'num_docs': json[i].num_docs}
        });
    }

    var features = {
        'type': 'FeatureCollection',
        'features': featureDetails
    };
    var reader = new OpenLayers.Format.GeoJSON();
    var read = reader.read(features);
    return read;
}
