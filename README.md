# The Crate.IO Presentation Framework


## Install & run
Requires `node.js/npm` and `bower` to run.

```bash
npm install
npm start
```


## Edit

Slides can be edited in `slides/content.md`, where the sections are separated by
3 new line characters. (This could be changed in `framework/index.html`)

### Example `content.md`:

```markdown
# RECOVERY STATE



# Acceptance Criteria
### Ashish wants to monitor the restore of an index in detail in order to estimate when the restore process is finished

 * track recovering process of a shard
 * use SQL to do this



# Data Model
(per shard)
```javascript
"recovery" : {
  "size" : {
    "total_bytes" : 79063092,
    "reused_bytes" : 0,
    "recovered_bytes" : 68891939
  },
  "files" : {
    "total" : 73,
    "reused" : 0,
    "recovered" : 69
  },
  "total_time" : 0
}
 ` ``



# Queries
<pre>
<code data-crate class="sql">
select recovery from sys.shards;
</code>
</pre>
### Results: <!-- .element: class="crate-result" data-fragment-index="1" -->
...
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
