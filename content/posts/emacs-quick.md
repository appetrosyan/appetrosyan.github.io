+++
date = 2024-07-28
title = 'Keeping your emacs speedy'
+++
# Keeping your emacs speedy

This is a topic that came up because of three things.  The two Emacs blogs that came up on the Planet Emacs RSS feed talked about retaining a minimal configuration and keeping it minimal, providing good advice.  I don't wish to dismantle those blog entries, but merely point out that minimalism can be useful for things other than aesthetic minimalism.

A problem that nearly made me completely unproductive for the better part of a day and a half, was a serious performance regression, which I originally assumed to be due to a single bottleneck.  It actually turned out to be a complex interaction of multiple interlocking systems, which serve as a cautionary tale against having a maximalist Emacs configuration.

Case in point, my Emacs configuration is medium sized, I did not cram packages needlessly just to see how they would work, and then leave them in, and the only two packages which serve the same purpose but are different packages are `lsp-mode` and `eglot`; I left both in, because I'm using both, because they cover different grounds (topic for another post).

Simplicity in and of itself is not a great goal alone, but striving for simplicity often nets you many boons.  Simple systems are easier to maintain.  Simple systems are often easy to reason about, but not universally (see Conway's game of life).  Simple systems often do less, and thus execute tasks faster.  Finally, and most importantly for me, simpler systems tend not to have second order interactions like the one that I had.

## What was the problem

Like Columbo, I'm going to spill the beans on whodunnit.  It wasn't one package, it was several.  As is usually the case in software engineering it is a death by a thousand cuts, rather than a single bottleneck that one can easily track down.  The solution was not simple, nor was it obvious, because there were multiple ways to make Emacs faster, all of them required sacrifice of one sort or another.  I needed a thorough reexamination of what I needed Emacs to do, and had to give up something, multiple things, actually.  This prompted an inspection of my configuration, and a pruning.  Though it sounds like I came out on top, it came at the sacrifice of my favourite package: `color-identifiers-mode`.

Let's get into specifics.  The problem was that whenever I had opened a `rust-ts-mode` buffer, I had experienced severe delays.  Sometimes, the responses would be recorded immediately, and sometimes, I had to anticipate what the buffer was going to show and react assuming that my keystrokes were queued, and not ignored.  This was not a situation in which I started, but it was a situation in which I would inevitably end up.

The first culprit was of-course `lsp-mode`, which, let's face it, is not as asynchronous as it should be for the amount of work that it does.  Further, while I no longer use `lsp-ui-mode` I still had code lenses and inlay hints enabled, and those could potentially add up to significant latency peaks.  Turns out disabling them did nothing, or rather did not result in a tenable peak latency.  I still had what I would qualify as hard lockups, though their duration was shorter.

So, I tried disabling `lsp-mode` entirely, and half-expecting that to fix the issue.  It did not.  I tried timing `rust-analyzer`, it did not give much insight.

## Is this a bug hunt?

I needed to know what was the culprit, and I half-expected this to be the GC, despite me running an experimental build with a JSON parser that produced less garbage.  The initial attempt was to use the built-in CPU profiler.  The way it works is you enable the mode with `profiler-start`, and then you do what you do normally.  After that point, you call `profiler-stop` to stop the recording, and `profiler-report` to view a tree-like representation of the samples.  Fortunately for us, Emacs does a lot of heavy lifting, it tracks not only the enclosing scope, but also the entire call stack, meaning that you have a detailed breakdown of when the profiler found a problem in `my-expensive-function`, which was called from `my-innocuous-function` and thereby resolving the problem.

I did not find a satisfactory answer, but I did find a reliable metric.  The reason my Emacs was slow, was because it was calling `redisplay` far too often.  This is a design oversight that was inherited probably all the way from TECO, and was largely a symptom of a bug.  What was causing `redisplay` to be called could not be tracked, because the mechanism is not that a specific function calls `redisplay`, but rather the decision to call `redisplay` is determined via a complex set of rules.  Simply put, the profiler did not know what the inputs would lead to a reduction, just what mechanism was responsible for the delay.

I gave up and asked the excellent Emacs group, when I was suggested to use this package [bug-hunter](https://elpa.gnu.org/packages/bug-hunter.html), which I had hoped, had sophisticated heuristics to catch the problem.  It did not, but given what I know now, it would have pointed at a false-positive.  After all, a performance degradation of a three second lockup, can be the result of one package, but most likely the result of several.

So..  I ran it, and it gave me nothing.  Specifically, my `init` file is a small interface to five separate elisp files that are `require`'d in the `init.el`.  As I discovered, `bug-hunter` disabled those entire configuration modules, which couldn't have narrowed down the problem, because the problematic packages were in different categories.

I found by doing a manual binary search, starting from `emacs -q` and ending in a detailed investigation of every category that no single package was responsible for the slowdown.  Though I found that a few packages if disabled, impacted the performance significantly.

I had almost given up.  There was no single bottleneck, no single package I could disable,

## Premature optimisation

The title will make sense in a minute.

For the moment, recall an oft-cited (and usually out of context), quote by Donald Knuth.  The part that is often reported is just this:

> premature optimisation is the root of all evil (or at least most of it) in programming.

Note that the quote starts with a lowercase letter, and has a parenthetical remark.

The real quote, something which is universal, and far more useful in our case is the full excerpt:

> The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times;

followed by the previous.  Indeed, the excerpt itself is preceded by a discussion which in my opinion is even more educational, but I will not cite, but rather paraphrase.

Most people's intuitions about optimisations are just that, intuitions often including the faulty premise: there's one single magical bottleneck that, if removed, results in a magical maximal speedup.  These intuitions often result in a considerable amount of wasted effort, not just by the carrier of the intuitive misconception, thus more dangerous in groups and if backed by considerable experience.

The main issue is, of course that this is just utterly unscientific, and until one can reliably measure the performance, one cannot, and should not worry about efficiency, because what they consider the hot path, might be not so hot after all, and the performance might be dominated by the complexity of loading and storing the program chunks, and cache misses, more than, for example, using a $O(\log n)$ algorithm over a quadratic one.  The sad reality is that often the overall performance of a program, does not come down to specific hot-spots, but can be affected by the architecture, control flow, cache locality, and the fact that the PDP-11-esque linear execution model of a register virtual machine is not how actual CPUs work, and hasn't been for a rather long time.  You can have a good rough estimate of the maximum performance gain in a specific scenario _if_ you have a consistent way of measuring the performance.  And even then, this approach is less of a guide on how to prioritise optimisations, but more a way to prove how efficient certain optimisations were _post-factum_.

Knuth tells us to be honest with ourselves, and provide as scientific of a basis for our reasoning.  Don't just optimise, prove that this is significant, before you pour even more work into optimising that particular function.

## Solution -- minimalism

In my case, I did not have anything other than my own perception, a vague notion of "more `redisplay` calls results in longer lag", and not much else.  I know that under some circumstances a package can trigger a redisplay, but those conditions are opaque to me.

Instead, as someone who typically bashes minimalists for throwing away too much in service of too little, I bit the bullet and did what a minimalist would do.

I used `neovim`.

OK, not quite, I did have to use it to do some editing because the editor was not very quick and I needed some actual work done, so technically I did use it, but that's a _joke_.

What I did, was I applied a triage rule of getting rid of a package if

###  I couldn't remember what it did

There were a lot more of those than I'd like to admit, including `highlight-defined`, `docker`, `buffer-name-relative` and a few others.  I `:disabled` them, instead of removing, for the time being, as some actually turned out to be useful packages that I forgot about.

###  It provided functions for situations that have stopped occurring

`elmacro` ended up being the best example; I ceased to use macros, and I definitely ceased using them to solve problems where I'd need to `defun` something new.  `forge`, despite potentially removing the need for the GitHub web UI, does not and will not have feature parity, meaning that I will always have to use the Web UI.  `yasnippet` I thought I could remove, but it ended up being a soft dependency for `lsp-mode`, because some code actions, inexplicably rely on `yasnippet` and not on one of Emacs' built-ins.  `simple-httpd` is something that I've practically never used.  `crdt` I've kept, but will likely axe at some point, it doesn't do all I need.  `helpful` I was sad about, but had to let go; while it does really help during elisp development, I can enable it there and then, and disable afterwards, while the built-in help is good-enough for day-to-day tasks.  `electric-operator` ended up hurting more than helping, as did `aggressive-indent`.  `string-inflection` doesn't slow the startup too much, but the `M-u` for uppercase, `M-c` for capitalise are faster than the transient I built.  I kinda hope that with the multi-generational GC it would be more viable, but the problem doesn't seem to be the GC with that.  `expreg` was marginal, it very nearly got axed.  `multiple-cursors` I found didn't exactly help with day-to-day activities.  Specifically, they sound like a great idea, until you realise that you only need rectangles (built-in and better), and `lsp-mode` provided functions such as renaming an identifier.  Sure, you sometimes need something faster and more blunt, but that's what `M-%` is.  `drag-stuff` was a painful admission.  I wanted to use it more, but it ended up dragging everything down.


### It did something I could do with built-ins

The first thing I thought I'd throw out was `lsp-mode`.  I didn't and there will be an article explaining why.

I did, though, consider `smartparens` to not be one such package, and ended up throwing it out.  Here's why.

I read "Mastering Emacs", which provided some insights into the built-ins, ones for which the built-in tutorial was a horrible advocate.  Instead, I found that I started to use `C-M-SPC` more, that I used `C-M-u` and `C-M-d` and didn't exactly need the functions that I thought I needed.  Sure I couldn't `expreg` into backticks, but I didn't need to.  It was more keystrokes, but it was muscle memory.

Additionally I found that `smarparens` was slowing me down.  It didn't exactly mark delimiters correctly either.  And the reason why I got it in the first place, the ability to "smartly" insert parentheses is something that I've grown to hate.

I'm also considering getting rid of `consult` and `vertico`.  There are good reasons not to, but I found that the arguments pro are wearing thin.  Specifically, that the built-ins are built-in, already loaded, and have the potential to be optimised later.  Neither `consult` nor `vertico` are.  They rely on the built-ins heavily, but they offer too little.  Helm is something that offers more, but costs more.  For my older workflow Helm made more sense, but not anymore.  The one place I still find `consult` useful is with its grep integration modes, but those are not as good as I'd like them to be, and not as good as telescope in `neovim`.

In line withe these packages is yet another shift in paradigm.  When I started using Emacs, I was trying to replicate the IntelliJ experience as much as possible.  I was saddened that there were no refactoring tools back then, but I made use of autocompletion heavily.  I liked the small menu that popped up, whenever I was typing something.

However, my approach to programming has changed.  I prefer to know libraries and read their documentation, not relying on "intellisense", but on the LLM built into my head.  As a direct consequence of this, my style has shifted from someone who reacted to suggestions, to someone who really needed to complete the first unique candidate `bash`-style.  For things  which are buffer-local, `dabbrev` does a good enough job that I can't imagine my life without it.  I'm told that `hippie-expand` is better.  I don't care, it gets  the job done within two keystrokes.

`company`, `autocomplete` are just packages I no longer have the use for.  I tried reconfiguring them to be useful with LSP, but I found that if I use a new Rust crate, it is better to have `crates.io` and `docs.rs` opened, so that I explore the API in a curated guided way, rather than based on the assumption that the author of that library is within the 1% of people that can come up with good names.  It's just that simple.

Now there are situations in which a library is poorly documented, and you do really need to explore the types available therein.  I don't want to wait for the program to automatically trigger (and most likely not to trigger), a menu from which I'd linearly choose.  I found that the situations where I want a menu are few, and proactive.  It used to be that `consult-company` was a good option for that, because it could potentially reduce the repetitiveness of input, in cases where you don't exactly know the name of a specific function.  Now for these rare situations, there's a convenient keybinding: `C-M-i`.  On Vanilla Emacs, that brings up a nice menu, and lets you choose.  The model interaction in typical Emacs fashion is both not what you expect, but also much better than the status quo.  I just didn't need it.

Finally, there's `yasnippet` about which I'm of two opinions.  On the one hand, it is a well-defined snippet language that I have been using effectively to accelerate the amount of structured input that I could do in a unit of time.  It didn't exactly make me more productive, just less error prone in repetitive tasks, and more inclined to program the editor.  The problem, is that of course `yasnippet` doesn't abide by creating a `defun` with Elisp, but rather its own domain-specific language, that while good, doesn't teach you much about Emacs.  I've taken the stance that I'd like to do functions instead, but the trouble there, is that I'd need to sacrifice a keybinding.  Being able to trigger a transformation based on "text XXXYYYZZZ is behind the point" is powerful and no other package has provided me with a similar experience.  I tried all of the other Emacs templating engines and begrudgingly came back to `yas`, because it's just so appealing.  In fact, the only thing that came close (but depended on `yasnippet` optionally) was `auto-activating-snippets`, which I like mainly because I can use it to correct common misspellings, and a single spaced full stop into a double spaced one.  Although to be fair, in both cases, I would be better off just learning how to type more accurately, and making the `full-stop` `SPACE` `SPACE` a muscle memory.  `aas` would result in a considerable slowdown, because it generates extra 
memory garbage for each keypress and I do a lot of typing.

## Conclusion

All of this minimalism made me realise as well, how little of Emacs actually has to do with the packages.  I did not originally consider it a possibility to use something like Linus Torvalds' fork of Emacs, but now I think I'd be fine.  I hate to admit it, but this is both an indication of how viable the Emacs paradigm is, but also how one could blueprint a comfortable-enough environment without attachment to Elisp.

I'm optimistic about trying to experiment on my own.  I did not hate `neovim`, but I believe I can avoid some of its shortcomings, and create an editor that is better than both Emacs and NeoVim.  Notice I didn't say text editor, but more a general purpose programming editor.


