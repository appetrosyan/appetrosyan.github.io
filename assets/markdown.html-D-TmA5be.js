import{_ as t,c as a,a as o,o as n}from"./app-DUCnD5ZL.js";const i={};function s(r,e){return n(),a("div",null,e[0]||(e[0]=[o('<h1 id="markdown-considered-harmful" tabindex="-1"><a class="header-anchor" href="#markdown-considered-harmful"><span>Markdown considered harmful</span></a></h1><p>I&#39;ve had complaints about Markdown for years. I don&#39;t like it. Is it better than e.g. writing your code in ReST, I&#39;d argue marginally, and only if you assume that ReST was meant to be used in the same circumstances as Markdown, which it does not.</p><p>In my opinion, if your life revolves around Markdown, this article will make your life a bit easier, not by a lot, but still. I&#39;d make the case that we&#39;re better off leaving Markdown behind, and instead to move beyond &quot;lightweight&quot; text-based markup.</p><p>For the record, I believe that something like Org, while miles better in execution still suffers from the same problems in concept.</p><p>So without further ado.</p><h2 id="there-s-no-markdown-grammar" tabindex="-1"><a class="header-anchor" href="#there-s-no-markdown-grammar"><span>There&#39;s no Markdown grammar</span></a></h2><p>This is a fairly pervasive problem for all &quot;lightweight&quot; markup languages. Specifically, that most people come up with the markup with no regard to traditional BNF and parser combinator approaches. This leads to some things being impossible to represent, some other things being impossible to do, some combination of the two, and a collection of problems related to the fact that you both want every single possible UTF-8 character to be represented, every possible feature of a markup language typography to be represented and to some extent, to be able to do things elegantly.</p><p>So what is the problem, then with there being no grammar to refer to? Well, the fact that when I say Markdown, I have to say explicitly, <code>CommonMark</code>, or <code>Github-flavoured</code> or <code>shit-encrusted</code>. Markdown as a standard only communicates a very vague notion of you do emphasis with underscores, boldface with doubled asterisks and some unholy combination of square and round brackets to do links. Other than that, your mileage can vary wildly.</p><p>I&#39;d say perhaps that the reason why this is bad has less to do with the language itself, but with the approach that people take to it. We assume that we could just do things the right way and it would work. That right way happens to be up to the interpreter, and now your way of doing things correctly is contingent on knowing, for lack of a better word, which features does <code>shit-encrusted</code> markdown have. (incidentally, this project does not and will not exist, primarily because its sheer existence would imply that all other markdown is <strong>not</strong> <code>shit-encrusted</code>).</p><p>TODO Latex \\usep{},</p><p>TODO EMMET</p><p>TODO Roff</p><p>TODO Extensions break markup</p><p>TODO domain modelling</p><p>TODO logic doesn&#39;t allow for one thing to be both italic and bold, but to be bolditalic</p><p>One common advantage of thinking in terms of grammars is that it makes the design of the markup language easier, not only to make, but also to understand. Case in point; in Markdown the <code>#</code> symbol delineates a heading, inheriting the somewhat outdated semantics of HTML&#39;s <code>&lt;h1&gt;</code>. It makes natural sense to assume that <code>##</code> is equivalent to <code>h2</code> and beyond. This <em>is</em> good and something that Markdown does well. At the same time, things like links to headings follow rules which I, as a programmer with 15+ years of experience, having dealt with a whole zoo of programming languages, both functional and esoteric, second-guess myself when doing cross referencing. It would have been simpler to have a `\\label**-like method for most if not all interactions, but for that to have been possible, there ought to have been some foresight.</p><p>Org is slightly better in this regard, because while it comes with most of the markup already defined, it allows definition of custom markup, and in principle, a label-like reference system. This is also one of a few places where ReST will feature in a positive light.</p><h2 id="fallback-to-better-languages" tabindex="-1"><a class="header-anchor" href="#fallback-to-better-languages"><span>Fallback to better languages</span></a></h2><p>One of the most profound counter-points to this critique would be to say that, if all else fails, Markdown usually falls back onto HTML. Anything, including this blog, that accepts markdown, also accepts HTML, so if I wanted to, for example, have more reasonable hyperlinks, I could do it in HTML.</p><p>The argument is problematic, because in that case, Markdown is a quick and dirty way to create HTML; in which case, why don&#39;t you <strong>just</strong> use HTML?</p><p>It&#39;s a similar problem with Org and LaTeX. Sure Org can do things that are impressive by &quot;lightweight&quot; markup language standards, but fairly standard on LaTeX... so there&#39;s few if any incentives to anyone who&#39;s already fluent in LaTeX to use Org for Markup (though thanks to what I just described in the previous chapter, there&#39;s plenty of other uses).</p><p>What is more problematic is that the ability to fall back to HTML, means that some features that would be enormously important for semantic reasons, will never get incorporated precisely because they&#39;re already available in HTML form.</p><p>One final point: the fact that you can generally rely on HTML as the intermediate representation of text, means that Markdown can never eclipse HTML. It cannot have a heading more deeply nested than <code>&lt;h6&gt;</code> and it can&#39;t possibly parse better. And it kinda makes sense, most places you&#39;d use Markdown is on the web, so you don&#39;t want to veer beyond what is the gold standard. Which begs the question... why not just use HTML?</p><h2 id="markdown-has-restricted-semantic-content" tabindex="-1"><a class="header-anchor" href="#markdown-has-restricted-semantic-content"><span>Markdown has restricted semantic content</span></a></h2><p>MD is simple. I&#39;d argue too simple and it misses the point which LaTeX made all those years ago. The importance of these formats is in how they can separate the semantic content of the document from the presentation aspects; and that this allows one to do wonderful things and conform to general styles, without sacrificing on complexity of the semantics.</p><p>HTML, for all its faults, is a descendant of SGML, which allows it to do that, and to do it remarkably well, in some cases. You have the built-ins like <code>&lt;b&gt;</code> and <code>&lt;i&gt;</code> and things like <code>&lt;a&gt;</code> which would be difficult to implement without access to the end-user&#39;s interpreter. At the same time, these comprise more of an instruction set, rather than the language itself; there&#39;s such a thing as <code>&lt;em&gt;</code>-phasis, which is rendered italicised by default, but has a very different meaning. There&#39;s <code>&lt;strong&gt;</code> which is not the same as <code>&lt;b&gt;</code> and they can be styled independently given the existence of Cascading Style Sheets. How do you style a markdown tag? How do you define a custom tag is another matter, but suppose we dealt with Markdown that addressed that issue. Markdown would need an equally complicated (read slow) means of styling.</p><p>What is more egregious, is that adding those would be inherently against the spirit of being a &quot;simple&quot; markup language. It is perfectly possible that someone could study HTML and not know about the existence of the <code>&lt;cite&gt;</code> tag, but because there&#39;s no agreed upon grammar in Markdown, there&#39;s no way of adding that tag in a portable fashion, other than falling back on HTML syntax. And in all fairness, this is not itself a problem, if it weren&#39;t for that</p><h2 id="markdown-is-used-in-places-where-heavy-markup-should-be-used" tabindex="-1"><a class="header-anchor" href="#markdown-is-used-in-places-where-heavy-markup-should-be-used"><span>Markdown is used in places where heavy markup should be used</span></a></h2><p>My first foray into creative writing was in 2020, where in the aftermath of the StallmanGate, I started writing. So for that to work, I needed to produce a text. In any form I wanted, if we&#39;re completely honest. It didn&#39;t matter.</p><p>But naturally the way we&#39;d post was using Markdown. Odysee has a nice UI, and a user-friendly way to post information. That and reddit, are the only two platforms on which I&#39;ve had issues with Markdown being escaped: it wasn&#39;t as much of a nightmare as you&#39;d think, I just had to search for the literal <code>\\</code> and replace it with nothing. It&#39;s fine, but it&#39;s an annoyance nonetheless.</p><p>What I find fascinating is that on MacOS, to the extent to which no other operating system, there&#39;s support for rich markup. When one copies text, it gets highlighted. This might seem quaint, but it frees one from having to implement syntax highlighting in every program, inclduing for example, <code>keynote</code>. All I need to do is to copy the already highlighted text into a window, and presto it works.</p><p>This might seem quaint to some, but it is actually low-key genius, because the way I do syntax highlighting in my editor is very different to the angry word salad that most editors prefer.</p><h2 id="wysiwyg-is-important" tabindex="-1"><a class="header-anchor" href="#wysiwyg-is-important"><span>WYSIWYG is important</span></a></h2><p>In Markdown I don&#39;t really get a choice of how to higlight code. I&#39;d like to, but there&#39;s no way of doing the highlighting in a different way; by that I don&#39;t mean the colours, it&#39;s somewhat involved to change the colours in the CSS, but it isn&#39;t exactly impossible, what I&#39;m refering to is the ability to highlight different kinds of keywords, or highlighting identifiers with different colours, I can do it. The process doesn&#39;t change much whether I use Emacs or some other text editor. This support for rich markup makes the fact of rendering the markup a priority for the specialised program, not for every possible instance that might need it.</p><p>So why <strong>don&#39;t</strong> we have a reasonable support for rich markup? Frankly, this eludes me. I know for a fact that most web browsers support it in some form. I know for a fact that it&#39;s possible to implement a system like that system-wide, and that in principle, there&#39;s nothing problematic about there being different platform-specific conventions about how to utilise the rich markup (say <code>CMD+B</code> and <code>CTRL+B</code>).</p><p>What I found to be nonetheless true is that most people prefer &quot;simple&quot; markup via Markdown for reasons of reproducibility. Despite lacking a standard, Markdown is susceptible to introspection, if your implementation uses underscores and not single asterisks for italics, then there&#39;s an easy way to see it and to correct it manually. In case of rich markup, unless there&#39;s a tool for it, there&#39;s no way to know. As a consequence, despite MS Word being several decades older, fixing markup in Word is harder than it is to fix markup in Markdown.</p><p>As a programmer I&#39;m conditioned to believe that text-based markup, one where you type in characters in a text editor, rather than a document editor is superior. But, and this is crucial, is largely a lie, given that a transparent interface based around XML, is what most if not all office suites have converged upon as a solution, I see no reason why we can&#39;t simplify some aspects of the XML markup to be less annoying.</p><p>What I will give to Markdown and LaTeX is the ability to cleanly separate the presentation aspects from the logical structure, but I see no reason why LibreOffice or M$ office have to be the &quot;gold standard&quot;. There are progams, namely Lyx and TexMacs that can compete and do so very well.</p><p>The main reason why you would need to use a WYSIWYG editor is the immediacy of feedback. Lyx can give you a very accurate idea of what the equation that you just entered is doing. Sure I <strong>could</strong> get that information by parsing LaTeX, but I&#39;d be expending more of my valuable brain juice on doing a task that&#39;s much easier to do with a computer anyway.</p><p>What Lyx is missing is general support, because most UI frameworks think that supporting Markdown is good, and supporting LaTeX is not. And they&#39;re right; LaTeX has more than half a century of technical debt accumulated over the years. It&#39;d be hard to clean that up, and nobody wants to deal with it. Markdown is a relatively new format, that is not very ambitious, which is why it took off.</p><p>Another feature which I would qualify as missing in Lyx is the abstracted complexity; there&#39;s both a problem of Lyx being extremely complex, to the point of intimidating even a seasoned programmer, and also not nearly supporting the variety of possible configurations of a TeX document. It can create presentable works, but it lacks the ability to define custom macros and have them be accessible.</p><p>To put a final nail in the coffin, Lyx is not very WYSIWYG, in the sense that it doesn&#39;t exactly produce the final PDF. You see the text, but you cannot put this stuff from within the UI, the one thing that you can potentially need.</p><p>I just think that we may have lost something along the way; that we should perhaps consider doing things in a more visual fashion. I&#39;m willing to bet that your content people would like that very much anyway, because they&#39;re very visual creatures.</p><h2 id="simple-markup-is-not-simple" tabindex="-1"><a class="header-anchor" href="#simple-markup-is-not-simple"><span>Simple markup is not simple</span></a></h2><p>This is probably the least substantiated of my complaints. It&#39;s more of a feeling rather than an observation. But Markup basically comes down to</p><ol><li>I need to specify text with typography/highlighting.</li><li>I need to cover all UTF-8 characters, because they can be part of regular text.</li><li>I need to insert images and style it externally.</li></ol><p>So normally what one ends up with is Markdown with many superfluous bolt-ons. What people mostly don&#39;t want to end up with is HTML, because it&#39;s rather verbose. What people definitely don&#39;t want to end up with is some opaque non-standard binary format that will keep on changing and break their existing documents. What is perhaps every non-technical person&#39;s nightmare is having to do this in LaTeX.</p>',47)]))}const d=t(i,[["render",s],["__file","markdown.html.vue"]]),l=JSON.parse(`{"path":"/posts/rants/markdown.html","title":"Markdown considered harmful","lang":"en-GB","frontmatter":{"date":"2024-01-11T00:00:00.000Z","category":["Blog","Markup Languages"]},"headers":[{"level":2,"title":"There's no Markdown grammar","slug":"there-s-no-markdown-grammar","link":"#there-s-no-markdown-grammar","children":[]},{"level":2,"title":"Fallback to better languages","slug":"fallback-to-better-languages","link":"#fallback-to-better-languages","children":[]},{"level":2,"title":"Markdown has restricted semantic content","slug":"markdown-has-restricted-semantic-content","link":"#markdown-has-restricted-semantic-content","children":[]},{"level":2,"title":"Markdown is used in places where heavy markup should be used","slug":"markdown-is-used-in-places-where-heavy-markup-should-be-used","link":"#markdown-is-used-in-places-where-heavy-markup-should-be-used","children":[]},{"level":2,"title":"WYSIWYG is important","slug":"wysiwyg-is-important","link":"#wysiwyg-is-important","children":[]},{"level":2,"title":"Simple markup is not simple","slug":"simple-markup-is-not-simple","link":"#simple-markup-is-not-simple","children":[]}],"git":{"updatedTime":1742751544000,"contributors":[{"name":"Aleksandr Petrosyan","username":"","email":"a-p-petrosyan@yandex.ru","commits":6}],"changelog":[{"hash":"0d383b94a1e6bd6e15fdc04d85f9ceda3647fa4a","time":1742751544000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Migrate rants"},{"hash":"39c79fdeb75c795fb3d37c30fada4b5245d88492","time":1742750542000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Relocate rants"},{"hash":"bc5bda253540556643ed855b2cd5c7ee23c67889","time":1742747283000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Initial migration"},{"hash":"b6188149fbb1834607fcd61acd0e7ddd8f8863cc","time":1705439973000,"email":"a-p-petrosyan@yandex.ru","author":"Aleksandr Petrosyan","message":"[rant]: <code v-pre>markdown</code> added plans"},{"hash":"438f12e71f24039e4e6b990998101378b8fd65d1","time":1705098692000,"email":"a-p-petrosyan@yandex.ru","author":"Aleksandr Petrosyan","message":"[feature]: Unpublish unfinished stuff"},{"hash":"9daca8ee584175dfd9a1fccef5ffc6f573084f18","time":1704984538000,"email":"a-p-petrosyan@yandex.ru","author":"Aleksandr Petrosyan","message":"[rant]: <code v-pre>markdown</code>"}]},"filePathRelative":"posts/rants/markdown.md","excerpt":"\\n<p>I've had complaints about Markdown for years. I don't like it. Is it better than e.g. writing your code in ReST, I'd argue marginally, and only if you assume that ReST was meant to be used in the same circumstances as Markdown, which it does not.</p>\\n<p>In my opinion, if your life revolves around Markdown, this article will make your life a bit easier, not by a lot, but still. I'd make the case that we're better off leaving Markdown behind, and instead to move beyond \\"lightweight\\" text-based markup.</p>"}`);export{d as comp,l as data};
