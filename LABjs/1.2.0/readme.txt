http://labjs.com/documentation.php
$ git clone git://github.com/getify/LABjs

For instance, the following "<script> tag soup":

<script type="text/javascript" src="http://remote.tld/jquery.js"></script>
<script type="text/javascript" src="local/plugin1.jquery.js"></script>
<script type="text/javascript" src="local/plugin2.jquery.js"></script>
<script type="text/javascript" src="local/init.js"></script>
<script type="text/javascript">
	initMyPage();
</script>


With LABjs becomes:

<script type="text/javascript" src="LAB.js"></script>
<script type="text/javascript">

$LAB
.script("http://remote.tld/jquery.js").wait()
.script("/local/plugin1.jquery.js")
.script("/local/plugin2.jquery.js").wait()
.script("/local/init.js").wait(function(){
	initMyPage();
});

</script>

The differences between the two snippets is that with regular <script> tags, you cannot control their loading and executing behavior reliably cross-browser. Some new browsers will load them in parallel but execute them serially, delaying execution of a smaller (quicker loading) script in the pessimistic assumption of dependency on previous scripts. Older browsers will load *and* execute them one-at-a-time, completely losing any parallel loading speed optimizations and slowing the whole process drastically.

All browsers will, however, block other page resources (like stylesheets, images, etc) while these scripts are loading, which causes the rest of the page's content loading to appear much more sluggish to the user.
