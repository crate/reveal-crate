# Postgres

# Migrate Metabase to Crate JDBC 2.0



# Story
## Gino wants to use Metabase with the current version of crate to make use of the new upcoming features (like union etc.)

* bump version to crate-jdbc 2.x
* PR with new jdbc version is out.



# Problems
* Shading

  `org.postgresql` --> `io.crate.shade.org.postgresql`

* applied certain bug-fixes in crate-jdbc 2.0



# ... but then, finally!
## DEMO



# Introducing

# `latitude/longitude`

## Synopsis

<pre>
<code>

latitude / longitude ([geo_point | WKT | double_array])

</code>
</pre>



# Let's try it

<pre>
<code data-crate class="sql">
select
mountain, height, longitude(coordinates) as lon, latitude(coordinates) as lat, country
from sys.summits order by height desc limit 7
</code>
</pre>
<crate-result></crate-result>



# ... another example

<pre>
<code data-crate class="sql">
select longitude('POINT (9.743 47.40)'), latitude([9.743, 47.40])
</code>
</pre>
<crate-result></crate-result>



# Thanks!