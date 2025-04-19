---
date: 2025-04-19
category:
  - Programming
  - Semver
  - Rust
---
# Semver is a mixed bag

I'm in a bit of a pickle.  I like rust quite a bit, but I find myself having to solve one recurring problem over and over.  The dreaded `zeroize` issue.

For some background I work in blockchains.  That means cryptography.  That means dealing with a mixture of grade level mathematics masquarading as something profound; script kiddies putting you "in your place" if you disagree with the holy scripture, libraries that have seen better days, that you are not allowed to modify, and a tar-like resistance to treating security as a conversation.

## Software as a dis-service

We are routinely told a chain of half-truths (and half is being generous), about why updatepocalypse and always unstable software is good actually (TM).  We are told that you should update your software because of security vulnerabilities.  OK, why?  Mainly because people spend time fixing up their software, and fixing bugs.  OK, suppose some of those bugs are security bugs, _i.e._ the most important bugs in this context.  Why should I assume that newer software has fewer of those bugs?  Well, because only an idiot would with the benefit of hindsight come up with a worse design than the one currently existing.  OK, suppose that is true, can I _just_ install the security fixes?  Well, sometimes.  But at the cost of compatibility.

I'm fine with this narrative, as I'm sure is everyone who works in programming.  This narrative is also justified in many contexts.  However, it leads to a small problem: software ceases to be a thing, and more like a service.  Farbeit from a side-effect, or a problem (at least in the sense that is applicable to the people pushing this narrative), I think this is the intended outcome.

A project is deemed unmaintained, if it had not been updated in 10 years.  One is relieved from having to think about backwards compatibility _by default_, leading to moving targets such as the `gtk` library, unstable LibC, and a complete inability to run a newer version of `mpv` with an older version of `ffmpeg`.  Minor inconveniences for the user; major problems for anyone trying to build up an ecosystem of projects.

What sparked this discussion was [a blog post](https://blog.davep.org/2022/08/23/i-must-be-getting-old.html#i-must-be-getting-old) from an old contributor to Emacs, that was...  shall we say...  ousted from the Emacs code-base.  Not an unreasonable situation to find oneself in, code gets deprecated all the time, and the burden of proof is on the code to fight for its life.  With that said, the price we pay for this, is that code that has been written a year ago might not work on your computer today.  And again, this is all by design.

Code cannot be written once, and serve a long time.  As a GNU/FSF linuxhead, I should be in the camp that hates windows, but I can't help but admire the fact that they managed to get their programs to have such excellent continuity.  Some, I may hazard a guess, were practically unchanged since their inception.  The wonderful world of being able to stockpile media containing software is all but a pipe dream.

That would not be such a bad thing, if newer software _were_ actually better, a thesis that is accepted without scrutiny, and a thesis I shall refute.

## The parasite is peak

One common misconception is that evolution tends to favour more complex organisms, or that things with more features tend to survive better.  This, however, runs in the face of antibiotic-resistant bacteria, which though simple, are the results of evolution.  A tapeworm in your gut has as much clever biology going on as you do.  It might not write poems in a language that you understand, but it too shed fur and limbs and lost strength to focus on resource acquisition.

So what do we see in the software?  Because platforms keep changing and breaking backwards compatibility all the time, only software that is continuously developed survives.  This means that if it's commercial, it must have a good business model.  If it's made on enthusiasm alone, it must be interesting enough for the average contributor.  

This imposes an evolutionary pressure that results in the following.  All commercial software is made as shitty as possible, so that artifical barriers can be lifted, and presented as clever design.
