# Percentile Aggregation
Integrations Team




#Implementation
Implement an aggregation that computes a `percentile` over numeric non null values in a column.


 - Using the TDigest Algorithm
 - Generate a Benchmark Dataset and compare with Elastic Search





# UseCase: ANOMALY DETECTION IN CPU USAGE 
<pre><code data-crate data-trim class="sql">
SELECT * FROM cpu_usage;
</code></pre>

<crate-result></crate-result>





# The 95% percentile 
<pre><code data-crate data-trim class="sql">
SELECT percentile(percent, 0.95)
FROM cpu_usage
</code></pre>
<crate-result></crate-result>





# The 95% Percentile
<pre><code data-crate data-trim class="sql">
SELECT percentile(percent, [0.95, 0.25]) as perc
FROM cpu_usage
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
[Percentile](file:///Users/meriamk/Projects/crate/blackbox/docs/out/html/sql/aggregation.html#percentile)



# Thanks!
![](http://49.media.tumblr.com/d0f970403defd335ec12cabb91e4f059/tumblr_n3uexwYxVI1s96utdo1_250.gif)


