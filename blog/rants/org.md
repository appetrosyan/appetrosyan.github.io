# Org is not special

::: info

This article has spent a long time in the oven.  For a while I didn't even know that I wanted to publish it.

:::


Org is considered one of the better lightweight markup languages and it certainly has merits.  It is widely considered a superior alternative to markdown, which if one thinks briefly, is not at all challenging to do.

Org is widely supported on Emacs.  It is pretty much unsupported on most platforms, including Visual Studio code, any of the IDEs, and while it is somewhat accurately interpreted by GitHub and its ilk, seldom if ever is offered on such a wide variety of platforms, as even the Emacs keybindings themselves.  There are few if any sites that would offer a collaborative editing environment for org.  There is a great deal of resistance towards adopting org as anything other than a curiosity.  Despite being loved and sometimes deified within Emacs and Emacs-adjacent communities, it is safe to say that org is nothing other than a curiosity.

So why then dedicate an entire article to it?  Because at a time not so long ago, I considered org to be the future of markup.  I considered it to be a far superior option to even heavyweight note-taking applications such as Notion, and was amused, nay indignant based on the idea that someone might build a note-taking, to-do application without supporting Org.  Thankfully there have been a few small incidents that have convinced me that Org should be left to the same fate as is ReStructured Text, ASCIIDoc, and `typst`.

If you have some free time, don't invest it into making org better.  Borrow ideas from it, but don't invest into org itself.  What good there is about org, can be summarised in a table of ideas.  And sure, one can admire the craftsmanship that went into making org what it is today.  I will however, vehemently opposed the idea that anything other than _some_ of its ideas should be poached.

::: warning
This is a long and detailed rant.  Grab a drink and a snack (and please put down the pitchforks)
:::

## Org outside of Emacs

The simple and most important argument against using Org is that it lives inside of Emacs.  There is nothing wrong with that _per se_, `magit` lives inside of Emacs too, and would be unthinkable outside of it.  It's fine precisely because this is merely a means of representing data that is universally accepted by the rest of humanity as the way we do version control.

Emacs and `magit` may define their own concepts, such as `Instant Fixup`, one of my favourites, but those leave no externally observable consequences, the Git repository is clean, and there is no evidence that the person editing it, had been using Emacs.  That is a great accomplishment and in my opinion a great testament to the intelligence of its designer.


The problem with `org` is that, like me a year ago, you are tempted to say: why don't we convert all our READMEs into org?  And indeed, if you are using GitHub, you might actually be in a good spot.  Dodge a bullet.  Until one day, one of your coworkers asks: <b>"what the hell is an Oh Arr Gee file?"</b> You do tell them that there is a plugin for it, but because it is outside of Emacs, there is virtually zero support for it.  From their perspective, it is both too much work, and offers too little in terms of improvement over Markdown.  For what feels like a very simple thing; lightweight markup, org tends to bring in a lot of bells and whistles.

So what efforts are there to change that?

### Org-rs

For one there is `org-rs`.  A semi-dead project, that has had a sound idea at its base, but is no longer actively maintained.  And for good reason.  It is a Rust-based library for processing Org files, that is both unsuitable as a parser, and as a library.  It is too entangled in Emacs internals, to be useful as a library.  It has a maximalist design, as does everything Emacs.  Unfortunately, because in code there is little to no differentiation between `outline-mode` and `org-mode` there is very little that one can do other than replicate around 80% of all of the dependencies inside Emacs.


