---
title: A case against "Cat-v considered harmful"
category:
  - Suckless
date:
  - 2024-04-07
---
# A case against "Cat-v considered harmful"
## Introduction

This is a rant that's a long time coming, and it is a lukewarm shot at a community that I have a love-hate relationship with.  Sure, `cat-v` and by extension the good-old-unix hacker groups are quite interesting, and quite enticing to join, but I'm a little concerned with people who might take it more seriously than that deserves.

It's a collection of opinions. Those opionions are largely the personal biases of their authors, and the authors are entitled to their opinions. I don't agree with most of them, but up to a point, I believe that everyone is entitled to have their mistakes go unchallenged, especially in matters of taste.

However, an increasing number of young people are starting to take this blog of personal rants as gospel. This is a problem that might eventually become relevant for my personal blog too. And perhaps I find solace in the fact that I have instituted a clear delineation between what I consider facts, and what I consider opinions (hint, this is an opinion piece). Perhaps I'm doing humanity a favour. Perhaps, I'm just venting a frustration with a philosophy I don't agree with. Perhaps, I'm just fed up with the negativity being flung both ways and I want to hold the feet of these intellectuals to the  fire.

In any case, the philosophy is largely a following of Rob Pike, and many _many_ of his opinions are taken as gospel. So are Ken Thompson, and Dennis Ritchie. One ignores the fact that they were flesh and blood human beings, with extremely prolific mistakes. Namely the dotfiles; the convention of prefixing hidden file names with a `.` character is a convention that was the result of a programming shortcut due to Rob Pike.

They levy quite well-deserved critique against software of particular kinds, and sometimes provide more than a passing comment on why that software is to be considered problematic. More often than not it is either an appeal to authority, completely unverifiable anecdotes, hypotheticals and sometimes even assumed truths based on the attitude of the writer.

So I would very much like to address some of the comments.

## "Considered harmful" considered harmful

This is a well-worn trope. I would not deny that this particular expression was a good idea for the draft of this very page. However, one must note that Edsger Dijkstra (the author of the original piece), had a much more nuanced and balanced way of expressing their frustrations with `goto`. It was the (now late) Niklaus Wirth that decided to put the question of goto into acute focus.

Dijkstra's essay is a master-class in writing, that few people have actually read. Most who reference "considered harmful" in their own "X considered harmful" essays rarely if ever address the fact that Dijkstra front-loaded his concerns with concrete examples, did not prescribe particular solutions, and did not advocate for any one style, but rather invited the reader to consider using `goto` much more sparingly, if at all. His essay was all about engaging the reader in an active process of re-examining their assumptions and thinking. And people often forget that the cultural significance of this essay is precisely due to the thought process that was provoked in the then small community of computer programmers. The fact that Niklaus Wirth made the statement more inflammatory engaged the avid defenders of the opposite side, and sparked a discussion, which, if anything, is regarded as a documented reasoning as to why paradigmatic programming is useful, in that case, structured programming.

So why not `cat-v considered harmful considered harmful`? Indeed, that was the draft name for this article. But I later realised that this style of essays has gradually degraded in quality. To retain some connection to the original, and do a clever reference I decided to go with Edsger Dijkstra's original title template. Fittingly, I've also hand-written and digitised these notes, as opposed to writing them in my text editor. This is for a number of reasons, not least of which having to do with my increasing frustration with plain text.

On that note, I'd like to start this off by critiquing plain text.

### Plain text is limiting how we think

It is blasphemy to tell someone who has a computer science background that plain text is a terrible standard. But not because plain text is good. The limitations of that format, much like the limitations of the terminal and before then the teletype, have become so ingrained in programmers minds that even to consider anything other than that would be just plain stupid.

It is the infrastructure that is built around plain text that has made it so prolific. Every operating system renders text. Some operating systems have slightly different conventions on what plain text is to be rendered as, and how it is encoded, but one standard has largely won: UTF-8. This means that using a text field doesn't require complex engineering. Writing text has no unsolved problems. Symbols are symbols are symbols, and even where complex markup is needed, one is often better off dedicating some symbols to have special meaning based on context, rather than designing a purpose built protocol.

While UTF-8 is the reason why plain text is useful today, the fact that plain text is a universal human-readable standard is an idea at the heart of the Unix philosophy, one that Cat-v, if nothing else, espouses to a great extent.

But the way we use plain text is fundamentally limiting.  When we're given a no-limitations page, that we can fill-in in any way we desire, a boring left-to-right top to bottom journal layout is hardly what we default to.  Part of the reason is because pen-and-paper explanations are a multimedia experience.  We explain just as much as we write.  The corollary is often that these notes do not contain enough information to recover the precise meanings of things, but the fact that we even expect the meaning to be completely encapsulated within a work, is a very western thing, and not universal in human culture.  This has advantages in programming and in scientific writing, but outside of those, WYSIWYG editors such as the office packages have just as much relevance, if not more.  Even in science it is not a given that publications accept LaTeX, even though that standard is common, it is far from universal.  And there are good reasons.

Plain text is not great.

As was remarked in the now infamous [stop writing dead programs] video, being able to visualise data is quite important.  And in reality most if not all programs would benefit from the ability to display complex graphics in a standard way.  Coming up with a standard way is a hitherto unsolved problem, much like plaintext was up until very late into the 2000s.  But god forbid people decide on a collection of solutions that work well in some cases, but not others.  The lack of a standard for many things, like _e.g._ databases, is what's the problem, not the technologies themselves.

However this subtlety is lost on the Cat-v crowd.  They say YAML is bad.  Ok, why? SGML in general is bad.  Again, why?  XML is bad.  They have a vague gesture towards "XML is not popular" with emphasis being put on clever rather than informative.

::: details excerpt
“The essence of XML is this: the problem it solves is not hard, and it does not solve the problem well.” – Phil Wadler, POPL 2003
:::

Yes this is very laconic, but completely useless to someone who actually wants to **understand** why it is that you _think_ that these technologies are problematic.  What I would have liked to see is an excerpt from the [paper](https://doc.cat-v.org/xml/the-case-against-xml.pdf) that actually addresses the problems, which they, to their credit have linked in the page.

What the essence of the problem is, however, that Cat-V considers all of XML to be harmful, when the paper that does the actual legwork states the following:

::: info

XML today is being mentioned as a technology for data exchange.  But it is, at its heart a presentation technology.
:::

So they have failed to adequately present a case and reason why a specific harmful technology is harmful.  It is thus, reasonable to assume that they would equally fail to address the benefits of the less harfmul technology.

So let's look at what they prefer instead:
1) JSON.

This is a remarkable standard.  It is structured, it allows for things to be collections, to be sets of and to be objects.  It follows a very simple, but elegant design, where data describes the object.  JSON has a slew of benefits, namely that it is ubiquitous, sensible, easy to both read and write both for humans and machines, and thanks to the fact that it does not have significant whitespace (the argument against _e.g._ YAML), what you don't see is also what you don't get (TODO: article).  It is simply the default for many applications, some of which mistakenly choose a binary standard as its first choice.

But for all of its benefits, it does have drawbacks too.  It is often too verbose.  It is structurally typed, which is only suitable in some cases.  While it is easy to parse, it is not **as easy to parse** as its precursor -- symbolic expressions.  It is also strongly tied to the language for which it was designed: JavaScript.  And that means that technically you're always better off writing your numbers as strings, even in strongly typed languages such as Rust, because the standard adheres to the same mistake of not differentiating integers from floating point numbers, and defaulting to floating point.  JSON written by one program may not be parseable by another program.

And these are all design considerations, something that you as a user of those libraries have to _think_ about before choosing to go with XML or JSON.

2) CSV

This is a compound problematic format, because it is only suitable for dense tabular data.  JSON can just as effectively represent that data:
consider the difference between
```json
[
['a','b','c'],
[1,2,3],
[4,5,6],
[5,6,7]
]
```
as opposed to
```csv
a, b, c,
1, 2, 3,
4, 5, 6,
5, 6, 7
```
Can you really make the argument that one is more readable than the other? Or more compact? True, this is occasionally more useful, but in all fairness those situations come down to the presentation software, and not inherent in the standard.  And this is precisely why you don't normally see a lot of CSV.  But I suppose, imposing the fact that the data is simple, _i.e._ necessarily dense, and necessarily tabular, with a precise number of columns known ahead of time, does have its benefits.

But then the problem is that CSV is posed as an alternative to XML, as in it's better, use that instead...  Well, precisely how stupid does one have to be, in order to use XML in a situation in which CSV does the trick.  More often than not, the only reason to use SGML is to present the tabular data as an HTML table.  And you can't exactly use CSV for that purpose.

But then that would even concede that CSV is a good format for **any** data.  It is only useful for dense tabular data, but even so, only in some very rare cases.  99% of the time, if you're dealing with tabular data, you need a database.  If you don't, you probably need a spreadsheet, that **can** still use a database as a backing storage.  Even so, if what you're after is plain-old-data stored on disk with minimum overhead just to be read and analysed, and you want minimum complexity, CSV is still a bad choice.  If you have any numbers stored in plain text, there's a considerable amount of processing that you don't see that has to happen in order to decode the data.

Case in point, consider that you're recording the readings of a particular tool.  Those recordings are done in the IEEE 754 floating point.  Those numbers are base-two, meaning that once you have encoded and decoded a number from a decimal representation, you have more errors than just the trunctaion of the significant figures.

So in this case, using either a database, or at least a binary storage format (which is effectively a memory map of an array of arrays), would be better.  Significantly better for scientific computation.

3) ndb

How is a very specific database that is non-standard and non-generic meant to be an improvement in general? I suppose for the one situation for which it was designed for, it _would_ be beneficial, but it is basically the assertion of using the purpose built standards wherever possible.  I can agree on that.  Why not mention the generic advice of using the specific data format where possible? Why list `ndb`?

4) Plain UTF-8 text

So just don't have standard formats.  Define a DSL.  So either this advice can be rolled up into the previous, and state that each program is important enough to have its own standard of data interchange (which is precisely the opposite of what UNIX was advocating), or this should including things like CSV or JSON.  I guess that Cat-v probably meant the latter, but in that case their entire advice could have been replaced with just use UTF-8 as the standard.  Well, then, SGML, XML and whatever they consider to be harmful, is **exactly** what they advocate you should do.

This isn't just faulty advice.  It's not advice at all.

### Go is average

The go programming lagnuage is a common recommendation throughout the blog and Unix circles in general.  I find this recommendation to be baffling.  I do not harbour an irrational hatred of the language and I can see it having its uses, but I would hesitate in comparing it favourably to `Python`, `Java`, `D` and `C++`, with the possible concession of agreeing that it might be better than `Ruby` or `Vala`, based on the fact that I have little exposure to those languages, and I cannot comment any which way.

But I would like to systematically dismantle the notion that recommending Go is a good idea.  To be more precise I take offence at the idea that Go can be considered a replacement for any of the languages listed, for a new project.  For an old project, the rationale is simple, Go offers few features that would allow a smooth transition.  A complete rewrite has to be justified by a qualitative change, and Go may be useful for rewriting single-threaded applications in C++ to be more concurrent, but even then, that is a matter of taste, and would still involve the mass firing of current staff.

So let's go over a few possible use cases.  The only place where Go shines is in writing web servers.  Its structural typing coupled with the loose conception of types in JavaScript neatly dovetail into each other.  This allows production of quicker, more reliable services than in _e.g._ Flask.  The amount of effort needed to write a Python application is probably still less, and if you want to move super fast, Go is not the best choice, but it is often in the sweet spot, so we can concede that this is where it's good.  Incidentally, for those purposes, Java is not worse, and in fact perhaps better.  It does have an inheritance model that can impose a bit more restrictions, and writing good Java is more art than science.  The main issue is that Java nudges the programmer to over-abstraction, and even the simplest programs have an unhealthy amount of abstraction.  But if the only concern is the readability and programmer productiveness, why not consider Kotlin? The Java ecosystem confers the advantage of being completely platform independent, which Go does not.  Python comes with that too.  Equally, D and C++ offer less platform independence, but by virtue of not being garbage collected, they *also* offer latency guarantees that Go cannot.

And it is a fallacy to assume that Go's advantages even in the space of web-backend development, the one thing that it's good at, are universally good.  Namely, consider that [Discord](https://discord.com/blog/why-discord-is-switching-from-go-to-rust) switched away from Go.  Now obviously Rust wasn't mentioned anywhere in the site, but it is a common sentiment to assume that Rust is a bad programming language amongst the same circles as those that espouse the Cat-v ideals.

Now consider the other use cases for programming that Java, Python and C++ have a niche in.

Python is often used in scientific programming, as its syntax leans close-enough for statistical computations to be easier.  It is a vast improvement over spreadsheets, and open source and ubiquitous, unlike specialised programs like Mathematica, Maple or MatLab.   Go has very little if anything to offer in that regard, precisely because it cannot dynamically link very well against FORTRAN libraries that back much of Python's scientific libraries.  More to the point, while Python allows an interactive programming model, where the state of the machine can be altered in a notebook-oriented literal style, Go is a batch-processed language.  That basically means that if an intermediate computation is to be repeated I have to manually ensure that the computation is correctly cached and not re-executed every time.

Graphical programming is another area where Go has a small presence.  There is GoTK, which is the bare minimum, and not very ergonomic.  By contrast, the one successful integrated development environment is written in Java, with a large chunk of graphical programs being written in C++ and C.  Go does not overtake either of those languages, and for good reason.  None of what it's good at, is relevant.

So I suppose game development? Also no.  Go is garbage collected.  Most games are also garbage collected in the sense of having an entity component system, but those garbage collectors are not built into the language, and so some interactions that bypass them are possible, _e.g._ a temporary buffer that's purged every frame.

High frequency trading? Well, I suppose there's a couple, but most use Rust, C++ and perhaps to some extent OCaml.

Text processing?  System libraries? Utility programs? Well maybe `yay`, but that program is largely on feature parity with `paru`, despite being a few years older, incidentally, a common thread with Go programs.

Now while there are vocal programmers that would love to hate every programming language, rather than list the number make a democratic poll, I would instead argue that _those_ opinions are largely irrelevant.  Complex pieces of software get more attention if used more.  You do not complain about a technology that you haven't used for very long, especially if you ruled it out early.   On the contrary, if you're using a technology frequently, you will rub up against rough edges sooner rather than later.

The reason why there are so many rant posts about C++ is a function of the fact that at some point in human history there were more C++ programmers than programmers in any other language.  Similarly, the number of people that use Intercal don't complain about intercal, because they knew what they were getting into.  It is an esoteric language that is not meant for any production use.  As such it would be silly to compare programming in Intercal favourably to programming in C++.

Not to mention that a lot of the time, the complaints come down to poor language interoperability and that some languages are more suitable for a task than others.  I've embedded a Haskell runtime into a Qt application, and I wish that it were more of an option.  But a lot of the time, you have strict guidelines, and thus have to either implement the parse logic in C++, or the GUI logic in Haskell, both of which are problematic to say the least.

So vague gestures in the direction of FAMOUS PERSON X irrationally hated language Y, for reason Z, that is no longer valid, I would dismiss that argument outright.  And this is the vast majority of the recommendations against C++, Python and many others.

I would say that Limbo is a decent language to try, but I would not regard Cat-v as an authority on what a programmer should and should not do.  Their text doesn't encourage _thinking_, but assumes thinking and can lead to a great many problems, if that assumption is misplaced.  Engaing with the medium, media literacy, is a waning skill.  Without media literacy, people might assume that the Cat-V rants are serious advice.  And I'm here to explicate why in the case of programming languages their advice is plain wrong.

### Miscellanea

It is perhaps hard to argue against their assessments of some technologies: Perl being a particularly well-known technology that had been used beyond its merit, but others are more questionable.  PCRE is a controversial point where instead of arguing that it's actually good, I'll argue that they have yet to present any definitive evidence that it is bad.

Their point on UTF-8 is largely an appeal to a standard.  UTF-8 is a good-enough solution in most cases, and code-pages being non-standard were the bane of proper UI design for a very long time.

They recommend `dash` in preference to `bash`.  What I'm a bit concerned about is that `dash` must necessarily be supplemented by an interactive component...  meaning that their recommendation is replacing a standard, well-documented tool, that is largely the default, with another more restricted version.  The biggest advantage is perhaps that by being smaller, it has fewer bugs...  I'd say that the fact that it is used in so few cases contributes to the bugs of `dash` being lesser known.

I don't quite see why they wouldn't recommend `fish`, but I suppose they seem to believe that any user-friendly tool that is written in a language other than C is a bad thing...  And I suppose they can also argue that `fish` is not POSIX compliant, which basically means that it doesn't run scripts that were written for POSIX shells.  So I suppose Python is also bad, because it's not a POSIX compliant shell?

### Gnuisance

The document overall has an axe to grind against the GNU toolset.  I don't know if we can rationally rebuke a fundamentally irrational argument.  The one place where they **do** provide a counter argument relates is the following masterpiece.

```
List:       openbsd-misc
Subject:    Re: /etc/mk.conf
From:       Theo de Raadt <deraadt () cvs ! openbsd ! org>
Date:       2005-04-07 1:24:51
Message-ID: 200504070124.j371Opsq031199 () cvs ! openbsd ! org

> > i am ussing current compiled with these options for some time now, and
> > everything is just OK,
>
> and how much faster is it?  have many more widgets can you pump out in an
> hour?
>
> as a reference, the last time i played with said options, i wound up with
> a gcc that couldn't compile anymore.

and the further you get from i386, the more bugs you run into.

as you crank up the options, all the other architectures, from vax (dig
in the tree for the ifdefs), to sparc, to sparc64 (a few more), to alpha
(even more), to mips64 (oh my), even up into arm (of course), even amd64,
and then as mickey just found out hppa64 spitting out garbage FP instructions
for integer only operations...

anyone who does this is not just mad, or crazy, or playing, they are
plain flat out stupid.

i count gcc as being, on the low end, 400,000 lines of code per architecture.

which will have bugs.  let's call it the 1 bug that matters per 10 lines of
code, naw, let's be kind.  let's call it 1 bug that matters per 25
lines of code.

that's 16,000 bugs.

99% of the user community finds their way through that swamp of bugs
by using the default.  that is what gets tested, and that is what gets
fixed.

some bugs relate to gcc crashing, others to gcc generating wrong code
(by the way, our experience is that it is WAY EASIER to get "gcc
to generate wrong code"....)

now you wish to go fiddling with choices, and getting yourself into a
mess.

it is people like who who give a bad name to people with mental
deficiencies.

... perfectly well trained people, who can send email, who think they
can run a computer, even probably have a drivers license, but no, it
is people like you are DOWNRIGHT DANGEROUS, because you wouldn't know
a safe choice if it hit you flat in the face, and you will ALWAYS push
every button available to you because you have fooled yourself into
believing that is LEARNING, that is ADVANCEMENT

retards.
```

I'll present the full letter, as I do not believe it is rational to cover every aspect of this specific outburst.

I will first note that this particular excerpt is taken out of Theo De Raadt's conversations.  While to some it might be considered quite heated, this is very much a room temperature discussion with this wonderful human being.  So, his outrage with GCC, is very much a by-product of his style, and not something that as the text in which it is presented might suggest.

As such, this is at best an appeal to authority that is at best taken out of context, that is at best, complaining about unequal resource allocation that is at best a problem for those who tinker with features that Theo himself, argues shouldn't be there.

Of course, the choice of the C compiler is up to the user, but I would argue that absolutely nothing that is presented in this two decade old email can be construed as arguments against GCC.  It is, however, an argument against tinkering with the aspects of GCC that are not as well-covered with tests as the other parts...  That critique can be levied at many other compilers.  Blaming the user for a very reasonable request to actually make code work with a known compiler option, that goes out of proportion to the actual problem is more of a reflection of the "community" that Cat-v would like to align themselves with, rather than the quality of the software.

And they are in their right to do so.  I just don't think that they do so very well.

Another example is `musl`.  It is a standard C library whose chief advantage is being different to `glibc` and thus having fewer _known_ bugs.  Its allocator is slower, its integration with most software means that programs that typically link against `glibc` cannot link against it, and while the opposite should be true, the sacrifice that must be made to ensure that software can link against both is just...  for lack of a better word not worth it.  I have repeatedly in my software engineering career had situaitons in which `musl` was genuinely an improvement, where I had to roll it back, precisely because of a bug that _could_ be caused by `musl` not being tested as much as `glibc`.  Can `musl` get better if it's used more widely? Sure.  It'd probably become just as bloated as `glibc` and probably be just as bad, for the unvoiced reasons as to why it should be "good".  In my experience, usage of `musl` only confers an advantage in the very few small niches where it is already the default.  It is not an alternative to `glibc` it is a better tool for the job in _some_ cases.

### GUI toolkits

I'll be the devils advocate on this one, and argue that they may have a point.  The reasons why we don't see that many GUI programs being written as we have textual interfaces has to do with the fact that the toolkits that produce GUI programs are a moving target with an ever changing appearance, while the textual interface is still, 30 years after it was necessary, cosplaying as a teletype.

I will say, however, that their alternatives aren't alternatives.  TK is a mess.  It must be mentioned TK has one advantage of being a small code base.  This advantage is nullified by the fact that one has to go out of their way to learn a new programming language.  At the time, `tcl` was the most sane way of writing GUI programs...  in 1990's and for X11.  The point of GTK is that it offers few abstractions and most of the work can be done via FFI, thus freeing the programmer to choose their programming language.  The point of Qt is that it is a batteries-included set of abstractions that can make producing GUI programs faster and more efficient without sacrificing the ability to call the non-GUI backend logic via FFI.  TCL confers neither of these advantages.

### Editors

I wish I had more to say about this but I do not.

I cannot take their advice seriously, because I was not able to run either `sam` or `acme`.  Even if I did, the picture that is painted by [Rob Pike](https://doc.cat-v.org/plan_9/4th_edition/papers/acme/) is that of a text editor that is different from both `vi` and Emacs...  well, not exactly, because Emacs supports all of that out of the box, however how much of that had been available when the author had made up their mind is unclear.

What I can say, is that Rob Pike has certainly done nothing to ensure that this supposedly superior text editor were at least usable.  The only reason why it is considered better in their opinion, is perhaps that it was written by Rob Pike...  which...  judging by my personal opinions of Go, the dot-file convention, the amount of problems that the `-v` switch has done to me personally, probably means that I wouldn't like it even _if_ I **could** use it.

They do have one point: `ed`.  It is **the** standard editor.  The reason why they want you to use it, is because it is hard, and this sheer fact will be used against you.   Ed has its applications that are gradually dwindling in numbers.  Namely it used to be the only way of editing a text file.  It is non-programmable, it offers no syntax highlighting, and in all fairness, is a program that a competent programmer can knock out in a relatively small amount of time.  The only way in which it is useful is the fact that it can technically be regarded as a tool that could in principle be used in batch processing for editing purposes.

This very idea, of a batch processing text editor is not that bad, actually.  In the year of tree sitter, in fact, such an editor might be useful because it would be able to abstract away syntax or at least check it somewhat.  In that way, I can agree that a tool _like_ `ed` is something that you might want to consider in situations in which you don't _necessarily_ want a visual representation and what you're doing is very much batch mode anyway.

However, the usage of `ed` as that editor, is not warranted.  It is impractical.  The only reason to use it is if you want to feel accomplished for calling `p` to print the buffer, or to pretend that you'd be productive in the early days of Unix.  The former is just not rational, while the latter is a delusion.

I'd say: use whatever you like.  Yes, including VScode.  It's not a bad program by any means, and my opposition to its proliferation is on the grounds of other programs being more beneficial long-term, not it inherently being harmful.  Like plaintext, this is what was already done, and in the proverbial _thinking outside the box_ paradigm, represent the box.  I would recommend that people try something practical.  And by that I mean, something that can be reasonably installed on a modern computer.  So think Emacs, not teco.

### Protocols

There is not much to say.  They recommend that you
> or best of all: don't use HTTP.

How did we not think of that! Hey, Everyone! That site that you thought needed HTTP to communicate the information? Well, you don't need it.  Just use a custom non-standard markup language that no browser in the world can handle, to hopefully produce something that is just as good as the Web 1.0.

Of course, our users only _thought_ that they needed their web site to work, but we set them straight!

In all seriousness, there is no reasoning provided for these recommendations.

They have a similar recommendation about IMAP vs SMAP.  OK.  Great! Do you know how hard it is to convince people to just use IMAP, and not a shitty version of Exchange or GMail?  I assume Cat-v assumes that it is possible to force people to use a technology just because you like it!  On that note, IRC is considered better than XMPP.  In what way?  For what reason?  I will say that IRC is in far better health than XMPP, on account of the fact that almost nobody hosts their own servers for anything anymore.  But yes.  IRC is a good technology, use it.

### Postscript everywhere

::: info
It shall become important later, but remember that PostScript was a proprietary language developed by Adobe in order to make sure that the printers worked.
:::

The Cat-v crowd seems to believe that it is beneficial to replace almost everything with PostScript.  I'm sure they are aware of the technological differences, and that they are largely asking people to be more obtuse for no reason.

But I'll elaborate.  I will admit that PDF is not a good format.  It is a format that is widely supported, but not particularly useful.  It can guarantee one-to-one fixed-format reproduction, which confers its advantages.  It is also useful for producing vector graphics, as to this day, it is the most widely supported medium for including vector plots into one's scientific articles.

Postscript is a step better, because it is a collection of instructions that can be rendered on an ungodly machine called a printer.  That and the fact that they can be compressed better than PDFs and yield smaller file sizes, makes them a less harmful alternative.  The fact that they can pretty much only be rendered by those printers, and on any operating system other than GNU Linux and BSD cannot be rendered without some hefty tuning, yields the opposite effect.

Often, when one uses vector graphics, the intermediate solution is something called an encapsulated postscript, which for a long time, used to be the only way of including pre-rendered vector figures into LaTeX.  But if we're completely honest, that is not a good idea either.

What would be a good idea, is keeping the source for the document, and having a reliable stable format for that source.  Namely, keep something that has minimal markup like _org_ and...  I can't believe I'm saying this, Markdown.  With LaTeX, it's a similar story; but it has some quirks.  Some documents can only be compiled with a specific program: `pdflatex` is the standard, despite there being significant advantages to using `xelatex` and a new fledgling re-implementation in Rust called `tectonic`.  Unfortunately, not all valid LaTeX compiles with all of these compilers.  I particularly found that frustrating when submitting a rendered `pdf` to MDPI.  I honestly think that we should agree upon a standard, and stop using rendered documents as the medium of exchange.  That is an exceptionally difficult task, given the amount of effort that went into HTML and them still not being able to guarantee cross-browser accurate rendering.  Org **would** have been a good native format, if it weren't for the fact that it is fundamentally not rendered in and of itself, but rather converted to the correct rendering format with an ungodly amount of Lisp.

### DJVU

DJVU is a format that I wish were more widely used, but I see no explanation as to why, so I'll have to pretend that there is one and agree with it.

DJVU confers smaller sizes to documents, that are both in text and scanned.  By virtue of the encoding scheme in DJVU, in fact, DJVU files are nearly as compact as OCR'd documents in PDF.  Unlike those, any smudges, misprints that could look suspicious, do look suspicious, and are never confused with another letter.  So no `rabbit` universal donors for you.  (TODO: link to joke).

### Tooling versus domain-specific programs

This is a slightly controversial point, so I may need to elaborate.  The existence of the `head` and `tail` programs had always baffled me, and using a universal tool for getting the `n`-th to `m`-th line of a particular plaintext file seems like a logical choice.  Not doing so is a failure of education.

But *which* exact tool should you use?  I'd wager you don't know the answer either.  So let me give you a list of programs that you could use.  You could use `sed`.  You could use `ed` in batch mode, you could also use `awk`, which was mentioned earliers as a program that should be installed in your system.  `grep` can technically do that too, if you gave it an irrefutable pattern and asked it to print everything after the match.  The problem with applying this as a general principle, is that it would endanger the existence of other programs.  And more importantly, while a user might naturally reach for `tail` or `head` and remember them well, `awk` and `sed` are things that only _some_ users can wield effectively.  I agree that you would need to nudge users in that direction if you want them to learn those tools at all, but I would also argue that then `cat` would have been just as fine of a candidate.

As with most UNIX-philosophical discussions it doesn't take long until a catastrophic inconsistency arises.  And it is borne out of the fact that Unix was a post-hoc collection of ideas that happened to agree with each other well.  The lack of an overarching principle can be seen in that there are multiple conflicting definitions of the Unix philosophy.  And it is not a problem, if it's a way of explaining the success and failure of one operating system, but categorically dangerous if preached as a way of life.


Cat-v is named after Rob Pike's famous essay that `cat` should not have the `-v` flag.  And it is the sheer fact that more likely than not, your `cat` **does** have this flag _right now_ on the very Unix-like machine that you are reading this from (and to Windows users, most of this is just foreign I'd wager).  Simply put, their advice had been practically proven wrong on too many occasions to be considered worthwhile.

## Conclusion

A lot of Cat-v philosophy is a cargo cult of some projects made by Unix alumni.  They avert any critique, by positing that

::: info
Note: At the moment a detailed rationale is not provided for most of this, so figuring out why some things are considered more or less harmful than others is left as an exercise for the reader. Here is a hint: complexity is the bane of all software, simplicity is the most important quality. See also: Worse is Better by Richard Gabriel.
:::

Allow me to refute this, if it is not already obvious.  _Reductio ad absurdum_ dictates that the program:
```c
int main() { return 1; }
```

is better than any of the programs listed above.  It dictates that having a communication protocol with features that are rarely used, but help considerably when they are useful are not to be implemented ever, so why not institute a policy against special cases.  Then it becomes apparent that anything involving the computer being turned on can be considered a special case.  So it is by that moniker, that every piece of software can be regarded as problematic.  They concede to this point without a fight, and with no good reason to do so.  If software is so bad, what does it say about you, who decided to spend a lot of your time interacting with it?  Maybe _Sturgeon_ was not an optimist, and way less than 90% of code is crap.  It's just that people tend to find ways to break it, and ask for problems.  Incidentally, that is precisely what our rather outspoken critic of GCC was complaining about...

So where does this leave us?  We have armchair philosophers with a clear bias towards idolising anything made at Bell labs and by Rob Pike.  In all fairness, his work was instrumental in establishing the world we live in today, just as much as were his blunders.  But a few things aren't even promoted in the name of post-hoc vapid platitudes as simplicity, and reliability; merely the association with Plan 9, Unix and any of the authors of the C programming language seem enough.

But a lot of the programs that they promote are genuinely good, so why should we be wary of the philosophy that had been strapped to them after the fact and bears no correlation with what they critique?

## Case study suckless software

There is a group that is misguided in more than one way, but particularly for our purposes in applying the philosophy of less is more and minimalism to the extreme, without exercising judgement.

The result are a few programs that I'd like to talk about.

### Dynamic Window Manager

When asked about the memosation procedure being called dynamic programming, as an anecdote, Dijkstra mentioned that it was the word _dynamic_ that would garner positivity.  It is perhaps by this moniker, that the world's most hacky window manager was named dynamic.

And it is not without merit, it does work as a dynamic tiler, in the sense that one window can exist on multiple tags, and that this effectively produces a very interesting workflow.

Unfortunately, this is the extent of positive things I have to say about `dwm`.  Installing it is a pain, because it **must** be compiled from source, to have any form of customisation.  Installing it is tantamount to creating a fork.  It is a positive thing, but only if what you're doing is using it for yourself.  Setting up `dwm` for someone else, _e.g._ my wife, would be a pain.  It is not faster on lower powered machines, it is not faster on higher powered machines.  It is simpler, if all you care about is the number of lines of code.  But for such a supposedly minimal program, it comes with a bar, because the protocol to communicate with a bar would have been prohibitively expensive to implement.  It parses its own keyboard input, which means that the only way to rebind a key is to log out and back in.  Which is fine, but there is also some complex logic about automatically initialised programs, some can't be started more than once, so the user must manually kill them.  Of course if you make a mistake configuring `dwm` you either have to use a better program, or revert the change, recompile and try again.  So if you didn't have the foresight to use a VCs or to commit regularly, you are SO(o)L.

Oh, and believe it or not, because the program handles almost everything, there is no design elegance.  Everything is cramped, not least of which, because C is not a good programming language to write concise programs in, and the limitation imposed on all suckless programs is extremely low.  And god forbid they used a simpler model for workspaces that contain windows.  Oh no, that is essential functionality, as is the bar.

It is by no means a terrible program.  It just does one too many things, and uses the small code size as a justification for poor quality.  Kind of a pattern.  But at least it's "simple".


By contrast a program with an appropriate amount of complexity is `bspwm` it offers an elegance of concepts, one that is seen in Unix, despite that program not following the Unix philosophy to the letter.  Case in point, `bspwm` is run-time configurable, but it doesn't have an internally designed configuration language, allowing you as the user to use whatever you choose for that.

Another thing that `bspwm` does really well, is modularise its bar.  Because of that, you can have a bar that doesn't exactly adhere to the same philosophy work well in conjunction with `bspwm`.  Binary space partitioning is a relatively simple layout that I can attest to being sufficient for most needs, thus I rarely if ever use anything other than the defaults.  `bspwm` doesn't read its own inputs, as there is no way to register key-bindings with it.  As such you can find a program that does one thing, but does it well, called `sxhkd`.

As a consequence, we get a good experience and a genuinely simple program in `bspwm`.  Obviously this completely ignores the technical pitfalls of `dwm`, for example, not fully supporting full-screen windows, not being fully compatible with floating windows, and a few other major pitfalls.

### St
::: info Excerpt from Suckless
Abandon All Hope, Ye Who Enter Here

This is undoubtedly the most ugly program in the distribution. It was one of the first "serious" programs ported, and still has a lot of historical baggage. Ideally, there would be a general tty widget and then vt102 and tek4014 subwidgets so that they could be used in other programs. We are trying to clean things up as we go, but there is still a lot of work to do.
:::

Need I go into details.  Despite this program being dead simple and not really needing maintenance, it somehow surprised me in that it doesn't have the most basic creature comfort of being able to control scrollback, or launching something other than the system shell.

Despite this, I should make it clear that `st` is very much the most usable of the programs on this list.  It used to be my go-to terminal emulator for years...  or rather after I got what it lacked into the source code, you know, the ability to see more than just the last screenful of text, and launch `fish` instead of `bash`.  It's fine, but giving it a bit more LOC would not have made it worse.  And this is an illustrative example: the program is simple, because what it does is fundamentallly simple.

### Surf

It is a web browser that on paper I should have liked quite a bit.  I don't find the presence of many of the UI elements on many browsers to be a benefit.  If at all possible, I'd have liked having the ability to put more than just browser tabs into tabs, having process isolation in more than name, and to perhaps, have some ability to use the tiling facilities of `dwm` to my advantage when opening two web pages (_e.g._ my notes in hackmd and some other article that I'm writing about).

And indeed, it is a program that has some neat interactions with _e.g._ `dmenu` or `rofi` that I quite like.  The main issue I found is that it is an anachronistically well-made program in a web of shit.  Most services in which its uncanny ability of not trying to be a window manager is a benefit, require some form of JavaScript that it does not support.  In reality, using it for anything JavaScript-adjacent, given that it is based on WebKit is asking for trouble.  In a perfect world, `surf` would have been a far more usable program.

Sometimes the software sucks not just because of the end program, but because of the enshittification of society.  I'm happy that I can use a semi-open operating system, like GNU Linux.


### Dmenu

Perhaps the most utilitarian program of the bunch, and also one that is somewhat useful, but highlights the need for a better organisation of operating systems in general.

As a program it's very simple: you give it a collection of things as input, and it shows you a prompt to choose one of many options, or even write something that doesn't exist.  It then prints that to `stdout` and exits.

In principle this allows for a lot of scripts, but in practice, the right way to do these things is often just a tripwire for newcomers.  Bash and posix shell was really not designed to work with such programs.  With `bash` at the very least one has a hash-table, with an ungodly syntax.  I suppose at this point you shall start noticing a pattern of less harmful software being marginally better in cases where that probably doesn't matter, and hopelessly problematic if venturing even slightly away from the trodden path.

What `dmenu` does, alone is not that useful, but in context of it being a universal choice interface it can supercharge many applications.  One does not need `tcl` or a complicated toolkit in order to write an intuitive GUI for choosing one's monitor.  In all likelihood you are simply going to use it as a basic launcher for programs, but it is not half bad at that either.  It comes with many customisation options that get passed in as command line parameters.  I see no reason why they should be, but they are.  Naturally this means that there is no DSL to tune it in, but because it's quick to launch figuring out the syntax with trial and error is not going to take much work.

So this is all positive so far.  Why is it a problematic program?

For one, because there are no native mechanisms by which `dmenu` can be integrated into all interactions.  It *can* be, but odds are that you'd need to write out a small portion of code for each situation.

Secondly, the resultant program code is just as (if not less) readable than perl, most likely not portable, and simultaneously something so simple that the operating system distributions should have come with.

But worst of all, `dmenu` is replicating one other program: your terminal.  One would not need `dmenu` if they could hide the terminal window that spawned an application.  That is something that could have been handled by the window manager, if one were really insistent, but alas, `dwm` had too few lines of code to make a program redundant, but had enough space to fit in a bar and a hotkey daemon.  What I mean by that is a small patch called slurping the window made by a proffessional contrarian Luke Smith.

You can now see why it's not exactly a philosophy that can be applied consistently.  Yes, avoid blatant inefficiencies, and think about architecture at the larger scales, but by all means, consider also doing things to the fullest extent and well.
