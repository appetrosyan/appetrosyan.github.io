+++
date = 2026-06-15
title = 'Goodbye Emacs'
tags = "tooling", "Emacs", "life"
+++

# End of a long journey

After today's incident, I finally made the decision to end a relationship with a toxic time sink that promises to be better this time around, you just wait.  Ends up costing me hours of time wasted, has a complicated (not really complex) mode of interaction, whom I spend time around due to pure, sheer, and unadulterated peer pressure.  

I am of course, talking about Emacs.  An editor that has outgrown its scope, refuses to die, despite being objectively irrelevant.  It fails to encourage discovery of its own specifics, it actively promotes copying other people's configurations, cargo-cult proliferation of failing-upwards packages, such as `vertico`, and `jinx`.  It has a loyal fan-base that most people in my surroundings that deserve respect don't seem to agree with.

So... what next? 

## The technical questions

I have quite a few options and I want to explore; something I used to do on a pretty regular basis, and stopped, because "Emacs is all I need".  Turns out it doesn't even cover the bases.

As a high-skill-ceiling editor with optimised ergonomics, Vim is unmatched. When two years ago I did a Vim challenge, what I found rather surprising, is how much more active in the micro (and less active in the macro) it made me.  I could spend a bit more time polishing my neovim configuration.   It wouldn't be a smooth transition, but I have the muscle memory.  It is _a_ way to do things. Not my favourite way, but a _a_ way.

As a more modern alternative, though, I must admit that agentic coding is becoming an increasing part of my workflow.  And while it is not impossible (and indeed likely) that the AI will not take your jobs in 18 months... or 18 years for that matter, local models called from Ollama, doing basic supervised refactors are not going away.  Zed, Cursor and believe it or not VSCode are on the table.  I have mostly an ideological dislike of Microsoft products.  I now have an ideological distaste for FSF-branded GNU-slop as well.  As such, a vastly superior tool with easy to understand behavioural patterns becomes less of an issue, and more of a requirement.

Kate, is my long-time favourite.  It's rough around the edges, but if I wanted to replicate my Emacs workflow in it, I could do so with shocking precision: `C-x C-s` for saving? Done. You don't even need to learn lisp to do it.  Because it's not lisp, you don't have to fight the startup times every time you want to open a file.  As such, you can use the also excellent KDE Dolphin file manager to supplement the text editing facilities.  A useful git interface is not the prerogative of `magit`. Two reasons being that Tarsius has largely made `magit` worse and less reliable over the years, that there's only so much one can do without visual feedback, and that ostensibly, a well-tailored suite of applications beats a single application 9 times out of 10.  Magit should be developed as a standalone program.  It is developed as if it is a secondary add-on, and conflicts with Emacs' way of doing things on a fundamental level. 

KDE as a software platform is significantly more cohesive. The one thing it lacks is customisation, which over the years I've done less and less to Emacs. And to be honest, even that is an overstatement. With agentic systems, I can just fork Kate, and produce a tailor-made editor that has all that Emacs lacked.  It is not all that much, by the way, and being able to compile these things as plugins, providing them as an AUR package... isn't this the whole point of how extensions _should_ work?  Emacs of course had to reinvent the wheel, because when it was new, the wheel wasn't there.  But the wheel is here!  Fucking use it.

The world is my oyster.  For once, an editor having a fun feature is less bad news, because either I or Emacs have to implement it, but good news.  I cna now choose editors that get first-class support.  Like for example, Tabby for code completion.  Or having genuinely useful debuggers.  Or being able to click on a test and have it execute (although on Emacs, you can achieve some of that by using `lsp-mode`). 

For once, I am free to compare ideas on their objective merit, and not have it be poisoned by the ideology of a philosophically inconsistent "philosopher".  The FSF is largely a purveyor of Free-as-in-free-beer software these days.  It only serves to provide a vastly inferior experience to up-sell people to ethically dubious projects.  I have no qualms with using Arch Linux, precisely because it allows proprietary software.  For all I care, "free" software restricts my freedom just as much as proprietary software does: to share my changes, particularly to libraries that I have been a sole maintainer of, I need to get consent from people that happily fucked off into the sunset.  I gave up on the idea of fixing up Emacs upstream.  I should have given up on using Emacs altogether, which I didn't because of Stockholm syndrome.

## The obvious solution

One might also remember that I have an editor that is trying to fix up Emacs.  Well... it is not designed according to what I think the best design should be. It is designed according to the minimum deviation that Emacs people would be able to accept, while also addressing the horrendous problems that Emacs' design would impose.

I no longer have to appease a crowd of people that find it OK if your UI thread is frozen by a long-running task.  I no longer have to bolt on the dialect of lisp that makes me want to vomit the least.  I need to appease me, myself and nobody else.

So where does that lead me? 

I can write the entire program without regard for configuration.  Full static linking.  And truth be told, if I made the code public, nobody's stopping you from using your choice of Claude from having a go at it, and changing the key-binds as you see fit.  I could try and come up with a DSL for it, but what's the point?  Reading the configuration file, having a hierarchy of them... these are all things that stupid developers need.  I'm an engineer.  I'm in the pilot seat; to me reading Rust is just as easy as reading Python for you.  But unlike you, I can see the fundamental issues with Python.

I could not replace the programmability with nothing, because telling you... oh you have to recompile... sounded like a bit of a waste.  Not anymore.  The number of times I change configuration compared to the number of times I use the editor and start it from scratch is not even remotely comparable.  And the idea of wasting background cycles to fix a problem introduced by poor development practices in Emacs is not my cup of tea.

I will not go into details, but say that given that I have finally decided to abandon the project, the editor known as `fib` is never going to be finished.  Instead of it, I will likely build an editor that will much more closely adhere to _my_ understanding of what a good editor looks like.  And if that bears no resemblance to Emacs... that's kind of the point.

If you are running a decent tiling window manager, as long as each individual window has access to the common cache, there's no reason for you to have built-in vertical/horizontal splits.  If anything it is actively counter-productive, especially given the necessary redundancy between key-bindings, as well as concepts.  With client-side decorations even saying that it takes up space isn't correct, because there's always a way to reduce that space.

Secondly, lisp is a pure liability.  It's one thing, if like Lem, the entire editor were written in a single language, in which case, the ability to customise everything becomes super useful.  I will, however, point out, that the impossibility of changing the behaviour of a compiler program, is largely an artifact of laziness, and a poorly organised code base.

Suckless has the right idea: make the _fucking code base_ fucking readable.  And while their choice of using C, is not my preferred approach, it is nonetheless a useful starting point.  I would prefer, however, a more modern language, something along the lines of Zig, or Rust, but given that I no longer need to cater to the choices of my downstream users, I might as well do it in Ada or Algol.

The other problem is that while building Fib, to compete with Emacs' everything and the kitchen-sink approach, I needed to duplicate a buttload of features that I myself find rather unnecessary.  For every task there is a well-written purpose-built programme.  I didn't want to add a PDF reader, I added one, because I wanted the person who was workinng on an Emacs PDF reader to help me with Fib.  I didn't want to add a video player either, but I added one to demonstrate that the "canvas patch" was... affectionately put... a waste of time; not grasping the irony myself, and not understanding the same advice I was willing to give to others.

With those constraints removed, what I would like to do instead is to produce a UI toolkit that can be made into a number of purpose-built applications.  One vital detail that I intend to keep is the per-process isolation, with a cohesive non-D-Bus protocol for fan-out communication.  Win-win-win.  Instead of it being a simple text editor, this is an application suite for more advanced users, designed specifically to address a specific problem.  Come to think of it, my actualy friend, actually told me about doing that.

## Community

It is tempting to say that the community was nothing but a huge drag, but this is far from the case.  The people involved in the design and implementaion of various Emacs packages are thoughtful, oftentimes approachable, and almost universally with an interesting backstory.  Ihor Radchenko is a fellow Physicist.  Evgeniy Zaycev the author of `telega.el` has a fun personality and a lot of patience, way more than I do.

While there are also more combative personalities in the community, they are often well-intentioned.  They want you to learn more; they want you to become better.  And as a consequence of that specifically, it never feels overbearing.  Yet... I cannot shake the feeling that engaging with this community required a certain suspension of rationality.  To me Emacs is far too specialised to be a general-purpose software platform, even compared to a browser.  I am also on the record saying that these sorts of centralised platforms don't do anything that couldn't have been achieved with good process isolation, segregation and inter-process communication.

And now I've come to the conclusion that I need to actually move on.  I don't live in Emacs as much as I used to.  I don't find it less work to use dired for file management, because Dolphin seems to do things quite well.  Multiple renaming is something I can approximate in Emacs, but also something that could be done with OpenCode and a local model pretty easily.

Now you might be asking, how _dare_ I say that LLMs can do something useful.  Well, they are solving a problem that shouldn't have been a problem in the first place.  I don't want to waste precious hours of my remaining life trying to tidy stuff up, that is only untidy as a consequence of abject neglect.  That said, not being confined to Emacs, lets me use more sophisticated and better designed tools for the job.

The command-line is all you really need.  Hell, I'm writing this specific paragraph by using echo in append mode.  It's not easier or harder than doing this in a text editor.  It's just a different way of doing things.  Not at all more complicated, and if anything more uniform, because the command-line is always there.  If you can get over the cognitive dissonance you can easily get over the main issues associated to this.

Tools are tools, and they all require a certain amount of plasticity from your brain.  You need to pick a tool and get good at it.  But there comes a point where a tool, (ahem, Emacs) is so poorly designed, that it obscures the original problem that you were trying to solve.  If you are an avid Emacs user, switch to Kate, and try to find things that you can't do as well.   I dare you!

Being able to control command line applications, however, is quite an important skill and if you do not know how to, and if you never learn to do so, you are forever bound to using interactive environments.  Ed is the standard editor for a reason.  Not saying that there isn't any value in trying something a bit more involved, but ... well... agentic systems kinda do that... and they're not particularly smart.  Mass refactoring is something that you could do using your own, custom-made written in C, tiny programs that do exactly what programs like `cat` and `grep` used to do.  If you are stuck in using Emacs... when do you learn

The community, will, of course, helpfully guide you towards the right approach.  They will tell you which packages pave over which difficulties.  But honestly, is there much skill to be obtained.  Programming isn't just work: it's a process, it's a journey that would expand your mind, and you cannot, even in principle expect yourself to "open your mind" to the difficulties and intricacies, if all you do is see a single fucking screen in front of you and assume that even things like UTF-8 are simple!  They are fucking not.  But you wouldn't know that unless you were really trying to do things outside your bubble.


But I am not even necessarily criticising the community.  They have done their best, and the select few people that have reached out over the Sunday... well... thank you... but I have to move on.

Emacs had made me slower, it had made me averse to doing things by hand.  It'd made me dislike the many features that are meant to help me, such as autocompletion, and language servers.  I want to say goodbye.  I don't know if it's farewell, but I will make an effort to stay away from Emacs for at least 6 months.  If by then, I am still drawn to it like a moth to a flame... then so be it, and if not, I guess it is farewell after all.


