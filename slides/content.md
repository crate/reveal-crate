# Partial Export

[BernhardGruen](https://github.com/BernhardGruen) wants to do partial exports
in order to generate incremental backups in json format.



## Acceptance Criteria

  * Postgresql copy syntax is used as basis for syntax
  * Output row format is object like the normal output without specified columns
  * Partition values are exported to rows
  * Star selects follow the normal select semantics



# Usecase: Backup a diary
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS diary;
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE diary(
    text string INDEX USING fulltext with (analyzer = 'english'),
    time timestamp
)
</code></pre>
<crate-result></crate-result>



# Prepare Data
<pre><code data-crate data-trim class="sql">
INSERT INTO diary(text, time) VALUES
    ('Today i saw a pony, i like ponies', '2015-01-01T12:30:00'),
    ('Today i was in school, i hate school', '2015-01-02T18:30:00'),
    ('I want a pony for birthday, i like ponies', '2015-02-01T20:30:00')
</code></pre>
<crate-result></crate-result>



# Export entries about ponies
<pre><code data-crate data-trim class="sql">
COPY diary WHERE match(text, 'pony') TO DIRECTORY '/tmp/export/pony/';
</code></pre>
<crate-result></crate-result>



# Import again
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS pony_diary;
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE pony_diary(
    text string INDEX USING fulltext with(analyzer = 'english'),
    time timestamp
)
</code></pre>

<pre><code data-crate data-trim class="sql">
COPY pony_diary FROM '/tmp/export/pony/*';
</code></pre>
<pre><code data-crate data-trim class="sql">
SELECT * FROM pony_diary;
</code></pre>
<crate-result></crate-result>




# Output format
### Exporting specific column was only possible as json arrays.
<pre><code data-crate data-trim class="sql">
COPY diary (text) WHERE match(text, 'pony') TO DIRECTORY '/tmp/export/pony_text/';
</code></pre>
<pre><code data-crate data-trim class="sql">
["Today i saw a pony, i like ponies"]
["I want a pony for birthday, i like ponies"]
</code>
</pre>
### It's not possible reimport json columns



# Added format option
<pre><code data-crate data-trim class="sql">
COPY diary (text) WHERE match(text, 'pony') TO DIRECTORY '/tmp/export/pony_text/' with (format='json_object');
</code></pre>
<pre><code data-crate data-trim class="sql">
{"text":"I want a pony for birthday, i like ponies"}
{"text":"Today i saw a pony, i like ponies"}
</code>
</pre>
<crate-result></crate-result>



# So it's possible to import to exported data again
<pre><code data-crate data-trim class="sql">
DROP TABLE IF EXISTS pony_text_only;
</code></pre>
<pre><code data-crate data-trim class="sql">
CREATE TABLE pony_text_only(
    text string INDEX USING fulltext with(analyzer = 'english')
)
</code></pre>

<pre><code data-crate data-trim class="sql">
COPY pony_text_only FROM '/tmp/export/pony_text/*';
</code></pre>
<pre><code data-crate data-trim class="sql">
SELECT * FROM pony_text_only;
</code></pre>
<crate-result></crate-result>



# Documentation
[COPY TO](http://crate.readthedocs.org/projects/crate/en/latest/sql/reference/copy_to.html#where-clause)



# Thanks!
