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


