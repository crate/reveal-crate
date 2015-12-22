![Crate.IO](/slides/crate-logo.png)<!-- .element: style="padding-bottom:60px" -->
### Put your data to work. Simply.
*Backend Web Berlin - 21.12.2015*



# SQL
# RIP?



# select * from crate

 * From Dornbirn, Austria
 * Founded 2013
 * 17 people in Berlin, London, Dornbirn
 * Open Source: [github.com/crate](https://github.com/crate)





# Here
![Dornbirn](/slides/dornbirn.png)



# Problems
### with NoSQL & SQL DBs

 * Scaling
 * Simplicity
 * Loose Coupling
 * Documents vs Relations



# Crate
### A distributed shared-nothing SQL datastore
![No sharing!](/slides/shared-nothing.jpg)<!-- .element: height="300px" -->



# Crate
### Built on top of
 * Lucene & Elasticsearch (1.7 currently)
 * ANTLR SQL Parser
 * Netty
 * Java 7

### WITH
 * Custom query engine
 * Custom transport layers

## not a wrapper around Elasticsearch



# Clusters, nodes, and shards
### All nodes are equal - but there are masters
![Crate ERM](/slides/er-crate.png)<!-- .element: height="300px" class="fragment"-->




# Shards & Tables
### Shard
 - Lucene Index (inverted index & documents/fields)
 - Field Cache
 - Routing based on Primary Key Hash

### Table
 - S shards with R replicas
 - Metadata in cluster state



# CREATE TABLE
```
CREATE TABLE IF NOT EXISTS "geo_shapes"."places" (
   "geometry" GEO_POINT,
   "name" STRING,
   "types" ARRAY(STRING)
)
CLUSTERED INTO 5 SHARDS
WITH (
   column_policy = 'dynamic',
   "gateway.local.sync" = 5000,
   number_of_replicas = '1',
   "recovery.initial_shards" = 'quorum',
   refresh_interval = 1000,
   ...
   "routing.allocation.total_shards_per_node" = -1,
   "translog.disable_flush" = false,
   "unassigned.node_left.delayed_timeout" = 60000,
   "warmer.enabled" = true
)
```



# Insert/Update/delete

 1. Look up document location(s) by id
 2. Insert/update/delete on shard




# Queries in Crate
 1. Generate AST
 2. Create execution plan
 3. Distribute queries to shards
 4. Merge results (distributed)
 5. Return results



# For Example
```
SELECT id,
       substr(4, name),
       id % 2 as "even",
       text,
       marks
FROM t
WHERE name IS NOT NULL
  AND match(text, 'full')
ORDER BY id DESC
LIMIT 10;
```



# Executing a Query
 1. Extract fields
 2. Find route to shards
 3. Use Lucene Reader to get IDs  and ORDER BY fields
 4. Return results & merge
 5. Apply limit/offset
 6. Fetch all fields
 7. Evaluate remaining expressions
 8. Return Object[ ][ ]



# Crate SQL

### Common relational operators
 - Projection
 - Grouping (incl. HAVING)
 - Aggregations
 - Sorting
 - Limit/Offset
 - WHERE

### And ...
 - Import/Export (JSON)
 - Incremental Backup/Restore



# First DEMO

[GeoShapes & JOINs](http://localhost:4200/admin)




# Public Play Cluster

[play.crate.io](http://play.crate.io/admin)




# Another Demo!

[GitHub Archive with Crate](http://localhost:8000)




# Features
 * Extended ANSI SQL  
 * Fulltext search
 * Read-after-write consistency
 * Arrays & nested objects
 * System/Cluster/Node information via SQL
 * Client libraries: PHP, node.js, Java, Python, ...
 * HTTP REST endpoint



# More Features
 * Blob storage
 * Tools (Console, Web UI)



# Not in crate

 - Subselects, foreign key constraints
 - Stateful client sessions
 - Transactions



# Mandatory Star Wars Reference

![Merry Christmas](/slides/star-wars.jpg)




# Thanks! Questions?
### Visit us at [crate.io](https://crate.io) or [github.com/crate](https://github.com/crate)

Also, we are hiring ;)

![Crate.IO](/slides/crate-logo.png)<!-- .element: style="padding-top:60px" -->
