# The Crate.IO Presentation Framework


## Install & run
Requires `node.js/npm` and `bower` to run.

```bash
bower install
```
### Running Crate

```bash
python3 server.py 
```

or

```bash
python3 server.py --hosts <hosts>
```

## Edit

Slides can be edited in `slides/content.md`, where the sections are separated by
3 new line characters. (This could be changed in `framework/index.html`)

### Example `content.md`:

```markdown
# Reveal Crate



# Put your data to work.
## Simply.

 * Easily scalable
 * SQL query language



# RESTful
## with JSON
```shell
$ curl 'http://localhost:4200/_sql' --data-binary '{"stmt":"select name, id from sys.cluster"}'

{"cols":["name","id"],"duration":0,"rows":[["crate","4ddf5507-15a9-4600-8dd1-503ba3aa4827"]],"rowcount":1}
` ``



# Try it yourself!
First, start a local instance of Crate.



# Run a Query
## Then, click on this query:
<pre>
<code data-crate class="sql">
select name, id from sys.cluster;
</code>
</pre>
<crate-result></crate-result>



# Thanks!
Visit us at https://crate.io

```

### Example reveal.js Configuration:

Most of the configuration is default, to use Crate directly, the proper plugin is required.

```javascript
Reveal.initialize({
  transition: 'slide', // none/fade/slide/convex/concave/zoom
  // Optional reveal.js plugins
  dependencies: [{
    src: '/bower_components/reveal-js/lib/js/classList.js',
    condition: function() {
      return !document.body.classList;
    }
  }, {
    src: '/bower_components/reveal-js/plugin/markdown/marked.js',
    condition: function() {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: '/bower_components/reveal-js/plugin/markdown/markdown.js',
    condition: function() {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: '/bower_components/reveal-js/plugin/highlight/highlight.js',
    async: true,
    callback: function() {
      hljs.initHighlightingOnLoad();
    }
  }, {
    src: '/bower_components/reveal-js/plugin/zoom-js/zoom.js',
    async: true
  }, {
    src: '/bower_components/reveal-js/plugin/notes/notes.js',
    async: true
  }, {
    src: '/plugin/crate/node_crate.js'
  }, {
    src: '/plugin/crate/crate.js'
  }]
});
```
