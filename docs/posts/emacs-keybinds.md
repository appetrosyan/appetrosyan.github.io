---
category:
  - Emacs
  - Work
  - Tooling
date:
  - 2024-06-16
---
# Emacs in 2024


I'm a major user of Emacs.  But I'm not, for lack of a better term, an
Emacs zealot.  If you ask me what editor should you use, the answer
isn't automatically, or often, Emacs.  The zealots believe that it is
enough to cite the power, and the relatively low skill floor for Emacs
to be an optimal choice, but I would say that I disagree vehemently.
I've even written about it (hint: look in the **rants** section).

However, for a large portion of the population, Emacs is the right
choice.  If you're a tinkerer, a programmer, a writer, or generally
someone who is not afraid of doing something unconventional, it might
be a good fit.  I say _might_ instead of _is_; Emacs is not
universally good.

If you, however, do indeed want to try it, I think there is quite a
bit of misinformation out there; enough for me to write out an article
to correct as many misconceptions as I can.  I do think that a lot of
people that give up on Emacs, do so because of what I can only
describe as misaligned expectations, and misleading advice.  We can
fix both.

So without further ado.

## We are legion

Starting out with Emacs is quite a daunting task, in the same way as
starting out with GNU/Linux distributions.  There's multiple choices,
they are not distinct enough to be pigeonholed into a niche and as a
consequence the user is faced with analysis paralysis.  Unlike most
GNU Linux distributions, however, you can't go wrong with either of
the distributions.  You can later amend your choice, but the best
starting point is perhaps to not worry and _just pick one_.

Some people will argue in favour of pure GNU Emacs that comes with
your package manager.  Indeed that is what I use personally.  Some
people will argue that if you're on MacOS, something like `emacs-mac`
or better yet, a distribution such as Spacemacs, or Aquamacs is going
to be better for you.  They are not wrong.  Some people swear by Doom
Emacs.  And they are not stupid.  Each distribution offers you a
different set of defaults, and a somewhat different method of
obtaining Emacs packages.  That's really the extent of it.  The
distributions sometimes leapfrog the core, and sometimes the core
benefits from a more concerted effort.

Unlike with the `vi` family of editors, there are no radical
differences.  All distributions are configured in Elisp, and all
versions, including "vanilla" Emacs, are batteries-included and
completely usable without any additional packages installed.  Emacs
comes with `org` for outline editing, `tex` for LaTeX _et al._ as well
as major modes for most if not all programming languages that support
both a regex-based highlighting, and an experimental `tree-sitter`
based parser-based highlighting.  If you know what to activate, you
can do a shocking amount of things with just the base installation of
Emacs.

Emacs can benefit greatly from knowing its configuration language --
Elisp.  But you don't actually have to know it in order to use many of
the editor's facilities.  You can install and configure packages
without ever leaving the comfort of a guided widget-ed GUI
environment.  The actual appearance is sub-optimal, but that is
something that can, and most likely _shall_ be fixed.

If you go to the opposite extreme, a version-controlled, literate
configuration in the `org` format, containing much programmatical
configuration; that too is common.  Most, but not all programmers have
an `init.org`.  Most if not all programmers utilise the now built-in
`use-package`, which as of Emacs 30 has support for installing any
version controlled package; a great help if you yourself are
prototyping.  Some programmers have a large collection of personal
snippets of code tailored to one's particular workflow.  Some do none
of that.  Both approaches are equally valid.  You can only find out
which camp you belong to after having tried it.

With that said, there is a small cheat sheet that can help you out.
If in doubt, just go with the "vanilla" Emacs that ships with your
distribution.  Don't worry if it's an older version, or doesn't have
the new-fangled "pure GTK" render; hell even if it looks like a
windows 3.x program, it's probably installed with the `lucid` toolkit
and that offers better latency and generally is less buggy if used as
a server.  Don't feel pressured to choose a different version, just
because someone else uses it.

If you have a bit of baggage, like you already used `vi` or the `vim`
modes of different editors, you can still benefit greatly from using
"vanilla" Emacs.  For one, it's easy to install the emulation packages
and there's one already built-in.  A second, more philosophical reason
is that Emacs has great customisation facilities.  For the right
person, going with Doom Emacs, might take away the fun of discovering
and modding one program to behave exactly to spec.

Plain emacs on Mac OS seems to work well these days.  Native
compilation is a tricky subject at the time of writing, because of the
fact that `libgccjit` is written with x86 processors by default, and
newer mac machines all use ARM.  It's a minor inconvenience, however.
Not having native compilation does not necessarily result in a vastly
inferior experience, it is a _nice to have_, rather than a _must
have_.

So basic Emacs works fine.  Go for it.  Distributions work fine too.
Pick one and don't worry.  That's not as important as the zealots
would make you think.

## The paths are many

This is kind of an important point that is often overlooked.  Having
installed the program on your machine, there are multiple paths that
you can take, and all of them yield a different kind of chance of
success for different kinds of people.  Namely, for a writer and
non-technical person, starting with just learning to open files with
`Ctrl+x Ctrl+f` and interpreting `C-x C-f` as that combination, is an
important first step.  Learn to work with that.

You should learn that `ESC` acts as a one-shot modifier for the next
keybinding, so `ESC x` is the same as `Alt+X` is the same as `M-x`.
You should know that `Ctrl+g` or `ESC ESC ESC` gets you out of
whatever sticky situation you found yourself in, including a weird
layout.

There are some historical idiosyncrasies that I disagree with, but
that are here to stay, like the fact that `C-m` is the same as the
return character, in the sense that you cannot rebind the two
independently.  All that you need to know is that it is no more than a
convention, most learn to ignore it, some take advantage, and others,
like myself, break that convention, by modifying the
`input-decode-map`.

Aside from that, there isn't any required knowledge about conventions.
None.  The rest of the information is _highly_ contingent on what your
workflow looks like and what precisely do you want to accomplish.  As
such I would give you some pointers as to what I, and a few of my
friends found helpful.

### Vanilla all the way

The out-of-the-box Emacs experience is shockingly good, for a program
its age.  A large number of things is included by default, a large
number is in better shape than some of the standard packages in
`neovim`, particularly `project.el` compared to `telescope`.

Even if you have no intention of leargning Elisp, Emacs can be
beneficial.  Emacs has been polished over so many years, that with few
exceptions, you will find the defaults to be the best way forward, and
the few areas where there ought to be choice, that choice can be made
using the built-in `customize` system.

So don't fight it.  If you are a complete newbie and a non-technical
person (which give the blog that you're reading, you most likely
aren't, but might know someone who is), just go with the tutorial.
Learn to use negative arguments, `C-n`, `C-p`, maybe re-map Control to
the (in my opinion completely redundant) CAPS LOCK, and that's it.

If you go down this route, I think we ought to have a game-ified
practice dojo, that would let you ingrain these things as habits, but
if we're completely honest, if you just stick to using Emacs, you'll
pick it up; and even if you don't that's perfectly fine too.

As a long-time user of Emacs, with a large collection of 3-rd party
packages, customisations and a few other things, I tell you that using
Emacs 30 with no changes is a good enough experience for me.  I can
still benefit from some strategic elisp, but I find that it is far and
away not as important as I thought it would be.

::: tip 
One important, but often overlooked aspect of Emacs, is that
it offers the familiar, IBM CUA bindings available via a menu.  If you
go to `Options`, and then tick the "Cut/Paste with `C-x`,`C-v`...
(CUA mode)" box, you get a _very_ familiar interface to what most
people are using in the rest of the operating system.

Most Emacs coriphei think that this can hamper your growth, and that
you shouldn't do that.  I fervently disagree and believe that this is
bad advice.  This option and mode exist for a reason.  If anything it
should be made more accessible to the point of being on by default.
:::

Emacs has an extremely active developer community, which is impressive
especially for an editor that can trace its lineage back to early Lisp
machines.  Every new major release comes with significant
improvements.  I will say that of all the software that I run, this is
the main one which gets me excited when a new version is out.  So not
experimenting with new-fangled third party packages is not necessarily
something to worry about.  Fear of missing out shouldn't drive your
decisions.

For most people, even mastering the built-ins is probably good enough
and I would urge people to consider using it in that way, so we can
improve the experience to newcomers.  A particularly important point
is the implementation of ease-of-use functionality, like the recent
merge of `which-key`, which displays the currently bound keys on a
partial keystroke.  The addition of `transient` allows package
developers to create more involved and perhaps better organised
interfaces for their packages, which can help a great deal.  With
time, I can see Emacs becoming more, not less, accessible to the
average user.

### Light tinkerer

This is an archetype that is most descriptive of someone who has just
started computing seriously.  They might be in school, or they might
be someone who is tired of VSCode, and they want to try something
else.  This is the most vulnerably demographic, as Emacs can be
extremely intimidating, obtuse and perhaps fundamentally broken for
these people.  Consequently, this is the demographic that would
benefit from my advice the most.

The way you chip away at the Emacs iceberg is largely up to you.  Most
tinkerers are different enough, for there to be no one good approach.
But there are things which can make or break one's experience, so if
you are one of the few at-risk of quitting, here are some tips which
should help prevent frustration.

First, remember that Emacs is primarily a customisable computing
environment.  Feel free to ignore advice on the internet, if you
understand when it applies.  This applies to the current article as
well, though naturally you should finish reading it first!

The **most important** skill you can learn is how to control the
behaviour of Emacs, that means _packages_, _hooks_, _functions_,
_key-binds_, and `customize`, but to a far lesser extent, given that
your interaction should be primarily through elisp.  This implies that
you should know how to find new packages, and this is usually best
done by browsing forges, and finding aggregators such as [Emacs-tw
Awesome](https://github.com/emacs-tw/awesome-emacs).

At some point, you will learn to use ELPA directly, and sometimes, but
not often, to supplement it via your own code.  You see, while
conventional wisdom tells you that fragmentation is a bad thing, an
alternative take on an existing problem is often the right thing to
do.  Learn to configure, packages, and you shall have a whole lot more
to work with.

Emacs is conducive to poaching entire snippets out of someone's
dotfiles.  This is a practice that I would, normally, highly
discourage with `neovim`.  Emacs, is different; largely because
`use-package` is both good, and built-in, unlike _e.g._ `lazy.nvim`
and other package managers.  The package installation, dependencies,
`autoloads`, hooks and bindings are all self-contained.  This locality
of definition, was what originally sold Steve Jobs and Brendan Eich on
Object-Oriented programming.  One feature of Lisp, that people
re-discovered in other languages, loved, misinterpreted, made ugly,
and subsequently turned into an abomination, is its unique ability to
modularise by domain, creating tree-like hierarchies.

The **second most important** skill is how to diagnose breakage.  I
cannot emphasise how important it is to understand how Emacs differs
from other batch-processed editors, _e.g._ `neovim` itself.  You can
load the configuration one balanced symbolic expression at a time,
with `C-x C-e` or with `eval-defun` bound to a suitably convenient
key.  You are highly encouraged to put your packages into
self-contained `use-package` forms, because then, if one particular
package misbehaves, you can just comment out that particular part and
try again.

Learning how to diagnose problems is also a skill for understanding
the dependency relationships between the packages that you have, and
the packages that you need to install on your regular system as
dependencies for the elisp packages.  As a drill, I would suggest
breaking something intentionally, and trying to figure out how easy it
is to debug.  If it's not, you probably need a bit more practice, or a
bit more setup.  I used to have the issue of having to bisect my
`init.el` whenever some misbehaving package like `jedi` caused my
configuration to break.  The solution was to break it up thematically,
and to have redundancy, so that if a particular file failed to load,
the others did.

Finally, learn to read the documentation.  It is difficult to fault
anyone at this point for not reading the Emacs documentation.  Yes, it
is highly encouraged to provide documentation for your functions, but
the quality is sub-par.  The main problem is that Lisp, being
different from a compiled statically typed language has a lot of
behaviour that is left up to context.  One may be surprised that some
elisp functions read a global variable's state.  Some communicate
their results via a global variable.  This is a paradigm that one must
learn.  It cannot be absorbed passively.

I would strongly urge light tinkerers to try and read as much
documentation as they can.  This is particularly important for
packages that you use often.  Sometimes there are deprecations, and
changes, like _e.g._ `define-key` being now `keymap-set`.

### Heavy tinkerers

My only advice here is to try and experiment.  It is tempting to
assume that you know it all, and sometimes you know better than the
package author.  But sometimes you don't.  Sometimes, you end up in a
position in which the paradigm is counter-intuitive, but you are
fundamentally incorrect.

This is the only category of users for whom it is worthwhile to
suggest that they should try and learn using the Emacs keybinds,
before they turn on `vim` emulation or CUA modes.

As someone who doesn't like to spend a lot of time configuring my
editor, I have heard of some problems with heavy tinkerers wherein
they spend a large amount of time experimenting and changing things,
when in reality they ought to focus on learning and work.  The readers
in the audience know it, and they should just refrain from applying
their old conventional wisdom.

One important aspect to learn is that Emacs offers a paradigm that is
impossible to replicate in other editors, so if you are coming from
something like `neovim` you should know to do things differently.  For
example, `C-x C-f` and `C-x p f` serve different purposes.  They split
the functionality that was entwined in `telescope` and provide two
situational niches.  Rebinding `C-x C-s` is not too important, because
you have other options; for example, you could enable
`auto-save-visited-mode` and automatically save your progress after a
period of inactivity.  What I have in my dotfiles is a function
`full-stop` that is triggered once I hit `.` twice.  This cleans up
whitespace, runs a `langtool` check on the buffer, and then saves the
buffer too.  The two approaches are not mutually exclusive.  And to
obviate the need for a complicated and complex heuristic, the same can
be said of version control, and commits.

Another commonly confusing aspect is that Emacs doesn't provide a tab
bar.  Firstly, it does, secondly it doesn't need to, because the tab
bar is fundamentally less efficient than the currently existing
interaction model with the buffer selection done via
`completing-read`.  It is more efficient, because you can trigger a
move to a new buffer from any state with `C-x C-b` and knowing the
first few letters of the buffer's name.  And that same menu is
equipped with smart heuristics that allow you to switch in some common
use-cases even faster.  Switching to the previous buffer is just `C-x
C-b RET`.

A similar approach works with many other aspects of Emacs, and I will
keep detailing them.  Suffice it to say, if you think that something
is ergonomically non-viable, it is probably because someone has come
up with a better option.
