---
date: 2024-01-09
category:
  - Blog
  - Markup Languages
---
# What I don't like about Vitepress

This is a continuation of the rant about static site generation systems. While I liked vitepress a lot more than I like Jekyll I still have some issues with how it works.

In principle it is one of the better static site generators in my opinion, probably better than anything that I've dealt with so far...

But it begs the question of "does a static site generator as a concept" need to exist?

I don't know.

I've yet to try it. But I have a few principled problems with `.vitepress` that I'd like to voice.

# Documentation -- the only thing I like

Vitepress is well-documented. But it still entails dealing with a tangled mess of files strewn across and sprinkled into several files.

You can follow an easy-to-follow tutorial, and in principle, you can, in the future at least, have some choice.

But the problem is that what I wanted was a blog. What I got was a documentation site.
It's fine, in principle.
A blog is a glorified documentation site.
But it's not what it seems to be.

The particular choices which make a good documentation site: minimal aesthetic, emphasis on navigability and absence of custom components is really a positive.
In case of Vitepress, I can't really complain.
But where oh where in its description does it state that?
I assumed that the thing was essentially a `Vite` of Wordpress, something I touched upon previously.

And here's the downside.
It's not.

> Simple, powerful, and fast. Meet the modern SSG framework you've always wanted.

Doesn't even touch upon the fact that it's only really dialled in to generate documentation sites.
It's fine, and it can help if I (very reasonably) don't want to touch Readthedocs, I can now just create a GitHub pages for that.

But it's not suitable for my blog.
As of writing, this is what I use, but I don't plan to stay there for too long.

I don't know if it's as good of an idea as I thought it would be for using Vitepress on [Greybeard.consulting](http://greybeard.consulting).
I just don't feel that it adds as much value as one would think, especially given that this is meant to be a blog on the cheap (currently, the most expensive part is the domain).

The only saving grace of vitepress is that it is well-documented in many areas.
If it's possible to do, you may find a reasonably up-to-date document describing how to do it.

One word of advice would be, of course, to instead focus on the examples, and ignore the long descriptions.
These are fine for a book, but it's almost always better to have examples that are grouped together with very terse prose, than it is to have detailed descriptions of what a component does.

Vitepress is very good at that.
It might not be the best at it, but it's close enough.


# The illusory Vue

I'll say this straight. Vue isn't particularly well-supported on Vitepress.
It took me a little bit of time to even figure out what I can and cannot do on a page, and it seemed to me that it should be possible to set up somethijg that looked cool in a matter of minutes.
That is far from the case, and there are quite a few problems with the styling aspect.
I was wrong about the fact that it would be easy to do.

What's doubly frustrating is that the solutions that one has to resort to are increasingly online.
This is a common problem to most modern coding practices but increasingly a problem with Web.

In Rust, you can mostly rely on the fact that everything is explicit.
Even if you have things like `Default` and/or `Serialize`, you have a `derive` macro somewhere and a definition of what those macros generate.
Farbeit from looking at the macro source code, you actually have something like `macro-expand` and LSP support that can show you what the code actually looks like.


In web frameworks, there are as many practices as there are frameworks.
Vitepress does not require you to define every option, so the options need to be documented elsewhere.
I can attribute some of these problems to the fact that JavaScript allows one to define a strcture with some of its fields sparsely populated, but if you had the time to add a link to the documentation, you could have also added the options with their default values.
The upshot is that the configuration looks deceptively simple if sparse.
The biggest downside is that sparse configurations are rarely self-explanatory, and they require keeping the default value in the binary that actually depends on them.

So where does that leave us?
We're stuck!
If I wanted to use e.g. `primevue`, I have very little in terms of documentation to go by.
If I wanted to use something more fancy, like `vuetify`, I'd have to be an experienced front-end developer to build what I wanted.

Compare that to what would happen if I did this with "dirty" tricks with HTML and CSS?
Those are fairly straightforward, and if you mess up, the number of places that you need to check and the amount of feedback is astonishing.

I guess what I'm saying is the following; it's a skill issue, and the skill floor for getting the thign off the ground is very low.
But the skill floor needed to actually do some customisation beyond the `css` is a lot higher.
You can say that I don't get to complain about it **because** I've not done enough front-end development to know how to fix these sorts of problems.
I'll raise you this, because I'm relatively inexperienced in Web front-end, I can tell you that this is not how things are meant to operate.

So, for the time being, I can add custom Vue components, but this is neither well-documented, nor particularly easy, so if you think, like me, that you could just go shopping for free and open source components that you can add to your site  to make it look like more of a blog, you are sorely mistaken.

# Automation

The other problem I discovered was that there's not a lot of automation.

In principle, I would have thought that I can organise things into folders and make sure that things appearing in one folder always show up and get translated into a navigational structure.
That is not the case.
I have to _manually_ add each entry I want.
In principle that gives me more control, but it also defeats the purpose of having an SSG.

Secondly, this adds plenty of room for error.
Consider how much simpler it would have been, if the way to add an article were to add a Markdown file with a frontmatter.
And Vitepress handled everything from there?

Well it certainly handles the layout, but there's a rule I'd like to call the minimax rule for libraries.
If you have a framework, as in you run a bunch of smaller code pieces and maybe a config file then your framework must have many features or be very specific.
If you have a library, the opposite is true; smaller libraries that do very general things are better.
So for example, if Vitepress were a library, as in it offered some basic components, a basic theme, but you were in charge of building everything yourself it would be a very good thing.
To be a good framework, Vitepress should be more specific, it's about converting a tree of markdown documents into a convenient documentation interface, and/or offer a bit more in terms of flexibility.

And the fact that it does so little in terms of automation is ... for lack of a better word... baffling.

Why do I have the option to produce documents whose titles have nothing to do with each other.
Why do I have the option to not specify the title of the page in the frontmatter.
Why does this site have an article with one title in the navbar, and a very different one in the actual text (just look at the Emacs article).

This is doubly baffling given that a static site generator, by definition has everything it needs at the time of execution.
We don't know some of the variables, like the size of the screen... but the rest is just a very interesting omission.

# Markdown

I will honestly refer to this as markdumb at this point.
It has lightweight syntax, but manages some of the most complex grammars, it's unreliable, unpredictable and in some areas, just plain stupid.

::: warning
If you treated markdown as a first class citizen, and don't treat any other markup as such, I believe that you have room temperature IQ. in the Newton scale.
:::

::: warning 
I don't hate Hugo all that much.
I don't think it's a valuable way to waste my time on Hugo, because of precisely one excerpt:

> We love the beautiful simplicity of markdownâs syntax, but there are times when we want more flexibility. Hugo shortcodes allow for both beauty and flexibility.

Go by itself isn't a bad language, but in the hands of total idiots, there's a lot of damage to be done.
Stuctural typing, ability to get away with bad design, and quick re-compilation equal an amount of technical debt that I frankly don't want to deal with. 
It will go down under and I will have problems with it at some point or another.
So why bother?
:::

This is a harmful technology.
The only reason why there's not a more expansive discussion as to why it's bad is because I'm really collecting my thoughts.
There's a lot wrong with it, but particularly in context of Vitepress.

This is a very good example of why relying on HTML is a bad design decision.
There's so many things that can go wrong with it!
There's so many ways in which the page can error out.
To illustrate, among the representable states the valid states are a superminority.

I like the fact that I have the choice to use HTML.
But I wouldn't credit Vitepress with this.
I think that this is because to design a markdown to HTML passthrough that also made it impossible to replace the entirety of the markdown text with HTML is probably not as easy as one would believe.
Read, Vitepress would have to try hard to disallow using an HTML page instead of markdown.

There's a bunch of descriptions as to how to create a custom Markdown element, because the syntax of this language is completely ad-hoc and terrible.
The trouble with it is that it's kinda difficult to override the markdown parser, if for example, the markdown parser is hidden in some framework, and there's no convenient way of writing a parser.

Why is this different from say `pandoc`?
Well, it turns out that Haskell is really good at domain modelling.
It's a purely functional language that is quite functional for defining parsers.
So it turns out that writing a document parser for something that is as messed up as Markdown is [pretty easy](https://github.com/jgm/pandoc/blob/09b6db8c507b102dd20d7294cb7204d8f46eb77a/src/Text/Pandoc/Readers/Markdown.hs).
Doing the same in either JavaScript or TypeScript seems harder, and so there aren't many parsers for something like Org mode.
Even if they _did_ exist, there's a stability to Haskell and Haskell libraries that is not paralleled in JavaScript.
The amount of effort needed to maintain a parser for a stable format is a lot for JavaScript.

# It doesn't fit my needs

Vitepress isn't as flexible as its tagline would have you believe.
As I said before, I think it's good-enough for replacing something like read the docs.

But for anything else, I found that it's providing too few examples, and too little feedback on what is actually happening. 
I'd say this much, as a beginner I didn't feel like I learned much about Vue or how Vite operates.
I felt frustrated at two things; the code is incredibly coupled to the point of not working when it's taken out of its regular habitat, and it felt too abstract.
