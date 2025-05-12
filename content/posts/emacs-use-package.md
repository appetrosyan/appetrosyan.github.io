+++
date= 2024-07-24
title = 'Declarative configuration in Emacs'
+++
# Declarative configuration in Emacs

In Emacs, it is often easiest to install a package in one's
initialising configuration file; also known as `init.el`, usually
located at `~/config/emacs/init.el`, but also historically at
`~/.emacs.d/init.el` as under a different name `.emacs`.

This file is responsible for reading your persistent configuration and
is often written to by your resident Emacs binary, on first launch and
after you've made some customisations.  It is configured in Lisp,
which is both a data representation format (Symbolic expressions), and
a programming language.

Some of the customisations pertain to the Emacs built-in
functionality, and when we come to `eglot` we'll see how that goes,
but some packages, specifically, `lsp-mode` are not included in the
somewhat large binary that _is_ Emacs these days, so they need to be
installed externally.  That is basically what `use-package` is doing.

It is not a package manager, but more of a method to keep your
configuration file tidy.  It allows you to declare configuration that
is local to a specific package, so that you could, in theory at least,
remove the entire form and have a clean and working configuration
file.

`use-package` for `vim` users is like both `lazy` and a weird
package-specific configuration template syntax.  It is quite weird by
Emacs standards as well, and not [universally
well-regarded](https://protesilaos.com/codelog/2022-12-19-re-questions-use-package-emacs/).
My personal thoughts are that it is standard enough, that people
should default to it, and only under some circumstances opt for
something else.  Unlike `vim`'s audience which is split down the
middle on vimscript versus lua, and then fragmented further into
specific package managers, with `lazy` being my personal favourite,
Emacs is remarkably centralised.  This has benefits, you can usually
grab code directly from the README and it would work.

The main drawback is that you do need some baseline proficiency in
Emacs.  I will try to be as newcomer friendly as possible, targeting
the level of knowledge that I developed when I was determined to use
Emacs full time, but before obtaining any major skills.



## Basic installation

Suppose you found this neat little package X on the web.  And it says
in installation that you can install it from GNU ELPA.  Well, now you
have a classic case for using `use-package`.

```elisp
(use-package X
  :ensure t)
```

is all you need.  You can write this anywhere in Emacs, yes even in
your current Rust code project, and hit `C-x C-e` when you're at the
closing parenthesis (or `C-M-x` if you're inside the form.  What will
happen, is that Emacs will show that it contacted some internet
resources, with the intention of downloading the package.  At some
point it will have installed and you're golden.

Now obviously, you may want to know what `:ensure t` means.  It is the
rough equivalent of `"ensure": true` in a Python dictionary, or JSON.
`t` is the conventional value for `true`.  Though others as we shall
see, are acceptable values for that form, using them is usually a bad
idea, unless you know precisely what it does.  The reason is that Lisp
is loosely typed.  You can have polymorphic values like `t`, or a
list, or a structure, or many  other things.

Now, `ensure` in this case should be read is "if it's not installed
already, install it".  As you can expect, this will install the latest
version that is available in the package archives.  This does not
usually result in upgraded packages, and it's highly recommended to
keep them up to date manually.

So what packages can you install that way?  See for yourself, `M-x
list-packages`.  All the known package archives are scraped, indexed
and all the available packages are listed.  From this interface you
can install the packages that you want, but if you do it **that** way,
your configuration will become messy.  Nothing wrong with it, but most
people prefer to do it the other way.

## Expanding the scope of available packages

There are two major ways to extend the scope of packages available for
installation on Emacs.  The first and up until very recently the main
way is to enable the MELPA and NON-GNU ELPA (Emacs Lisp Package Archive).

The way to do it that works in my configuration file is
```elisp
(require 'package)
;; Any add to list for package-archives (to add marmalade or melpa) goes here
(add-to-list 'package-archives
			 '("MELPA" .
			   "http://melpa.org/packages/"))
(package-initialize)
```

This is normally enough for 99% of the packages that you would want to
install.  I try to post mine to MELPA as soon as they're ready.
Another good reason to stop at this is because MELPA packages go
through a thorough vetting process and will not get accepted if they
have major problems such as gathering user data, doing something
nefarious with one's machine, misuse the Emacs APIs or just contain
plain low-quality code with poor naming conventions.  I've gone
through this process more than once, and I trust most of my
`use-package` forms a lot more because of it.

I will say that this is not the only form that I have.  To test my own
packages, I often use the `:vc` keyword, which is fairly
straightforward.
```elisp
(use-package disposable-key
  :ensure t
  :vc
  (:url "https://github.com/Greybeard-Entertainment/disposable-key.git"
		:branch "barba"))
```
The `:vc` lisp form is equivalent to
```json
"vc": {
  "url": "https://github.com/Greybeard-Entertainment/disposable-key.git",
  "branch": "barba"
}
```

which as you can already tell is quite easy to grasp.  Most modern
languages differentiate between elements in a list `[ ... ]` and
fields in a structure `{ ...  }`, while Lisp uses parentheses for
both.  Sometimes, you will see an odd square bracket, but that's a
rough equivalent of a list, it's just stored differently.  So for any
package that you fancy, including your own code, you can simply
install it from a `github` repo, same as with `vim`.  The major
upside, being that MELPA offers a high standard of baseline quality.

## Recommended zero configuration packages

This is a curated list of packages which in my opinion do not require
any configuration beyond the basics.

### `rmsbolt`

Most packages are incredibly easy to install, and here are some
examples.  `rmsbolt` adds a function that you can call with `M-x` that
gives you the local disassembly of the binary program that you're
viewing.  It's not as sophisticated as the compiler explorer, but if
you know how to read assembly, you get most of the benefit, without
also having to strip your project down to compile in the window.  That
is, it can be used for production code, and not some examples.  This
is quite an important distinction, because I often have to argue about
compiler optimisations for things which are specifically exposed to
the compiler.

### `key-quiz`

Quite a useful package.  It is not as impressive as the others, but
you will start feeling its presence if you get into the habit of doing
a drill or two a day.  I did not have it, when I got started with
Emacs, and I wish packages like it were considered more early in
development.  Obviously the Emacs tutorial and books such as Mastering
Emacs are great at giving you a more holistic understanding of the
core essentials, but I also have many packages which provide far too
many functions to list.



### `vundo`

Just a powerful reminder of the difference between Emacs and other
editors.  This package provides a command `vundo`, which would let you
traverse the various states that your current file is in, based on the
`undo` history.  In situations where something like a version control
system _e.g._ `git` are not reasonable, this package helps quite a
bit.


### `simple-httpd`

This is not as useful if you plan to use `python`, and probably a lot
less documented.  But I like it.

### `diminish`

It is not useful on its own and it doesn't provide a function that you
can call with `M-x` but instead it is a package that will be useful
for the rest of this tutorial.

It removes a small notification at the bottom panel of Emacs, known as
the mode line.  These are initially very useful, but you will soon
find that many packages, including mine, don't provide a meaningful
interaction with the mode-line "lighter", though some do.  To
differentiate between those modes that provide a lighter by
convention, I will add the `:diminish` keyword in the `use-package`
forms.

## Configuration basics

The only other two keywords from `use-package` that you **need** are
`:config` and `:init`.  There is a subtle difference, but for the time
being, consider them as universal keywords that state that everything
after them, is to be executed verbatim, when the package is loaded.

There are a few typical cases for how this is supposed to be operated.
There are some packages that need to be enabled in addition to being
installed to take effect.  A good example of this is `dirvish`.

```elisp
(use-package dirvish
  :ensure t
  :config
  (dirvish-override-dired-mode))
```

We already know that `:ensure` installs the package if it's not
installed, and for the package to take effect, you call
`dirvish-override-dired-mode`.  By convention, functions that end in
`-mode` toggle the behaviour if called without any arguments.  To have
more certainty, you could modify the call to look like
`(dirvish-override-dired-mode +1)`.  This, conventionally modifies the
mode to be enabled if not already, and to stay enabled.  Similarly,
`(dirvish-override-dired-mode -1)` would unconditionally disable that
mode.

Quite useful I must add.

Almost everything that you would want to do with `use-package` you can
accomplish with the `:config` keyword, though obviously using the
purpose built keywords has its advantages, one key benefit that is not
replicated in any other editor, is that you can evaluate the forms
written in `:config` regardless of the surrounding context and they
will still work as intended.  Specifically, you can put the cursor
after `(dirvish-override-dired-mode)` but before the overall closing
parenthesis (again Lisp convention), and hit `C-x C-e`.  This will,
show you messages in the `*minibuffer*` about the mode being enabled,
then disabled, then enabled again, depending on how many times you
evaluate it.

One key benefit of not writing this code outside the `use-pacakge`
forms, is that if you add `:disable` keyword to it, that code will not
be evaluated.  This allows you to keep historical configurations for
older packages, without them necessarily slowing the startup time of
your Emacs (which is probably symptomatic of an XY problem, but we'll
talk about optimal usage later).

Now in some cases, you might want to have a few variables set within
the configuration, for example

```elisp
(use-package cape
  :ensure t
  :init
  (add-to-list 'completion-at-point-functions #'cape-file))
```

For the package `cape` to work, which is a completion package, you
need to add `cape-file` to the list of
`completion-at-point-functions`, _i.e._ functions that get called to
get completion candidates for the current cursor (point) position.
But, that doesn't mean that you cannot, for example.

A similar form is for `dumb-jump`
```elisp
(use-package dumb-jump
  :ensure t
  :config
  (add-hook 'xref-backend-functions #'dumb-jump-xref-activate))
```

This adds a package-provided function to another list, list of
functions that get executed once the `xref` built-in mode is activated
and loaded.

In fact, `-hook` lists are quite common and quite useful, used
extensively enough to have their own keyword that we shall talk about
later.

Incidentally, what this does is also important to understand.
`dumb-jump` is a very basic provider for the `jump-to-definition`
facilities that Emacs comes with.  Instead of providing its own
`dumb-jump` to definition, it instead relies on the fact that you will
use `xref-find-definitions` and other related functions and all that
this package, `dumb-jump` provides is a way to obtain the information
in cases where you might have no other source, for example, if you use
a very esoteric language.  I found it very useful for dealing with
Rust projects, because the heuristic needed to jump to definitions
locally is actually quite simple thanks to the language design.

### The `:hook` keyword

This is a very easy to understand keyword.  Suppose you want some
function to be executed right after a mode is enabled.  For example,
you want to enable an auto-format-on-save package that is extremely
fast, called `apheleia`.  You know that you are mostly going to work
with Rust, C, C++, Emacs lisp and don't know if there are good
autoformatters for other languages, so even though you could
**theoretically** autoformat Python, you'd rather do it manually.

Well, this is the right job for the `hook` keyword.

```elisp
(use-package apheleia
  :ensure t
  :delight
  :hook
  ((rust-mode . apheleia-mode)
  (emacs-lisp-mode . apheleia-mode)
  (c-mode . apheleia-mode)
  (cc-mode . apheleia-mode)))
```

Now can lisp go five minutes without introducing weird syntax?
Unfortunately no.  But mostly for good reasons.  Remember I told you
that `:ensure t` can be considered the rough equivalent of `"ensure":
true`?  While I didn't exactly lie, that _roughly_ is doing a lot of
work.  Lisp is largely unlike any other language, while some features
were eventually adopted into other languages, most were not.

The thing that goes after `:hook` in this case is a list of lists.
The lists are all two element wide, and the first element is the hook,
the second element is the function that is to be called when that hook
is triggered.  So, specifically, we run the same mode, `apheleia-mode`
for each of the `rust-mode` `emacs-lisp-mode` and so on.

Now, we've seen how to `add-hook` in the `:config` form, and it's
quite different, but why is that?  `use-package` is a macro.  It takes
things that look like code and converts them into actual code.  It
just so happens that the code that you would write in order to install
a package if it's not already installed is always the same, so it
makes sense to hide it inside a macro.  So does it make sense to hide
the common boilerplate for the actual invocation of adding a function
to a list of hooks.

However, this is a teachable moment.  Notice that when we called
`add-hook` we called it for `xref-backend-functions`.  If we tried to
use the `:hook` keyword in `use-package`, because of an annoying
architectural decision, you would get an error.  The `use-package`
macro, by default, assumes that when you say

```elisp
:hook (x-mode .  y-function)
```

that you mean to attach a hook to `x-mode-hook`,

```elisp
(add-hook 'x-mode-hook 'y-function)
```

because that is the convention.  Well, sometimes, the convention is
not followed, so you kinda have to use `:config`.  Obviously this
behaviour can be disabled by configuring `use-package` itself, but I
think that _that_ is an **even worse** architectural decision:
`use-pacakge` forms must universally mean the same thing.

Now, you probably know that each major mode, conventionally provides a
`hook` to be called once the major mode is fully loaded, but there are
other useful hooks.

`after-init-hook` is useful when you want to run a function after
Emacs is instantiated.  This is useful when you don't want to block
the startup with an expensive function.  `suspend-hook` is useful
because it runs the function before Emacs is suspended, when you want
Emacs to suspend.  `kill-emacs-hook` is useful because it runs the
function before Emacs is exited, when it is exited gracefully.  Do
with that information what you will, but I will caution against using
these hooks extensively, without testing.

### The `:bind` keyword

Suppose your package provides a function that is used far too
frequently and randomly to be called from `M-x`.  This is quite
common.  You can bind these functions to keys, using the `:bind` keyword.

```elisp
(use-package avy
  :ensure t
  :bind
  ("C-l" . avy-goto-word-0)
  ("M-l" . avy-goto-char)
  ("M-g c" . avy-goto-char)
  ("M-g M-g" . avy-goto-line)
  ("M-g m" . avy-pop-mark))
```

This is a bit different from the previous keyword.  Well, not quite,
this kind of syntax without the overarching parenthesis is still
accepted by the `use-package` macro.  The main difference is that now,
each line is evaluated sequentially, and added to a list of lists,
just as before.  Except now this list of lists is explicit.  If you
ever saw a documentation string that mentioned the dreadful `&REST`
this is what that looks like on the calling end.

The fun thing is that this is easy to understand and read, much more
so than the `:config` form would be.  Specifically,

```
(global-set-key (kbd "C-l") 'avy-goto-word-0)
```

Notice, that it sets the key in the global key-map.  This can be a
problem, if the function that you're binding is dependent on a mode
being activated.

`avy` is a package that by all accounts should replace keyboard
navigation.  It has for me.  It can operate in situations where no
minor mode is enabled, and the function `avy-goto-word-0` is simply
loaded, if and when the key combination `C-l` is invoked.  Remember I
told you that I think `use-package` is far superior to `lazy`, that's
why.  But sometimes, there must be other setup that needs to happen
before a function can be invoked.  The relationships are quite
complicated, so it is usually a good idea to make use of another
convention:

```elisp

(use-package lsp-treemacs
  :ensure t
  :bind
  (:map lsp-mode-map
		("C-`" . lsp-treemacs-errors-list)))
```

This is equivalent to
```elisp
(define-key lsp-mode-map (kbd "C-\`" 'lsp-treemacs-errors-list))
```

And this key binding is only valid, for as long as the `lsp-mode-map`
is active.  Meaning that if `lsp-mode` is disabled, this binding has
no effect.  The key combination does what other bindings specify and
only overridden if and when `lsp-mode-map` is activated.

Incidentally, this form allows me to hit that convenient key to list
all errors as reported by the resident Language server.  This is quite
equivalent to running `compile`, a built-in function but we will cover
that in a separate topic.

I will assume that you know how to write key bindings, but just in
case, if you need a complex key combination, angle brackets are your
friend.  If you end up adding a rogue space somewhere, `C-q` allows
you to enter the character regardless of what it is bound to, and I
**strongly** suggest never rebinding this key under any circumstances.

### The `:custom` keyword

This is probably as advanced as you may need to go, anything more
in-depth is probably best suited to a time when you're simply
comfortable reading the README from the official GitHub.  This piece
of information can save you hours of debugging, so I recommend that
you don't skip over it.

The final special case that is handled by its own keyword and for good
reason is the `:custom` keyword and it interacts with the Emacs'
customisation user interface.

Long ago, it was envisioned that Emacs was a graphical text editor.
Indeed, it still has many of the advantages of one, particularly when
it comes to rendering multiple typefaces of different sizes and
proportions, having graphical dialog windows, handling the `clipboard`
in a civilised fashion, and many other things.

Before the GTK version became the predominant version of Emacs to be
shipped, there was an attempt at creating a Graphical user interface
with only Emacs Lisp and the text editing facilities.  This gaves rise
to many packages, some good, _e.g._ tetris, some bad, _e.g._ "simple
calculator" and some which are just plain ugly, and unbecoming of a
text editor with the legendary status that Emacs has achieved.

The `customize` interface is one such package, which sadly, became
standard in Emacs.  To invoke this, simply call `M-x customize` and it
will present to you what looks like a sensible GUI, that is until you
try to type text into what appears to be a text box.  The only reason
to ever touch it, is to find what customisable variables exist withing
certain packages.  But what constitutes a `customizable` variable.  To
put it simply, when you call `setq` on a variable, the only thing that
can happen is the change in state of that particular variable.  The
changes propagate up until the functions that are invoked later that
read that variable.  In their infinite wisdom, the people designing
Emacs, have decided that it is a great idea to institute another way
to set those same variables, that will trigger other code to execute.
The `customize` interface, will conveniently place any customised
variable at the end of your `init.el`, for you to know what other
differences between your regular out-of-the-box vanilla Emacs
experience and your personalised experience exist.

It is perfectly acceptable to keep those variables in a giant block of
symbolic expressions at the end of your init file.  It is perfectly
acceptable to even `setq` most of those variables instead of going
through the `customize` interface.  However, for the perfectionists
among you, that see this as a grand violation of the celestial
mechanics of Emacs, there is a specialised keyword, called `:custom`
that accepts yet another form of argument.

```elisp
(use-package eldoc
  :ensure t
  :custom
  (eldoc-documentation-strategy 'eldoc-documentation-compose-eagerly)
  (eldoc-echo-area-prefer-doc-buffer t)
  (eldoc-idle-delay 0.2)
  (eldoc-minor-mode-string nil))
```

This simply put sets the variable on the left, to the value on the
right.  The keen eyed observer will see that there isn't a `.` in
between the variables, that is because the `customize` function which
is invoked here, can accept an optional third parameter in each list
in the list of lists.  That parameter is almost never used, because
the only difference between it and a regular comment is that if the
value is further changed via the `customize` interface, the interface
itself will display that comment.  Given that I would recommend only
using `customize` for exploratory purposes, I don't find it
particularly useful.  Given the nature of Emacs it is universally
better to read the source code for the package, and find the
customisable variable, and then to decide what value is appropriate.
It is not that when the authors provide meaningful choices, that
having a drop-down menu is worse than typing the choice by hand; it's
that most authors don't bother.

Truth be told, any difference between `setq` and `customize` is an
anti-pattern, that relies on the assumption that a half-baked, semi
textual interface is better than nothing.  Technically, if utilised
correctly, it would, allow people who not only don't know lisp, but no
programming in general, to successfully use Emacs.  If all the
packages provided sensible customisation facilities, and that means
proper documentation, proper formatting, proper choices, and frankly,
proper channels to clarify some points without leaving the interface,
I would say, let's deprecate `setq`.  But, this is a half-feature that
only half the community cares about and even fewer people want
properly implemented in their own packages.

Creating an Elisp package is already a gargantuan task, for people
that are essentially doing it with no compensation, this is a standard
of practice that I'm willing to let go.

## Conclusion: when to `use-package`

Honestly, I don't believe that `use-package` is a panacea, and that it
should be applied indiscriminately to anyone's workflow.  It is
considered the industry standard, and there are good reasons, it
automates and abstracts the concept of a package, it allows
configuration to be local, and thanks to Emacs' excellent editing
facilities this means easy translation, refactoring, etc.

While it has its benefits, there are some key considerations to keep
in mind, when you as a new user will decide on whether to make heavy
use of this facility.

By avoiding the native Emacs lisp facilities for installing and using
pacakges, you as a new user learn less.  When I was getting started,
`use-package` was already prevalent.  As a consequence of never having
to install a package manually, that is downloading the lisp files and
extracting them to a place and then `require`-ing them, I've missed
out on quite a bit of organic learning.  When I started writing my own
Elisp, I found that I had not had the right exposure to the right
concepts, and thus had trouble.  In fact `use-pacakge`'s keywords are
the main reason why I had no idea that `global-set-key` was deprecated
in favour of `keymap-global-set`.  This seems small, but in hindsight
it really does result in a large amount of re-learning that could have
been subsumed into the configuration stage.

A slightly less important aspect of `use-package` is that you can not,
mostly, see the functions that are being invoked.  For example, you do
not know the exact mechanics of what `:custom` does.  You cannot
differentiate between `custom-set-variable` and
`customize-set-variable` unless you cheat and lookup.

Yet another problem, is that you cannot evaluate forms incrementally.
Given that Emacs is unlike most modern development environments where
"dirty" state is persisted, and the image of a machine can be
different from a linear sequence of steps, you miss out on a lot.
Batch processing is a standard, but largely because of convention, not
because that approach is superior.  In fact, incremental evaluation of
nested code, allows one to build up complex functions much more
rapidly and reliably, thanks to knowing exactly what each step is
going to produce.  This is not unlike the reason why it is customary
to create plain-text streams between programs in a conventional UNIX
shell script.

Finally, over-reliance on `use-package` has made it difficult for me
to move on to other editors.  I do not plan to remain an Emacsian
forever.  I find that it is worth exploring other ideas, and I would
not be able to do that, if I were bound by the same limitations as
Emacs imposes, even subliminally.

If I were just starting out, I would use `use-package` extensively to
see what packages are available.  But at the moment I had enough
interest so as to write custom Emacs lisp (which comes later than you
can imagine), you should drop `use-package` entirely, and attempt to
replicate your workflow in a purely function and not macro-driven
approach.
