# Different node names than elasticsearch

Dimitri wants to see different node naming like elasticsearch as he wants to trust Crate and see it as an own product and not only a rip off from elasticsearch.

## Acceptance Criteria

 * Naming of nodes should be original



# Demo
<pre>
<code data-crate class="sql">select name from sys.nodes
</code>
</pre>
<crate-result></crate-result>



# Is it a node or a Marvel Character?
## Hello sys.summits

<pre>
<code data-crate class="sql">SELECT mountain, country, coordinates, mountain, region 
FROM sys.summits, sys.nodes
WHERE mountain = sys.nodes.name
</code>
</pre>
<crate-result></crate-result>



# Where are my nodes?

<div id="mapdiv"></div>
  <script src="http://www.openlayers.org/api/OpenLayers.js"></script>
  <script>
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
       
    var pois = new OpenLayers.Layer.Text( "My Points",
                    { location:"./textfile.txt",
                      projection: map.displayProjection
                    });
    map.addLayer(pois);
 // create layer switcher widget in top right corner of map.
    var layer_switcher= new OpenLayers.Control.LayerSwitcher({});
    map.addControl(layer_switcher);
    //Set start centrepoint and zoom    
    var lonLat = new OpenLayers.LonLat( 9.5788, 48.9773 )
          .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
          );
    var zoom=11;
    map.setCenter (lonLat, zoom);  
    
  </script>



# Thanks!
Visit us at https://crate.io
