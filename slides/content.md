# sys.nodes query resiliency



## Justin wants to know which node hangs when such a node prevents sys queries and therefore the admin ui from working.


as we've also discovered with our azure 1001 node effort a single stuck nodes lets the sys.nodes queries wait forever


  * queries to sys.nodes never hangs



# Demo Setup

  * 2 good nodes
  * 1 hanging node



# Actions we have taken



# #1 Timeouts (3s)


<pre>
 <code data-crate class="sql">
 select id, name, hostname from sys.nodes
 </code>
 </pre>
<crate-result></crate-result>



# #2 Don't send unnecessary requests

If requested information is available in cluster state,
we don't query the nodes


<pre>
 <code data-crate class="sql">
 select id, name from sys.nodes
 </code>
 </pre>
<crate-result></crate-result>



# #3 Don't request unnecessary nodes


<pre>
 <code data-crate class="sql">
 select id, name, hostname from sys.nodes where id='Vf0mqWrvSVKRT1ZU2-fbMQ' or id='DJobqfb_QZibZosCVass1g'
 </code>
 </pre>
<crate-result></crate-result>



# Thanks!
![Ruslan](slides/images/ruslan.jpg)
