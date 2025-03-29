import{_ as t,c as o,a,o as i}from"./app-DUCnD5ZL.js";const n={};function s(r,e){return i(),o("div",null,e[0]||(e[0]=[a('<h1 id="how-to-learn-to-program" tabindex="-1"><a class="header-anchor" href="#how-to-learn-to-program"><span>How to learn to program</span></a></h1><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>A much more detailed guide is going to be published on the Greybeard blog. So stay tuned.</p></div><p>This is a bit of a short guide, and it&#39;s required to be short for one simple reason.</p><p>There&#39;s a lot of advice there on the internet. A lot of it is correct, but it comes with an implicit contextual limitation. The people like Uncle Bob Martin, Johnathan Blow, and perhaps Casey Muratori, are all referring to programmers that have intrinsically different levels of experience.</p><p>So in a world where everyone and their dog is going to tell you how to program, and how you should organise your code, I&#39;m going to say something controversial. Do something. Break the rules. Have to return to your own code years later and see where you evolve to.</p><p>Do not ignore advice that comes from your coworkers, because it is needed specifically for your specific project and it allows your PM, and Tech Lead to do the things that they need to do, the way that they need to do. At the same time, if not specified, organising your code according to some well-known pattern is good, but don&#39;t take it to religious levels. All advice, if divorced from the context of its origin is bad. All advice when applied within context, is good. It really is up for debate, whether or not you should care if the dependency is injected, or it is written in the horrible pattern that you instinctively lean towards.</p><p>But nobody, not even you, knows what the project is going to end up looking like. And that means that most advice needs to be applied only if the circumstances of its origin have been instantitated. This is unlikely to occur, and thus your approach to coding should look more like the freeform that you have right now.</p><h2 id="clean-code" tabindex="-1"><a class="header-anchor" href="#clean-code"><span>Clean code</span></a></h2><p>This book is very contextual. It influenced a different world, where people had to work in large teams and follow OOP to the letter. Now the world has largely abandoned the OOP ideals, even though technically it never really espoused the good parts.</p><p>But one telling symptom of the fact that uncle Bob&#39;s advice is not universal is the fact that not only is there no way to tell if his advice is needed, there <strong>can</strong> be no way to tell if his advice worked. It is similar to how it is impossible to tell if type systems help with safety, because the process of making something type safe, and making that very same thing safe in the regular sense of the word is done up to a point where the program is safe-enough, and parameters such as the psychiatric health of the programmers that did one or the other is ignored.</p><p>I&#39;m not saying that uncle Bob&#39;s advice is total bunk, though many on this list would say so. I&#39;m saying that his advice is situational, and the jury is out whether it&#39;s good. You may be working on a large Java code base, and thus his suggestions may be extremely useful. You may be working on that same Java code base, where writing a <code>static</code> method in a class of just static methods, i.e. a module, is going to work just as well if not better.</p><h2 id="the-anti-clean-code" tabindex="-1"><a class="header-anchor" href="#the-anti-clean-code"><span>The anti-clean-code</span></a></h2><p>This is advice that is largely a reaction to the former principles. People have noticed that over-abstraction and over-engineering, even in some simple cases can lead to confusion on behalf of the compiler. That is, it won&#39;t make your code as optimal, as it should be if all else were equal.</p><p>They tend to confuse that with the lack of value in having a code base where things are neatly and tidily organised. I&#39;m not criticising the body of work by Casey Muratori, much as I was not criticising uncle Bob. I am criticising people that apply the principles of making the thing go fast regardless of whether or not it is even sensible to do that, at the cost of making things harder to read.</p><p><strong>To be cristal clear</strong> if you&#39;re just starting out to progarm, you asbolutely should focus on making your code as simple as possible. Any abstraction that you will introduce at this point is going to constitute over-engineering, and in the <a href="https://youtu.be/tD5NrevFtbU" target="_blank" rel="noopener noreferrer">famous video</a>, Casey demonstrates that even in simple cases, applying that advice and gaining virtually no extra clarity is very much in the cards.</p><p>What that video does not say, and something that you should be keenly aware of, is that not all projects re solo projects, where you&#39;re the only one that is going to either write or read the code. You need to make sure that the code is understandable to your coworkers, and if they are the Bob Martin clean code type, you will ask them to do more work when interacting with your code. It might run faster, it might be just as slow, but the bugs in that code are going to be your sole responsibility. Sometimes you don&#39;t want that, and you definitely don&#39;t want that if you&#39;re a junior engineer in a project that hired you on someone else&#39;s recommendation. Even if you don&#39;t get fired, the productivity of the team is what&#39;s important.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>One other point to be made, is that sometimes abstractions not only don&#39;t have an associated cost, but can sometimes improve the performance of your code. This is strange, but if you pass a <code>struct</code> instead of several integers, you let the compiler optimise the layout of memory, and thus do less work at runtime. If something is a private memeber of a class, the compiler can do more things because it knows exactly all of the places where that code is going to be instantitated.</p></div><h2 id="functional" tabindex="-1"><a class="header-anchor" href="#functional"><span>Functional</span></a></h2><p>This is a somewhat touchy subject, because among my peers I&#39;m known as the &quot;functional guy&quot;, and many of my friends geek out over type systems and formal proofs and whatnot.</p><p>I will say that being a functional programmer is not an end in and of itself. One enlightening experience was when I took a close look at Rust, a programming language that I&#39;m writing a book on, and to my surprise found that it was better designed than Haskell from the perspective of correctness.</p><p>These principles work. Thinking in terms of constant immutable states, and functions as state transitions is a powerful paradigm for <em>some</em> problems. The trouble with this approach is that applying it indiscriminately, results in code that is just as unreadable as bad imperative code.</p><p>There will come a time when you will prefer this style, because of one reason or another. But until then, learning how to do the basic algorithms in Knuth&#39;s &quot;The Art of Computer Programming&quot; is probably the best that you can do.</p><h2 id="what-to-do" tabindex="-1"><a class="header-anchor" href="#what-to-do"><span>What to do</span></a></h2><p>I&#39;ve just told you not to take anyone&#39;s advice; but what <em>do you do</em>? How do you progress from here?</p><p>The first point is that you want to be as keenly aware of your specific problems. Write code, and ask people to review it. Ask them to give constructive critique. If all goes well, you will see that your code quality will naturally improve, without adhering to any declarative principles. The only people that you should listen to, are the people that you will have to listen to, because you&#39;d be working with them.</p><p>The second point is that we are talking about fundamental mathematically mandated trade-offs. Things which absolutely exist, which are debatable and very likely project-dependent. If you are not a senior engineer, and let&#39;s face it, if you&#39;re reading this, you probably aren&#39;t, then practice is going to give you a bigger leg up than any book. Go! Implement a Fibonacci heap. Implement a 2D game with pathfinding. Do it all in C or in assembly, or do it in JavaScript. Nobody will care how you do it, as long as you do it. The dialogue about how to best approach a certain problem will be, as it should be, internal.</p><p>When you are in a position in which your code needs to be reviewed by others, keep in mind that some of the advice about clean code is going to be very useful, within the context of the following values:</p><ol><li><p>Your manager needs your code to be correct. That means that if it does the right thing, even if it&#39;s much too slow, you can cover it with unit tests, and it will be good.</p></li><li><p>Your manager needs your code to only have obvious bugs. If something is much too complicated to wrap your head around and people will use your code incorrectly, it&#39;s your fault. It doesn&#39;t matter if it&#39;s over-abstracted, or under-abstracted, if it&#39;s like OpenGL or Vulkan, if the way it&#39;s arranged leads to problems, means that you need to react.</p></li><li><p>Your code needs to have good performance characteristics. More often than not this doesn&#39;t mean that you need to use some fancy techniques with custom allocators, but simple things like picking the right datastructure, doing as much work in-place as you possibly can, and making sure that you&#39;re not blocking anything. As a good example of why the latter is importnat, Emacs, the editor that I had to shelve, is perceived as slow, because it is single threaded and any complex operation (of which modern editors do many), results in a perceivable slowdown of the editor. Making your code amenable to AVX and other fancy CPU-specific architectural optimisations always comes by making sure your code is readable first. What that means is another topic, because readable within the realm of abstractions and decomposable into simple operations are two different often incompatible things.</p></li></ol><p>So in conclusion, what should you do?</p><p>Code. Make that code publicly available. Make sure that the people that you trust can review and give advice. Apply that advice, make sure that you understand it.</p><p>Move on to the next project. Code. Repeat.</p>',31)]))}const h=t(n,[["render",s],["__file","young-programmers-advice.html.vue"]]),c=JSON.parse(`{"path":"/posts/young-programmers-advice.html","title":"How to learn to program","lang":"en-GB","frontmatter":{"category":["Motivation","Work","Life"],"date":["2024-07-27T00:00:00.000Z"]},"headers":[{"level":2,"title":"Clean code","slug":"clean-code","link":"#clean-code","children":[]},{"level":2,"title":"The anti-clean-code","slug":"the-anti-clean-code","link":"#the-anti-clean-code","children":[]},{"level":2,"title":"Functional","slug":"functional","link":"#functional","children":[]},{"level":2,"title":"What to do","slug":"what-to-do","link":"#what-to-do","children":[]}],"git":{"updatedTime":1742748808000,"contributors":[{"name":"Aleksandr Petrosyan","username":"","email":"ap886@cantab.ac.uk","commits":3}],"changelog":[{"hash":"2504feacfc8e83978d0f3b7c3a3f7df06b5b48c6","time":1742748808000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Migrating articles"},{"hash":"bc5bda253540556643ed855b2cd5c7ee23c67889","time":1742747283000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[vuepress]: Initial migration"},{"hash":"e17bf279b078cd48e05dfa65ac616f5eb66feda7","time":1722075816000,"email":"ap886@cantab.ac.uk","author":"Aleksandr Petrosyan","message":"[article]: Add advice to young programmers"}]},"filePathRelative":"posts/young-programmers-advice.md","excerpt":"\\n<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">Tips</p>\\n<p>A much more detailed guide is going to be published on the Greybeard\\nblog.  So stay tuned.</p>\\n</div>\\n<p>This is a bit of a short guide, and it's required to be short for one simple reason.</p>\\n<p>There's a lot of advice there on the internet.  A lot of it is correct, but it\\ncomes with an implicit contextual limitation.  The people like Uncle Bob\\nMartin, Johnathan Blow, and perhaps Casey Muratori, are all referring to\\nprogrammers that have intrinsically different levels of experience.</p>"}`);export{h as comp,c as data};
