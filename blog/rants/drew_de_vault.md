# Language elitism

I must preface this by pointing to something that should be blindingly obvious, but shall be taken out of context regardless. This is not a personal attack on Drew. I haven't met, him I don't have a problem with him other than the ideas that he has kindly put forward on his blog.

I think that this is a brave move, and most engineers would be wise to think of it as such; it is not easy to put your thoughts plainly in a piece of text, and to have your most unreasonable ideas be judged by an army of people who have the benefit of not having your day-to-day to be able to point at it.

In my defence most of what you'd find in this particular rubrick; rants, is going to be of a similar quality. However, that is no shield against criticism. Ideas need to be discussed, and improved upon. Bad ideas need to be discarded, good ideas -- put forward. So, without further "cover my arse" rhetoric, I'll dig into it.

## Attacks on Rust

There are multiple valid critiques of the language. Despite it being my main workhorse and something that I'm keenly interested in, I don't think that the language is perfect. I've seen valid critique of Rust from both "Rustaceans", whom I don't consider myself to be, from intellectuals with interesting worldviews, and from Drew.

He makes no secret of not liking it, as I will make no secret of my distrust towards Go. However, I mostly keep the critique of that language to a minimum. I may not agree with the trade-offs that it makes, but I respect that it's a language with a niche, and that to critique it for not conforming to my preconception of what constitutes good code, is just not coherent. You will not hear me criticise Go, the way Drew criticises Rust.

Case in point, Rust is not meant to be a C replacement, that's why a statement like "Rust is not a good C replacement" can only be replied to in one way: "no shit sherlock, a boot isn't a good replacement for a slipper either". Drew mostly echoes sentiments from C programmers that have nothing better to do other than complain that the world doesn't revolve around C as much as it used to. It still does to a large extent, and possibly will forever, inheriting most of its vocabulary and some of the technical debt, the same as humans have grown to use the Julian calendar. It doesn't mean that a more complex, more reliable language has no reason to exist and that some projects aren't better served by Rust instead of C.

So why oppose a language that will never ecnroach on the niche of your tool of choice? Well, possibly because of some well-intentioned comments by not so well-educated people. Drew is simply venting his frustration, and does so in a publically available format. There's nothing wrong with it in principle. In execution however, I'd point you to a few weak aspects of his argument.

# Demolishing the article

I shall address the points quoting them in-context:

> The values of good C++ programmers are incompatible with the values of good C programmers.

I would beg to differ.
In fact I would argue that good C programmers can transition to good C++ programmers and vice versa.
Just take John Carmack.

Aside from that, I'd appeal to the following, C and C++ share a common subset that is almost the size of C.
This in turn means that a procedural style (which is the only one supported in C) is also implementable in C++.
As a good example of this approach, consider the `compiz` compositor.
So there is a non-zero overlap between programmers that will primarily utilise the procedural templated subset of C++, and programmers that choose to use C.
More to the point, libraries written in one language can be easily used in the other.

Finally, the statement that programmers in Language X have incompatible values with prorgrammers of language Y is the epitome of stupid.
The values of _all_ programmers are bug-free, correct, performant and easy to modify programs.
What programmers might differ on, is how much they value which feature, and how they define the fuzzy concepts of _easy_ and which bugs are more egregious.

The following assertions are mostly correct up to the point where Drew discusses the number of features.
Firstly, his method of calculating the number of added features is mind-numbingly dumb given the most generous reading.
The number of features could be easily gauged based off of the amount of documentation pertaining to the language specification.
This would give you a more accurate representation of the languages, and would perhaps put Rust below C++, where it belongs, seeing as Rust deliberately eschews the full grandeur of trying to support every programming paradigm in existence.

But suppose his figures are correct.
They do not speak volumes of the incompatibilities introduced by the languages, and the kinds of operations needed to resolve said incompatible changes.

Rust and Go have gone through one major revision each, that is, cases where programs had to be rewritten to compile on the new compiler.
C is not exempt: C90 code would not always compile with a C99 compiler.
C allowed type generic macros, which essentially allowed a quasi-overloading in C programs, which changes the semantics of already existing code.
C23 adds new keywords: `nullptr`, `true` and `bool` as well as `constexpr` and `static_assert`.
The meaning of `auto` was changed.
The meaning of empty parenthesis was changed to an implicit `(void)`.
To highlight how dumb your choice of using Wikipedia was, none of these backwards incompatible changes are included in Wikipedia.

For the record, the only time any similarly breaking change was made in Rust was when the idea of editions was introduced.
To say nothing of the fact that Rust will not borrow ideas from C++ (which should be evident to anyone who was paying attention to both), it will probably not change the meanings of statements, because Rust despises implicity.
Go is no better.
C++ on the other hand has gone to extreme lengths to ensure backwards compatibility.
There are codebases to this day, compiled with Microsoft Visual Studio 98!
The same cannot be said of Go.
As someone who maintained an abandoned cryptographic library for yet another few months until it was finally retired, I will say that Rust is remarkably stable.

>  but more importantly it speaks to their complexity.

This is a valid assertion, only with the caveat that Rust has not had an opportunity to grow to the same complexity as C++.
It is still much smaller, with the largest amount of complexity hidden in the implementation details of the compiler internals, and not in the features of the language itself.

> Over time it rapidly becomes difficult for one to keep an up-to-date mental map of Rust and how to solve your problems idiomatically.

In my humble experience, this is incompatible with reality.
One can keep a fairly up-to-date mental map of the language, as the standard library only grows additively.
Libraries change, but that would be true of C++ and of C.

> A Rust program written last year already looks outdated,

In the sense that there is now a languag feature that can do one thing more efficiently, I suppose that would be true if you were doing async programming with traits, or trait-level work that requires specialisation.
Perhaps the only area where this might be remotely true that is not simultaneously extremely improbable is the Non-lexical lifetimes, which would make some forms of scoping redundant.
However, as someone who has seen code that used that form of scoping I can also say that there's a handy tool for fixing such problems, which is a lot more than what I can say about C or C++.

> whereas a C program written ten years ago has pretty good odds of being just fine.

Lack of compilation errors does not mean correctness or stability of meaning.
Though this is generally true if C99 code is not compiled with the C23 standard compiler, there are instances of perfectly reasonable C code being considered unreasonable when users discover that it relied on implicit behaviour (such as lack of multithreading, or slow CPU) to behave correctly.

> Systems programmers don’t want shiny things - we just want things that work.

As a systems programmer, I would advise Drew not to generalise.
In fact generalising is extremely dangerous with heterogeneous groups.

> That really cool feature $other_language has? Not interested. It’ll be more trouble than it’s worth.

It really depends.
You see, us systems programmers are not prejudiced folk.
People who design databases generally find RAII a good idea.
People who work on operating system kernels find reduced reliance on allocation a useful property.
Driver maintainers find reduced amount of boilerplate to be good.
Any systems programmer will find tracking down memory leaks and segfaults to be a process unlike any other.
And to be quite frank, the people who were working on Windows, were all working with C++ code...
They would seem to disagree with your blanket assertion.

> C is the most portable programming language. Rust actually has a pretty admirable selection of supported targets for a new language (thanks mostly to LLVM), but it pales in comparison to C, which runs on almost everything.

This is mostly correct.
Zig is actually the most portable programming language, so much so as to beat C every step of the way.

> C is the most portable programming language.

I'm afraid the whole reason why Zig manages to overtake C in terms of coverage has to do with C's lack of portability.
Case in point, `printf` is a function that is not portable.
I'm sure as an expert systems programmer Drew is aware of that.

> Rust actually has a pretty admirable selection of supported targets for a new language (thanks mostly to LLVM), but it pales in comparison to C, which runs on almost everything. A new CPU architecture or operating system can barely be considered to exist until it has a C compiler. And once it does, it unlocks access to a vast repository of software written in C.

As stated previously, most code written in C is not portable.
This is due to the fact that this code relies on dynamical linking, is tied to CPU architecture tightly and relies on a standard C library to be present.
The same C program might not run on different versions of the same Linux distribution, due to incompatibility in the `libc` implementation.
Rust and Go sidestep those issues by being statically linked.

> C has a spec. No spec means there’s nothing keeping rustc honest. Any behavior it exhibits could change tomorrow.

Lack of bureaucratic definitions is not equivalent to a lack of rules.
If a society doesn't have an explicit ban on public defecation doesn't mean that said defecation is considered acceptable by said society.

> Some weird thing it does could be a feature or a bug. There’s no way to know until your code breaks.

This is an unfair assessment of the proceesses involved in Rust development.
Rust core goes to great lengths to ensure that breaking changes are avoided, even if they're not 100% correct.

> That they can’t slow down to pin down exactly what defines Rust is also indicative of an immature language.

That is a fair summary.
It also applies to C++ and Go.
C was originally developed in 1972 (according to Wikipedia).
K&R published in 1978 was the first _informal_ specification of the language, the same way as "the Rust book" can be considered an informal spec for Rust.
The C programming language, which is significantly less complex was only standardised in 1989.
So the argument is only technically fair, but only to the extent to which C was an immature language in 1980.

Drew then states that Rust should have more than one compiler, namely more than just `rustc`.
I agree with this, not least of which, because I like the `gcc` family of compilers, due to their connection to the early development of GNU.

> C has a consistent & stable ABI. The System-V ABI is supported on a wide variety of systems and has been mostly agreed upon by now.

This is correct, but again only technically fair, given that C had only been stabilised in 1989, that is 17 years into its existence.
For Rust to be behind C in this regard it'd have to not have a stable ABI for 9 years from now.
Additionally, not having a stable ABI, provided a stable ABI is mostly already agreed upon (and is the "C" ABI), was a conscious choice.
This was motivated by some problems due to irrational adherence to outdated ABIs in C++.
This allows Rust to interface both in a stable fashion (by having `repr(C)`) but also to reserve the right to use the instability of the ABI to its advantage.
If your code needs a stable ABI, by all means use `repr(C)`.
Don't rely much on Rust's safety guarantees at the boundaries, and you should be fine.

> Rust, on the other hand, has no stable internal ABI. You have to compile and link everything all in one go on the same version of the Rust compiler. The only code which can interact with the rest of the ecosystem is unidiomatic Rust, written at some kind of checkpoint between Rust and the outside world. The outside world exists, it speaks System-V, and us systems programmers spend a lot of our time talking to it.

Either you don't understand the implications of `unsafe` in Rust, or you overestimate the amount of dynamic linkage that takes place.
I can understand both, and would refer you to my earlier comment about generalising.
I don't do a whole lot of dynamic linkage.
I only need to deal with `system V` ABI insofar as it is a safe way of guaranteeing ABI stability between Rust programs.
I must admit that writing `unsafe` in parts that are actually unsafe might seem like extra work, but I would also argue that any C programmer worth their salt would have written a longer comment in the exact same locations for the exact same reasons.

I also find it interesting that Drew doesn't mention Go in a negative light here.
Go is far more hostile to foreign ABI dynamic linkage than Rust, and until C-Go there was no way to do it at all.
Certainly it would be intellectually dishonest to later praise Go, despite it having many of the same drawbacks as Rust.

> Cargo is mandatory. On a similar line of thought, Rust’s compiler flags are not stable. Attempts to integrate it with other build systems have been met with hostility from the Rust & Cargo teams.

This is a statement that I can charitably call pathologically moronic.
As a systems programmer I _don't_ want to fuck around with your snowflake build system, that can wipe my system when I want it to compile something.
With Qt, I don't want to play whack-a-mole and port build systems if some of my transitive deps use `cmake`, others use `make`, some use `ninja` and some are weird libraries that use `qmake` that doesn't even exist anymore.

> The outside world exists, and us systems programmers spend a lot of our time integrating things.

I disagree.
_Us_ systems programmers want things to be done in a uniform fashion.
_You_ morons keep inventing build systems like `bazel` that make it almost impossible to even include your projects in the Arch Linux official repositories.
There should be at most 1 build system for all compiled programming languages.
There can be one build system per programming language that uses a universal build system to accomplish that task.

> Concurrency is generally a bad thing.

In a world where More's law prevents a linear increase in the single-threaded performance, I fail to see how this is a useful statement.

> Serial programs have X problems, and parallel programs have XY problems, where Y is the amount of parallelism you introduce.

In the synchronisation quadrant, perhaps.

> Parallelism in C is a pain in the ass for sure, and this is one reason I find Go much more suitable to those cases.

I agree.

> However, nearly all programs needn’t be parallel. A program which uses poll effectively is going to be simpler, reasonably performant, and have orders of magnitude fewer bugs.

Objection relevance.

> “Fearless concurrency” allows you to fearlessly employ bad software design 9 times out of 10.

You do realise that in Rust, you are still required to expend effort to write a concurrent program.
On that note, I don't think that Drew differentiates here between concurrency and parallelism.
The interchangeable use of those terms is probably why he happens to believe that the majority of software, that is games, servers, GUI applications, databases, browsers, compilers and kernels are better off locking up each time they do something remotely demanding.

Also, wasn't Go _meant_ to make concurrency easier compared to C?

> Safety. Yes, Rust is more safe. I don’t really care.

Well, that's probably not _just_ for you to decide.
Your users might want their window manager not to lock up or crash or leak memory.

> In light of all of these problems, I’ll take my segfaults and buffer overflows.

Good to know.
Perhaps you don't like airbags and seatbelts.
Don't wear them for all I care.
But if I as your passenger want to wear one, or have an airbage cushion the blow when a Tesla auto-pilots itself into out vehicle, I should have a say.

> I especially refuse to “rewrite it in Rust” - because no matter what, rewriting an entire program from scratch is always going to introduce more bugs than maintaining the C program ever would.

This argument contradicts Drew's earlier argument, that stressing the specs with multiple compiler implementations is a good thing.
Or perhaps he doesn't believe compilers aren't entire programs.
Plus, what he's saying is that a rewrite will have more bugs than the original.
He doesn't say that a rewrite is always going to have more bugs than the original.
Just that the conversion process is stressful.

> C is far from the perfect language - it has many flaws. However, its replacement will be simpler - not more complex. Consider Go, which has had a lot of success in supplanting C for many problems. It does this by specializing on certain classes of programs and addressing them with the simplest solution possible. It hasn’t completely replaced C, but it has made a substantial dent in its problem space -- which is more than what I can say for Rust

At this point, I should probably point out why we had included Go in the comparisons.
Go has many of the same problems as Rust.
Go has many problems that are unique to Go, that make it unsuitable for supplanting C in places where C is still used, instead of Ruby, Python or god forbid Rust.

The list of Go's advantages is arguably equivalent to that it lets the programmer be more sloppy, and thus allow the programmer to prototype more rapidly.

I don't hate Go.
I think it has uses, but I will say that Drew is somewhat using the wrong point of comparison.
Go has a problem space where it is absolutely the right tool for the job.
This problem space is much more modest than the problem space of either C, C++ or Rust.
That is probably its only saving grace.

But if I were to compare the two languages, I would point to the following:
- Despite having big-name developers, Google's publicity assistance, a full 6 years of head-start, and a focus on the "joy of programming", Go has not managed to garner affection to the same level as Rust [as per the stackoverflow survey](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-programming-scripting-and-markup-languages).
- Despite being focused on optimising the developer experience, I cannot provide solid data, just ancedotal experience and [general vibes](https://www.reddit.com/r/golang/comments/mjhf5h/why_people_hate_go/), so take this with a grain of salt.
- Despite both of the above, there are multiple high-profile cases of projects being started in Go, and moving to Rust.
- Despite all of the above advantages of Go, it had not been accepted into the Linux kernel,
- Despite all of the above advantages compared to C, there have been no major efforts in rewriting things in Go, despite Go needing uniformity to a much greater degree than Rust.
- Go is completely unsuitable for any tasks which require predictable latency, ruling it out for both high frequency trading and games and drivers.

If Rust is a poor substitute for C, then Go is an even poorer substitute.

Drew's argument would have been much better served with a language like Zig, which has all of the projected advantages for his points: it can integrate with any build system, since the compiler is the build system, it safer, but not intrinsically more limited, it doesn't encourage mindless concurrency, has a consistent, stable and small specification and ABI.
Zig is also far more portable than C, owing to the fact that the functions on different operating systems are compiled in precisely the same way.
Better than that, like C, it comes with no runtime, no garbage collection and strong guarantees about performance, often being the fastest language available.
Namedropping Go in this context simply appeals to the suckless tribalism, as otherwise, Go is perhaps the worst possible point of comparison for modern C replacements.

Having completely discredited themselves methodologically, Drew moves on to conclude:

> The kitchen sink approach doesn’t work.

Which is evidenced by C++ programs, (`hyprland` in particular), often surpassing their C counterparts in functionality (Drew's on `sway`), in polish, and in performance characteristics.
It is often the case that to save face, and to compensate for C's inability to scale beyond extremely primitive programs, C programmers tend to invoke the principles of minimalism: do one thing and do it well.
This is intellectually dishonest, because while this principle seems plausibly useful, the kinds of minimalism that GTK programs tend to fall into are preposterous.
To illustrate consider a calculator which can do addition, subtraction, negatives, functions and limited spreadsheets.
Now compare them to a regular old accounting calculator, that only has addition.
For a regular person, maybe there's not much of a difference between the two.
But in almost all cases the scientific calculator wins.
We need both, and neither is better, but if you had to choose one, the accounting calculator would lose.

> Rust will eventually fail to the “jack of all trades, master of none” problem that C++ has.

Bold statement.
Time will tell.

> Wise languages designers start small and stay small.

Wise language designers consider their languages carefully.
The languages can be small or large.
Drew's assertion is at best a "no true scotsman" statement.

> Wise systems programmers extend this philosophy to designing entire systems,

Here the obvious implication is that Drew considers himself a wise systems programmer.
Moreover, that a wise systems programmer cannot like Rust.

I will not point out that this is generalising for the third time, but instead point out that by implication Linus Torvalds, Greg Kroah Hartmann and a few more extremely successful operating _system_ kernel engineers would be considered less wise than Drew.

I would have gone further but I won't because of the follwing lines:

> I understand that many people, particularly those already enamored with Rust, won’t agree with much of this article. But now you know why we are still writing C, and hopefully you’ll stop bloody bothering us about it.

This is a valuable point; and the whole reason why I'm systematically dismantling Drew's argument, is because I believe that this point should be argued correctly.
To his credit, as evidenced by the last line, he doesn't hate Rust out of any rational reasons, similarly to why most people hate JavaScript, but because he is being constantly bombarded with requests to abandon C, and move on to Rust.

Here's where we stand.

# Putting it back together
## Don't rewrite it in Rust

I worked on Hyperledger Iroha v2.
The project was doomed from the start, because rather than rewrite Iroha v1 which was in C++ gradually, preserving API and maybe parts of ABI, there were some frivolous breaking changes.
As a result, we had to deal with the fact that despite Iroha v2 being considered a _direct upgrade_, it was nonetheless undesirable for almost anyone who had used Iroha v1.

Upgrades and changes are expensive.
You may have had a team of programmers four years ago when you were setting up Iroha v1, but not today.
The changes don't give you any advantages, because despite Rust offering better security guarantees, your code had already been audited, fuzzed and probably has fewer bugs than the version that you would be switching to.
Making gradual changes and a gradual rewrite, would have made more sense than spending 4+ years of sheer development nightmare on chasing trends and giving yourself the benefit of no margin of error.

Simply put, if a project exists, particularly if the project is platform or compiler, the development effort is best spent at optimising the code that already exists, than on rewriting it in a new language, whatever the benefits may be.

## Don't learn Rust just because

Some ATMs still run Windows XP.
Some banks still use Cobol.
My masters thesis relied on `polychord` which is written in FORTRAN.
Hell, publishers in scientific journals accept things like LaTeX, which have decades of technical debt.

The point is, legacy software exists.
It takes conscious effort and often age related flexibility to be able to alter how you think, and with Rust, one has to change their prorgamming style quite a bit.
This often implies that while the feature in lanugage X _will indeed solve many problems with the current design_, the outside observer often underestimates the degree of coupling, and thus the amount of work needed to implement said language X.
It might be a revolutionary feature, but it might need an arm and a leg to implement.
Plus, more often than not, it is a good idea to consider wholesale replacements as replacements; instead of rewriting the GNU core utilities in Rust, consider writing a new set of POSIX compliant core utilities that are different and in some ways better.
Consider the example of Apple M1 open source graphics drivers written in Rust.

Additionally, if one's design is bad, throwing more concurrency/parallelism at the problem might not improve your situation by much.
Remember, your CPU with hyperthreading/SMT enabled most likely can expect at best an order of magnitude improvement.
If your game engine is slow, maybe lack of concurrency isn't the only reason for that.

## Be aware of the limitations

I will now quote Jonathan Blow and state that most of Rust's features would not help with game development.
Most of Rust's features won't help with kernel development either.
Rust has advantages in the average case, make no mistake, but the way the code would look if it were used in a situation where heavy dynamic linkage was needed is going to make it counter-productive.
Rust is not great when a program needs to iterate fast.
Finally, Rust and C are both Turing complete.
This means that it is both possible to eliminate memory safety issues from a C code base, as it is possible to violate memory safety with Rust, though perhaps not with the safe counterpart.

Drew has a much better written article on whether Rust belongs in the Linux kernel, and on the whole it is both better argued, better worded, and better researched than what I have just spent the better part of three hours arguing against.
Drew is not unreasonable, and his opinions, those that veer outside the Plan9 circlejerk echo-chamber are well-argued, and mostly withing the boundaries of what I consider in no need of correction.
