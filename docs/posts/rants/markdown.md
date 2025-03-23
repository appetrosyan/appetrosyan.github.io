---
date: 2024-01-11
category:
  - Blog
  - Markup Languages
---
# Markdown considered harmful

I've had complaints about Markdown for years. I don't like it. Is it better than e.g. writing your code in ReST, I'd argue marginally, and only if you assume that ReST was meant to be used in the same circumstances as Markdown, which it does not.

In my opinion, if your life revolves around Markdown, this article will make your life a bit easier, not by a lot, but still. I'd make the case that we're better off leaving Markdown behind, and instead to move beyond "lightweight" text-based markup.

For the record, I believe that something like Org, while miles better in execution still suffers from the same problems in concept.

So without further ado.

## There's no Markdown grammar

This is a fairly pervasive problem for all "lightweight" markup languages. Specifically, that most people come up with the markup with no regard to traditional BNF and parser combinator approaches. This leads to some things being impossible to represent, some other things being impossible to do, some combination of the two, and a collection of problems related to the fact that you both want every single possible UTF-8 character to be represented, every possible feature of a markup language typography to be represented and to some extent, to be able to do things elegantly.

So what is the problem, then with there being no grammar to refer to? Well, the fact that when I say Markdown, I have to say explicitly, `CommonMark`, or `Github-flavoured` or `shit-encrusted`. Markdown as a standard only communicates a very vague notion of you do emphasis with underscores, boldface with doubled asterisks and some unholy combination of square and round brackets to do links. Other than that, your mileage can vary wildly.

I'd say perhaps that the reason why this is bad has less to do with the language itself, but with the approach that people take to it. We assume that we could just do things the right way and it would work. That right way happens to be up to the interpreter, and now your way of doing things correctly is contingent on knowing, for lack of a better word, which features does `shit-encrusted` markdown have. (incidentally, this project does not and will not exist, primarily because its sheer existence would imply that all other markdown is **not** `shit-encrusted`).

TODO Latex \usep{}, 

TODO EMMET

TODO Roff

TODO Extensions break markup

TODO domain modelling

TODO logic doesn't allow for one thing to be both italic and bold, but to be bolditalic

One common advantage of thinking in terms of grammars is that it makes the design of the markup language easier, not only to make, but also to understand. Case in point; in Markdown the `#` symbol delineates a heading, inheriting the somewhat outdated semantics of HTML's `<h1>`. It makes natural sense to assume that `##` is equivalent to `h2` and beyond. This _is_ good and something that Markdown does well. At the same time, things like links to headings follow rules which I, as a programmer with 15+ years of experience, having dealt with a whole zoo of programming languages, both functional and esoteric, second-guess myself when doing cross referencing. It would have been simpler to have a `\label**-like method for most if not all interactions, but for that to have been possible, there ought to have been some foresight.

Org is slightly better in this regard, because while it comes with most of the markup already defined, it allows definition of custom markup, and in principle, a label-like reference system. This is also one of a few places where ReST will feature in a positive light.

## Fallback to better languages

One of the most profound counter-points to this critique would be to say that, if all else fails, Markdown usually falls back onto HTML. Anything, including this blog, that accepts markdown, also accepts HTML, so if I wanted to, for example, have more reasonable hyperlinks, I could do it in HTML.

The argument is problematic, because in that case, Markdown is a quick and dirty way to create HTML; in which case, why don't you **just** use HTML?

It's a similar problem with Org and LaTeX. Sure Org can do things that are impressive by "lightweight" markup language standards, but fairly standard on LaTeX... so there's few if any incentives to anyone who's already fluent in LaTeX to use Org for Markup (though thanks to what I just described in the previous chapter, there's plenty of other uses).

What is more problematic is that the ability to fall back to HTML, means that some features that would be enormously important for semantic reasons, will never get incorporated precisely because they're already available in HTML form.

One final point: the fact that you can generally rely on HTML as the intermediate representation of text, means that Markdown can never eclipse HTML. It cannot have a heading more deeply nested than `<h6>` and it can't possibly parse better. And it kinda makes sense, most places you'd use Markdown is on the web, so you don't want to veer beyond what is the gold standard. Which begs the question... why not just use HTML?

## Markdown has restricted semantic content

MD is simple. I'd argue too simple and it misses the point which LaTeX made all those years ago. The importance of these formats is in how they can separate the semantic content of the document from the presentation aspects; and that this allows one to do wonderful things and conform to general styles, without sacrificing on complexity of the semantics.

HTML, for all its faults, is a descendant of SGML, which allows it to do that, and to do it remarkably well, in some cases. You have the built-ins like `<b>` and `<i>` and things like `<a>` which would be difficult to implement without access to the end-user's interpreter. At the same time, these comprise more of an instruction set, rather than the language itself; there's such a thing as `<em>`-phasis, which is rendered italicised by default, but has a very different meaning. There's `<strong>` which is not the same as `<b>` and they can be styled independently given the existence of Cascading Style Sheets. How do you style a markdown tag? How do you define a custom tag is another matter, but suppose we dealt with Markdown that addressed that issue. Markdown would need an equally complicated (read slow) means of styling.

What is more egregious, is that adding those would be inherently against the spirit of being a "simple" markup language. It is perfectly possible that someone could study HTML and not know about the existence of the `<cite>` tag, but because there's no agreed upon grammar in Markdown, there's no way of adding that tag in a portable fashion, other than falling back on HTML syntax. And in all fairness, this is not itself a problem, if it weren't for that

## Markdown is used in places where heavy markup should be used

My first foray into creative writing was in 2020, where in the aftermath of the StallmanGate, I started writing. So for that to work, I needed to produce a text. In any form I wanted, if we're completely honest. It didn't matter.

But naturally the way we'd post was using Markdown. Odysee has a nice UI, and a user-friendly way to post information. That and reddit, are the only two platforms on which I've had issues with Markdown being escaped: it wasn't as much of a nightmare as you'd think, I just had to search for the literal `\` and replace it with nothing. It's fine, but it's an annoyance nonetheless.

What I find fascinating is that on MacOS, to the extent to which no other operating system, there's support for rich markup. When one copies text, it gets highlighted. This might seem quaint, but it frees one from having to implement syntax highlighting in every program, inclduing for example, `keynote`. All I need to do is to copy the already highlighted text into a window, and presto it works.

This might seem quaint to some, but it is actually low-key genius, because the way I do syntax highlighting in my editor is very different to the angry word salad that most editors prefer.
## WYSIWYG is important

In Markdown I don't really get a choice of how to higlight code. I'd like to, but there's no way of doing the highlighting in a different way; by that I don't mean the colours, it's somewhat involved to change the colours in the CSS, but it isn't exactly impossible, what I'm refering to is the ability to highlight different kinds of keywords, or highlighting identifiers with different colours, I can do it. The process doesn't change much whether I use Emacs or some other text editor. This support for rich markup makes the fact of rendering the markup a priority for the specialised program, not for every possible instance that might need it.

So why **don't** we have a reasonable support for rich markup? Frankly, this eludes me. I know for a fact that most web browsers support it in some form.  I know for a fact that it's possible to implement a system like that system-wide, and that in principle, there's nothing problematic about there being different platform-specific conventions about how to utilise the rich markup (say `CMD+B` and `CTRL+B`).

What I found to be nonetheless true is that most people prefer "simple" markup via Markdown for reasons of reproducibility. Despite lacking a standard, Markdown is susceptible to introspection, if your implementation uses underscores and not single asterisks for italics, then there's an easy way to see it and to correct it manually. In case of rich markup, unless there's a tool for it, there's no way to know. As a consequence, despite MS Word being several decades older, fixing markup in Word is harder than it is to fix markup in Markdown.

As a programmer I'm conditioned to believe that text-based markup, one where you type in characters in a text editor, rather than a document editor is superior. But, and this is crucial, is largely a lie, given that a transparent interface based around XML, is what most if not all office suites have converged upon as a solution, I see no reason why we can't simplify some aspects of the XML markup to be less annoying.

What I will give to Markdown and LaTeX is the ability to cleanly separate the presentation aspects from the logical structure, but I see no reason why LibreOffice or M$ office have to be the "gold standard". There are progams, namely Lyx and TexMacs that can compete and do so very well.

The main reason why you would need to use a WYSIWYG editor is the immediacy of feedback. Lyx can give you a very accurate idea of what the equation that you just entered is doing. Sure I **could** get that information by parsing LaTeX, but I'd be expending more of my valuable brain juice on doing a task that's much easier to do with a computer anyway.

What Lyx is missing is general support, because most UI frameworks think that supporting Markdown is good, and supporting LaTeX is not. And they're right; LaTeX has more than half a century of technical debt accumulated over the years. It'd be hard to clean that up, and nobody wants to deal with it. Markdown is a relatively new format, that is not very ambitious, which is why it took off.

Another feature which I would qualify as missing in Lyx is the abstracted complexity; there's both a problem of Lyx being extremely complex, to the point of intimidating even a seasoned programmer, and also not nearly supporting the variety of possible configurations of a TeX document. It can create presentable works, but it lacks the ability to define custom macros and have them be accessible.

To put a final nail in the coffin, Lyx is not very WYSIWYG, in the sense that it doesn't exactly produce the final PDF. You see the text, but you cannot put this stuff from within the UI, the one thing that you can potentially need.

I just think that we may have lost something along the way; that we should perhaps consider doing things in a more visual fashion. I'm willing to bet that your content people would like that very much anyway, because they're very visual creatures.

## Simple markup is not simple

This is probably the least substantiated of my complaints. It's more of a feeling rather than an observation. But Markup basically comes down to
1. I need to specify text with typography/highlighting.
2. I need to cover all UTF-8 characters, because they can be part of regular text.
3. I need to insert images and style it externally.

So normally what one ends up with is Markdown with many superfluous bolt-ons. What people mostly don't want to end up with is HTML, because it's rather verbose. What people definitely don't want to end up with is some opaque non-standard binary format that will keep on changing and break their existing documents. What is perhaps every non-technical person's nightmare is having to do this in LaTeX.
