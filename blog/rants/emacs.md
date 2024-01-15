Ŋ# Emacs, the editor for the ages

This is a blog post dedicated to my, and many other people's favourite text editor. In-keeping with the theme of this section, I shall mainly focus on the misunderstood nature of the editor, and my personal connection to it. Most of it is going to be in the negative light, so it slightly edges out being posted in the Software section.

Without further ado.

## About me

I feel like a hostage.
This is not something that I can ... for lack of a better word admit to lightly.
Emacs is a tool that I've invested into heavily.
The problem is however that I have some long-standing pain points that I hope can someday be addressed.

Fortunately to the faithful of the church of St. Ignucius, this is not going to change what environment I will daily drive.
I shall not switch away from Emacs, that's kinda the point.
But in this document I shall attempt to ilucidate why I chose to use it, why it's a somewhat unhappy marriage, and what I'd like to change to the extent of my ability.

So without further ado.

# What Emacs is

## Emacs _is_ an editor

So what is this mysterious editor? Or should I say operating system!

Well, to be quite honest, I would probably disagree with both assessments.
Hell, I have some notes on calling it an emacs lisp interpreter, especially on the `nativecomp` branch.

I should perhaps qualify what Emacs *is* first, though.
Emacs is swiss army knife.
It's main purpose is acting as a text editor, hence the name: Editor MACroS. But it has other functions, which are, in true swiss army knife fashion, there if you need them, but actually not at all great.
One would think that this makes the swiss army knife quite situational, but it can make for one particularly minimalistic set-up capable of doing a lot in properly skilled hands.
Most of Emacs' prowess stems from the fact that it is a relic of a wholly different epoch of computing, which has not eschewed and in fact, welcomed the modern day, a microcosm of Unix-like operating systems.

What is particularly important in understanding why most people would deny that Emacs is a text editor.
When the editor was re-written from an earlier version by Richard Stallmann, he applied the principles that he had to have inherited from his Computer Science background; he thought ahead and created progressive layers of abstraction[^1].

So how does it work? Emacs, when compared to a pure text-editor, such as `nano`, or `vi` is extensible.
So if what you do is a bit more involved than say editing a single config file, or you're doing programming and having some more automation is useful to you, then Emacs offers a compelling package.
The editor relies on a combination of muscle memory, precise typing and some occasional customisation to enhance the programmers natural ability to produce large amounts of text: (I heard that programmers have to produce a large amount of code in the form of text every day).
The consequence of this, is that the programmer "can work in Emacs faster than most people can think" (source Primagean).

## Dialogues with the user
Well, Emacs isn't your typical graphical program, that tries to abstract away the internals, and hide the inner workings.
No, Emacs breaks down basic editing into functions, which the user is encouraged to know about.
Like the venerable and extremely useful `ed` editor, Emacs defines a language for factoring editing into function calls and interactive text input.
In principle every act of editing a piece of text comes down to this in every editor, but with `ed` the commands had to be written out explicitly and the interface more resembled a REPL, than a modern editor.
Of course, Emacs does the same, but with a twist.
If `ed` wants the verbs to remain largely implementation-defined and the user is encouraged to factor the editing process into this _complex instruction set_ of operations, Emacs takes a more _RISC_ approach.
There's a bunch of core functionality that's implemented in C, but a lot of the functionality is implemented in Emacs lisp.
The user is encouraged to write more verbs, to experiment with the transparent hook system, and to write packages, which can then be re-used.
The program emerges from binding the functions to inputs, so the user can in principle override the way in which certain commands operate, in stark contrast to how `ed` operated.
An additional difference from the `vi`-family was that Emacs allowed the user to define their own functions, via a configuration language, Emacs lisp.
This, true to the spirit of collaboration in the academic environment led to the creation of a multitude of packages, ranging from an implementation of tetris (which is now shipped by default), to various packages designed to majorly enhance a particular kind of interaction with a particular variety of text files.

This spawned a particular popularity amongst programmers, though Emacs' uses were not confined to programming[^2].
Emacs allows programmers to solve text editing problems in a familiar fashion to the way they program, but allowing them to eschew having to fork a text editor that they built from source, but rather writing a compact Emacs lisp function, marking it as `interactive`.

Emacs, allowed programmers to go beyond simple text editing.
But how does Emacs managed to capture the eyes of those looking for an integrated experience?
IDEs after all, are both able to support plugins, and designed to provide users with a more feature-full experience of interacting with their prorgramming environment. The answer is relatively simple.

Most programming is done in a relatively straightforward fashion: one has a plain-text file with a funny extension.
While it's possible to write your C++ code in a `txt` file it is not exactly encouraged, nor a good idea.
It is often the case that one has come up with a programming language, and had used a plain text editor to edit the source code.
As such, while it could be possible, in principle to produce an extension for Eclipse, Geany or KDevelop with a similar amount of effort, to produce an Emacs so-called major mode is often far quicker and easier, at the cost of perhaps, being less efficient and feature full.
A lot of the time, this comes down to there being syntax definitions for highlighting, and that's really about it.
If your language makes use of common sense ideas, such as the C-approach to identifiers, and using matched parentheses, odds are, the target audience already has a plugin that handles those things, and complicated heuristics are unnecessary.

## Examples

Emacs had a Rust major mode for a good part of Rust's existence.
It is still not perfect, mind you, but it is a fully-fledged syntax highlighting plugin that made interactions with the source code easier.
IntelliJ have only recently produced an IDE, that I would probably rank as on-par, though with some glaring omissions.
The reason?
It is much easier to knock out a parser for a formally defined language in what already resembles the definition of the grammar in some computer science courses, than it is to extend largely monolithic code bases like IntelliJ idea.

So, in effect, Emacs is the trailblazer of the approach that is ubiquitous today.
I will not argue that its execution is the best, or that it is by any means a perfect approach, but I will now discuss why my attempts to move away from it have, thus far, been unsuccessful, thus demonstrating further the positive aspects of this editor.

But there are other good things.

# Major alternatives
## A return to the roots

Going back to the `vi` family of editors is perhaps the most viable option for me.

This is largely to a horizontal gene transfer that took place between the two: editors over the years.

NeoVim has perhaps the most appeal to me, and could confer *some* advantages.

But here's where I find it not to be compelling option yet.

Emacs' greatest strength stems from being a graphical program.
In principle, though sadly not in practice, this would mean that more things than just plain text entries with monospaced fonts can be utilised in the creation of graphical interfaces.
Indeed this had been somewhat remarkably demonstrated by the eponymous [Nicholas P. Rougier](https://github.com/rougier), who has toiled relentlessly to create a visually appealing version of a text editor that looks decidedly outdated by default.
This means that hopefully, some time later, it should be possible to do a WYSIWYG style of editing effortlessly in Emacs.
Indeed, this is possible already in principle using some trickery and `org` mode, but far from seamless.

Unfortunately, I don't see this happening with Neovim anytime soon.
It is relatively easy to add this functionality to Neovim, but this is liable to lead to a further fragmentation.
Certainly there could be plugins that are specific to specific front-ends, but architecturally, NeoVim is decidedly a terminal-based application and it will remain that way for the foreseable future.

Aside from that, NeoVim has not a lot to offer that Emacs doesn't already do within maring of relevance.
For example, Neovim might have a slightly better implementation of intellisense than Emacs, but it doesn't matter to me, because my workflow is to prompt the program for completion actively, and not wait for a menu passively, and here NeoVim has no equivalent of `embark-act`.
Similarly, while *e.g.* the Neovim project has a list of official front-ends, they are in no way equivalent.
Neovide is an interesting take, with some flashy animations.
Due to architectural restrictions that's the extent of it.

There's a case that goes both ways for the configuration language.
On the one hand, `lua` is a much easier language to work with, in terms of more people knowing it, and its syntax being far less intentionally annoying.
However, there the advantages of `lua` are exhausted, and the appearance of a new kid on the block &#x2013; *tree sitter*, would allow Emacs to flex its lisp muscles.

Make no mistake, programming in Emacs lisp is challenging, doubly so because of the decision to not provide some information at the necessary level.
The sheer fact that I cannot be sure that a Lisp file is error free until I evaluate it, and that simultaneously, if it is not, I get next to no useful information in the error message, makes me wish I had access to `lua` or `Python` for configuration.
Still, those problems are in the minority, and once fixed &#x2013; a distant sour aftertaste, rather than a deal-breaker.
The fact that there'd be more `lua` code per configuration is a problem though, one that has to be fixed in one way or another.

Everything else, including modal editing, can be replicated in Emacs.
Though I must say that not having to worry about which mode I am in, has made me a better editor, though perhaps not a faster typist.

In a straight comparison, the way I would write this document in `neovim` would be mostly identical to how I would write it in Emacs.
With one key difference.
If I were to edit it in Emacs, I would not worry which mode I am in, thus allowing me a more usual experience.
Similarly, my wife would be able to use this as well, since she is familiar with how most similar text fields work on every other operating system.
With modal editing another quirk is introduced.
And I found it to be easier never to use modal editing, than to have to context switch between text input in the browser and how it's done in the terminal (assuming I'd even use the vi-bindings for the command-line which are just irrationally stupid).

So the `vi`-family is out.

## Atom EEE edition

This point is not clear cut as one might think.

I'm a vocal opponent of the usage of this program, but I don't think that most of this is well-justified and well-intentioned.

The reasons I hadn't touched `code` up until now and for some time in the future potentially are as follows:
- I really liked Atom, and I don't like the idea of it being embrace-extend-extinguish-ed.
- I don't like Electron and _most_ (see above) applications built with it.
- I don't like Microsoft products and try to avoid them. I don't use Windows, I void Microsoft's office suite, despite being very good at using it.
- Everyone's using VSCode and being a contrarian is cool.
- I have had an irrational fear of JavaScript.  Not having overcome it postponed the launch of this site, and made my work harder in many respects.

The moment I realised these points were irrational, was when I considered that they would equally apply to the text editor that I like:
::: details Emacs
- Emacs didn't start life as an open source editor. Richard Stallmann made it so, but it was not so initially.
- I don't like GTK much either. The list of GTK applications that I use is just as thin, if not thinner than that of electron apps.
- While I like some of the principles espoused by the FSF, the _only_ application that I like that is totally aligned with the FSF goals _is_ Emacs.  Politics should not have anything with the choice of tools.  It should influence how I use those tools.
- Being a contrarian can give you a wider perspective, but only if you don't limit yourself to the stuff that everybody likes.  Plus, _many_ of the reasons why I used `vi` and eventually Emacs has to do with the herd mentality of trying to fit in with the "cool kids" at university.
- Emacs lisp is just as bad, if not worse than JavaScript in some aspects.  This has many reasons and many implications.  And according to [Doug Crockford](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/), the languages share more in common than anyone familiar with either language will let on.

VSCode is a modern take on Emacs.
It is not all that different.
I would need to try it before I criticise it.
Not because I owe Microsoft the benefit of the doubt, but because I owe my audience an informed opinion, and at present I don't have one.
:::

::: details Vim
- Vim is a descendant of a collection of editors, with a proud history of being attached to the original Unix, which contrary to popular belief, was not the epitome of free software, until things like the GNU project.
- I positively hate terminal applications that pretend to be GUIs. I positively hate the idea that we've messed up graphical programming to such an extent that it is easier to make a terminal application, with cruft retained from the teletype era, be portable than an unencumbered program using _e.g._ SDL.
- The Unix philosophy is overrated.  NeoVim is a good example of why you'd need to replicate the functionality of something like `tmux` to make things comfortable.
- Using `vi` instead of `nano` is a symptom of some well-intentioned person mentioning that `vi` is "more advanced" than _e.g._ `gedit`, `kate`, `nano` _etc._  There's a lot of herd mentality involved in choosing `vim`.
- VimScript is a terrible language.  Emacs lisp is a problem-laden mess, it is without a doubt the worst lisp, but it is nonetheless a keen language, with many interesting features.  It has similar problems to JavaScript, and a misleading similarity to C.  VimScript does not have such luxury.  Though this comparison should include Lua, I think it would win.
:::

However, it is unlikely that I will stick to it. I don't like writing proprietary software, dealing with proprietary software and helping ecosystems that have an explicit goal of making open ecosystems worse. I will be inspired by some things that I see in VSCode, and maybe adjust my workflow, but I will not be a "productive member of the VSCode """Community"""".

## Kakoune

This is an interesting and more visual take on the `vi`-style modal editing.
It retains much in common, but with a twist.
It is remarkable in many ways, and I tend to use it in scenarios where I used to use `vi` or `vim`.

It has some genuine advantages: built-in LSP support, out-of-the-box syntax highlighting, an arguable improvement to the verbs of `vim` (though my opinion is the only one that matters here), and it's easier to type `kak` than it is to type `vim` or `nvim`.

Kakoune is opinionated, but in the right way, it caters to a specific use-case and in many ways scratches an itch that almost everyone that was learning `vim` in their teens would have.

One problem I _used_ to have with Kakoune, was the assumption that the program would not need/have a scripting facility, and no way of defining custom/new verbs, like the old `vi`, but unlike `vim`, and many of the modern editors.
This has thankfully been addressed and there's a heap of plugins for Kakoune.
No curated list as of yet, but this might change in the future.

All else being equal, it is a direct upgrade to `neovim` in many ways except one: it still falls into the trap of using a customized language called `kakounescript`. It is a strong contender, and definitely something that I will be using, if not full time, then at least in some capacity.

::: info helix
Helix is a direct downgrade to kakoune in many ways.
The only saving grace is that they chose to "rewrite it in Rust", but that is only a positive in some cases.
:::

## Focus

I will not lie, Focus is a very strong contender.
It has many features going against it, and a few going for it, but it is also an editor in its very early stages of development, so here's hoping.

Focus' main weakness is the absence of a scripting language similar to Emacs lisp.
This weakness is compounded by the fact that it is written in Jonathan Blow's as yet unreleased Jai programming language, that requires one to enter a closed beta to gain access to a compiler.
The code is clean and easy to understand, despite being in a language that I'm not familiar with, a credit to both the language, and the editor.

It is a keenly interesting editor in a few aspects, it has good performance and is largely easy to deploy/manage on account of being a statically linked executable with batteries included.

The number of included batteries is not as much as you'd hope.
There's no markdown highlighting support.
I respect that; markdown doesn't exactly _need_ highlighting.
But there's also limited highlighting for files that should not be considered esoteric; this site is (at present, at least), built using [vitepress](https://vitepress.dev/).
The config file is a file called `config.mjs`.
Not only do I not have automatic error checking as I do with Emacs, not only do I not have the convenience of being able to just run compilation and jump to the error; I don't even have the decency of having some syntax highlighting.
JavaScript? Yes sure, but not MJS.
So it's not as complete as one would like, but you can also see that changing once the editor gains some traction.

::: info
We'll come back to this later when discussing `lem`
:::

The editor, once you've gotten the compiler from the closed beta is fairly straightforward to compile and test, and as I discovered to hack into.
It is also very easy to deploy, there's a single static executable, and almost nothing is linked against dynamically (not even the `libc`).
A lot of its success can be attributed to Jai, despite Jonathan Blow having not been involved in the development of focus, he's keenly influenced some of its design decisions.

But what do I make of the rest of the editor.
I'm less productive.
Unlike editors written in Rust or C++, the ways in which a Jai program can misbehave are not yet well-known and sometimes not the fault of the programmer.
I miss being able to trime whitespace in one command. I'd love to see the function be introduced at some point, but I don't personally have the time to create a pull request and hope that it gets merged.
I'd like to eventually have LSP support.
It's much harder to implement that, on account of the fact that Jai doesn't have much code written in it yet, to compare how one would connect to a server and respond to its feedback.
It is hard to even consider things like Copilot integration, or more advanced features.
While Emacs made LSPs redundant in a way, by allowing one to do much more thanks to the fact that it's a complex web of built-in packages that are doing some amazing things (`project` and `projectile` come to mind), you don't usually have the need to worry about much.
Sure Emacs doesn't have native collaborative editing support, but it has `crdt.el` which is the next best thing, and trivial to set up, even when you're behind a NAT.
With Focus most of this is much harder to do.

As of today, switching to it full time, is non-viable, unless I wanted to do some form of challenge.
But I can foresee contributing to it, and using it, and writing some form of extensions to it.

## Kate

This is an editor that _might_ have been dismissed by many as not exactly even in the same league as the others.
I found that assertion to be true, but in the opposite direction.
Kate has an uncanny ability to match Emacs' feature set, in a package as appealing as that of VSCode, and at the same time, having none of its drawbacks, irrational though they may be.

Firstly, Kate is a long-established project with a healthy ecosystem.
It is not, like the other editors on this list a facsimile of Emacs, it only happens to cover most of the same ground, but with _very_ different backbones and has a much higher potential ceiling.

Firstly, the editor out of the box, covers most of what I would need from a code editor: I don't need to spend a significant amount of time digging through other people's configurations to get into the state of usability.
It highlights markdown and org out of the box, it has LSP and DAP integration, and actually does them well: I don't need to install a package and _hope_ that it will work, it happens to come in a working state.
Considering that Kate is a KDE project I find this to be a fascinating achievement, most of their other projects... ahem... KDevelop... ahem... are nowhere near as stable.
This is quite exciting because for the life of me I couldn't figure out why `company` pretends to not have any completion candidates half the time, and is dog slow the other half.
Kate by contrast has a similar function to Emacs' `dabbrev`, though the implementation is decidedly more akin to modern solutions, losing some of the charm/luster.
Kate has syntax highlighting for esoteric things, like for example StandardML.
It didn't a while ago, back when that would have been helpful.
It is fast, on account of using a highly optimised native toolkit, and has a healthy ecosystem of libraries and packages; it's a KDE program after all.

The debugging is good, and sidesteps new fads (such as displaying values of variables next to them, rather than in a neat table), and it crucially has support for sequential keybinds.
I can attach `Ctrl-x Ctrl-s` to save, and it will save.
It can work with a mouse, I can drag blocks of code around, set breakpoints, and fold headings.
I have an inordinate amount of visual feedback whenever I do something as simple as enter a delimited block.
It does inlay hints and does them well.
It can change the font in your editing window, without having to muck around trying to find if what you typed has a mistake in it.
It can do visual elements for things that ought to have visual elements, like e.g. Git history.
It can show a sane diff, and can resolve conflicts without you having to use the dreaded (and in my opinion not particularly good) `smerge` package.
Its built in git client isn't as good as `magit`, but there's no reason why it can't be made better.
It has somewhat of a similar idea to the IntelliJ offerings in terms of how you'd do a compile/build/deploy, but that is not a problem, because you can just hit `F4` and get a terminal.
If you get feedback in terms of diagnostics, they're categorised, and navigable, just like in Emacs.
Unlike Emacs, they're navigable even if you don't use the `flycheck`/`flymake` packages and/or explicitly use a `compile` commmand whose output may or may not parse correctly.
It defaults to soft tabs.
So what else do you want?

Well, frankly, not much, but those things will make life unbearable when they come up.
Firstly, I intend to write a lot of Jai code.
In Emacs, it is trivial to knock out a major mode for a language that has some similarities to the C-style languages, one of a few places where inheritance is a good thing.
In Emacs, due to manifold exploration opportunities, I've experimented with different code highlighting/typesetting systems.
What this lets me do is do some crazy things which are not that crazy when you think about them: having the height of heeadings be bigger, instead of just being a different colour, allows me to use colour in an orthogonal fashion.
I can highlight text with a different typeface: set things in `sans` and `serif` when I need to.
I can also use the information that is already gleaned from the parser to do other things, like contextual commands.
Emacs' `embark` command is perhaps one of the best examples of this.
Vim might not have this, but in Kate, something like this would be prohibitively difficult to implement.

Another thing which I'm missing in Kate is the modularity of Emacs.
Most emacs packages are self-contained, and they integrate only with Emacs.
In Kate everything is tightly woven, even though technically it shouldn't be.
Even the Kate pacakges that are considered to be plugins do not exist in separate repositories.
This might change in the future and make my life a bit easier, but unlike with Focus, where the potential is obvious and immense, with Kate, this is likely to happen at a glacial pace.

I want to be able to embed a Qt application as a window into the editor, and have it _just work_.
Maybe I'll need to fork Kate for that architectural change, and maybe I will need to write something from scratch to do it.
But the core idea of there being mainly components that are abstracting away some of the aspects of the interaction in a consistent fashion is why I find Kate to be so appealing.
It doesn't fight the CUA standard, it just allows one to side-step it if they need to.
But it doesn't allow the editor to be your canvas, and experiment and tailor your editor to your workflow.

## Lem

Lem is probably the final contender of which I don't know what to make of.
It is an editor that, if accomplished, has the potential to be a direct upgrade to Emacs, and to make this probem go away.
But it is also somewhat esoteric.

Hear me out.
One of the key advantages of `lem` is the fact that Emacs is only configured in a lisp, but `lem` is written in its entirety _as_ a lisp program.
So, as something that is both of the Emacs heritage, and simultaneously free from its technical debt, lem can do things better.
An Emacs user feels at home, knowing that _e.g._ `C-a` jumps them back to the beginning of the line, and `C-e` to the end of it.
There are ways of configuring it to feel like my Emacs config, assuming I can port over the functionality that's missing.

In principle `lem` is an opportunity to fix Emacs' long standing issues, without also making the users of the old emacs unhappy.
It is the `vim` of the Emacs world.
And given that similarly to how `nvim` fixed VimScript, `lem` can rely on Common Lisp to provide most of the advantages and none of the drawbacks of Emacs lisp, it makes sense to consider it.

Unfortunately, `lem` makes some crucial mistakes, early on.
They have the potential to completely nullify the advantage that lem might have over Emacs.

First and foremost, it's designed around a terminal UI.
It doesn't and didn't commit to a GUI-only approach that Emacs did, which is perhaps the biggest blunder of the program's designers.
This means that almost every critique I can levy at Kakoune and Kate for not supporting my insane workflows mixing different proportional typefaces counts double.
If you want to target the official `lem`, you are going to target the terminal version...
Which means that none of the GUI stuff gets done, not now, not later, not eventually.
This is painful.
One thing that has to be done in a hacky way on Emacs, are the GUI elements in things like `customize-apropos`, instead of having an actual text-box, you are given an approximation of what a DOS-era text box would look like, except less useful and more shitty.
The reason for this is the separation of the GUI toolkit of Emacs -- GTK and the run-time nature of interpreting Elisp, even if it's compiled to a dynamic library in native binary.
It was decided to go function over form, which later ended up just choosing not to have decent-looking controls.
In Lem, given it uses SDL, not only can those controls be done better from scratch, most of the technical limitations which would prevent one from using this stuff correctly are also gone.
But, in a typical "you had one job fashion", because the main target is a terminal implementation, people targetting lem, will almost never support the GUI features...

::: warning
TELETYPES ARE FUCKING DEAD; GROW THE FUCK UP!!

Make a good FUCKING GUI APPLICATION.
Nobody complains about GUIs if they're done right.
If you don't know how to do it, leave room for someone who does.
:::

Minor annoyances abound, though not in and of themselves deal-breakers.
All the functions that I'm missing can be ported, and ported easily I must add, because the languages are fundamentally compatible.
The bigger question is: "would it be harder to adjust emacs to what I'd like it to be" as opposed to adding what's missing to `lem`?
And I frankly don't know.
It might go either way.

I find editing in it less comfortable than any other editor at the moment; the main reason is that I found that it has enough in common with Emacs to lull me into a sense of familiarity, but not enough to make me actually accurate.
Case in point, I have a nasty habit of pressing `M-q` to fill text to the 60 column mark.
In `lem` this is equivalent to closing the window.
Oh and by the way it inherits the outdated (and extremely confusing) nomenclature from Emacs.

::: warning
AT LEAST COPY THE FUCKING THINGS THAT ARE FUCKING GOOD!
:::

Clearly a long way to go, but given that this is largely a community driven project, it's a toss-up.
It has a chance, much more than `helix` does, but it needs something more than just an advantageous position.

## Lite

I frankly never used it before.
It is probably what Neovim would do for me, if it were any good, but it comes with some creature comforts that I like quite a bit.
To me Lite does what a text editor should do.
I quite like `lite-xl` and might use it if I get the chance.
It is definitely not as well-supported as Emacs, and definitely not as widespread as `neovim`.
Still it has a chance, so I'll give it one.

As a purely text editor, it does well.
It doesn't come with LSP support, and while I appreciate the ability to configure the editor using a GUI, that is also something that Kate can do, and in my opinion much better at that.#

Still I know poeple that use it, and today I found out why.

## Not even bad

If you are not familiar with the expression "not even wrong", you might think that these editors are OK.
They're not.
In fact, they're so terrible, that they cannot under any circumstances be considered for a replacement.
I will detail how bad each of them is, but try to reserve particularly harsh critique in the appropriate `warning` segment.

### Lapce

Do buzz-words give you a buzz? You're in luck!
This wonderful editor manages to look older than Emacs.
More buggy than Emacs on Wayland.
Do you like Rust?
Do you like Web Assembly?
Are you an idiot?
Lapce is for you.

## scite

This project should die already.
It has no discernible reasons to exist other than if you are running a super-minimal setup and are not very intelligent, that you might delude yourself into thinking that it has fewer dependencies.

## Pulsar/Atom

I'm sorry but no.
It might be that the people were not _entirely_ stupid when they were designing Atom, but I don't think this has anything remotely approaching a chance.
Most of its suggestions are counter-productive, its only saving grace is that it is compatible with  VSChrappium extensions.
It tries really hard, but unlike Kate, it doesn't do all that well.
I'm willing to forgive that it's based on Electron and looks like crap despite that.
I'm willing to forgive that it's slow, based on the former acknowledgement.
I cannot forgive that it is so FUCKING convoluted that simply opening a single markdown document takes me longer on Hyper with no extensions than it does loading my extremely heavy Emacs set up.

## Sublime text

I'll say this, I'll use it if I have to, and if the alternative is GEdit.
But in my opinion, it's not particularly great.
It had years of development, and is decidedly behind things like `neovim` and Emacs.
Fewer functions, an ageing cross-platform toolkit that is not great, but not nearly as bad as electron.
If Kate didn't exist, Sublime would have been something I would consider, but unfortunately, a team more concerned with providing a basic text editor did a better job making sure that the LSP worked, than Sublime did.
And they have no excute.
If you ever worked on a KDE project, you know that the code-bases are often extremely difficult to navigate and operate on.
With Sublime having a much smaller code-base and having funding to warrant the development of the project, I have zero confidence in the project.
It is a one-trick pony.
That trick is now a basic requirement for comamnd-line editors like `kakoune` and `helix`.

## VSChrappium (also known as VSCodium)

The epitome of the naivetee of us humans.
This is probably the best example I can point to, when I say that pussy licenses are dumb, that the Open Source software development model is broken beyond repair, and that we should emphasise whether software is Free as in Freedom, or just open source.

Suppose I were a free software in everything evangelist.
What problems does VSChrappium address that I would have?
For one, let's suppose that I have an ideological problem with Microsoft pushing its proprietary editor.
By using the open source counterpart, I'm still helping it _extend_ the open source with their ideological approach (of "just use VSCode").
I'm cutting out the telemetry, true, but I'm also given the impression that the proprietary extensions make this an incomplete package.
Nobody mentions the VSCrhappium, they mention VSChrap support.
And the greatest thing about it, is that the licensing terms mean that if you contribute code to the project, they can take it and add my code (that was contributed to VSChrappium) and it to the proprietary counter-part.

If you care about free software, and like to use VSChrap, then

::: warning
JUST FUCKING USE VSChrap!

Let VSChrappium FUCKING DIE! BE HONEST ABOUT WHAT YOU'RE FUCKING DOING!

AND SHUT THE FUCK UP ABOUT IT BEING OPEN SOURCE!
:::

::: error
If I'm commiting the crime of using a Microsoft product and allowing it to establish yet another monopoly, I might as well take away the thing that lets me engage in intellectual dishonesty.
:::

## Acme

To keep myself intellectually honest, I've written each segment in this document in the editor that I was referring to.

There was one editor so utterly broken and misguided that no matter how many variations of it I tried, I could not get it to work.

I assure you, there are plenty of commentaries on the original package, but given that I was comparing Emacs to the _current_ state of `vi` namely `neovim` and comparing Emacs to the original Acme would have been utterly unfair, I will reserve critique until I can get any of them running.

Not a huge fan of how things turned out, because I was ready to go on a long tirade about how utterly misguided the entirety of plan9 was, but fortunately for plan9, their software doesn't even run.

::: warning
You suckless buffoons should consider making your programs ACTUALLY SUCK LESS, INSTEAD OF WRITING ABOUT IT!

IF YOU HAVE TO **SAY** that your programs SUCK LESS, then you're probably part of the problem.
:::

# Appendix: In the beginning
Why did I end up on emacs?

Peer pressure mostly.

I'd say mostly, because the purple _E_, was something I was always curious about; it showed up as a keybindings scheme in Gnome Tweak tool (that incidentally did nothing) it was a "lightweight" text editor that promised to be on par with what I was used to, but I never really took the plunge? Why?

I was (quite honestly), content with using Vi. Yes, not even vim, just vi. I could even trace the evolution of what I used for text editing through the following curious (perhaps not to many) path.

At first, I was using just plain old Word '98 for anything that was prose adjacent. It had some quirks and I had to resist the urge of inserting WordArt, knowing full well, that the result would look different. But it was fine. I lived in a world in which text and plain text meant the same thing. I knew of a time when we used DOS, and I knew that it was mostly text based, but the only program I can distinctly remember from those days is `nc`.

At some point I had to learn how to program, and my first, and not-quite serious foray into programming was using MS Visual Studio 98, a copy of which I inherited from my Dad (he was rubbing his hands with nostalgia and anticipation, because prior to this I showed no interest in understanding how computers work, beyond games).
The IDE experience was the main means of interaction, where soon I learned that a project was just a shittier version of a single `.cpp` file, that I could in principle just write those and compile them directly. I didn't understand what the header files were for and I assumed that large programs were simply a large single text file with no organisation beyond forward-declared functions. Oh and don't get me started on the command line.

This was, for the most part, how I viewed the computing world for most if not all of my early days.
Even to the point, that despite being reasonably good at Physics, I was content with this sort of complete misunderstanding how computers worked and how software is built.

At that time I started dabbling in GNU Linux, but not in a serious capacity.
The most I did was install some games through wine (back when that was a true challenge), and perhaps installing Arch was what gave me some challenge. I learned to use `nano`, but also to despise it with a passion.
On the other hand, in Windows, there was Skyrim and I started modding it using&#x2026; ahem&#x2026; NotePad++. And I liked it quite a bit. It's definitely something that in retrospect wasn't terribly advanced, but I didn't exactly need something advanced. The sheer fact that I took an entire month to write prose pretty much continuously was what I did, and it wasn't exactly a problem.

But at some point the elitist Arch-bro had to be born, so I had to learn the advanced editor. So I did&#x2026; Vi was that. And I didn't switch for the longest time. `vim` was *an* improvement, but Bram Moolenaar (god rest his soul) didn't make it *the definitive improvement* over Vi. And besides, I didn't really write prorgams all that often, mostly config files, so `vi` was frequently only used to write config files on a bog-standard GNU+Linux system. And at around 2015, when I finally stopped distro and desktop hopping (and nuked my final install of Windows), I compeltely settled on using `vim`.

At this key moment, I often had used other graphical text editors, but the sheer beauty of `vi` was its omnipresence. Almost all unix systems shipped with it, even if only select few even had `vim` in the repositories. I had used `vi` for most of my early days in Cambridge, but that's when I started to feel some pressure to conform to what I've been taught.

So like in previous years, I had picked an IDE, at first it was eclipse. At some point later it was IntelliJ.
Later on, though, I got an email that read roughly like this

> <1> Dear Students, I'll be your algorithms supervisor for the Lent term. Please start using something serious like IntelliJ, or perhaps the clever students would be using something more advanced like Emacs.
>
> <Re:1> But I use `vi`.
>
> <Re:Re:1> That's certainly a choice.

Of course this wasn't Emacs on GNU+Linux, but rather on a mac (back when macs were good). Plus, I found an irrational human being that had also aliased their `vi` to `emacs`, used `emacs` in the terminal, and what I think was perhaps the worst part of all, had a trollface mode.
Fun memories, given that we had a proper hackathon (portwine and funny jokes included).

This was when I made the best decision of my life and completely ignored the advice, instead opting for IntelliJ idea, and doing my work in an environment that didn't require me to learn a third language (plus you have to keep in mind, that as a student that took a Computer Science option, I was completely reliant on the desktop computers which then provided either Windows, or a version of Ubuntu Linux)[^3]. Finally, the year that I caved in was when I decided that it would be a great idea to try Emacs on my main machine. Out of sheer peer pressure, I must add.

Of the proffessors I've studied under, almost everyone praised Emacs. It was a mark of cleverness in their eyes. And there were some things that I found to be &#x2026; for lack of a better word&#x2026; problematic. For one, there was an air of superiority about the usage of a particular tool. I, for the first time, heard someone say something negative about Eclipse (the IDE).
I had also been party to a silent understanding that while Vi-likes were the tool of choice for engineers, then "real computer scientists used Emacs"[^4].
Secondly, while it was a program that people used quite often to cite the power of programming, I struggled to find a way in which it *could* be better than say `vi`. The ergonomics of modal editing plus the reliance on the Unix philosophy made for compelling arguments.
Usage of yet another language to configure something didn't exactly sound like a compelling argument to me.

So how did I end up with this extremely elitist piece of software, Emacs? Easy. I just wanted to see what the fuss is about, and I found it to be extremely usable.
Yes, one might have expected that the love for Emacs came from Richard Stallmann, but I always found that his take of "you should use X, because it supports the free software movement" to be rather a mark of severe impracticality.
If you recall I mentioned curiosity, well this is why I never took the plunge before.


# Footnotes
[^1]: To us today, the presence of a Turing-complete configuration language, and the ability to install extensions for editing facilities seem obvious, largely due to this idea being incredibly prolific.

[^2]: One particularly interesting example is that of author Vernor Vinge, who uses Emacs, but is by no means known for being a programmer.

[^3]: This was perhaps the hardest part.  The windows version came with Kate, did not come with `vi` and rebooting was not really an option, because it took prohibitively long.

[^4]: Of course none of this was said explicitly; like much in Cambridge it was something to be understood.
