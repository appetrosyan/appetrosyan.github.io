import{_ as t,c as a,a as o,o as n}from"./app-DUCnD5ZL.js";const s={};function i(l,e){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="what-i-don-t-like-about-jekyll" tabindex="-1"><a class="header-anchor" href="#what-i-don-t-like-about-jekyll"><span>What I don&#39;t like about Jekyll</span></a></h1><p>This is perhaps a fitting beginning to the first blog post on my home page.</p><p>I FUCKING HATE JEKYLL.</p><p>I&#39;m quite surprised, and frankly appalled at the fact that there are few if any useful tools for generating static sites.</p><p>I started off with Jekyll, because it seemed like the right tool for the job, after all it is supported by GitHub.</p><p>Well, frankly, proudly hosted by the same people that brought to you Atom, then Atom EEE edition, then managed to move what was perfectly logical and could be done via a regular UI with convenient previews into <code>_config.yml</code>, seems like a fitting endorsement.</p><p>Having gone to a GitHub developer summit, I can confidently say that the priorities of GitHub lie elsewhere to what is actually needed for the FOSS community at large. Namely, tools that fucking work, and come with little baggage.</p><p>Jekyll manages to kill itself twice with one stone, by providing both minimal functionality, and maximal baggage.</p><h2 id="non-functionality" tabindex="-1"><a class="header-anchor" href="#non-functionality"><span>Non-functionality</span></a></h2><p>Jekyll doesn&#39;t do as much as I hoped. To the point, that I don&#39;t think I really needed it, or want it.</p><p>All it does, is provide you with a template syntax that perhaps only a genius would appreciate;</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  {% for post in site.posts %}</span>
<span class="line">	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">	  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{{ post.url }}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ post.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  {% endfor %}</span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, if I wanted to add more, I would probably need to add it mysefl. Which begs the question, of why do I need Jekyll, an extra dependency to do basically next to nothing.</p><p>I would appreciate Jekyll (and themes** to be able to inject the index and to do some background logic and to produce a nice looking index. Given that all of the CSS magic to make them look palatable has to be done by me <strong>anyway</strong>, I keep wondering what <a href="https://jekyllrb.com/docs/posts/" target="_blank" rel="noopener noreferrer">Jekyll docs</a> is describing. In a roundabout way, most of Jekyll&#39;s docs come down to &quot;here&#39;s how to do something extremely basic that someone with half a brain and <em>some</em> knowledge of HTML could do faster, and here&#39;s a blurb about how you <em>cONTroL StUfF</em> which doesn&#39;t let you do anything <strong>but</strong> that most basic shit. &quot;</p><p>So the next point comes down to themes. I&#39;ve done WordPress I know that the basic underlying system can be a bowl of spaghetti, but at least it has a healthy community of people who have managed to paint a masterpiece with the limited tools. Nope. The GitHub pages comes down to a handful of supported themes, all of which look like they&#39;ve come from 1994... but load like they&#39;re based in 2024. Incidentally, most &quot;good** themes, are really just template repositories, that they encourage you to fork. <strong>Do not fork any of the themes</strong>, copy and paste the files without the git metadata. The license, more often than not, permits it. This will allow you to have a clean set of commits that don&#39;t depend on the authors, you can still pull from upstream (but you really shouldn&#39;t). All good the other way does to you, is introduce a nice reminder that you <strong>took</strong> someone&#39;s work, instead of doing it yourself. That&#39;s something that I watch out for on personal websites, especially ones that come with <em>myName.github.io</em> as the domain.</p><p>So why, oh why, am I supposed to use Jekyll? To allow me to put my blog posts in a folder that starts with an underscore? Like, sure, if Jekyll didn&#39;t look like someone&#39;s hobby, I would <em>probably</em> permit it the non-ability to change where the blog posts are put, the inept naming convention, probably from someone who came from an older tradition of programming, where prefixing <code>m_</code> to a variable was a substitute for decent tools and critical thinking. But what are the benefits? I&#39;ve yet to see one!</p><h2 id="baggage" tabindex="-1"><a class="header-anchor" href="#baggage"><span>Baggage</span></a></h2><p>This is something that is rather confusing to me to this day. Why Ruby?</p><p>Well, perhaps that&#39;s the wrong question, why you designed it in Ruby, is very much up to you. Design it in OCaml or Haskell for all I care. As long as, there&#39;s a neat way of using it, and it doesn&#39;t require a jumbled mess of packages that are not managed by the single system-wide package manager, I&#39;m fine with it.</p><p>But I also try to be minimal with these tools. They can fall into disuse, if I don&#39;t primarily work in Ruby, I don&#39;t want the full toolchain to be installed, or alternatively, I want the package manager to require minimal manual intervention. For all its faults, Python&#39;s package management is largely done through <code>pip</code>. It can go haywire if you don&#39;t touch it for a very long time, which is precisely why on Archlinux, for example, you are highly discouraged from installing pacakges via <code>pip</code>. You can do so in a virtual environment, which is insufficiently virtual for me, but at least it cannot interfere with future development if ever in the future, I would need something. I try to keep my users as far away from <code>cargo</code> as possible, despite it being far better managed, categorised by toolchain, and far <em>less</em> likely to cause problems similar to the one that I encountered when I had conflicting packages from dependencies needed for a Python pacakge installed via <code>pacman</code> and Python packages installed via <code>pip</code>.</p><p>I&#39;m not convinced that asking people to use the package manager of your chosen language is a good idea. I am not planning on writing Ruby, and interaction with Jekyll doesn&#39;t entail much Ruby writing. But it does entail interacting with the Ruby <code>gem</code>s for themes, and I sincerely hope that if at some later point I&#39;ll need to do something with Ruby for real, I wouldn&#39;t need to change any settings, and I wouldn&#39;t have inexplicable &quot;third option&quot; problems when X was supposed to happen, there&#39;s a troubleshooting guide for if Y happens, and what actually happens is more akin to Z.</p><p>The second observation that I have is that Jekyll is quite opinionated. I can&#39;t set my blog titles to anything other than the one chosen for me. This lack of flexibility doesn&#39;t mean that there&#39;s anything useful happening with it, just that it has to be that way.</p><p>The second point of it having an (incorrect) opinion is the choice of markup. Taken from <a href="https://jekyllrb.com/docs/posts/" target="_blank" rel="noopener noreferrer">Jekyll docs</a> &quot;You <em>typically</em> write posts in Markdown, HTML is <strong>also</strong> supported.&quot;; emphasis, mine. From experience, the only people who like Markdown are the people who tend to mostly write it. It&#39;s a write-only markup with a perverse logic that at some point becomes obvious by osmosis, instead of immediately. The problem with Markdown comes down to the fact that it is (like XML) difficult to read by machines (but at least it&#39;s easier to read for humans). I would get Jekyll if it said &quot;We only support Markdown&quot;, or &quot;We only support HTML&quot;. The latter gives the person writing a lot more control over what happens, even though HTML tends to be unfairly regarded as a clumsy or clunky markup language, most would agree that WEB <strong>is</strong> HTML, and if you have a web-based blog post, it makes sense. Plus you can always export Markdown to HTML, so it&#39;s not exactly a huge problem. The former choice of only supporting Markdown is yet another thing which I would be happy with: Jekyll would be off my radar, and perhaps would not give me any false hope.</p><p>The trouble is that having two supported formats adds the overhead of a generic system, without making full use of it. If you support MD and HTML, you <em>ought</em> to support Org, ASCIIDOC, RTF, maybe even XML. Why do I need a plugin for that? Why do I need to <em>whitelist</em> the plugin for it to work? What exactly does Jekyll do, that couldn&#39;t be done with a couple of lines of <code>bash</code> and <code>pandoc</code>? I&#39;m not even sure it&#39;s more error-resistant, something that I might eventually actually do.</p>`,24)]))}const p=t(s,[["render",i],["__file","jekyll.html.vue"]]),h=JSON.parse(`{"path":"/posts/rants/jekyll.html","title":"What I don't like about Jekyll","lang":"en-GB","frontmatter":{"date":"2024-01-08T00:00:00.000Z","category":["Blog","Markup Languages"]},"headers":[{"level":2,"title":"Non-functionality","slug":"non-functionality","link":"#non-functionality","children":[]},{"level":2,"title":"Baggage","slug":"baggage","link":"#baggage","children":[]}],"git":{"updatedTime":1742751544000,"contributors":[{"name":"Aleksandr Petrosyan","username":"","email":"ap886@cantab.ac.uk","commits":6}],"changelog":[{"hash":"0d383b94a1e6bd6e15fdc04d85f9ceda3647fa4a","time":1742751544000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Migrate rants"},{"hash":"39c79fdeb75c795fb3d37c30fada4b5245d88492","time":1742750542000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Relocate rants"},{"hash":"bc5bda253540556643ed855b2cd5c7ee23c67889","time":1742747283000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Initial migration"},{"hash":"c9be3c1c66782052fc8b96a691a870ab49b627ed","time":1704744219000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[feature]: Functional blog and sidebar"},{"hash":"65f39627ff8923a7cb88e6ad184ad87504fcdb1a","time":1704731554000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[feature]: First attempt at creating a blog"},{"hash":"d9d435b547804b5c145d2c7e201e74fa8f300551","time":1704708597000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[doc]: Added Vitepress stub"}]},"filePathRelative":"posts/rants/jekyll.md","excerpt":"\\n<p>This is perhaps a fitting beginning to the first blog post on my home page.</p>\\n<p>I FUCKING HATE JEKYLL.</p>\\n<p>I'm quite surprised, and frankly appalled at the fact that there are few if any useful tools for generating static sites.</p>\\n<p>I started off with Jekyll, because it seemed like the right tool for the job, after all it is supported by GitHub.</p>"}`);export{p as comp,h as data};
