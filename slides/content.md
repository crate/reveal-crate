# F501: sql_features view

dejan wants to have an overview about sql features supported by crate in order to check what is implemented



# AC

 * implement feature F501 information_schema.sql_features



# RESTful
## with JSON
```shell
$ curl 'http://localhost:4200/_sql' --data-binary '{"stmt":"select name, id from sys.cluster"}'

{"cols":["name","id"],"duration":0,"rows":[["crate","4ddf5507-15a9-4600-8dd1-503ba3aa4827"]],"rowcount":1}
```



# Try it yourself!
First, start a local instance of Crate.



# Run a Query
## Then, click on this query:
<pre>
<code data-crate class="sql">
select name, id from sys.cluster
</code>
</pre>
<crate-result></crate-result>



# Thanks!
Visit us at https://crate.io
