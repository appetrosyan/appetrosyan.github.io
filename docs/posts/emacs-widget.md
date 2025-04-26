---
category:
  - Emacs
  - Work
  - Tooling
date:
  - 2025-04-26
---
# The Emacs widget toolkit

In this blog post I outline the consequences of several months worth of deliberation and dumpster diving into the Emacs display code.

In this article I shall outline the potential direction in which to take the Emacs widget toolkit, a plan to revitalise Emacs and get it to a state that would allow newcomers to appreciate it for the marvel of engineering that it is.

But first let's talk about problems.

## "All that glitters is gold"

Emacs really isn't ugly.  It's a bit old fashioned, but in a way which gives it a certain vintage, and is retro-cool again.

Most people would argue that lack of animations, or other bling is a huge detractor from Emacs' appeal, but that is neither true, as we have some pretty cool SVG-based themes, nor long-term appropriate.  Emacs isn't about the visuals.  It's not your typical Bugatti, it's a Ferrari F50.  It's ugly, but it's a car that you will learn to appreciate from the inside.

So if Emacs' problems aren't about the visuals, why bother with a widget toolkit?

### GTK was a mistake

Simply put, GTK is a case study in how not to design a widget toolkit.  Its one saving grace is that it provides a C-ABI meaning that you only need some small tweaks to your programming language to create a program that links against system GTK libraries.  That is the only reason why GTK is represented anywhere.  It's cheap and easy to set up.

For a while, given Trolltech was prone to trolling people and threatened to make Qt proprietary (which they still can, BTW), the great schism and a break off from the C++-based toolkit happened back in the day.  The idea was, that GTK would be GNU's native toolkit, and everything would be in GTK.  The GNU Network Object Model Environment happened, and promptly things felt as if they could actually work.

Unfortunately Gnome 2 wouldn't last, and the days of sensible development practices, mutual begrudging respect and productivity would be supplanted by what we have today.

The GTK toolkit, originally Gimp Toolkit (and I'm not sure whether its current condition in relation to the GNU Image Manipulation Program is ironic), is where the problems begin and end.  It is the alpha and omega of the reasons why people choose to avoid designing cross-platform native programs, and instead focus on squashing Chrome into a package, with some web pages that seem to be the minority of the code.

This toolkit has an uncanny ability to throw away perfectly working code, break backwards compatibility, and somehow make it look that older programs working worse on the newer toolkit is _somehow_ not GTK's fault.

It's a dynamically linked library, that has retained basically no ability to run older programs.  The number of features that have been supported before, that have proven to be worthwhile in other areas, such as complex programs, have been stripped.  The development team seems to believe that like Apple, they are capable of producing simple programs that fade into the background and that need no configuration, being opinionated to the point to which their design is the only thing that you can see.  GTK's principled stance of not being configurable, coupled to lack of resources to do the legwork to actually not require configuration resulted in GTK programs having to play a perpetual game of catch up, and not knowing what would be stripped out next.

The people defending GTK's policy seem to buy the front page lie and not dig deeper.  The toolkit is not minimal, as it doesn't minimise the attack surface nor does it provide a small but stable set of features that one can rely on.  There are major versions that are offered as a take-it-or-leave it kind of upgrade, with a considerable amount of sane engineers, (Linux Mint) taking the third route of the software engineering equivalent of a middle finger.

Gnome and GTK are not the same; in the sense in which the left hand sock puppet is not the same as the right hand sock puppet.  The same bad ideas abound in both projects.  Opting into one, opts you into the design "philsophy" of the other.  And there are multiple examples of this tight coupling being a good idea: Apple does it well, as does Microsoft.  And Google, for all its faults, and all of its inconsistencies, at least provides you with enough breathing room to follow or ignore their guidelines.  Not so on Gnome.  Not so on Flathub, and transitively, GTK programs that do not fall into their pseudo-minimalist bin, are considered lesser.

### GTK was a mistake for Emacs

Usage of GTK even quite recently seemed like a good idea.  To put things into perspective, Desktop Linux is experiencing a shift towards Wayland, a protocol that replaces X11's current monopoly with an olygopoly of compositor implementations.  This means that some things that used to work one way, now work a different way.  For terminal UI Emacs nothing changes, but for the GUI program proper, some changes are in order.

So instead of diving head first into Emacs, adding the conditional compilation directives and trying to fix the unfixable, it was decided that piggybacking on GTK, which not only implemented, but also seemed to dictate many of the protocols, is a good idea!  Splendid!

Except the end result is anything but.  The PGTK port of Emacs offers few if any discernible advantages.  It offers slightly less terrible font rendering (still off compared to WebRender and Qt), it unbreaks the clipboard.  The list of cons is much longer, as
- this build is not standard,
- does not work on X11, and there is a message saying so, that cannot be disabled,
- it is more prone to lag, because the UI thread does more work per draw call
- it cannot be resized on KDE plasma, only maximised and minimised;
- it comes with a long-standing bug that would ensure that crashing the display server will take down your emacs server,
- it barfs an inordinate amount of warnings into the terminal that can neither be fixed nor silenced,
- it is barely themable, and the GTK theme can easily contrast the rest of your emacs;
- it is a moving target, because current Emacs links against GTK 3 not GTK 4.  The fifth version is very much on the horizon

But is this because Emacs doesn't utilise GTK to its full potential?  I would argue that what GTK offers is too little to warrant its usage.  The _one_ thing that can serve as a compelling reason not to use that particular implementation is that the Lucid toolkit looks a bit outdated, which I frankly find funny, given the fact that the chrome of Emacs takes up a minuscule fraction of the view.

The reason why Emacs doens't feel like a graphical program has everything to do with the fact that GTK doesn't offer much of anything.  You are still more likely to use `consult` or `dired` to open a file, because the graphical `open file` dialogue seems to follow a set of heuristics.  You are unlikely to use the tool-bar, because the toolbar rarely has well-designed icons and rarely responds the way it ought to to changes.  The `customize` interface uses textual facsimiles of actual widgets because GTK would simply not allow that level of control from Elisp that you would need.  Any attempt at bringing the minibuffer into a purpose-built UI element results in misbehaviour, promptly moving the user back to using non-`posframe` tools.  The package `alert`
that was designed to provide notificaitons is less reliable than wrapping `notify-send` in Elisp with a few lines of code.  The keyboard event processing is still done in a custom way.  None of the UIs make use of the GTK subset of functionality with the Emacs Application Framework opting to use Vue and/or PyQt for its display.  The Emacs' built-in terminal emulator does not use VTerm by default, and only does so when a third party package is added.  The best way to add tabbed views is by emulating them in text.  The best way to play tetris is not to use GTK's built-ins.

The menu items also don't benefit from GTK nearly to the extent to which they should.  The way in which the shortcuts are displayed has to by-pass the way in which it is done on GTK, resulting in a noticeable delta between say `Ctrl+Shift+F` in Inkscape, and `C-M-f` in Emacs.  The menu bar is unreliable, so you cannot control it from a global menu shortcut on _e.g._ KDE plasma, whereas that same feature seems to work pretty well on Mac OS.

Things such as smooth scrolling and OS-specific graphical applications for _e.g._ picking colours are also somewhat absent.  Smooth scrolling isn't smooth, it simply allows you to go over fractional parts of text, which is neither beautfiful, nor practical.  There's no discernible support for alternative input measures such as touchscreens and joysticks.  There's nothing!  Which begs a genuine question, what _does_ Emacs get from using GTK?

And the reality is that the number of answers to this question is ever diminishing, and unlikely to improve unless both GTK and Emacs make a sharp turn.  So if you came to this article wondering why not simply fix the PGTK build and move on, you would now know that it simply doesn't solve the problem.  At all.  A GTK-like toolkit simply doesn't serve all of the purposes that Emacs needs.  And frankly, given the level of in-depth customisation and control that Elisp offers, I doubt any mainstream toolkit can do it either.  So no Qt port.

## Yes, there are two paths you can go by...




In this section I shall outline the two most likely avenues which we can take in order to get Emacs to be more flexible and let it be more of a graphical program that has WYSIWYG features, and less of a fancy wrapper around text.

### Why plaintext is king

The reason why plaintext is a staple of most Unix programming and of Emacs especially has to do with its universality.  There is a standard, UTF-8 for a standard charset -- Unicode, that renders everywhere.  The interaction modalities are more-less standard too.  You have functions to go left and right by characters, an understanding of how lines work, meaning that you can visually traverse upwards (which Emacs didn't always follow, but defaults to now), there's the understanding of word wrapping, line feed characters, how tabs work, how spaces work and given a monospace font, these give a very comfortable regular and coherent environment.

Any function that in Emacs operates on plain text, can feed that information back to `dired` and do bulk renaming and editing.  If there is a representation of text for a thing, you can edit that textual representation, convert back and presto.

This allows UTF-8 to be a universal langauge for data representation.  Things like Copy, Paste, Cut, Delete, and the `self-insert` behaviour of most keyboards allow you to have a small set of transferable skills that let you interact with most data directly.  If you want to create a program that edits say Video tags on files in Emacs (incidentally on my to-do list), you can do so by allowing predictable, universal navigation that you don't even really think about.  Plus, these verbs augment one another.  Learning how to go `forward-sexp` teaches you how to do so in an environment of FORTRAN, Algol, C, Rust Elisp and file names.  If something's behaviour is context sensitive, one must be careful to provide a tutorial, even though strictly speaking, the best way to learn is by observing, the blinking cursor (point), the row-column layout of monospace font and a few other tricks, give everyone a familiar place to be.

The GUI does not have a similar set of verbs.  If I wanted to hit a specific button, there's _some_ chance that the graphical toolkit would provide me with buttons that I can hit with my keyboard, but those buttons seem to be arbitrary, and only revealed when I hold down `Alt`.  Those can lead to efficient shortcuts, but most of the time, these are based on blocking operations, so if I want to run a shortcut buried deep in a menu, the sequence of things that I would need to type with `Alt` held down is very long.  Plus, not all operations are represented as menu entries.  On the web, the best you can hope for is that the person designing the program gave you a requisite number of hints, the requisite number of objects are given the focus ability, and that you don't need to hold down `Tab` for too long until you inevitably miss the button you wanted to press.  There's very little control.

To the layman this difference is not a big deal, but as an Emacs user, these differences will add up, and you will start longing for a simpler time when everything was a text buffer.  This does not mean that toolkits are inherently incapable of the same form of uniform navigation.  After all grids are ubiquitous, odd co-ordinate systems with hexagonal shapes are not that common, and if the text is non-monospace, where you go and where you think you go isn't always transparent and 1:1.

Yet, there are few if any toolkits that offer sufficient levels of control with the keyboard and with the mouse, so that you technically cannot replicate the power of Emacs with graphical toolkits.  Hell, just navigating them with a controller involves you trying to emulate a keyboard.

So what do we need.

### Uniform navigation verbs

One of the key reasons why Emacs was great, and why its influence can be seen in Mac OS to this day is the richness of its navigation verbs.  You have your concept of moving forwards and backwards, you have your differences between words, lines, sentences and S-Expressions.  In theory (though not in practice) if one's UI verbiage is standard, and it mostly is, you could define these things in a similar fashion.

Packages such as `avy` allow one to have random access to anything on-screen.  They are the ultimate navigation aid, but also not what peoeple use intuitively.  This is the verbiage that is still present in KDE, for example, where a word of a certain thing is highlighted with an underscore to signal that you can hit `Alt + <that key>` to use that object with text.  This is a limited form of navigation because the number of symbolic interactive objects is non-zero.  While focus can replace the point, in Emacs verbs, the point can be on a number of things simultaneously.  It can be on a page, it can be on a file, it can be on an identifier, it can be on a selection in the minibuffer....  The verbs in GUI programming are quite limited, and so if we want to move the needle and provide a rich-enough system, we would need to create the equivalents.

A further constraint is that the interaction needs to be natural.  And this is where the fact that Emacs **used to** emulate many graphical elements by way of text comes into play.  Grid layouts are ubiquitous.  As are rows and columns.  There are groups and containers.  All one needs to do is to designate a primary function button to make the interaction work, which fortunately we already have in the form of `<enter>`.  It may be worthwhile to trigger certain functions directly, and there must be a way to designate what functions are bound at any given time, but to be quite honest, these are quite easy to categorise in Emacs specifically, thanks to its reliance on `everything-is-a-function` paradigm.

These are not just going to be used in specialised modes.  LSP provides multiple interactive elements overlaid on top of the text in the buffer.  Expanding that information, making sure that it is as widely usable as one can make it, and decoupling that functionality from the LSP and moving it into the major mode, seems to align with Emacs' core values.  This means that convenient UI elements that guide you towards not making silly mistakes, and get out of your way, without inherently making your life miserable by abusing the draw time budget is the way to go.

The gap buffer seems to work well for text, but a buffer can be polymorphic.  This would be a necessary change to Emacs for the Graphical UI to work directly, but can be postponed.  The amount of code changes, if done correctly should be transparent to the user and simply improve the efficiency of low-level drawing APIs, without affecting the high-level.  This is the point, we cannot break user space.  Especially given how Emacs' users are resistant to change.

### SVG

The first approach in which this can be accomplished is already somewhat prevalent.  You simply add SVG to the buffer and lay things out inside of it, by manipulating the objects.

This is not necessarily what I have in mind, but if it is sufficiently efficient, it _could_ work.  Simply put, the vast majority of the heavy lifting, including things like layouts and rendering the vector graphics are done for us.  They are consistent across platforms and this, if a bit computationally expensive, if properly orchestrated can work wonderfully.  So what if it's _a bit_ inefficient.  Compared to HTML, it's still faster.

The drawback of this approach is quite obvious.  This only limits us to what SVG can do.  And certainly there is a ton of media that we can be embedded, but that media needs complex interactivity.  Otherwise, a simple solution to all of these problems would have been to simply create a JPEG of the layout and display that instead of the main window.


This is not a bad idea in principle, but it is much more likely to work with minimal effort, as the community is already  moving in that direction.  There is Nicholas Rougier's excellent work.  There are projects such as `nova` that allow you to do wonderful things with the minibuffer (when it decides to work).  There is comparatively rich set of verbs that can be made accessible by means of SVG embeeded into the text of the code and prose that would allow one to do many things.  Certainly those are not ideal, but they are better than nothing and work in that direction can already begin.

My friend, Divya Ranjan already has a fully-functional portable PDF reader that is much better than any of the other solutions, which relies on SVG.  Expanding the amount of work that is done in that area is perhaps not an idea that we need to dismiss outright.

However, one needs to recognise that this is a common trap that many fell into.  The principled difference between using a browser window to display text and using SVG to display the contents of a buffer, is that HTML + JavaScript have been co-evolving over a much longer period of time, and Elisp + SVG and their early infancy as a duo, despite both standards practically solidifying.

Another issue is the problems of efficiency.  Rendering SVG is a blocking process.  Emacs does not have a reliable-enough `async` runtime that would allow the jagged edges of the inefficiencies to fade into the background.  Moreover, overreliance on SVG to do everything, can result in double jeopardy: SVG can change and Elisp libraries can change too.

Plus fundamentally, this prevents certain kinds of optimisations that are specific to one kind of application.  The most natural way of expressing an idea may prove to be inefficient, as such hacky approaches such as using an NPC with a hat like a vehicle are to be expected.  This is not a problem for solo projects, but being limited to solo projects precludes certain kinds of quality-of-life packages from being provided by default.  I would happily do much of the work to design a future where SVG plays a bigger role in Emacs, if I didn't know for certain that it would end in catastrophe same as the original hack of using text to render UI elements for `customize` lead to it almost never being used.

I want something far superior.

### A custom toolkit

At this point I may have demonstrated that it may be quite a good idea to divorce Emacs completely from any pre-existing libraries and try to do its own thing.  Not to say that necessarily that needs to be coupled to the text editor, more so that Emacs could be the next chrome, and if one plays their cards right, electron programs can be supplanted by Emacs programs.

For this to be effective, much work needs to be done.

Radically expanding the programmability of Emacs, needs to understand the grand benefits and drawbacks of its main feature: Emacs lisp.  Much like JavaScript Emacs Lisp is a programming language with many design decisions based on an improper evaluation of what future programming would look like.  Unlike JavaScript that did so because of the self-imposed compressed deadline, Elisp has the benefit of being old and shoving most of its inconsistencies into the bucket of "technical debt", when in reality fixing those issues is both trivial and frankly would have happened if there weren't a vocal minority of "greybeards" (ironic), that prefer the defaults to stay the way they used to be.

Emacs needs a low-level custom toolkit.  It needs to be able to draw from Elisp and draw very well.  We need something that is comparable to SVG, maybe not in terms of language, but in terms of purpose, richness and structure.

While it may be tempting to say that this is impossible, there have been even more ambitious projects that have been attempted, implemented and released.  The problem is the framing and lack of planning.  There are projects doing something similar that have no scope, no idea on how much time would be needed, no finish date and no quantifiable progress report.  The project needs to be good enough so you could do a fundraiser and ask programmers of varying backgrounds to donate their full time.  And I do mean it.  You can't do something like this on the backburner, believe I have a huge backlog of much less ambitious projects.

So what needs to be done is a complete retooling of the display code.  I believe the right approach is to
- Use SDL directly to have cross-platform, but extremely low-level APIs.
- Expose the low-level API to Elisp, but allow statically linking and interacting with said APIs using Emacs' module system.
- Institute an Elisp-based message passing system that controls the UI.
- Extend the existing keyboard system to work with other input methods, like e.g.  the Steam Deck controller.
- Create a minimal Elisp-based QML-style layout definition language that uses a much reduced system for theming.  We don't want/need full-blown CSS, but inheriting faces and overlays can be useful.
- Document the hell out of it, with examples and tutorials.

In principle having a low-level API that allows you to take an idea to an Emacs package to something that can be executed standalone is not an impossible task.  In principle Emacs can still reign supreme if one could quickly whip up a GUI for some common task.  In Elisp much of this is already possible, but the reduced functionality and expressiveness of languages such as C and C++ shows and makes creating a functional GUI a problem.  Qt can't do it without the Moc.  GTK has to emulate a pseudo-class-based OOP environment for the program to even work.  We are in a much better position with that in mind.

So what does this mean.

## There's still time to change the road you're on

I've done a bit of research into Emacs' code base, and would like to share my findings.  Sadly, they would be too dry.  Think of this as the beginning of the Emacs widget toolkit manifesto.  An attempt to create something good.

I have every intention of publishing a more-in-depth exploration of what's happening under the hood, and where wedging ourselves in and doing some low-level programming wizardry would be great.

What I will also need, is some feedback.

If you are reading this, I accept anonymous (and otherwise) suggestions at

appetrosyan at linux full-stop com

You really ought to make your opinion known on the following topics.
  - Desire to help as an Elisp programmer
  - Desire to help as a C programmer, with knowledge of SDL.
  - Desire to help with fundraising
  - Desire and ability to write documentation.
  - Ideas for how the Elisp API should look like.

This is hopefully the first of many posts on this topic.  I sincerely hope that I can get a comments section on my personal portfolio site up and running, so that you can provide feedback much sooner.  Overall, I hope that this journey is going to take us to a wonderful place.
