# Language elitism

::: info
I must preface this by pointing to something that should be blindingly obvious, but shall be taken out of context regardless.  This is not a personal attack on Drew De Vault.  While one might construe our relationship as antagonistic I have respect for a lot of what he is doing.  We are of differing and in some ways incompatible political views, and have different approaches to programming.

However, the very object of the following text is to mock antagonism with such flimsy footing.  The subject of the mockery is language elitism, conveyed through the lens of a frustrated rant by Drew De Vault, and demonstrated as a deconstruction of the "destruction".  I will posit that all attempts to espouse such an opinion for any reason is fundamentally misguided.
:::

This piece is largely structured around Drew De Vault's article, ["Rust is not a good C replacement"](https://drewdevault.com/2019/03/25/Rust-is-not-a-good-C-replacement.html).  In this article, we will largely **agree with the conclusion**, but choose to expose the problematic arguments for what they are: misleading, incomplete, and at times self-contradictory.  We shall then provide our own reasoning.  If Drew De Vault chooses to read this, I would invite him to provide commentary and argue against my counter-arguments.

## Attacks on Rust

I don't believe Rust is perfect.  I use it all the time, and I have a long list of crticism that I believe to be valid.  However, I do so as someone who knows the language very well, and as someone who cannot conceivably be accused of not having developed the necessary skills.  What follows is a deconstruction of a similar attempt made by someone who both espouses a radically incompatible philosophy, but also poorly informed about the language, Drew De Vault.

We all have our preferences.  Drew voices his distaste with the language quite repeatedly, and while that in and of itself isn't problematic, the manner in which he attacks the language, is.  There are many unjustifiable value judgements, based on false generalisations.  I don't care for most of this discourse, but the proliferation of these arguments and their prevalence makes me.  I would like to make it clear where I stand, as most people with my background typically either remain silent, or defend with weak argumentation.

Case in point, Rust is not meant to be a C replacement, that's why a statement like "Rust is not a good C replacement" can only be replied to in one way: "no shit Sherlock, a boot isn't a good replacement for a slipper either".

Drew mostly echoes sentiments from C programmers that have nothing better to do other than complain that the world doesn't revolve around C as much as it used to.  Which in and of itself is a misplaced frustration: much of the code carries the C influence; even if C, like Algol fades into obscurity, many of the languages have already been irreversibly influenced by it, Rust included.  Moreover, there is something known as a "legacy codebase", a set of programs that can not be rewritten easily and as a consequence never get replaced, but occasionally get some strategic maintenance and reprogramming.

So why oppose a language that will never ecnroach on the niche of your tool of choice?  Well, possibly because of some well-intentioned comments by not so well-educated people.  And here we see the reason for this piece's existence: these opinions proliferate unless challenged.  They must be straightened out, much in the same way as the defenders of `goto` were kindly demonstrated with no ill intent, that their way is incorrect.

# Demolishing the article

I shall address the points quoting them in-context:

> The values of good C++ programmers are incompatible with the values of good C programmers.

There are multiple exceptions to this.  John Carmack was a good C programmer that successfully transitioned into the best C++ programmer.  That would also involve the C standards committee, that in the latest revisions of C, introduced many features that were previously only seen in C++.  The reason why Drew seems to believe this, is because there are few practical reasons not to write procedural C++ if you know both C and C++.  The only programmers that are C-exclusive programmers, are those with a distaste for C++, but I will assure you, a good C++ programmer, can live happily in C and produce good code.  That is what coined the term C/C++.

Aside from that, I'd appeal to the following, C and C++ share a common subset that is almost the size of C.  This in turn means that a procedural style (which is the only one supported in C) is also implementable in C++.  As a good example of this approach, consider the `compiz` compositor.  So there is a non-zero overlap between programmers that will primarily utilise the procedural templated subset of C++, and programmers that choose to use C.  More to the point, libraries written in one language can be easily used in the other.

I saved the best for last: the statement that programmers in Language X have incompatible values with prorgrammers of language Y is the epitome of stupid.

So, can then values of good programmers in one area be incompatible with the other?  Well, perhaps in context that the trade-offs that are sensible in one area are not universally sensible, one could argue that yes.  These are not _values_ but **goals**.  The difference is subtle, but significant: different projects have different goals.  There are situations where the facilities of C are adequate, but they can be implemented as a subset of C++.  There are clear advantages in terms of compilation time and compatibility to use C in that case, but there are no reasons why that code couldn't be written in C++.  It would not be possible if the values were wholly incompatible; the languages are more similar than different, demonstrating that the designers of both languages shared many of the values.  But the goals were different, the languages were meant to cover different grounds.

More generally, the values of _all_ programmers are _correctness_, _performance_, _efficiency_ and _maintainability_.  A _good programmer_ must know many ways of trading one value for another and a _good software engineer_ knows precisely which trade-offs are suitable for which program.  For example, if you're building a supercomputer, it is reasonable to trade maintainability for performance and correctness.  For a game it is reasonable to trade correctness for performance.  It is not reasonable to trade efficiency for performance in a small battery powered device.  The **goals** of one brand of programmer may be different, but they very much strive to find the correct balance for each problem.  So maybe, values of bad programmers can differ, but the problem space forces good programmers to recognise that one solution does not fill all problems at once.

----

The following assertions are mostly correct up to the point where Drew discusses the number of features.  Firstly, his method of calculating the number of added features is mind-numbingly dumb given the most generous reading.  Wikipedia is an unreliable source, wikipedia lists for programming langauges are not consistent, and do not cover similar objects in similar detail due to the necessity of that information being relevant.

I suppose one could make the argument that C++ is by definition a not-quite-superset of C, and thus _must necessarily_ have more features.  You don't need wikipedia to argue that, because people understand how sets work.  If you wanted to calculate it using external resources, you could use langauge documentation: this would give you a more accurate representation of the languages, and would perhaps put Rust below C++, where it belongs, seeing as Rust deliberately eschews the full grandeur of trying to support every programming paradigm in existence.  By his estimation, a language that is both younger, and deliberately smaller than C++ has more features?

Suppose his figures are correct.  They do not cover with sufficient detail the numbers of times that these langauges have undergone an almost complete transformation, which is a better metric.

Rust and Go have gone through _one_ major revision each, that is, cases where programs had to be rewritten to compile on the new latest standard.  With Rust it is perfectly reasonable to compile older edition code on the latest compiler.  The later versions of Go do not compile older versions of programs.

By comparison, C is far more unstable: C90 code would not always compile with a C99 compiler.  C allowed type generic macros, which essentially allowed a quasi-overloading in C programs, which changes the semantics of already existing code.  C23 adds new keywords: `nullptr`, `true` and `bool` as well as `constexpr` and `static_assert`.  The meaning of `auto` was changed.  The meaning of empty parenthesis was changed to an implicit `(void)`.  Incidentally, to highlight how dumb his choice of using Wikipedia was, none of these backwards incompatible changes are listed on Wikipedia articles for C, despite there being three major revisions.  This helps in maintaining that C is more stable within the text of his blog, but would (generously) stop anyone proficient in Go, or Rust or C from taking the rest seriously.

So given the ages of these programming languages, one would expect a major breaking change once a decade.  Rust and Go and C are on-par with each other.  As of C++, all I can say is that it tends to not break things if possible, but almost every standard revision _indeed_ requires a little bit of thought.  However, that is only necessary if one wishes to use the newest features; one may choose to write code that would compile on MSVC98, if they so wish and modern compilers would accept it.

>  but more importantly it speaks to their complexity.

This is a valid, but misleading assertion.  True C++ is more complex than C (and Rust and Go).  This usually results in the code written in C++ having less complexity.  Complex allocation schemes can be hidden behind an overriden `new` operator, the function `sort` can accept a collection of items of a specific type, and not a pointer, a size, and a stride.

While C++ itself is more complex, the overall complexity of the program + language is equivalent to that of C.  It is a matter of taste, rather than an objective reason.

Drew missed an opportunity to talk about the fact that C++ lends itself easily to over-abstraction, and for badly written programs, the complexity of the language coupled with an extremely abstracted code-base, can easily exceed that of C.  It would be much harder to counter, though no less misguided.

> Over time it rapidly becomes difficult for one to keep an up-to-date mental map of Rust and how to solve your problems idiomatically.

Preference for iterators has been there since day one, as has been monadic error handling.  What changed was that the common pattern of short-circuited return was given a single-character shorthand `?`.  It is in no way difficult to keep track of that change, because it allows the pattern of error handling to be collapsed significantly.

But if you are not able to do that yourself, there are tools like `clippy` that allow one to keep up to date, if `rustc` does not do that itself.

> A Rust program written last year already looks outdated,

A C program written today looks outdated.  Fashion is a fickle beast.  Most C code bases will conceded that they are outdated _and so what?_  The same applies to Rust, especially if a library was written a long time ago.  This is the nature of a mature language that has undergone (as we have established) major revisions.

> whereas a C program written ten years ago has pretty good odds of being just fine.

A C program written today is potentially a treasure trove of buffer overflows, `printf` and `scanf` CVEs, dangling pointers, use-after-free, memory leaks.  In that sense, a program written 10 years ago would very likely have as many problems as a freshly written program today.  If one does take static analaysis tools into account, the situation is radically different, in that a modern C program, likely has more in common with Rust than it does with a standard C program written 10 years ago.

::: info
Incidentally, a Rust program written eight years ago, in 2016, will compile today.  In that sense, it would also be _just fine_.
:::

However, lack of compilation errors does not mean correctness or stability of meaning.  Drew wrote his piece in 2019, and at that time his statement would have been correct.  However, a program written in 2014, in C, would not be "just fine" in C23.  `true` and `false` are now keywords same as in C++. `alginas` and `alignof` are better versions of `_Alignas` or `_Alignof`.  There are also `nullptr` and `constexpr`, which are also, incidentally, borrowed from C++.  So, the fact that Drew happened to write his piece in a time of relative slow transformation of C, is a fluke.

A fairer comparison would be that of the compatibility of a Rust program written in 2014 the year before its first stable release compiled today, to that of a C program written in 1977, compiled on a compiler in 1987.  Could you imagine a world where the statement `i =- 10` was a decrement and not an assignment of a negative `10`.  Oh and I would believe that declaring all functions other than those returning `int` is not a breaking change.  I suppose the introduction of `void` functions was also a minor change.  Returning of `struct`s?  Enumerated types?  No, of course not, introducing the question mark operator, or adding the `async` keyword are far greater changes.

> Systems programmers don’t want shiny things - we just want things that work.

I suppose.  The shiny might not appeal to Drew, but I would make the case that Rust works.

Also note the usage of "Systems programmers" as a proverbial "true scotsman".  This will become important later.

> That really cool feature $other_language has?  Not interested.  It’ll be more trouble than it’s worth.

And here is later.  You see, us systems programmers are not prejudiced folk.  People who design databases generally find RAII a good idea, or would you argue that they're not systems programmers.  People who work on operating system kernels find reduced reliance on allocation a useful property, or I suppose you'd argue that Linus Torvalds is not a systems programmer either.  Driver maintainers find reduced amount of boilerplate to be good, or would you argue that the team that reverse-engineered the M1 GPU driver, are not systems programmers.  Or are the people who are writing browsers not systems programmers, because as far as I'm aware, they invented Rust.

I don't think that generalising it to all systems programmers was a good idea.  Perhaps Drew could have said Unix hackers, to specifically exclude GNU Linux engineers.  Systems programmers at large, tend to design their own languaes for specific purposes.  In fact, Drew himself started Hare.  So I don't see how this argument goes anywhere.

> C is the most portable programming language.  Rust actually has a pretty admirable selection of supported targets for a new language (thanks mostly to LLVM), but it pales in comparison to C, which runs on almost everything.

Zig is.  C is good, but not the best, though more portable than Rust.

> C is the most portable programming language.

I'm afraid the whole reason why Zig manages to overtake C in terms of coverage has to do with C's lack of portability.  Case in point, `printf` is a function that is not portable.  I'm sure, as an expert systems programmer, Drew is aware of that.

> Rust actually has a pretty admirable selection of supported targets for a new language (thanks mostly to LLVM), but it pales in comparison to C, which runs on almost everything.  A new CPU architecture or operating system can barely be considered to exist until it has a C compiler.  And once it does, it unlocks access to a vast repository of software written in C.

As stated previously, most code written in C is not portable.  This is due to the fact that this code relies on dynamical linking, is tied to CPU architecture tightly and relies on a standard C library to be present.  The same C program might not run on different versions of the same Linux distribution, due to incompatibility in the `libc` implementation.  Rust and Go sidestep those issues by being statically linked.

> C has a spec.  No spec means there’s nothing keeping rustc honest.  Any behavior it exhibits could change tomorrow.

Lack of bureaucratic definitions is not equivalent to a lack of rules.  For example, lack of an _explicit_ ban on public defecation doesn't preclude repercussions.  There is a standard, and there is an alternative implementation.  Much like the early days of C, it takes time.

> Some weird thing it (the compiler) does could be a feature or a bug.  There’s no way to know until your code breaks.

Applies to every language in existence.  Including C.  Especially to early C.  I wonder if Drew has had the pleasure if trying to figure out how precisely is the code broken in a C code base compiled with GCC?  If he were, he would appreciate Rust, given that it, despite the potential for bugs, which he just assumes to be worse on Rust, is actually quite a sound compiler.  Sure there are compiler bugs, which allow things that subtly break the type system, but that isn't exactly the same kind of breakage that is implied in this sentence.

> That they can’t slow down to pin down exactly what defines Rust is also indicative of an immature language.

All languages were immature at some point or another.  The argument that someone is a bad tennis player because they're too young will age like milk, and it should be blindingly obvious to anyone that has more than a couple of brain cells.

It also applies to C++ and Go.  C was originally developed in 1972 (according to Wikipedia).  K&R published in 1978 was the first _informal_ specification of the language, the same way as "the Rust book" can be considered an informal spec for Rust.  The C programming language, which is significantly less complex was only standardised in 1989.  So the argument is only technically fair, but only to the extent to which C was an immature language in 1980.

-------
Drew then states that Rust should have more than one compiler, namely more than just `rustc`.  I agree with this, not least of which, because I like the `gcc` family of compilers, due to their connection to the early development of GNU.

> C has a consistent & stable ABI.  The System-V ABI is supported on a wide variety of systems and has been mostly agreed upon by now.

This is correct, but again only technically fair, given that C had only been stabilised in 1989, that is 17 years into its existence.  For Rust to be behind C in this regard it'd have to not have a stable ABI for 9 years from now.  Additionally, not having a stable ABI, provided a stable ABI is mostly already agreed upon (and is the "C" ABI), was a conscious choice.  This was motivated by some problems due to irrational adherence to outdated ABIs in C++.  This allows Rust to interface both in a stable fashion (by having `repr(C)`) but also to reserve the right to use the instability of the ABI to its advantage.  If your code needs a stable ABI, by all means use `repr(C)`.  Don't rely much on Rust's safety guarantees at the boundaries, and you should be fine.

> Rust, on the other hand, has no stable internal ABI.

It has the C-ABI.  The default representation is not stable because it doesn't need to be, and doesn't introduce a competing standard.

> You have to compile and link everything all in one go on the same version of the Rust compiler.

Not quite.  It is impractical to do so, but the important non-internal data can be explicitly set to the C-ABI, if you want to use compilation artifacts from different compilers (or different languages).  Secondly, you can compile with different compilers, and the result _may_ be correct.  You can't rely on this fact, so it's safer to do what Rust wants you to do; use the same compiler for everything.

> The only code which can interact with the rest of the ecosystem is unidiomatic Rust, written at some kind of checkpoint between Rust and the outside world.

Unsafe is perfectly idiomatic.  It is not idiomatic Rust to rely on dynamic linkage, because that type of linkage has shown to weaken some aspects of reliability that align with Rust's aims, but it is a perfectly supported use-case.

> The outside world exists, it speaks System-V, and us systems programmers spend a lot of our time talking to it.

I suppose Windows has WSL, so some systems programmers do.  But I don't think that generalising to systems programmers is a good strategy.

I also find it interesting that Drew doesn't mention Go in a negative light here.  Go is far more hostile to foreign ABI dynamic linkage than Rust, and until C-Go there was no way to do it at all.  Certainly it would be intellectually dishonest to later praise Go, despite it having many of the same drawbacks as Rust.

> Cargo is mandatory.  On a similar line of thought, Rust’s compiler flags are not stable.  Attempts to integrate it with other build systems have been met with hostility from the Rust & Cargo teams.

This statement is correct.  The sentiment that is expressed with it is not.  As a systems programmer I _don't_ want to fuck around with your snowflake build system, that can do anything at all: it can wipe my system when I want it to compile something.  With Qt, I don't want to play whack-a-mole and port build systems if some of my transitive deps use `cmake`, others use `make`, some use `ninja` and some are weird libraries that use `qmake` that doesn't even exist anymore.

Whenever I venture outside the ecosystems of langauges where there is supposed to be one only build system, I have the instinctive desire to track down the programmers behind every other build system, kindap them, and publicly execute them by smashing their head with an IBM model F.  Anyone who advocates for alternative build system, should be given a relatively moderate punishment of being killed with a Space Cadet keyboard, including Drew.

The fact that Rust imposes one build system, allows for some uniformity.  This uniformity allows one to use `make` in a Rust code base in a predictable fashion.  The same goes for projects that are not meant to be re-used as part of other projects.

And again, Go has the same "problem".

> The outside world exists, and us systems programmers spend a lot of our time integrating things.

I suppose it would be hypocritical, if Drew also [complained](https://github.com/ankitects/anki/issues/1378#issuecomment-1229168663) about the usage of a build system on a different project.

The fewer build systems exist the better.  They are a tower of babel.  Let the best one win.  The rest must die.  One build system per language is the most I'm willing to tolerate.

> Concurrency is generally a bad thing.

I believe what Drew _actually_ meant, is that if a program has a performance problem, throwing concurrency into the mix, shouldn't be a first-line solution.  In isolation, this statement is pathologically contrarian.

> Serial programs have X problems, and parallel programs have XY problems, where Y is the amount of parallelism you introduce.

Only true in the case of shared mutable state.  The impetus behind the Rust borrow checker was that the only problematic type of state is that kind, unshared or immutable state is perfectly fine.  Hell, shared mutable state isn't inherently problematic either, you use locks to synchronise modifications either as part of a mutual exclusion and/or atomic operations.

It is largely a gnarly bit of programming that poeple increasingly need to consider in high performance applications.  Some programs can afford to be serial, and I'd be happier if most of Drew's work stayed within that niche.  He doesn't though, so his statement about concurrency is either hypocritical, and/or should not be taken seriously.

> Parallelism in C is a pain in the ass for sure, and this is one reason I find Go much more suitable to those cases.

I agree.  And I will say that Rust borrowed heavily from Go, by opting for a co-routine style rather than threaded-style of parallelism, despite that significantly ramping up the complexity of the language, given its type system.

> However, nearly all programs needn’t be parallel.  A program which uses poll effectively is going to be simpler, reasonably performant, and have orders of magnitude fewer bugs.

Objection.  Relevance.

> “Fearless concurrency” allows you to fearlessly employ bad software design 9 times out of 10.

You do realise that in Rust, you are still required to expend effort to write a concurrent program.  I will say, it's much less effort, because Rust will simply not let you write a program with a particular kind of bug, but you are not magically protected against deadlocks, and you can easily hang yourself with the amount of rope that `unsafe` gives you.  The big difference is that now the reviewer knows where to look for undefined behaviour.

On that note, I don't think that Drew differentiates here between concurrency and parallelism.  The interchangeable use of those terms is probably why he happens to believe that the majority of software, that is games, servers, GUI applications, databases, browsers, compilers and kernels are better off locking up each time they do something remotely demanding.

Also, wasn't Go _meant_ to make concurrency easier compared to C, as you have just conceded in the previous sentence?

> Safety.  Yes, Rust is more safe.  I don’t really care.

As a potential downstream user of programs written by you, I find this statement quite concerning.  A better phrasing would be "Yes, Rust is safer, but I can achieve the same level of safety without it", which I would accept, had he not also demonstrated a fundamental misunderstanding of Rust's value proposition.

To be fair, the difference that quality makes is minor.  If your library is a godawful spaghetti, and segfaults every other minute, the barrier to filing an issue, and asking you to fix it upstream is too high for me to actually do anything.  That is, because calling you, the upstream developer of an open source project that I have to use, because it exists, and claims to do what my engineering manager needs, an idiot, because it falls short, is not usually an option.  I can choose to use a better library, which is the main reason why you, Drew, "don't care".  But if you did, I'd argue you'd benefit.


> In light of all of these problems, I’ll take my segfaults and buffer overflows.

Good to know that these bugs are there intentionally.  I had mistakenly assumed that not having them was more important than having good maintainability.

> I especially refuse to “rewrite it in Rust” - because no matter what, rewriting an entire program from scratch is always going to introduce more bugs than maintaining the C program ever would.

This argument contradicts Drew's earlier argument, that stressing the specs with multiple compiler implementations is a good thing.  Stressing the definition of GNU core utilities emerges what should and shouldn't be part of them.

> C is far from the perfect language - it has many flaws. However, its replacement will be simpler - not more complex.

Bold prediction, that is countervailed by the fact that C had already been supplanted by C++ in Windows, in Id tech engines, and in graphical programming, the usage of GObjects and the introduction of Vala, all seem to indicate that the replacement for C is not going to be as simple as C.

The replacement for C in _niches_ where C is king today, is going to be a language that is slightly more complex in terms of effective feature set, but not much more so.  Case in point: `zig`, `jai` and Drew's own attempt `hare`.  This might seem like a nitpick, but it is not.

> Consider Go, which has had a lot of success in supplanting C for many problems. It does this by specializing on certain classes of programs and addressing them with the simplest solution possible. It hasn’t completely replaced C, but it has made a substantial dent in its problem space -- which is more than what I can say for Rust

Go has many of the same problems as Rust.  Go has many problems that are unique to Go, that make it unsuitable for supplanting C in places where C is still used.  While rewriting an entire operating system in Rust, might be sub-optimal; writing an operating system in Go, would be untenable.

I don't hate Go.  I think it has uses, but I will say that Drew is somewhat using the wrong point of comparison.  Go has a problem space where it is absolutely the right tool for the job.  This problem space is much more modest than the problem space of either C, C++ or Rust, but it is so by design.  It is a wonderful tool when it fits, and very clearly telegraphs situations where it is a bad choice.  This is a great quality, but it will confine Go to a niche.  In 10 problems that are most effectively solved by C, Go can be an improvement in 2.  Rust might not be as great of an improvement in those 2 cases, but it can cover 6-7.  Zig, by comparison outshines C in every category, including simplicity.  Not choosing Zig is a missed opportunity.

In fact, Zig would track through this very well: it can integrate with any build system, since the compiler is the build system, it safer, but not intrinsically more limited, it doesn't encourage mindless concurrency, has a consistent, stable and small specification and ABI.  Zig is also far more portable than C, owing to the fact, that the functions on different operating systems are compiled in precisely the same way.  Better than that, like C, it comes with no runtime, no garbage collection and strong guarantees about performance, often being the fastest language available.  Namedropping Go in this context simply appeals to the suckless tribalism, as otherwise, Go is perhaps the worst possible point of comparison for modern C replacements, if one chooses the axes of comparison as Drew did.

To make Rust look terrible, Drew did not take care not to open fire at Go, or perhaps decided that omitting the language from the comparison would prevernt one from doing so.

> The kitchen sink approach doesn’t work.

This is a straight up lie.  The approach had been demonstrated to work in large-scale projects

> Rust will eventually fail to the “jack of all trades, master of none” problem that C++ has.

If by that, Drew means that it will be a language that is effective at solving quite a wide range of problems, and consequently accumulates a lot of negativity, perhaps.  If Drew means that Rust is going to accept every feature into the language without considering that feature's inclusion with appropriate implications, then he is misinformed.

> Wise languages designers start small and stay small.

A "no true scotsman statement", that is also unnecessarily uncharitable.  I can (and have) allowed myself such statements in direct conversation with language creators, because such a blunt approach can get through particularly thick-skinned language designers and effect a productive discourse, either refuting my argument, or fixing the flaw.  Stating this publicly, is recipe for being proven wrong.  Specifically, while I expressed skepticism about Zig in a different article, that does not stop me from bringing it up in this article in a positive light.

> Wise systems programmers extend this philosophy to designing entire systems,

The implication being that Greg Kroah Hartmann, and Linus Torvalds, are not "true scotsmen".  I'll be charitable, and state that Drew would be wise  to neither speak  on behalf of all systems programmers, nor on the behalf of the wise, implicitly associating oneself with them.

I would have gone further but I won't because of the follwing lines:

# Breaking bread with the opponent

-----

> I understand that many people, particularly those already enamored with Rust, won’t agree with much of this article. But now you know why we are still writing C, and hopefully you’ll stop bloody bothering us about it.

This is why, despite this piece being a re-examination of Drew's article and unfortunately largely in a negative light; I still believe that his point should be argued.  I believe, however that it should be argued correctly.

He acknowledges that his is but an opinion.  The language of the article doesn't convey this, which is also why this acknowledgement comes at the very of the examination.

He is correct that asking C programmers to learn a new language, for whatever reason is not correct.  Even if Rust were a direct upgrade, it necessitates a process of learning.  It doesn't particularly like the tools that are commonplace and have been widely tested in C code bases.  I know this, because the attempt to rewrite Emacs in Rust did not produce a successful program.  It simply didn't work as well, and conferred little to no advantage.

However, he should argue this with less emotion, less frustration and targetting the actual deficiencies of the language.  He should have perhaps stated that Rust is not a C replacement, but is a good language nonetheless for a prorgramming style that he will never adopt.  This clearly delineates the boundaries, and leaves room for a respectful withdrawal of Rust fanboys from the conversation.

I quite like the way that Jonathan Blow addresses this.  For his many flaws, he did not argue that a language is totally useless based on the fact that it does not fit his needs.  There are good reasons to not do things a certain way, and one can see that in his programming language: Jai.  That language, while totally useless for my main job, would be a wonderful fit for a large number of problems.  In fact, in some respects Jai _would_ be a good C replacement, just as much as Zig.

Drew would have been wise to avoid unnecessarily inflammatory statements.  His entire article could have been a far better read, had he taken a step back, and thought through things carefully.

Thus, here's where we stand.

# Putting it back together
## Don't rewrite anything in anything

An old engineering proverb states not to fix what isn't broken.  You can, in principle improve and iterate, but those should be independent things.  Your newer better tool, should be an improvement over the original in more ways than the expression, and even if the improvements are only from the maintainability standpoint, those go a long way.

As an example, `vi` is an iteration on `ex`, which itself is an iteration on `ed`.  Nobody rewrote `ed` to be `vi`, they simply exist; `vim` similarly improved upon `vi` but not only in updating the code base, but also by introducing configuration aspects; therein `neovim` iterated even more...  So don't rewrite X in Y, should be regarded as, avoiding a rewrite in lieu of maintaining the original.

As a counter-example, Wayland is an expensive rewrite that is largely justified by the fact that it is impossible to address many of the architectural flaws of X11 without a comprehensive all-encompassing change.  That does not mean that the transition is painless.  Telling people that Wayland is the future, and offering a tiny subset of the features that they actually need, is a terrible approach, and one of the main reasons why the notion of rewriting something is inherently problematic.  The prescription should be  to consider the drawbacks and only commit to a large-scale change if necessary.

An additional problem is that for pieces of art, originality is considered a net positive.  Rewriting the GNU core utilities comes with a slew of advantages, but is only regarded as an curio.  If it doesn't offer a radical improvement, it is a wasted effort.

## Don't learn Rust just because.

Some ATMs still run Windows XP.  Some banks still use Cobol.  My masters thesis relied on `polychord` which is written in FORTRAN.  Hell, publishers in scientific journals accept things like LaTeX, which have decades of technical debt; they have to be transpiled to PASCAL to then transpile to a modern system.

Legacy software exists.  It takes conscious effort and often age related flexibility to be able to alter how you think, and with Rust, one has to change their prorgamming style quite a bit.  This often implies that while the feature in lanugage X _will indeed solve many problems with the current design_, the outside observer often underestimates the degree of coupling, and thus the amount of work needed to implement said language X.  It might be a revolutionary feature, but it might need an arm and a leg to implement.
Plus, more often than not, it is a good idea to consider wholesale replacements as replacements; instead of rewriting the GNU core utilities in Rust, consider writing a new set of POSIX compliant core utilities that are different and in some ways better.  Consider the example of Apple M1 open source graphics drivers written in Rust.

Additionally, if one's design is bad, throwing more concurrency/parallelism at the problem might not improve your situation by much.  Remember, your CPU with hyperthreading/SMT enabled most likely can expect at best an order of magnitude improvement.  If your game engine is slow, maybe lack of concurrency isn't the only reason for that.

## Be aware of the limitations

I will now quote Jonathan Blow and state that most of Rust's features would not help with game development.  Most of Rust's features won't help with kernel development either.  Rust has advantages in the average case, make no mistake, but the way the code would look if it were used in a situation where heavy dynamic linkage was needed is going to make it counter-productive.  Rust is not great when a program needs to iterate fast.  Finally, Rust and C are both Turing complete.  This means that it is both possible to eliminate memory safety issues from a C code base, as it is possible to violate memory safety with Rust, though perhaps not with the safe counterpart.

Drew has a much better written article on whether Rust belongs in the Linux kernel, and on the whole it is both better argued, better worded, and better researched than what I have just spent the better part of three hours arguing against.  Drew is not unreasonable, and his opinions, those that veer outside the Plan9 circlejerk echo-chamber are well-argued, and mostly withing the boundaries of what I consider in no need of correction.
