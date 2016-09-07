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
<code data-crate class="sql">SELECT mountain, country, coordinates, region 
FROM sys.summits, sys.nodes
WHERE mountain = sys.nodes.name
LIMIT 100
</code>
</pre>
<crate-result></crate-result>



# Where is my data?

<pre>
<code map-crate class="sql">
SELECT coordinates, mountain, state, table_name, num_docs 
FROM sys.shards, sys.summits
WHERE state = 'STARTED' and mountain=_node['name'] and table_name='locations'
</code>
</pre>


<div id="mapdiv" style="width: 1024px; height: 800px"></div>



# Thanks!
Visit us at https://crate.io
