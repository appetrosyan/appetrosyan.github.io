---
date: 2024-01-08
tags:
  - Blog
  - Markup Languages
title: What I don't like about Jekyll
---

This is perhaps a fitting beginning to the first blog post on my home page.

I FUCKING HATE JEKYLL.

I'm quite surprised, and frankly appalled at the fact that there are few if any useful tools for generating static sites.

I started off with Jekyll, because it seemed like the right tool for the job, after all it is supported by GitHub.

Well, frankly, proudly hosted by the same people that brought to you Atom, then Atom EEE edition, then managed to move what was perfectly logical and could be done via a regular UI with convenient previews into `_config.yml`, seems like a fitting endorsement.

Having gone to a GitHub developer summit, I can confidently say that the priorities of GitHub lie elsewhere to what is actually needed for the FOSS community at large. Namely, tools that fucking work, and come with little baggage.

Jekyll manages to kill itself twice with one stone, by providing both minimal functionality, and maximal baggage.

## Non-functionality

Jekyll doesn't do as much as I hoped. To the point, that I don't think I really needed it, or want it.

All it does, is provide you with a template syntax that perhaps only a genius would appreciate;
```html
<ul>
  {% for post in site.posts %}
	<li>
	  <a href="{{ post.url }}">{{ post.title }}</a>
	</li>
  {% endfor %}
</ul>
```

As you can see, if I wanted to add more, I would probably need to add it mysefl. Which begs the question, of why do I need Jekyll, an extra dependency to do basically next to nothing.

I would appreciate Jekyll (and themes** to be able to inject the index and to do some background logic and to produce a nice looking index. Given that all of the CSS magic to make them look palatable has to be done by me **anyway**, I keep wondering what [Jekyll docs](https://jekyllrb.com/docs/posts/) is describing.  In a roundabout way, most of Jekyll's docs come down to "here's how to do something extremely basic that someone with half a brain and *some* knowledge of HTML could do faster, and here's a blurb about how you *cONTroL StUfF* which doesn't let you do anything **but** that most basic shit. "

So the next point comes down to themes. I've done WordPress I know that the basic underlying system can be a bowl of spaghetti, but at least it has a healthy community of people who have managed to paint a masterpiece with the limited tools. Nope. The GitHub pages comes down to a handful of supported themes, all of which look like they've come from 1994... but load like they're based in 2024. Incidentally, most "good** themes, are really just template repositories, that they encourage you to fork. **Do not fork any of the themes**, copy and paste the files without the git metadata. The license, more often than not, permits it. This will allow you to have a clean set of commits that don't depend on the authors, you can still pull from upstream (but you really shouldn't). All good the other way does to you, is introduce a nice reminder that you **took** someone's work, instead of doing it yourself. That's something that I watch out for on personal websites, especially ones that come with *myName.github.io* as the domain.

So why, oh why, am I supposed to use Jekyll? To allow me to put my blog posts in a folder that starts with an underscore? Like, sure, if Jekyll didn't look like someone's hobby, I would *probably* permit it the non-ability to change where the blog posts are put, the inept naming convention, probably from someone who came from an older tradition of programming, where prefixing `m_` to a variable was a substitute for decent tools and critical thinking. But what are the benefits? I've yet to see one!

## Baggage

This is something that is rather confusing to me to this day. Why Ruby?

Well, perhaps that's the wrong question, why you designed it in Ruby, is very much up to you. Design it in OCaml or Haskell for all I care. As long as, there's a neat way of using it, and it doesn't require a jumbled mess of packages that are not managed by the single system-wide package manager, I'm fine with it.

But I also try to be minimal with these tools. They can fall into disuse, if I don't primarily work in Ruby, I don't want the full toolchain to be installed, or alternatively, I want the package manager to require minimal manual intervention. For all its faults, Python's package management is largely done through `pip`. It can go haywire if you don't touch it for a very long time, which is precisely why on Archlinux, for example, you are highly discouraged from installing pacakges via `pip`. You can do so in a virtual environment, which is insufficiently virtual for me, but at least it cannot interfere with future development if ever in the future, I would need something. I try to keep my users as far away from `cargo` as possible, despite it being far better managed, categorised by toolchain, and far *less* likely to cause problems similar to the one that I encountered when I had conflicting packages from dependencies needed for a Python pacakge installed via `pacman` and Python packages installed via `pip`.

I'm not convinced that asking people to use the package manager of your chosen language is a good idea. I am not planning on writing Ruby, and interaction with Jekyll doesn't entail much Ruby writing. But it does entail interacting with the Ruby `gem`s for themes, and I sincerely hope that if at some later point I'll need to do something with Ruby for real, I wouldn't need to change any settings, and I wouldn't have inexplicable "third option" problems when X was supposed to happen, there's a troubleshooting guide for if Y happens, and what actually happens is more akin to Z.

The second observation that I have is that Jekyll is quite opinionated. I can't set my blog titles to anything other than the one chosen for me. This lack of flexibility doesn't mean that there's anything useful happening with it, just that it has to be that way.

The second point of it having an (incorrect) opinion is the choice of markup. Taken from [Jekyll docs](https://jekyllrb.com/docs/posts/) "You *typically* write posts in Markdown, HTML is **also** supported."; emphasis, mine. From experience, the only people who like Markdown are the people who tend to mostly write it. It's a write-only markup with a perverse logic that at some point becomes obvious by osmosis, instead of immediately. The problem with Markdown comes down to the fact that it is (like XML) difficult to read by machines (but at least it's easier to read for humans). I would get Jekyll if it said "We only support Markdown", or "We only support HTML". The latter gives the person writing a lot more control over what happens, even though HTML tends to be unfairly regarded as a clumsy or clunky markup language, most would agree that WEB **is** HTML, and if you have a web-based blog post, it makes sense. Plus you can always export Markdown to HTML, so it's not exactly a huge problem.  The former choice of only supporting Markdown is yet another thing which I would be happy with: Jekyll would be off my radar, and perhaps would not give me any false hope.

The trouble is that having two supported formats adds the overhead of a generic system, without making full use of it. If you support MD and HTML, you *ought* to support Org, ASCIIDOC, RTF, maybe even XML. Why do I need a plugin for that? Why do I need to *whitelist* the plugin for it to work? What exactly does Jekyll do, that couldn't be done with a couple of lines of `bash` and `pandoc`? I'm not even sure it's more error-resistant, something that I might eventually actually do.
