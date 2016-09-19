# Percentile Aggregation
Integrations Team




#Story Scope
githubmui wants to compute the 95% percentile of logged web request response times in order to generate stats




#Acceptance Criteria
 - inform githubmui about master merge
 - inform [intercom conversation](https://app.intercom.io/a/apps/bda97f31bea8f639d9e93721d781cef31ff00628/inbox/unassigned/conversations/4559517542)





#Implemetation
Implement an aggregation that computes a `percentile` over numeric non null values in a column.

 - Using the Implementation of TDigest of Elastic Search
 - Generate a Benchmark Dataset





# UseCase: Berlin Weather
<pre><code data-crate data-trim class="sql">
SELECT * FROM weather;
</code></pre>

<crate-result></crate-result>





# The 95% percentile Temperature for August
<pre><code data-crate data-trim class="sql">
SELECT percentile(temperature, 0.95)
FROM weather
</code></pre>
<crate-result></crate-result>





# The 95% Percentile
<pre><code data-crate data-trim class="sql">
SELECT percentile(temperature, [0.95, 0.25]) as perc
FROM weather
</code></pre>
<crate-result></crate-result>



# Performance 
<pre><code>
56m records in uservisits table
50 iterations

fraction: [0.2]:
average time:
    cr: 2114ms
    es: 1923ms 

fractions [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]
average time:
    cr: 2202ms
    es: 1920ms
</code></pre>



# Documentation
[Percentile](http://crate.readthedocs.org/projects/crate/en/latest/sql/aggregation.html#percentile)



# Thanks!
![](http://4.bp.blogspot.com/-PBaqGbdz1c4/UbMAfln99VI/AAAAAAAAMLE/xBUhjzWM7ZU/s1600/dog-hind-legs.gif)


