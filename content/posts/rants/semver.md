+++
date=2025-04-19
title='Semver is a mixed bag'
+++

I'm in a bit of a pickle.  I like rust quite a bit, but I find myself having to solve one recurring problem over and over.  The dreaded `zeroize` issue.

For some background I work in blockchains.  That means cryptography.  That means dealing with a mixture of grade level mathematics masquerading as something profound; script kiddies putting you "in your place" if you disagree with the holy scripture, libraries that have seen better days, that you are not allowed to modify, and a tar-like resistance to treating security as a conversation.

## Software as a dis-service

We are routinely told a chain of half-truths (and half is being generous), about why updatepocalypse and always unstable software is good actually (TM).  We are told that you should update your software because of security vulnerabilities.  OK, why?  Mainly because people spend time fixing up their software, and fixing bugs.  OK, suppose some of those bugs are security bugs, _i.e._ the most important bugs in this context.  Why should I assume that newer software has fewer of those bugs?  Well, because only an idiot would with the benefit of hindsight come up with a worse design than the one currently existing.  OK, suppose that is true, can I _just_ install the security fixes?  Well, sometimes.  But at the cost of compatibility.

I'm fine with this narrative, as I'm sure is everyone who works in programming.  This narrative is also justified in many contexts.  However, it leads to a small problem: software ceases to be a thing, and more like a service.  Far be it from a side-effect, or a problem (at least in the sense that is applicable to the people pushing this narrative), I think this is the intended outcome.

A project is deemed unmaintained, if it had not been updated in 10 years.  One is relieved from having to think about backwards compatibility _by default_, leading to moving targets such as the `gtk` library, unstable LibC, and a complete inability to run a newer version of `mpv` with an older version of `ffmpeg`.  Minor inconveniences for the user; major problems for anyone trying to build up an ecosystem of projects.

What sparked this discussion was [a blog post](https://blog.davep.org/2022/08/23/i-must-be-getting-old.html#i-must-be-getting-old) from an old contributor to Emacs, that was...  shall we say...  ousted from the Emacs code-base.  Not an unreasonable situation to find oneself in, code gets deprecated all the time, and the burden of proof is on the code to fight for its life.  With that said, the price we pay for this, is that code that has been written a year ago might not work on your computer today.  And again, this is all by design.

Code cannot be written once, and serve a long time.  As a GNU/FSF linux-head, I should be in the camp that hates windows, but I can't help but admire the fact that they managed to get their programs to have such excellent continuity.  Some, I may hazard a guess, were practically unchanged since their inception.  The wonderful world of being able to stockpile media containing software is all but a pipe dream.

That would not be such a bad thing, if newer software _were_ actually better, a thesis that is accepted without scrutiny, and a thesis I shall refute.

## The parasite is peak

One common misconception is that evolution tends to favour more complex organisms, or that things with more features tend to survive better.  This, however, runs in the face of antibiotic-resistant bacteria, which though simple, are the results of evolution.  A tapeworm in your gut has as much clever biology going on as you do.  It might not write poems in a language that you understand, but it too shed fur and limbs and lost strength to focus on resource acquisition.

So what do we see in the software?  Because platforms keep changing and breaking backwards compatibility all the time, only software that is continuously developed survives.  This means that if it's commercial, it must have a good business model.  If it's made on enthusiasm alone, it must be interesting enough for the average contributor.

This imposes an evolutionary pressure that results in the following.  All commercial software is made as shitty as possible, so that artificial barriers can be lifted, and presented as clever design when no-one is looking.  You can't see the code, you can't see the barriers.  And they will get lifted, because "security fixes and performance improvements" can only go so far.  A redesign, a reshuffling of the UI elements does the job just as much as pushing a +10% performance fix, except it takes an order of magnitude less work.

Our software is slower than it can be.  We are piling on unnecessary complexity, because the user is almost always given a take-it-or-leave it type of deal.  Only major problems can be seen, because they can turn off a large portion of the population.  Minor negative changes lead to a glacial degradation of programs.  And you have no leverage.  You cannot tell Adobe to fix their programs, because you can only sacrifice a business model and spend months learning a new program.  You can't passive-aggressively burn cents off the company bottom line, thus leaving you with no feedback mechanism.

The programs suffer from bloat.  Reason is, most business models rely on **control**.  It is not a good idea to split up your programs, unless there's a good reason to do so, and especially unless you know for sure that you'd be able to maintain control.  This is both seriously messed up, but also something that you have to do.   If you do not, your age will be used against you.

## Changes are opaque

We are not excited by changes anymore.  I don't even know what's in an update for a program that I only installed, because I was told either to do it, or to return a physical good that pairs with this nasty piece of s....e.

The reason is two-fold.  Things that make your life better come with a hefty price, almost negating any upside.  The LLMs are a case in point, yes you get more productive, because they can objectively bring value.  The problem is that now everyone seems to expect more from you.  Sure, an LLM makes your freelancing more efficient, but now every client expects you to vibe-code.  Things that should and did take time, actually are no longer satisfactory.

So you see, an update to MS Word isn't something you look forward to, because it allows you more free time to spend with your family, but something that your boss will use, regardless of its quality, to pile more work on you.  This breeds nihilism.  People are jaded.  We don't look forward to the next big things.  And at this point, I'm quite sure that even the non-tech-savvy people have surmised that updates aren't always or usually to their benefit.  You can't argue with the developer.  You can't ask them, "how much performance did you actually obtain"?  Or "what specific CVEs did you address".  It's actually quite a surprise, if some of these "performance improvements" do not make the program slower.

## Changes are opaque for programmers

One might think that being able to read the code allows the programmers to see the differences.  I do not believe that this theoretical ability translates into an actual examination.

If it were the case, there would be a whole lot more critical examination.  In the process of fixing compatibility with the older versions of Rust cryptographic libraries I once decremented a minor version, by replacing an in-line implementation with a function provided in another package.  This isn't a minor change.  This isn't even a patch.  This is _noise_.

Now semantic versioning is a valuable tool in the world of opaque changes.  It does not let me filter out changes I don't like, but at least it lets me chosen if and when I'd like to take the jump.  Even that does not happen, because people either jump too early, or too late, and definitely fail to recognise if something is a major change.

The case of `zeroize` is an instructive example.  I cannot do it justice in this small rant, I will cover it later.  An upper bound on the `zeroize` dependency of the library `curve-25519-dalek` was introduced to ensure compatibility with a certain version of the Rust tool-chain, as it relied on a feature introduced there.  This library came with numerous changes, so `solana`, Hyperledger Ursa and a few other big Rust projects relied on this library, and given the limited development resources dedicated to cryptography did not upgrade.  The Rust built-in dependency resolver relies on everyone following proper semantic versioning.  As such, if your project relied on `zeroize` of a later version than the `1.4` to which the `curve-25519-dalek` present in Solana was, it would refuse to compile.

Now the real solution would have been to patch and introduce a different library having the same code as `zeroize`, but that did proper semantic versioning.  In that case, the version in Solana would be say `nu-zeroize` of `1.0` and the newer libraries depended on `2.0` simple as that.  This would reduce the headache, but not solve the problem.

Dependency hell is a hard problem in general.  Semver is an attempt to solve it, but it isn't even followed.  But the reason I don't like it, is because of the implicit assumptions that it brings.  It assumes that newer versions of libraries are better.  They may very well be, but they cater to many users.  Should you reflect that you don't need the newer features.  Maintain broad compatibility?  Narrow to your current use-case?

I think the real solution is to think hard about what you depend on.  Sure it's nice (and yes, I do commend David Tolnay) to have libraries like `serde` that have few changes, many features and a proper semver with many patches and few minor or major changes.  We do not have a language for defining our interactions with dependencies.  We have automated code generation, but not the process of documenting the assumptions and ensuring that they are satisfied across library boundaries.  We rely on type systems to do that for us, assuming that plugging the square peg into a round socket is the only kind of mistake that programmers make.

I am quite aware that type systems are equivalent to theorem provers.  I simply find that their usage is insufficient to express all of the constraints.  And this is a limitation due to languages being insufficiently expressive.  In Rust you have `derive` but it's a bit of a missed opportunity.  That system is unaware of the type system, and thus even simple departures from Lexicographic ordering require orders of magnitude more boilerplate.  Every structure needs to be thoughtful, so things like
```rust
pub struct MediaPlayer {
	maximised: bool,
	volume: u64,
	file: String,
}
```
are orders of magnitude more common than the proper way of doing things:
```rust
pub enum MaximisedState {
	Windowed,
	Maximised,
	// Borderless
}

#[derive(Clone, Copy, Debug, PartialOrd, Ord, PartialEq, Eq)]
pub struct Volume {
	decibels: FixedPrecision<0, -60, 4>,
}

impl core::ops::Add for Volume {
	// Omitted for size
}

pub struct MediaPlayer<T: AsRef<Path>> {
	maximised: MaximisedState,
	volume: Volume,
	file: T,
}
```
You can already see orders of magnitude more code, even though this has the same implied constraints explicitly spelled out.

## What needs to change

We need an honest conversation on dependencies.  We need an honest conversation about what precisely we need.  Often a single library is imported for a single function or structure.

We also need to break out of not digging into our software.  At least read the changelogs.  At least challenge the performance improvements narrative.  Ideally, involve the users in the discussions about security.
