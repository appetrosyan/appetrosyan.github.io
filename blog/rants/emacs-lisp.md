# Emacs lisp

This is a blog post dedicated to the configuration language of my favourite editor: Emacs.

It is true that Emacs owes its flexibility and very configurable nature  to this wonderful and awful language.  It is both its greatest strength and weakness.  It is simply the brick wall that is responsible for the learning curve.

It is also the major source of the reasons why Emacs can't be made either asynchronous or multi-threaded.  Or at least, not in the usual sense.

So why keep it around?  Why was I one of the few people that was defending Elisp as the configuration language despite Emacs GUILE making a compelling case that it would indeed be better.  Why am I writing this blog post?

::: info
Shout-out to `tusharhero` who prompted me to answer this question.
:::

# Overview

Emacs lisp is a lisp.  It is a reverse-polish notation language with a very simple syntax, non-trivial interpreter and many of the features that are associated to "modern" programming, despite those being known, available and ergonomic back in the day of McCarthy.  Specifically, you have dynamic typing, garbage collection, functions as values, procedural (and if you will, functional) macros, with every line an expression, with the full language available at load time, compile time and even interpretation time.  It can support inheritance, prototype-based object-oriented design, functional programming, and a few other paradigms.  The language is remarkably simple.

Lisp used to have strong connections to academia, so every MIT graduate has to have gone through the Structure and Interpretation of Computer Programs.  There are many who know a lot about Lisp.  I am not one of them.  What follows is not an expert's opinion on Emacs lisp (experts also think that it is better than most other languages like `lua` but is generally trash compared to something like Scheme or Common Lisp), but the opinion of a programmer that has a completely different upbringing.

::: info
I did not learn Lisp until I was already a man
:::


My background is in Pascal, C++ then C, then some Python and finally Rust.  Along the way I had a brief academic brush with Standard-ML and self-taught Haskell, but nothing to the extent which would be considered professional.  I am proficient in mathematics however, and seriously studied computer science as a second major for as long as I was allowed to at Cambridge.  My current work revolves around hard-core computer science and compiler construction.  I eventually intend to implement a small systems programming language with a different approach to types, and as such, understanding why people are so resistant to Lisp, and Emacs lisp specifically is a good guide.

So what does someone who learned Lisp for the first time in their twenties think of it?  In the following few sections I will outline the initial learning experience, the challenges, the advantages, and outline a potential road-map to adjust the initial experience so that people are less fazed by it.

# First boot

Emacs is a graphical program with weird conventions.  It shows you a poorly-laid-out welcome screen that sort-of tells you that you should go through a tutorial.  And it does teach you how to do the basics that you would normally be able to perform on your own.  It does teach you _a bit_ about some "more advanced" topics, like key sequences as command bindings, for example, the fact that you can hit `C-x C-s` to save, and `C-x C-c` to quit.  We're not here to discuss this in-depth, but the fact that _some_ but not _all_ of the keybindings follow the CUA conventions is a bit of a problem.


::: warning
Of course, one could have started with Mastering Emacs by Mickey Petersen.  I've only recently read through the book.  I like it a lot, but it is not particularly accessible.  It costs money.  Money that I did not have at the time I was learning my way around Emacs.
:::

At some point, the user discovers that there is a graphical user interface to both install packages, as well as customize the ones already loaded into the editor.  They will not do so quickly, however.

While I will applaud Emacs for providing something that `vim` to this day does not: a menu bar and a tool bar (which almost every self-proclaimed Emacs "guru" tells you to disable), the efficacy of both of these is somewhat questionable.  First of all, my Emacs set up has `File`, `Edit`, `Options`, `Buffers`, `Tools` and then a ton of other entries.

::: info
We as users are conditioned to ignore the most helpful (no pun intended) menu entry `Help`.  Mostly because software tends to open severely dumbed down, unsearchable mess that is just as likely to get you confused as to help.
:::

::: warning
If you ever wondered why most modern programs hold you hostage to give you a _tutorial_, it's because of this problem.  There isn't exactly a fix; if you add a _I'm a pro_ button to skip tutorials, people with no credentials will click it; get stuck; angry and then you're back to square one.  The only way to avoid this is to cater to the stupidest person that you want as your user, which is tricky.
:::

If the program is designed holistically and has a plugin system, every function that you have access to is accessible from the menu bar.  Most frequently used actions are accessible from the toolbar, have a tooltip and show you helpful key combinations.  Emacs has that concept, but executes it poorly.

For one, the key convention is different, more on that later.  Secondly, some of these keys are just moronic: my menubar binds all help commands to `<help>` which, as far as I checked isn't present on my keyboard.  Thirdly, sometimes packages add an entire menubar menu.  Sometimes they don't show up in the menubar at all.  If they do, the naming conventions that you would expect from a well-designed program are defenestrated.

`Jinx` is an excellent example of that: it shows up in the menu called `jinx`.  It shows you three menu entries: `correct nearest`, `correct all ` and `change languages` as well as more helpful entries, such as `manual`, `Customize` and `turn off`.  The reason I don't find it confusing, is because I installed this package, I know what it does (and haven't forgotten it), and I contextualise what it wants me to do within Emacs' concepts.  I even know that to type in `M-$` I actually need `M-S-4` or `Alt + Shift + 4`, which was covered by the Emacs tutorial.  But if we're completely transparent, most people that know that much wouldn't even consider using the menubar for these functions.

For a more user-friendly environment, you might want to rename the entry `Jinx` into `Spell-check`; the menu entries should also be re-named: `correct near cursor` gives the user a bit more information, and is not even the most informative title that it could receive.  `correct all misspellings...` retroactively gives context to the previous entry, and also lets the user know that this operation is 100% guaranteed to require further input: a shift of modality if you will.  Plus, if we are being pedantic, we could show `Alt + Shift + 4` as the key combination for extra transparency.

This aside is emblematic of the problem.  Emacs has subtle non-conceptual differences that long-time users don't even notice.  We can internalise changing `Alt` to `M-` and maybe even figure that out without going through the tutorial.  Most of this applies to Elisp, but in a much grander scale.

## A gentle introduction to Elisp

The first time a user sees any Emacs lisp is in their init file, when they decide that they want to adjust the editor to work better.  In my case it was `.emacs`, which is not that common these days, but back in the day, it was a big selling point.

The first line most likely looks like this

```elisp
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.

```
This is a somewhat useful warning to the user: here be dragons.

The first thing that a person that has never seen _any_ lisp will see is a bunch of settings in parentheses with a quote before them, no comma after, and no delimiter between the values.  In other words someone who already knows how JSON works, but barely because they are just starting out, sees something with front-loaded complexity.  An example of the rest of the list looks like this

```
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(blink-cursor-blinks 3)
 '(blink-cursor-interval 0.3)
 '(c-default-style
   '((c++-mode . "bsd") (java-mode . "java") (awk-mode . "awk")
	 (other . "gnu")))
 '(cua-normal-cursor-color 'bar)
 '(cursor-type 'bar))
```

Now, we as long-term Emacs users understand that the `'` character delineates that the expression needs to be taken `quote`-d, _i.e._ you should not replace it with the results of its own evaluation.  We also know that lists in Lisp sometimes come with delimiters, and sometimes do not.  Because the `custom-set-variables` form can accept an optional third argument, we know that we shouldn't use the `.` to delimit the first element from what it maps to.  We even know that in the `c-default-style` setting we set the variable to a list, which itself has an association.

This is something that comes naturally to a very particular kind of person.  I had originally assumed that the quote was a punctuation mark like in JSON, except it comes before and not after.  Assuming that someone can understand Elisp just by looking at it, is like assuming that someone can understand Algol knowing just English, and some mathematics.

Jonathan Blow, a famous person with some good games, a notable user of Emacs, was quite fond of the fact that the Focus editor was configured in an easy to understand language, and not "some stupid lisp".  He has a point.  Moreover, Emacs provides too much noise to be helpful in configuring itself.  What would happen if for example, the user made the mistake of using infix notation in one of the customise clauses?


```elisp
'(blink-cursor-blinks 3 * 2)
```
This is clearly a mistake.  Yet, it cannot be caught.  No error message.  You are left to figure it out if and when it breaks.  At the same time, up until recently Emacs would happily complain about a missing `(provide 'init)\n;;; init.el ends here` directive.  I'm glad the programming language has its priorities straight.


::: warning
Elisp as a programming language does almost everything that people are taught in university _not to do_, and yet for some reason people speak highly of it!
:::

To a person that is used to VSCode the need to use Elisp for configuration seems rather confusing.  They may have been burned with trying to use basic arithmetic, but the real problems don't stop there.  If they were to look up how to do anything in Emacs lisp, they are bound to find at least five ways, all of which have subtle differences that they will not notice until it is too late.

## Semantic ambiguity

10Say you looked up how to disable the toolbar (because you were told to do so in a video), you may find h[this](https://superuser.com/questions/127420/how-can-i-hide-the-tool-bar-in-emacs-persistently).  It tells you that you can do `(tool-bar-mode -1)` and you assume, "aha, so I just write what I want disabled and use `-1` as a convention.  OK.  Then the next comment tells you to use the `customize` interface, which you already did.  You then see that it disables the tool-bar in a very different way!
```elisp
'(tool-bar-mode nil)
```
OK, so I assume `tool-bar-mode` is a variable, and I write `(VARIABLE VALUE)` whenever I want to set it to some value?  Nope, it's just that this thing is both a function and customisable thing.  They just so happen to share the name.

Now to make things interesting, you have `setq`.  OK, for the moment, let's assume that the person is smart enough to recognise `set` in the name, and ignore the `q`.  How is that different from `(tool-bar-mode -1)`?  I'm guessing that the Zen of Python's "let there be one obvious way to do one thing" was caused by this situation.

Let's be fully transparent, I do not like this one bit.  The only way to ensure people don't end up accidentally breaking their configuration, is if the recommended ways of doing something are identical in behaviour.  The only way to ensure that is to disallow `setq` to customisation variables, and moreover, to enforce that `(<thing>-mode -1)` always does what it needs to do.  That is certainly true of MELPA packages, but not universally true.

OK.  Let's suppose that we went from changing some basic variables into the meat of things and tried installing plugins.  Again, several ways to do it.  Some old documentation telling you how to set up `use-package`.  Some newer documentation on the package itself that can sometimes tell you: "hey, to have this package, put this into your `init.el`" and then gives you something like this:

```elisp
(use-package delight
  :ensure t)
```

But sometimes, you will get a vague statement like "the easiest way to install this package is via MELPA", and then a 10-step process to fetch it manually and install.  Guess what the impatient modern user is going to do.

Within the `use-package` forms, there are often redundant specifications: you can have a `global-set-key` in the `:config`, `keymap-global-set` in `:init`, a `:bind` with any number of variations in its syntax.  MELPA will be nauseatingly pedantic about source code that less than 1% of user will read, and completely ignore standardisation in the README.  This is a huge problem that people will run into.

## Front loaded complexity

Let us return for the moment to the question of how much complexity is embedded in the simple first line that most likely already exists in your `init.el`.  A good benchmark of the complexity of a language is to gauge how many concepts one needs to work with in order to perform basic operations, a "hello world" if you like. By that logic, the `customize-set-varables` is a good proxy.

Here we have the following concepts in Lisp at work:
- `custom-set-variables` is a function.
- It accepts a variable number of arguments.
- Each argument is a list of two or three elements, the first of which is the name of the variable, the second --- the value to which it is being set.
- Optionally one can add a message, to explain _why_ a customisation was made.
- Each argument must be quoted, otherwise the function doesn't receive the name of the variable and the value, but a list of two values.
- However, you don't have to un-quote the second value, if it's a literal value.
- However, you do need to quote the value in a quoted expression to set the value of a variable to something that is a symbol, distinct from a string.
- Your emacs will likely complain about `lexical-scope` not being added, so you will add it to a comment that seems to be acting not at all like a comment.
- Lists and function calls are not differentiated in syntax.  So accidentally omitting the quote when setting `tool-bar-mode` is going to silently succeed.
- Lisp uses reverse-polish, so setting `zoom-size` will look something like `'(100 .  24)`.
- Some lists have strictly two values, and are singled out via `.` between the values.  But they don't have to be.
- Parentheses are piled at the end of the last piece of the S-expression.  This runs counter to the convention of C.
- There is truthiness: `nil`, `-1` are equivalent in some contexts.  `t` and `1` are too.  For some reason `f` doesn't exist.  For some reason `t` is not quoted.  I guess it's for the same reason why `nil` isn't quoted either.
- Because functions and operators are all prefix and parenthesised, `-` between identifiers is part of an identifier join.  Hence kebab case.

Compare this to an equivalent conceptual load to someone that used a Python dictionary as a configuration variable.
```python
vars = {
   "blink_cursor_blinks": 3,
   "c_default_style": {
	"c++_mode": "bsd",
	"java_mode": "java",
	"awk_mode": "awk",
	"other": "gnu"
   },
   "cursor_type": CursorType.bar,
   # ...
   }
   custom_set_variables(cua_normal_cursor_color=CursorType.bar, **vars)
```
Here we have quite a few advanced concepts, but still less than in Lisp.
- Function calls are parenthesised.
- `custom_set_variables` is a function that accepts a variable number of arguments.
- Some of the arguments can be specified via the `<arg_name>=<arg_value>` syntax.
- Other arguments can be specified via a dictionary.
- Each dictionary is a mapping from a string to a value.  Values are dynamically typed.  Each entry is separated by a comma.  Trailing commas have no special meaning.
- Things in quotes are string literals containing that value.  If a thing is un-quoted, and in the input position it _must_ be a string.
- The `**dict` syntax means, expand the dictionary into a one-entry-per-key variadic argument mapping.

See, there's a lot less going on.  There is a lot more to Python as a language, but because conceptually speaking, simple operations are relatively simple, you don' have to worry about your programmers working overtime to compensate for the obtuseness of your programming concepts.  Are each of them individually something that you can learn?  Yes.  But it is a time investment, which most active people try to eschew.  It is perhaps not a bad idea to assume for the sake of everyone's sanity that it is better to keep simple operations simple.  Elisp doesn't let you do that too well.  Even in `use-package` conceptually what is going on is not simpler, it is just hidden better, because it is considered internal to the form.

## Programming in Elisp

One of the biggest barriers to learning Elisp as a programming language is its limited use outside of Emacs.  Unlike most Scheme dialects and Common Lisp, Emacs lisp is confined in its usage to Emacs itself.  There is no standard library that is used indepedently of Emacs, there is no way of embedding it into another language.  It simply exists.  The only way to ensure that what you are building is going to work on another person's computer is if they themselves have another instance of Emacs.

It used to be that Emacs cam pre-installed on Apple computers.  Not anymore.  On GNU+Linux the GNU Emacs is a shockingly scarce program, while `ex/vi` are often pre-installed. Because Emacs lisp is interpreted, you can't even exactly rely on some magnanimous packager to cover the impedance mismatch between what you want, and what you get.  To put it simply,  writing Emacs packages requires the other party to also be an Emacs user.  That used to be the case in most situations but not anymore.

So one might ask, whether Emacs lisp is a good general programming language?  The fact that there is so much good software written _in_ Emacs Lisp, is a testament to the fact that indeed it is.  Lua being a vastly more popular far more advantaged programming language can only sometimes match the quality and quantity of packages written in it.  So what is the main problem?  There is not much of a difference between programming an Elisp package and an Emacs plugin.  To borrow a term from my day job, Emacs is the virtual machine, Elisp is the human-redable method of writing Emacs programs and going outside of this ecosystem is practically a death sentence.

Plus, some conventions that are closely followed by Emacs lisp are quite foreign to programmers from the other langauges.  They imply the existence of global state; the thing that every other modern language is trying to reduce the dependency on.  Some abstractions leak through.  For example, `org-rs`, the Org mode implementation in Rust that is supposed to be bug-compatible with the implementation in Elisp, the one way to guarantee transfer from Elisp to the world outside, actually replicates the internal state of the Emacs lisp editor.  It has the concepts of point, thing at point etc.

This would not be a problem, if Emacs were indeed a swiss army knife that could in principle solve every problem.  The main issue is that Emacs is good for some problems, that map particularly well to text editing, and even some limited forms of graphical editing, but it sucks as a general purpose programming VM.  It can't do web servers, so you can't exactly write a CMS in Elisp, unless, like me, you are deadset on making it happen, no matter the human cost.  It can't be used as a CMS, so you can't exactly have a non-static non-\(O(n)\) blog that you can update easily.  My first instinct of writing my blog entirely in org failed for that reason, I simply have to write everything by hand in Elisp.

## The dead-end

Emacs lisp functions are anti-functional.  They try not to control the global state in fact they encourage you to use global state to pass information between functions.  In fact functions themselves are considered part of that state.  It is a common pattern to replace one function with another.

The intention behind this setup is to encourage the person to think about the machine, also think about how these systems interlock and inter-operate.  the intention is not to hold the programmer back, the
is to encourage the programmer to make mistakes, learn from those mistakes, and to consider these mistakes as domain specific applications.  Changing the behaviour of a built-in function is not a problem, it is expected behaviour, as is the usage of global state.

this is a very different intention than it is behind and language such as rust.   rust for example tries to avoid allowing the  programmer to make certain kinds of mistakes, ones that are commonly referred to as undefined behaviour.   Rust also prioritises long term maintain ability concerns, over the ability to do quick-and-dirty manipulations. The lisp family of languages is preoccupied with allowing the programmer to do what they want, and not concerned with whether what the programmer wants is good for them.   This results in a nonchalant usage of things which in other languages would be considered rude, such as allowing mutable state in the global scope to communicate between functions.  it dry programming this way you will find that this results in faster better communication, albeit at the cost of making things much harder to decouple later.  in lisp,there is no later.

back when lisp was in it's infancy, the very idea of having multiple core processors was untenable.  It was unthinkable to have sixty four processes, hell unthinkable to have sixty four processors.  By the standards of the seventies, the computers we consider ordinary are far superior to the supercomputers of the day.  As such parallel programming was not something to even worry about, and thus parallel programming  was not catered to.  Today however, the fact that Emacs runs in a single thread is a huge problem.   This basically means that the program will block every time you run along operation, which precludes that usage as a server, CMS and other areas.

Python, a programming language which was designed at the proximal time, is considered the golden standard for single threaded applications.  There is no place, no scenario, no situation scribe in which a person who knows the more popular language would be compelled to use Lisp.  And now consider that the lisp in question is not even considered good.

## Corollary

This whole begs the question, is it even worth learning in this day and age?  For me it does, as it covers too many problems which would be otherwise harder to solve.  The are far too many packages which already do what I need, what I do not consider myself a good lisp programmer, I feel that I could if I were compelled to solve a new problem that I could write it in Lisp.

But it would not ascribe as much of the success to the fact that it (Emacs) is using as an esoteric language from the seventies.  I firmly believe that it is more of the architecture of the editor itself that results in such a mix of such a flexibility and package variety.  Simply put all of what makes lisp great, has been added to other programming languages, and what doesn't work has been compensated for very well.   The new editor which gave you the same kinds of flexibility, but offered much more of an approachable programming languages as a configuration medium would easily overtake Emacs.  And indeed so has done VSCode.  It is a modern day successor, though it offers less flexibility and JavaScript is considered a far worse language, it has all the building blocks that made Emacs great at the time.

What resulted in its meteoric rise was not so much the fact that it was better, as it is far too under-developed to be in any way better, but the fact that most programmers felt at home in its configuration.  Hacking on VSCode is just as easy as doing web development.  Though one may rightfully argue that developing for the web is not in any way easy, and that there are many subtleties, these are all problems that had been solved elsewhere, leaving VSCode to reap the benefits.  Emacs, on the other hand had to fight for every minute optimisation.  Every package that was built for it, was built _specifically for it_.

Emacs lisp still has a place in this world, if and when we at least admit that there is a problem.  We can start by admitting that the documentation Emacs provides is good, but it could be much better.  To give you an example, consider the package `helpful`.  What it does, is it tries to cram as much information about a specific function as it can into a single buffer.  You asked for knowledge, and you received a relatively good explanation.  But there are flaws.  The formatting is a bit all over the place.  There have been major strides in this area, given that the old way of doing things: a plain-text buffer with no markup is no longer the default.  Still a way to go.  The same is doubly true of the official [Emacs lisp reference](https://www.gnu.org/software/emacs/manual/html_node/elisp/Conditionals.html); I will not argue that it is ugly, but I will argue that it is a bit dry.

Then there's the question of there not really being good Emacs lisp books.  Sure, there is Mickey Petersen's book on how to master the Emacs program, but not a place where the wisdom about Emacs lisp programs is assembled.  There is no primer on writing themes either, and while the basic graphical UI that is built into Emacs allows for a ton of customisation, converting it into a theme package is one area where we have much to improve upon.

What do I mean by a book?  Suppose that I wanted to write a program and I needed the equivalent of the `switch` statement  of C in Emacs lisp.  I would have to  comb through many symbols that do not look like what I need.  At the same time, the correct symbol: `cond` has a name that you wouldn't necessarily even know to consider (the same is true of `setq`, `set` and `setf`, which the person has no idea how to use).

Secondly, the phrasing "Try each clause until one succeeds.", tells me next to nothing about how it actually works.  It's fine for a formal mathematical textbook, but there are much better ways of explaining what this form does to a programmer even in the API documentation format.  The word `try` is overloaded in programming contexts, "evaluate" has strictly one, and it's the correct interpretation in this context.  If one wanted to retain the slightly informal nature of the documentation, one could say "Conditionally evaluate one of many  clauses".  This tells the user more and overloads their head less.  Plus the the word "Conditionally" being the first in the description allows for a mnemonic for someone that is just trying to learn the language.

I can give you more examples.  I worked as a technical writer could tell you more about being clear about the intent of a language construct.  Suffice it to say, some areas of the documentation could use a bit of polish.

Secondly, and perhaps more importantly there should be more examples.  For me, this itch is scratched by `helpful`, but it usually gives you real-world examples from the packages that you already have installed, as opposed to annotated examples.  If it were up to me, the documentation would look something like this:

```lisp
(cond
  (nil (message "this is false, so not evaluated))
  (t (message "this gets evaluated"))
  (t (message "This is true, but won't be evaluated")))
```
Best practices are also an important aspect.  Because of the fact that Lisp is a different beast, what is good in it, is bad in other languages, as such the documentation should fill in the gaps and define a style.  The editor is quite keen on insisting on some style, so why not give the same treatment to the rest of the packages.

## The Emacs lisp manual

Around six authors, including the GNU project's initiator, Richard Stallmann have authored a book that I am torn on.  I would be lying if I said that the book is easy to read, I found mathematical textbooks to be easier to read due to rigour and precise language; more lay-person oriented books focus on conveying the ideas as simply as possible and ignore details that are not pertinent to being proficient.  This book, despite my sympathy towards its authors is neither; it somehow managed to find a sweet-spot of being neither particularly useful for people who are already well-versed in Lisp, nor to those that would find Emacs particularly challenging.  This book simply _is_, and can supplement one's knowledge.  It can be used to find imprecise and outdated answers to questions that are much easier to phrase as search queries.

To add insult to injury, rather than making the book as concise as possible, the main reason behind the formal style; the book is enormous, and looking through the contents, I already envisioned pages that I would be skipping.  The book is god-awful, and is a telling reminder that despite Prof.  Stallmann being an avid linguistic enthusiast, his communication skills are sorely lacking.  I do not claim to presume to be much better at this, but this blog is largely a run-up towards improving the writing to a point to which I could be writing a book.  I have one in the works, and I will do my best to at least have a human readable introduction.

The main problem as I see it, is that this book does not in any way address the problematic aspects.  Most people are not well-versed in Lisp.  The documentation must acknowledge this, and explain things with many examples.  The reason why this is important, is the precise reason why _any_ mathematical book worth its price, will come with exercises, proofs and explanations.  For each concept there must be an example, and a counter-example.  Again, don't mean to self-advertise, but this is what I was trying to do in my book on Rust.

# So why is there so much Elisp

This begs the question: why is there _any_ Emacs lisp.  After all all throughout this article I have been providing scathing reviews of everything that is related to the lisp.  Why do veterans still prefer to create their packages for this venerable editor as opposed to anything else new?

Tough question, I should say.  And I do have an answer, that I find less satisfying than I'd like.  But nonetheless an answer.

First of all, one must remember the abhorrent state of graphical programs on GNU + Linux, or as I call it now, lip-service to freedom.  If I wanted to create a program for KDE specifically, there's a good chance that some user of Gnome will want to use it (because nobody else created an analogue for Gnome), complain about it, and create an aura of negativity.  KDE programs, do not prevent themselves from being run on other desktops, but also do little to bridge the gap.  The programmer, thus, has to bridge the differences themselves.

Case in point, I have an idea for a voice transcription program.  I know exactly how to create the business logic, and I have some experience in using UI toolkits.  If I wanted to target Mac OS, I have but one realistic choice: write it in Swift and use the system libraries.  If I wanted to do the same with Windows, there's a bit more choice, but if I want to have the broadest compatibility, there is a native toolkit that looks decent for utilitarian programs, metro if I wanted to make it as shiny and messy as possible, and Qt to make my life less painful.  On Linux, I do not have a choice that is guaranteed to satisfy everyone.  Qt has more features and is generally more powerful.  GTK is more ubiquitous, but perhaps has too many residents of an insane asylum at the helm.  TK is so old as to be irrelevant and in some ways too slow.  Plus, many things such as access to the keyboard, to the network stack, and to the system tray, come down to a broad spectrum of traps posing as choices.

Instead of having one program that covers all the needs of a specific niche, you have hundreds of programs that each individually cover 50% of the territory, can't coexist, and therefore cannot give you complete coverage.  The few exceptions to this, are `systemD`, `emacs` the browsers, `ffmpeg`, `vlc`, and  `blender`.  As you can probably tell, the fact that these are also the most prolific libraries and platforms is no coincidence.

Simply put, the energy one would have to put into writing a `systemd` unit, is less than a more "theoretically sound" process supervision suite such as `s6`, not to mention that there is at least some documentation that is somewhat useful for the former, and next to none for the latter.  Similarly, despite its many shortcomings in terms of rendering fidelity, `vlc`, offers a unified package that can handle all of multimedia.  It is not _a player_, it is something that can plug all multimedia-sized holes in your life.  I did not like it, I still do not, but I have had to use it, because in some situations having this Swiss-army-knife of a tool is extremely handy.  It might suck as pliers, or scissors and be a bad knife, but if the number of tools that you can bring with you is limited, you practically have no choice.

Emacs, is kind of an interesting counter-example.  It is by far closer to Blender and FFMpeg, in that it does offer a platform, but aside from a few kinks in the main executable, is actually fairly sound.  You have robust text processing and a robust, well-tested concept of a buffer.  You have packages that can clearly interact with each other and can be made both compatible and in-compatible.  It offers you a quick and dirty way to create a menu, which would otherwise be much harder.  It offers even some rudimentary graphical programming capabilities, not enough to build a fully-functional browser, but enough to browse text-only HTML sites.  Emacs can plug all your plain-text-sized holes, it is supremely good at writing prose, it integrates well with LSPs, and offers two different approaches to that.  Emacs gives you networking that is guaranteed to work on all platforms, which is quite a bit more than what Qt can say.

It is easy to extrapolate that all of the problems that programmers have to deal with in Elisp are preventing serious programmers from working on serious projects, but quite the opposite is true.  A veteran such as Minad, or Prot, or any one of the Emacs core contributors for that matter, finds the problems just part of the job.  Elisp is just like any other Turing-complete programming language, do enough work in it, and you will stop noticing its quirks.  Do a bit more, and they cease to be problems, but more opportunities.  The fact that everything is a textual buffer is a great help when you're building a program such as `magit`.

The fact that you do not need to cater to less refined users liberates you from having to write code that is intuitive to grasp; you can rely on the person on the receiving end, understanding that they can simply look at the source code for some things.  And this lets you create programs with a higher skill floor and ceiling.  If there were an attempt to create Magit, but as a desktop application, there would be plenty of other work that would be far too much.  As it stands, the simple amount of interconnectivity that Emacs offers as a hub, lets you be what you are, a programmer, who has some additional programs that can do some additional things.  Simple as that.  If one were to try and reimplement Magit in a different language, it would result in the program itself being far more widely used, but be far less acceptable.

Consider that Magit actually does not tell you what to do.  The fact that `TAB` can do anything is itself a bit of a stretch.
