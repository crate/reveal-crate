# sys.nodes query resiliency



## Justin wants to know which node hangs when such a node prevents sys queries and therefore the admin ui from working.


as we've also discovered with our azure 1001 node effort a single stuck nodes lets the sys.nodes queries wait forever

  * No Azure dependencies in core distribution.



# Problem #1 - ES Plugin uses outdated API

  * Elasticsearch has deprecated their plugin because it uses an outdated API
  * Updated and contributed API Changes



# Problem #2 - Azure removed "service" form API

Which nodes to discover now? 

![Which](images/question.jpg)



# Solution

Nodes in the same vnet or subnet or discoverable

```
disovery.azure.method: vnet
```



# How is it integrated in crate?

  * Crate is shipped with the elasticsearch azure-discovery plugin
  * But Azure dependencies are not shipped
  * User has to add Azure dependencies to make plugin work

Same concept as in hdfs snapshot plugin



# Documentation

[Documentation](http://crate.readthedocs.io/en/ab-azure-discovery/azure_discovery.html#azure-discovery)



# Thanks!
Visit us at https://crate.io
