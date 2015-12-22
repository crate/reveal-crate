# Nested Joins (2+ tables)

Implement a JoinConsumer, which catches MultiSourceSelects with more than 2 tables. 



# Usecase: Sell articles
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS articles
</code></pre>
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS colors
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE articles (
    id integer primary key,
    name string,
    price float
) with (number_of_replicas=0)
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE colors (
    id integer primary key,
    name string,
    rgb string
) with (number_of_replicas=0)
</code></pre>
<crate-result></crate-result>




# Sales Table
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS sales
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE sales (
    id integer primary key,
    article integer,
    color integer,
    date timestamp
) with (number_of_replicas=0)
</code></pre>
<crate-result></crate-result>



# Prepare Data
<pre><code data-crate data-trim class="sql">
INSERT INTO articles (id, name, price) VALUES
    (1, 'Towel', 1.29),
    (2, 'Kill-o-Zap blaster pistol', 3499.99),
    (3, 'Infinite Improbability Drive', 19999.99)
</code></pre>
<pre><code data-crate data-trim class="sql">
INSERT INTO COLORS (id, name, rgb, coolness) VALUES
    (1, 'Antique White', '#faebd7', 0),
    (2, 'Midnight Blue', '#191970', 10.0),
    (3, 'Gold', '#ffd700', 3.0)
</code></pre>
## Sell some stuff
<pre><code data-crate data-trim class="sql">
INSERT INTO sales (id, article, color, date) VALUES
    (1, 1, 3, '2015-12-12'),
    (2, 3, 2, '2015-12-12'),
    (3, 3, 1, '2015-12-23')
</code></pre>
<crate-result></crate-result>



# What did i sold?
<pre><code data-crate data-trim class="sql">
SELECT articles.name, colors.name, date_format('%Y-%m-%d', date) as date
FROM articles
JOIN sales ON articles.id = sales.article
JOIN colors ON colors.id = sales.color
ORDER BY date, articles.name
</code></pre>
<crate-result></crate-result>



# Limitations

* Joining more than 2 tables can result in execution plans which perform poorly as
there is no query optimizer in place yet.

* The ORDER BY clause must not contain expressions which involve multiple relations.
ORDER BY t1.x + t2.x won’t work, but ORDER BY t1.x, t2.x is allowed.



# Documentation
[Joins](http://crate.readthedocs.org/projects/crate/en/latest/sql/joins.html#joins)



# Thanks!
