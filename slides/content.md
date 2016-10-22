# Serve Admin UI from Root

Integrations Team

November 2016



# Implementation

Redirection from `/` -> `_plugin/crate-admin` if browser user agent is:

* `Mozilla/5.0`
* `Mozilla/4.0`
* `Opera`


Otherwise, returns JSON as before.



# Demo in browser

[localhost:4200](http://localhost:4200)



# Demo with curl

```shell
$ curl -i "localhost:4200"

HTTP/1.1 200 OK
Content-Type: application/json; charset=UTF-8
Content-Length: 339
{
  "ok" : true,
  "status" : 200,
  "name" : "Dent de Crolles",
  "cluster_name" : "crate",
  "version" : {
    "number" : "0.57.0",
    "build_hash" : "24de2d2b76fc39878ea662f551acbf52040b8c56",
    "build_timestamp" : "2016-10-21T14:16:38Z",
    "build_snapshot" : true,
    "es_version" : "2.3.4",
    "lucene_version" : "5.5.0"
  }
}```



# Thanks!
