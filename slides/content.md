# Percentile
Implement an aggregation that computes a `percentile` over numeric non null values in a column.




# UseCase: Berlin Wheather
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS wheather
</code></pre>

<pre><code data-crate data-trim class="sql">
CREATE TABLE wheather (
    id integer primary key,
    date timestamp,
    temperature float
) with (number_of_replicas=0)
</code></pre>

<crate-result></crate-result>




# UseCase: August Temperature Data
<pre><code data-crate data-trim class="sql">
INSERT INTO wheather (id, date, temperature) VALUES
    (1, '2016-08-01', 26),
    (2, '2016-08-02', 23),
    (4, '2016-08-04', 18),
    (5, '2016-08-05', 23),
    (6, '2016-08-06', 24),
    (7, '2016-08-07', 22),
    (8, '2016-08-08', 23),
    (9, '2016-08-09', 25),
    (10, '2016-08-10', 29),
    (11, '2016-08-03', 22),
    (12, '2016-08-03', 18),
    (13, '2016-08-03', 20),
    (14, '2016-08-03', 19),
    (15, '2016-08-03', 28),
    (16, '2016-08-03', 22),
    (17, '2016-08-03', 21),
    (18, '2016-08-03', 22),
    (19, '2016-08-03', 22),
    (20, '2016-08-03', 20),
    (21, '2016-08-03', 26),
    (22, '2016-08-03', 26),
    (23, '2016-08-03', 23),
    (24, '2016-08-03', 25),
    (25, '2016-08-03', 24),
    (26, '2016-08-03', 28),
    (27, '2016-08-03', 29),
    (28, '2016-08-03', 34),
    (29, '2016-08-03', 32),
    (30, '2016-08-03', 35),
    (31, '2016-08-03', 25)
</code></pre>


<crate-result></crate-result>



# The 95% Percentile
<pre><code data-crate data-trim class="sql">
SELECT percentile(temperature, 0.95), date
FROM wheather
</code></pre>
<crate-result></crate-result>




# Documentation
[Percentile](http://crate.readthedocs.org/projects/crate/en/latest/sql/aggregation.html#percentile)



# Thanks!
