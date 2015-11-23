# RECOVERY STATE



# Acceptance Criteria
### Ashish wants to monitor the restore of an index in detail in order to estimate when the restore process is finished

 * track recovering process of a shard
 * use SQL to do this



# Data Model
(per shard)
```javascript
"recovery" : {
  "size" : {
    "total_bytes" : 79063092,
    "reused_bytes" : 0,
    "recovered_bytes" : 68891939
  },
  "files" : {
    "total" : 73,
    "reused" : 0,
    "recovered" : 69
  },
  "total_time" : 0
}
```



# Queries
<pre>
<code data-crate class="sql">
select recovery from sys.shards;
</code>
</pre>
### Results: <!-- .element: class="crate-result" data-fragment-index="1" -->
