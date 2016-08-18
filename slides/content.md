# F501: sql_features view

dejan wants to have an overview about sql features supported by crate in order to check what is implemented



# AC

 * implement feature F501 information_schema.sql_features



# Demo

<pre>
   <code data-crate class="sql">
SELECT * FROM information_schema.sql_features LIMIT 10
   </code>
</pre>
<crate-result></crate-result>



# Feature complete?

<pre>
   <code data-crate class="sql">
SELECT is_supported, count(\*)
FROM information_schema.sql_features
GROUP BY is_supported
   </code>
</pre>
<crate-result></crate-result>



# Documentation

[Documentation](http://crate.readthedocs.io/projects/crate/en/sql-features-view/sql/information_schema.html#sql-features)

[Features List](http://crate.readthedocs.io/projects/crate/en/sql-features-view/sql/features.html)



# Thanks!
