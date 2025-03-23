# Language servers in Emacs

In this post I will try to summarise my experience with all things LSP (language server protocol).  I will talk primarily about the two most important implementations of LSP for Emacs: `eglot` that is built into Emacs, and `lsp-mode` that seems to be much more feature complete.

I will delve into the pros and cons of both, explain why I use both as daily drivers and why I prefer to not have them be enabled by default for any mode, and what to do if you don't like the idea of LSP.

## Language Server Protocol

The language server protocol is a protocol of communication between an editor of your choosing, and a language server, the actual program that handles the "heavy lifting" of parsing and language-specific manipulations, such as refactoring and renaming and a few other things that are specified as protocol extensions, such as expansion of macros running unit tests if they are defined in-line as in _e.g._ Java, and Rust.

It was first touted as a grand shift in paradigm.  While I will not doubt its utility, hence the existence of this article altogether, I will say that I do not consider it to be as revolutionary an idea as Microsoft, the creator of this protocol would have you believe.  It is a useful tool; it's not a must-have like many of the Emacs built-ins _e.g._ `dabbrev`, not a vast improvement to quality of life like _e.g._ `eldoc` or `corfu` or `jinx`, but nonetheless a tool I occasionally use.

So, how does it work?  Because Visual Studio Code is an editor that is built largely on browser technology, the main mode of interaction is via a JSON remote-procedure-call architecture.  This usually means that the server has JSON-encoded plain-text messages sent and received.  While one could control the server manually with a tool like `curl`, Emacs' `eglot` handles management of both starting and keeping the language server up to date.  Because of the fact that JSON is a ubiquitous format with abundant tooling, extending the language server plugin is also not as difficult as it could have been otherwise.  This usually means that the language server plugins, like _e.g._ `lsp-mode` and `eglot` get updates quickly.

What the language server allows you to do, is largely individually determined by the specific use case and the specific language server.

For example, Rust is a language that relies on tooling quite heavily, many things must adhere to strict rules, and code is verbose.  Having `eglot` automatically enabled for Rust is useful.

(TODO) Figure, how Rust is used.

Python can benefit from LSP, largely by providing documentation, auto-completion, and refactoring.  But it also benefits from a minimalist approach, which programmers naturally fall into if they do not have an active LSP.

Finally, languages like LaTeX, though they provide a language server, are of a drastically different kind and therefore benefit minimally if at all.

The quality of language servers also varies.  Some "production-ready" servers do not have support for rudimentary refactoring operations such as renaming.  The Rust language server:  `rust-analyzer` consumes much memory, and is often in need of an expensive indexing operation at the beginning of its operation.  It is controversial, but I have found that these language servers can occasionally produce invalid code.  The nature of their operations, though, thankfully prevents those changes from being irreversible, as it is almost a requirement for them to have the files that they touch be open in your text editor.

## Eglot and where it shines

I have done a small challenge, where aside from my colour theme, and a few visibility packages, such as (`color-identifiers-mode`), I had used unmodified Emacs for a period of no less than two months.  Predictably this was much easier I had anticipated, because for every function that I accomplish with a package, there is at least one built-in that does the same, and largely better.  The Emacs LSP support is one of those built-ins and by default requires minimal configuration on the Emacs side of things.

If you want to enable a language server to handle your buffer, all you need is to `M-x eglot`.  Most fancy features can be enabled via `M-x customize`, but I rarely need anything more than type hints for Rust, and even then, sometimes they are more trouble than their worth in terms of readability.

Eglot is rather minimal package.  By itself and without any modifications to the minibuffer: the small area where you interact with the editor, it offers an interface that is a tad outdated: one would have to cycle through their options one by one, without seeing if the one they want is listed, and unless the minibuffer is configured to accept fuzzy-finding the candidate, you are even more likely to have to just pick and choose from an invisible list.  This is by no means an indictment of `eglot`, merely a signal of how it is meant to be used.

The Emacs polyGLOT package is specifically designed to fit into a complex ecosystem of packages.  It does so, by providing a sane usage of the basic APIs, which makes it compatible with most if not all minibuffer enhancers: such as `vertico`, `helm` and to some extent the built-in `fido-mode`.  The same is true of auto-completion; `eglot` expects you to have installed something like `company`, `corfu`, and maybe to have mastered the usage of `C-M-i`.  You as the user are given the ultimate choice, but are expected to know your preferences.

The result is that `eglot` occasionally feels like it is not as feature complete, despite the amount of work that has been poured into it.  Joao Tavora, the person behind `eglot` and a few other of my mainstay packages, is also reluctant to implement features and the package as a whole has received a modest amount of code contributions.  This might seem like a scathing critique of `eglot`, but for anyone who has used Emacs for any length of time it would be a glowing endorsement.

It is true that the upstream `eglot` would not implement protocol extensions.  It is also true that `eglot-x` does, and is mentioned in the README of `eglot`.  It is true that `eglot` has not seen many code changes in over a year as of writing.  Which usually means that there hadn't been frivolous code changes that add nothing, and make sure that you also have to do work repeatedly.  It is also eminently true that some ideas such as allowing the LSP to handle the parsing of source code was not accepted.  The upshot is that it is a feature that for Emacs would be supremely problematic for no apparent gain, given `tree-sitter` and the abundance of modes that support it.

## Interlude: technological challenges

At this point you might be tempted to ask if there are any technological challenges associated to using any of the LSPs with Emacs.  The unfortunate truth of the matter is that there are huge problems that are hard to fix, which are nonetheless something that causes only minor inconvenience to the user.

The main problem is that the lisp machine that is Emacs has a different programming paradigm to most modern programming languages.  A lot of the time, you expect the state change to be the primary effect.  `forward-word` doesn't return the location of the next word if called-non-interactively, it moves the point forward by one word.  This complicates things as regards to how asynchronous programming is to be handled.  The amount of state that you would have to carry over in order to ensure correct operation of your function in a separate process is huge.

On a similar note, one usually has to deal with a rather outdated simple garbage collector.  Make no mistake, these are intentional architectural decisions which were made early on with the intention of creating a sane computational platform, and without being able to anticipate where the hardware was going.  If we kept on doubling the clock frequency as we thought we would up until the late 2000s, none of these decisions would even be a blip on the radar.  The GC being simple would be praised, as it would keep the Emacs program itself eminently reliable and free of memory errors.  And being synchronous would be praised because it would prevent a whole class of bugs, that I'm sure anyone who has done `async` Rust or `asyncio` in Python will attest to, are not fun to debug.

This is particularly important because of one thing: the LSP communication requires a lot of Emacs lisp to run.  This produces much garbage that in turn needs to be collected.  Unfortunately, setting the collection thresholds higher can only stave off the symptoms momentarily.  This is something that used to be recommended, but also something which can result in your system being prone to lockups at the worst conceivable times, _e.g._ when writing code.  Setting lower thresholds results in shorter delays but more frequent freezes, which given that almost every operation that involves LSP deals with a large amount of data being communicated both ways, one can't help but notice frequent hitching.

This is not normally a problem, but if I have a dramatic slowdown, disabling the LSP is the first thing that I do.  It doesn't always help, and it isn't always LSP's fault, but one cannot help but feel a force of habit.  Moreover, this is one of the main reasons why some (arguably) sensible features get left out of packages such as `eglot`.  Recall that the language server specification actually allows the server to [handle syntax highlighting](https://github.com/joaotavora/eglot/issues/615).  This is a rather sensible thing to do, if one assumes that processing JSON happens faster than parsing the file itself.  The main problem is that in Emacs, due to the fact that you can't simply `eval` the result and produce a lot of memory allocations that need to be freed subsequently, `eglot` would slow the user down quite significantly.

Obviously these technological challenges are largely addressable.  They hold back some developments for a time, but eventually most technological developments make it into Emacs.

## LSP-mode

The `lsp-mode` is the package that with a few tweaks could have been the new built-in.  It is a different and in my opinion much more complex approach to LSP.  The upshot is that it replicates the look and feel of mainstream code editors such as the Jet-Brains family, the Electron code editors, sublime text and something to which `neovim` also gravitates.

Simply put, `lsp-mode` has abundant documentation, it is well regarded in developer circles, it offers a wider feature coverage, and often results in a more streamlined experience for the user.  It is also, as of writing the only one-click route to code lenses and being able to run a unit test from the comfort of your text editor.

It comes with in-line diagnostics if you enable `lsp-ui`.  It comes with debug adapter protocol, which is supremely useful in some areas.  It comes with a wider coverage of protocol extensions, such as the ability to expand Rust macros without any further packages needing installation.

From a purely on-paper perspective, `lsp-mode` is a direct upgrade to `eglot`.  For some that is true, but I find myself in the unenviable position of not liking it all that much.

My first point is that while `lsp-mode` _attempts_ to bring Emacs to the standards of the modern editors, a lot of the design decisions in Emacs provide better alternatives with a higher skill ceiling.  Specifically, I quite like that we do not have pervasive tabs and file-system trees.  Emacs allows you to create those UI elements, but opts you out of them by default, because one does not need them.  If I want to switch to a file that is already open in Emacs, I do `C-x b`, and that gives me indexed search.  If I want to open another file, I use `C-x C-f`, which even with built-ins like `fido-mode` offers enough detail to be just as effective as a tree.

The same is true of diagnostics provided by the LSP, `eglot` sensibly assumes that you either have the built-in `flymake` that forces you to write `;;; init.el ends here` for every elisp file you created, or `flycheck` that for a time offered a better coverage of diagnostics without the language server protocol.  By contrast, `lsp-mode` assumes that you would want some things to be handled hassle-free and don't like the built-ins; it will opt you into `company`, `yasnippet` (which is incidentally maintained by Joao) among a few others.

Much of my coding relies on `dabbrev`.  A lot of the time, I can complete an entire identifier in one or two keystrokes and not have to worry about typos.  Company usually interferes with that.  The few times I actually need the `lsp-mode` plugin to do the work, and list the contents of a namespace, be it a Rust or Python module, a C++ namespace, or any some such, `company` fails to produce anything.  This is not an attack on `company` specifically, by the way, `corfu` a package that offers similar functionality, while different is still something I don't typically use.  The built-in `C-M-i` handles the few cases where I need to use the LSP to traverse a namespace and import a function or method or structure.  And the fact that it offers the _entire_ list as a separate buffer, quite neatly dovetails into how the rest of Emacs works.

It is not, however, completely without advantage.  I do keep it in my `packages.el`, and there are good reasons for that.  Firstly, `lsp-mode` is much more configurable, and actively developed.  This means that occasionally you will find features that are either exclusive, or much easier to work with in `lsp-mode` and not in `eglot`.  Things  like `inlay-hints` that are providing the type annotations are more granular in `lsp-mode`.  The same applies to completions, and while I have made it sound like it opting you into `company` is a huge deal, I found it easy enough to disable and it simply contributes to the bulk of the configuration file, not necessarily mucking it up.

Another important aspect of `lsp-mode` is its support for debuggers.  I am primarily programming in Rust.  Due to the way in which this programming language is designed, debuggers are both harder to properly set up, and add significantly less value.  Most of their added value can be obtained through judicious use of logging, types and unit tests.  The fact that you are _not able_ to drop into `gdb` and step through your program, means that you will leave those diagnostics in, and that your program, if it fails in production, will be much easier to reason about.  In effect, using a debugger in Rust-based network programming is a disadvantage.  I also write a considerable amount of C++ and there being able to `gdb` into your program is a godsend.  If your tests fail, being able to understand what's going on is useful too.  While it is definitely possible to expand macros with `eglot-x` for Rust, I find it quite easier to do the same in `lsp-mode`.

Another nice-to-have is the integrations that `lsp-mode` provides.  Simply put, there are quite a lot more of them, despite the fact that the API is more "downstream".  For example, `lsp-treemacs` solves a problem that on `eglot` I find a bit daunting: the fact that if you make a change in one file, what is broken might be in several other files all across your project.  With `lsp-treemacs`, I simply have a persistent buffer that does things to make it easier for me to find bugs.  It's not like I don't have options outside of it, but I do have a considerable amount of difficulty navigating without it.

## NoLSP

This is the point where one would normally get into a conclusion-like section stating that the two approaches have their own strengths and weaknesses and that you should self-identify and figure out what you want to be using.

I find that this is a rather limiting perspective.  Firstly, you can have both installed.  Secondly, despite Microsoft's insistence that their tool does the best job, I found that to be rather untrue.

The language servers, while a useful tool, are not always the best tool for the job, and one should not overly rely on them.  So in this section I shall try to elaborate, and explain what I do for tasks to which you would normally delegate to the LSP.

### Go to definition

This is perhaps the single largest reason to use an LSP plugin.  It is also one that I tend to go around.  Simply put, `rust-analyzer` is not at all good at finding definitions.  Sometimes, it gets out of sync with your editor, and you have to restart the server and re-index in order to find the definition for a function.  I simply found that catching the error and delegating to `dumb-jump` in a language without function overloading does the job really well.  Often I don't even bother with restarting the server or using `M-.` to use the `xref` built-ins, but rather use `git-grep` which with the help of `vertico` can give me even more insight.

The only place I have found the `lsp-mode` based jump to be more accurate is also a case which is handled particularly well with tags.  In fact, I found tags to be the preferred path for languages that support them well (not Rust, but `dumb-jump` is accurate-enough, so not a problem).  The reason is simple: `rust-analyzer` doesn't persist the tag information to disk, and needs to re-index every time you start the server.  Until the initialisation process is complete, at least on Emacs, I have no option but to wait.  With tags, the process is almost instantaneous.

### Rename

This may be a controversial topic, but how LSP handles renaming is not quite what is needed.  I often found that if a project is well-documented, you don't just want to rename the one place in the source code that it is mentioned.  The `projectile` package offers a neat way to update all names at once, and given that it is regular-expression based and not sub-string based as most code editors, the number one problem of renaming that way: the fact that you can accidentally rename a sub-string of an unrelated entity, is handled gracefully.  Note, that if you _do_ want to change the name of the sub-string as well, you _can_.

I also found that `lsp-rename` and `eglot-rename` are often inaccurate.  They may refuse to rename an entity citing that there is `no identifier at point`, which you can clearly see is untrue.  Restarting the server entails more work, that can simply be avoided if you are comfortable with `projectile`.  And you should be.

As a final note, the fact that renaming an entity is a bit more involved than just calling `lsp-rename` tends to ward off frivolous renaming.  If you open a pull (merge) request, there are going to be multiple one-line changes for renaming a single entity.  These can easily be confused with using the same instance of an overloaded function.  It can cause unnecessary fatigue on the reader.  If something is poorly named, renaming is potentially an ABI and API breaking change.


### Extract function

I will say this once and say this in a way that tries to offend as many people as it needs to.  You should extract functions manually.  If the only reason that you are extracting a function is because your linter is complaining about the thing being hard to read, there are alternatives to extracting a function with a meaningless name that are preferred in my opinion.

There had been a [long post by](http://number-none.com/blow/blog/programming/2014/09/26/carmack-on-inlined-code.html) John Carmack that specifically addressed the question of factoring a large state change into smaller functions, is not worth it in most instances.  The dis-aggregation (longer post on this in the works), does not necessarily have to happen at the function level.  Compound scoped modifications are largely supported by modern languages, and are often _just as_, if not _more_ effective at dis-aggregating a complex set of state transitions in imperative languages.  The few cases where they are not, patterns such as type-state offer a bigger benefit.

The problem with refactoring in general is that it is largely done for the benefit of other programmers.  With the exception of large language models, no automatic method of refactoring I found particularly useful.  In most cases complex state transitions should remain complex, and warn the user that there is a large chunk of work that needs to be done quickly and sequentially.  Hiding this information does not lead to a better understanding of the code, but to a tough-to-break illusion of simplicity.

### Generic refactoring

On the note of LLMs, while I do not necessarily find them all that useful for generating code, I do think that they are surprisingly good at rewriting it.  My personal set up does not involve either Co-pilot, or ChatGPT.  For my benefit, I have a 7900xt that with a properly patched `ollama` is capable of running things like `codestral` quite effectively and with reasonable speeds.  Its code almost always has to be double-checked, because when you ask it to generate _e.g._ an `impl` block for a particular structure, it might actually re-define it, or maybe add a `derive` on top.  You might think that `rust-analyzer` offers a vastly superior experience; that it would never generate code that wouldn't compile, or that it can't possibly mess up another section of the code that has no relation to what you asked it to do, or that indeed, at least it would do it much more quickly.  I suppose you should be able to infer the capabilities of LSP as opposed to LLM.


### Snippets

One thing to keep in mind is that if you are doing a common task that needs to be syntax-aware, and you cannot afford to waste time with LLMs, you could make use of `yasnippet` to do just the same.  I have found it to be useful for generating `mod test` blocks, and `#[test] fn test_case()` functions.  It can be made to adhere to specific variables, and if need be, compiled down to a function that is then made available.  Furthermore, with the introduction of `tree-sitter`, I have found that it is possible to extend the native Emacs capabilities with scope-awareness.  For the time being, these are prototypes and largely for just one programming language: Rust.  But I can foresee that proper extensions to major modes, even as separate packages that make use of the wonderful capabilities that Emacs offers can be _just as_ if not _significantly more_ effective than LSP plugins.

Simply put the amount of work that it would take me to write a few lines of Elisp is nothing in comparison to the amount of work and reviewing that I would have to do for a small change to be added to an LSP such as `rust-analyzer`.

### Inlay hints

This is a controversial point, because I don't exactly have a direct analogue to inlay hints.  And I must also admit that there are cases where they are genuinely irreplaceable.


What I do propose is a different approach to finding out the type of something.  As I alluded to earlier, there is a capability in Emacs to be able to read the entire buffer.  This is a sketch of a function, that in reality is way too ugly to be published, and not used all that often, but could in principle do just as much as the built-in LSP.

In _e.g._ Rust, there must be a declaration of a type in order for it to be used.  That means that I must look into a limited number of places, nothing is implicitly imported, no variable in a function can be other than an upper-case constant, a lower-case `let` binding or a function argument.  There are subtleties related to pattern matching as well, but for the time being, let us consider them part of the argument family.  I can simply find the binding, automatically or otherwise, and go to its definition.  In most cases if something is bound from a function call in a `match` the type is already shown in the prefix.  If something is bound in `let`, it's a similar story.  As a final resort, if your code relies a lot on you knowing what type something is, you can always rely on explicit type annotations.

What is eminently more clear if you have done a bit of Rust programming, is that many of the commonly used type names are not well-thought-out.  Conisder how many times you had to `use library::Error`.  The inlay hints, definitely those provided by `eglot`, and those that `lsp-mode` provides by default, more often than not, only provide you with the final segment of the fully qualified name.  In case of `Error` this provides you next to no useful information.

The limitations are of course, in relation to stream operations and chained method calls much more common in Rust than in any other C-like curly braced language, with the possible exception of Java.

### Diagnostics

This is a rather touchy subject.  This is  applicable to Rust, but I can foresee how it would be a problem for another language.  Simply put `M-x compile` with `cargo check --workspace` provides you with a lot more freedom than any LSP can dream of.  You get a buffer that enumerates all of the problems, easy keyboard navigation that is often extremely accurate.  You do not need, _anything_ else.  If a diagnostic tool reports their errors the same way `rustc` does, (and it should), one can have a lot of instrumentation.  For lints, for example one can add tooling to check for the explanation as to why that lint even exists, when it was added, and how to deal with it.  It might not show up as a suggestion in `rustc`, which would also enable you to fix it with `cargo <command> --fix`, but it would, at least in principle, provide you with a more holistic understanding of the diagnostic at point.

While I have found that `flymake` with `eglot` works well for single file projects and causes a bit of headache when a project is larger, and remedied most of the problems of tracking down every single thing that is wrong with using `lsp-treemacs` for the diagnostics, the question of having a good explanation remains open.  Most language servers do not provide much of an explanation other than a few lines of code.  Rust, due to the borrow checker being rather complex had to provide good error messages for everything.  Most tools and most language servers did not have that problem, and often in languages like `go`, a simple error is good-enough.

However, I often fall back to using `cargo check` and `python main.py` for checking for errors.  It's often also the case that a complex set of SFINAE diagnostics can only be parsed in the form in which it is generated by _e.g._ `gcc`.  Frustrating, but we do not have a good way of either reporting diagnostics via LSP, nor a good way of presenting them in the editor.

### Specialised extensions

In some situations in _e.g._ Rust, it is quite convenient to be able to tell what code is being generated by which macro.  Macros and `derive` statements are a wonderful way of obscuring what is happening, and I often found myself wishing increasingly grotesque and amusing fates to the authors of implementations generated by declarative macros.  As a consequence, I have found it to be sublimely effective to make use of `cargo expand`.  Usage of such tools is nothing new, but the main issue with it, just like with every major package produced by Mr Tolnay, is that the user experience can be classified as complete dog faeces.

Being able to place one's point at a pesky `impl_<trait_x>!` and see what it expands to is one area where I think the benefits of LSP outweigh the drawbacks.


## Honourable mention: Lisps

The situation with lisps is radically different than that of other languages.  I am not a lisp programmer.  For this comparison, made by popular request, I had to start my own adventure with lisps other than the one built into Emacs, and I must say that this is probably the best counter-point to language servers.

Simply put, `sly`, `slime` and the built-in Emacs Lisp support is outstanding compared to what you have in the form of LSP.

Emacs lisp will force you to use the right tools, it will complain about not having lexical binding, warn you about the fact that your variables might not be bound, so you might think that it'd work, but it might not always.  It knows about the subtlety of language, it will complain about the fact that you are describing a function as if it were an object, and tell you to "use the imperative mood, you silly".  Outside of nitpicking, the built-in completion works well.  You have a REPL at your fingertips: there's always `M-x` for interactive functions, but I find myself leaning onto `M-:` more and more these days.

The amount of stuff that LSP can't do, when put head to head with the most well-worn path in Emacs is astounding.  True, Emacs lisp is a bit old-fashioned, and not nearly as friendly for concurrency as one might hope, but the sheer fact that people using one obscure single editor managed to pull off a gargantuan project like `org-mode` within Emacs lisp is a good indicator of a full integrated development experience.

<details>
<summary>Me and Lisps</summary>
Put simply, developing in Elisp within Emacs is a joy.  The amount of insight that Emacs can provide is astounding, and I'll be honest, the main reason that I'm not as proficient in any other lisp, is that I'd rather have this out-of-the-box, well-integrated experience, than have a potentially better language with tooling that I'd have to set up.

Besides, I'm not lucky enough to a job in lisp.  Most of what I do is good old-fashioned Python and Rust, (the joke is intentional, Lisp is one of the oldest families of high-level languages second only to FORTRAN).  I do not write lisp for a living and as much as I'd like to, finding a job like that will entail a significant pay-cut.
</details>

With Emacs lisp, one other convenience that is often overlooked, is the minimal amount of garbage that is being produced by all of this.  True, some of this might be addressed by the new garbage collection proposal, _if_ it is merged into upstream Emacs.  However, one should take note of the fact that the LSP standard was not something that is in principle, unique.

One could, if one were to so choose, extend the protocol by allowing alternative communication methods.  For example, if the client-server architecture were retained, but instead of sending JSON, the communication were to be done in _symbolic expressions_, the amount of garbage, and thus responsiveness of Emacs under these circumstances would be improved.  

## Faster LSP

Another avenue that has been explored, is building an [`lsp-bridge`](https://github.com/manateelazycat/lsp-bridge).  The idea, that is available as a standalone package, is to have a separate sub-process that isn't Emacs, that translates without much garbage the thing received from the LSP, into something that Emacs can grok.

Unfortunately, the doing almost nothing fast is not a compelling package.  The main issue I found with using `lsp-bridge` is that it is a separate editor built on top of Emacs.  It has the dreaded JSON file as a configuration, requires you to have another Python subprocess to run, and if anything, cuts you off from `capf`, almost every function in `lsp-bridge` is a custom function that does not integrate with any other package, much less anything built-in.

I already find the improvement to the UX of Emacs from LSP to be minimal.  Would I trade a slightly faster response time for a significantly worse experience?

What I find frustrating about this approach is that it solves a problem that is better solved upstream.  Instead of simply creating an ad-hoc solution to "JSON generates a lot of garbage" problem, or better yet, use a native binding mode that does not rely on JSON as an intermediary, Emacs could have a simple library that could parse a lot of this and make Emacs suitable to be run as a regular web server (or rather _more_ suitable than it already is).

Unfortunately (or fortunately, depending on your perspective), this project is nothing if not hard to obtain and hard to work with.  It is not present on MELPA.  It exists, it's there and the link to it in this article is as much of an endorsement I'm going to give it.


## Conclusion

Simply put the language servers are just another tool.  They have a large benefit in terms of developments happening to language servers being transferable across editors.  This is a benefit that largely is irrelevant for Emacs.  It is almost never the case that some fancy new, freely available tool is made for another text editor and Emacs is permanently left in the dust.  It is quite the opposite, I have found, because writing a few lines of Elisp for a new language to get most things working is much easier than designing a language server.

The quality of language servers is another matter entirely, something I chose not to touch, and largely focus on one language whose language server I know well.  This is because while I have pointed out a few problems with `rust-analyzer` it is largely a complete program that implements the desired behaviour accurately and completely.  I do not wish to tarnish the conclusion of this article by being negative with respect to other language servers.

This is not a guide as to how to use a language server, that will come in a later article.  It is merely an opinion and critical piece on the two major implementations of the language server protocol.
