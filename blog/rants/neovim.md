---
- title: Neovim challenge, two weeks later
---
# ${{ title }}

This is quite an interesting experience.

I will not say that I am wholly disappointed, but that it is sad. I've been a `vi` user for the better part of my teens, and I've only picked up Emacs around ten years ago, when I was 19. So this challenge was less of a dive into foreign waters, and more of a return to my own roots. And it is interesting to see your grandparents do some renovations, to see signs of prosperity in some areas, but to also notice that they are struggling. Not financially, but in that they've lost track of what made them who they are.

My usage of Neovim was an interesting time and I fully intend to continue using it to the end of the month, perhaps a bit more into the next one. There is a lot of fruitful constructive reflection that took place and answered some of my questions about the direction of Emacs. While it is still possible that I might change my mind, to me at this stage, a return to the old lisp machine is inevitable. Neovim cannot replace it, even though for a time it looked like it could. And in principle, having known precisely what's missing, I'd be able to build up the missing functionality, if it ever comes to that.

But the experience was not wholly untarnished, and like seeing signs of demention in one's grandparents, noticing these signs in NeoVim were a soul-shattering experience. It may be nothing. It may never become a problem. Or it may spell the end of a long tradition, which I would very much like to avoid.

## Ed and the predecessors

Key to understanding this family of editors, the so-called `vi`-family,  is their heritage.

Unix had a standard text editor, it was, as you might guess immediately called `ed` (but pronounced eeh-dee).

Ed is a command-driven interface. You don't have keys doing things, you have an editing instruction set with commands shortened to single symbols.

Using Ed exclusively for one's programming is an enlightening experience, as it imposes many of the important aspects of programming discipline, that one might not be able to pick up on. The size of files begins to matter, the pagers become important, line numbers become things that you worry about outside the error messages, and source files become things that one is able to memorise. While `ed`'s design is often described as minimal, it is anything but. The whole intention behind `ed` is that it is an interface that one can program externally, and no editor to this day, outside of those that descend from it, seems to grasp the idiom of this being an editing language interpreter.

But this does not preclude the usage of `vi`. At some point, the loop of writing changes and printing the file became so prevalent, and computer resources have improved to such a degree that it became possible to do real-time visual text editing, (IKR, this is such a big leap forward, that we can't even imagine a computer that would be too slow to do that).  This evoked the need to create a visual editor, such as `ex`'s visual mode, which was invoked very simply with `argv[0] == 'vi'`.  The reason why `vi` was so popular at the time is the exact same reason why `emacs` was popular on lisp machines.  It was visual. You could see your changes immediately, and much like the arcade machines, it was fun. I'm writing this in `neovide`, which has a funny effect for when the cursor moves right after a character had been typed, and I admit it is supremely fun. Now imagine that `ex` is the only way to get that.

Now, naturally, `vi` is extremely good, and everyone in the Unix world was using it. But it was somewhat deficient in some areas. So the late great Bram Molenaar improved `vi` by adding on man-made horrors beyond one's imagination. Needless to say I did not care for `vim`. Partly, because why fix what isn't broken. Secondly, because `vi` was a ubiquitous, and `vim` was not. Thirdly, because having a configuration language, that is vimscript seemed antithetical to the ethos of both Unix and `vi`. `ed` defined an editing instruction set. Instruction sets are not extensible, and what in Emacs would be solved by an abstract function in `vi` would be solved by a concrete skill. Thus being able to remap things but making it non-standard seemed like a step backward.

But in all fairness there was a time, when `gvim` was my go-to editor, becuase it allowed me to copy and paste text from the exercises, and write the rest of the code that way. I also tinkered a little with the keybindings, and must admit that modal editing with the ability to remap keys seemed like a good idea. But regardless if I were asked "what tool do you use", the answer would have been `vi`. Not `vim`, but plain `vi`, because the vast majority of the work that I was doing was pure, unaltered `vi`.

But `vim` had mass appeal. And soon became a staple. It was, for lack of a better term, the right tool for many tasks, including ones that were ordinarily not suitable for a plain text editor: IDEs for Java seemed to be a necessity, because one would not be able to produce code sufficiently quickly, given the verbose and tooling-dependent nature of the language. `vim` had plugins which would allow it to handle some of the basic refactoring functionality. And in some areas, `vimscript` allowed one to work around a problem ad-hoc, without invoking a keyboard macro.

Plus, `vim`, though extensible and willing to meet editors half-way, was still skill dependent. You were meant to learn how to use the `vim` motions and you were meant to get rid of the nasty habits, such as not using `di{` to delete blocks.

But the issues started to crop up over the years. While vimscript was meant to be a reliable DSL for configuring `vim`, it was ostensibly maintained by one person. To a point at which most people, including @ThePrimagean, decided never to learn it. `vim` occupied a niche, but that niche was very quickly overshadowed by `neovim`.

This project was where I was already completely committed to Emacs, and also stopped distro-hopping, so I saw a situation in which I would have to edit text from a TTY only in one context: over SSH, which thanks to a nifty built-in of Emacs, called TRAMP, offered a much better user experience than Vim ever could. As such, `neovim` was something I was not aware of for the longest time.

Still, I saw the effects of that project. It added asynchronous processing, it added a general purpose programming language that people would have been likely to program in, and not just for show. It had compatibility with graphical front-ends which were radically different from `gvim`, and offered much better interaction, and at this point, this is the go-to choice for most people who want to get into `vim`. I was not invested one way or the other, getting `emacs-native-comp` mainlined was more of a priority for me and around 20 other people. This is also when a similar project cropped up: `emacs-ng`, is a direct parallel to `neovim`. The reason why `neovim` took off and `emacs-ng` is now languishing in a limbo, is that people hate JavaScript and there was a concerted effort to fix Emacs lisp, while with VimScript, the general opinion is that it is broken beyond repair, and now with Bram Molenaar passing away, likely will remain that way indefinitely.

So `neovim` isn't necessarily better than `vim`, or `vi` or `ed`. They are occupying different niches: `ed` handles file editing in a command-driven format, and is often better than using a bunch of `sed` calls. The `vi`-sual editor, is a standard tool that can be used to quickly edit a file when one's graphical system is unavailable. `vim` is an extensible editor based on `vi`. `neovim` is a programming environment, or a code editor. They all exist in parallel, they are all extremely useful and they **all** require different skills, even though some of your muscle memory shall carry over, some of it will not, and it will annoy you.

I would recommend that you avoid falling into the trap of thinking that because they are supersets of each other, to think that using a smaller editor is devoid of value. As I mentioned, getting acquainted with the editing instruction set is supremely important. Often what is taken away is just as important as what is being added.

## Why NeoVim in 2024

The complete list is very simple:
- Modal editing
- Good performance
- Extensible in Lua
- Package ecosystem

I will not preface this with bullshit along the lines of "but there are other items in the list that are of course true". No. This is the complete list. Every other reason can be traced back to these principles of construction, but more often than not, they are not valid.

So let's go over these one by one, to expand a little and talk about the strengths.

### Modal editing

Simply put, it is a way of skewing the skill curve such that earlier users have a harder time, but experienced users have an easier time.

The benefit that modal editing offers cannot be overstated. The supposed ergonomic benefits that `neovim` has over e.g. `emacs` can all be traced back to one's choice to be modal first, and the other to be discoverable first. The bet on the former, in my humble opinion, is better; one does not stick to either one of the editors unless they want to build up the skills. Modal editing dangles a carrot, wherein one knows that once they master the instruction set, they'd be able to do structural editing more efficiently. This demands that one's both hands be glued to the keyboard, and in the home row, so for a touch typist, this makes a lot of sense. Most operations pick up incredible mnemonics, `dd` is delete line, `d2w` is delete two words. Sure, `yank` and `put` may seem archaic, but one very quickly learns that those keys are easily reachable. Because the navigation is done via the same keys that the typing is done with, a quick typist can also be a quick navigator.

:::info
One of the earlier concerns I had when returning to the `vi`-family was that I would have to expend resources to ensure that I'm in the correct mode, but there are two ways around this. One: visual feedback done right, especially with block cursor and beam cursor. Secondly, if one comes from the Emacs family, hitting escape and following that with some motions is in no way a foreign concept. Starting any command with `Escape` and finishing with `i`, can give one a fairly solid illusion of living in a CUA-like editor.
:::

Because the modality is an API that almost every package can respect, there is ample opportunity to bind various actions to easily reachable keys. The same effect can be emulated with Emacs' native keybindings and minor mods, but I must admit, the emulation aspect needs to be done very carefully in order for it not to become a drag for every package that one has installed.

### Good performance

This is an architectural consideration more than anything else.

Every decision comes with a trade-off. What is often confused with minimalism is actual judicious usage of "it doesn't offer enough to justify the cost".  And `neovim` is a master-class in this principle. It is far from minimal, it has modal chorded bindings, but the keys are responsive. It offers enough visual feedback but doesn't waste time making the cursor "blink", because it is assumed that one is able to keep track of one block.

Being fast isn't a perceptual thing. It makes otherwise tedious tasks extremely satisfying. In `neovide` the front-end I chose, the ability to fly across buffers and to not pause led me to do more things. Combine that with some training via e.g. VimGolf, you get what is ostensibly a productivity boost. There's less resistance, there's more fun, and you end up doing more. At least in theory, but we'll get to that. Having fun while learning (and the cursor moving blazingly fast with a smooth animation is exactly that, fun) is the key to effective learning. You might not forget the things as quickly.

Working with `neovide`, having beautifully rendered objects and a somewhat different UI, that still offers a degree of familiarity, and is visually appealing is key to why surmounting the skill issues in the early days of using `vim` is oftentimes easier than surmounting smaller challenges in Emacs. There is some tentative evidence to support that speed of feedback is beneficial to learning when gaming, and I see some of the effects already.

But we must be careful to recognise that this is an archtiectural decision, that imposes its own limitations. It is not a pure benefit, but rather a trade-off with many positives and negatives that can be mitigated.

### Extensible in Lua

This is perhaps one the least obvious aspects of `neovim`. But it is also the sole purpose, why `neovim` is even a contender for replacing Emacs for me. Lua is a general purpose programming language that has minimal bullshit. This is a loaded term, so I should probably elaborate.

Lua is a case study in an embeddable language done right. It has been perhaps the biggest and most interesting additions to the `vi` family since becoming visual, because Lua, unlike VimScript has an existence outside of the editor, allowing a cross-pollination of ideas and packages and code. Sadly this advantage does not extend to stronger networking, which made it problematic to integrate with LSP, at least initially, but the fact of the matter is, that Lua was the right choice.

Most code that is written in my `init.lua` is fairly readable. Lua is a curly-braced language, and as someone who does Rust and C++ for a living, the logic of Lua is the least far removed out of all of the major editor configuration languages. Yes it has idiosyncrasies, and sometimes they are annoying. But it is a far cry from Python or JavaScript.

This lead to something that I did not anticipate when I was going to dive head-first into `neovim`. When I started with Emacs, I needed a long time to grasp the basics. `setq` is very radically different from `var := val` that most other languages use. This approach is more powerful but learning Emacs has a lower skill floor compared to learning `vi`. At the same time learning Emacs lisp has perhaps the highest barrier of entry. But, believe it or not, it is also possible to configure neovim in Lisp! This means nothing, because if either part of the editor is **not** written in Lisp, most you gain is an esoteric syntax for namespaces.

### Package ecosystem

This is perhaps the most surprising aspect of working with `neovim`. I did not expect it to have this many packages. It is still nothing in comparison to Emacs, but the roster is much richer than I anticipated.

The packages are in my opinion the crown jewel of `neovim` despite the particular execution of packages being perhaps one its weakest points.

I have not much good to say beyond that they exist, and they're not nearly as bad as I'd expected them to be.

## Why Emacs is still better in my eyes

At this point I must say that the original conclusion is a much more philosophical than technological discrepancy between the editors than I had originally anticipated.

The two editors are much more similar than they are different now, and I could equally replicate almost all of my workflow in either counterpart. The Org mode has decent support in `neovim`. There is an almost carbon copy of `magit` called `neogit` and most of the muscle memory that I had developed within Emacs can be translated to keybindings in `neovim`'s insert mode, plus having the visual and normal modes.  And as anyone who's ever used Emacs will attest to, `neovim` is significantly faster than Emacs, with all of the advantages that I've been yapping about in the previous section.

So why in the world would I not just abandon Emacs and go with Neovim for the foreseeable future?

I will unfortunately have to state that modal editing has most of its power in cases where you are dealing with a curly braced language. I'm afraid the proportion of situations where that takes place is becoming increasingly scarce. Given that I'm left handed, and most navigation in Emacs can be effectively accomplished with chorded keybinds of the left hand, I'm afraid I don't find the navigation to be significantly better in vim, and in fact, to be substantially worse. You could shout that it is a skill issue. Indeed it is!  You have forgotten that I have been using vim motions for the better part of my earliest life and had to learn Emacs when I was "already a man" (TODO: Insert The dark knight rises meme here). It is your reading skills that are the problem. I have used both extensively and I will say that Emacs' motion with tweaks is vastly superior to `vim`, particularly when editing prose.

In Emacs all I need to do is to toggle the `text-mode-auto-fill` and not worry about line breaks and line filling. I have olivetti mode, I have proportional fonts, and I can remove the markup markers, thus resuling in a WYSIWYG, with all of the other supposed benefits of plain-text. While initially I applauded the fact that `vim` has decided to keep the graphical clipboard separate from the `kill-ring`, I have found that this still implies that one has to use the concept of not cut-instead-of-delete to a far greater extent than in Emacs. The paradigms are not qualitatively different, they're just different and on the rare occasion that I need to paste code from a browser, I do so via the right-click menu of `neovide`, rather than a keybinding, because said keybindings don't seem to work and I have no way of disambiguating.

Neovim has a bunch more annoying less-than-efficiencies that seem to be an easy fix, but are usually not. Things like auto-complete which I fully expected to work out of the box, and to work better than e.g. `company` (to be fair, `company` is the worst package in my config at the moment), but that low-low bar seems insurmountable for `coq`, `complete` and a few others.

Lack of `dabbrev` is a significant drag on my productivity. I will say this much. Emacs' `dabbrev` is better than it has any right to be. Any other form of "intellisense" is a significant downgrade. Emacs' `dabbrev` tends to help my typing a whole lot more than one can imagine. Right now while typing up this passage, I find myself reaching for both `abbrev` for things like `.e.g.`, and `dabbrev` in my code and prose. These two major modes combined with the excellent templating libraries that already come built-in are why I think that Emacs still has undiscovered sub-surfac gems that nobody really sings the praises of enough.

A lot of things that I would consider important enough to work out of the box, seem lacking in `vim`. Emacs comes with `eglot` and `use-package` and many many other things just built-in. If I need to add a package to Emacs, all I need to do is to add
```lisp
(use-package thing)
```
at the end of my config file. This seems like not a lot, but this is a difference between `apt-get install thing` and adding `thing` to your `/etc/system.nix`. The difference is night and day, for someone with appreciation for such things.  Want an example? Well, for one, `use-package` being a built-in means that you can in principle not have to start your `init.el` with anything other than that. Sure, if you want to bootstrap your system, you probably want to add things like `package-initialize` to the file, but you also need to do that song and dance for every other package manager.

:::info UPDATE
apparently not anymore, and for package managers like `elpaca` you kinda have to disable init of the regulat package system
:::

Incidentally, there's balkanisation of package managers on `vim`. There's multiple, some of them are no longer maintained, and while in most situations the syntax for adding new packages in one's config file is simple, it's a matter of time before the complexities rear their ugly head. This is not a solved problem with Emacs, as there are `elpaca` and `straight` but they have chosen (a sign of great wisdom in my opinion), to not indulge in frivolous differences in API, but rather to work as plugins for `use-package`. As such, the instructions on all packages can appear as if one were only using `use-package` and not care about the underlying pacakge manager. Even though the syntax is remarkably similar across `lazy.nvim` and `packer.nvim` these two are distinct. As such, the existence of either is nothing more than a manifestation of the tower of babel.

And this is important. There are more than just cosmetic differences between `use-package` and the way that neovim chooses to install their packages. The fact that a `use-package` form can be a self-contained declaration that haas no traces anywhere else in the config file. This means that removing a package is the same as deleting the declaration. Garbage collecting it, is equivalent to deleting the `elpa` sub-folder. With `neovim` it is not so.

But there are grander compromises that need to be talked about.

### Modal editing is not that difficult

I know that I had been praising modal editing so far. And I will not renege on my praise, but rather mention that given how Emacs is organised, it is perfectly feasible to create a `vi`-like modal editing environment if you are a beginner in writing Emacs lisp. That is not to say that you would be meeting the levels of `evil` or `meow`, those would require a considerable amount of elbow grease, but there are no principal reasons why modal editing is to be considered a `vim`-only feature. While I did so initially, I no longer use modal editing in Emacs all the time. When I do, I prefer quasi-modal (pardon the pun) editing in the style of `cdlatex` where a symbol can invoke a collection of context-sensitive operations, rather than overloading the existing modifiers.

The ergonomic argument in favour of modal editing is overblown in my opinion, because as anyone whom has ever attempted to learn a new keyboard layout will attest to, the symbolic bindings in `vim`, make sure that nothing save mnemonics remains ergonomic in the long run. Vim requires the same level of configuration as Emacs would, if one wanted to use an esoteric layout or god forbid stenograpic keyboards.

Even so, there's a few more aspects to the other side of ergonomics. While Emacs is not exactly similar to `vim` out of the box in terms of ergonomy, it can compete with it fairly efficiently if you are willing to adjust your keyboard. There's a phenomenon known as the "Emacs pinky", a nod to the fact that in Emacs one is often using `Ctrl`-based shortcuts to do basic operations. This is somewhat true but not exactly a problem. You see the old keyboards have had their Control key, where the bestige that should have died now lives, the "Caps Lock". Every window manager I've used on Linux, some windows machines and Mac OS for that matter allow one to remap a useful key to a location where a useless key tended to reside. It is a bit of an issue, but I think that if you care about ergnomics, and you base your choice of life investment, you should keep in mind that rebinding a key does not compensate for the subject of this section.

::: info
And in all fairness, modern day keyboards are not particularly good. We often have an `fn` key which is useless, and cannot be remapped. Some ChromeOS devices decided they did not need a third modifier, and rolled back to the pre-model-M layout of only Ctrl and Alt, while neglecting to remove the key that I don't think many people consciously use anymore.
:::

::: warning
The only real complaint I can levy on Emacs, is its staunch refusal to adhere to modern sensibilities. There are certain key combinations that cannot be bound to: namely `C-i`, `C-m`, `S-TAB`, `S-<space>` and a few others. I understand why there is resistance to removing these bindings, there are still people whose workflow depends on interpreting a sharp temperature rise as `Ctrl`. There is a way to toggle CUA mode that maps `C-c`, `C-z` and `C-v` to their "regular" meanings from the IBM CUA standard, I would like there to be a "toggle modern keyboard mode" option that can be opt-in that disables those remappings and does not retranslate any of the keystrokes to anything archaic. I understand that binding `C-i` to indent is sensible and convenient, I would just like to be able to then bind `Tab` to something else.
:::

What I found is that the `kakoune` team of which I was skeptical at first, definitely has a refinement of the modal editing paradigm, but the solution, was actually convergent evolution with what Emacs already does.

The instruction set of `ed` is very direct. You give an operator and two operands and this carried over through to `vim`. In most situations what is accomplished by the notion of a `vim` motion, can also be accomplished by using the so-called `visual` mode, i.e. selection, where you have placed a cursor in one place, and it stays static, while regular motion commands transfer the cursor in a way in which the selection is extended from the original point. Emacs has a similar mode, called a transient mark mode, which had been enabled by default. This means that all one needs to do to replicate the behaviour of `vim` is to select the region on which one needs to operate first, and do the manipulations second.

Consider then what one needs to do to delete the contents of a curly-braced function. In `neovim`? Easy, just `da{`. Except if your cursor is inside an `if`-statment you would need to walk away from that scope. One would need to place the cursor in a specific spot. You might realise that this is the case, when you've already invoked the command and it didn't do what you wanted. Kakoune addresses this latter issue by having visual feedback on what the region acted upon must be. In Emacs, this is far simpler. Delimiters define so-called `s-expressions`, so if I'm at the opening curly-brace, killing the body of a function is accomplished with `C-M-<space> DEL`.

You might counter by saying that this is both more keystrokes, less mnemonic and it depends on the cursor position. It is worse. But I will say the two approaches are on equal footing for one simple reason.
- if we count modifier presses as keystrokes, then `{` counts as two, bringing us to four in total. Equally if we count is as one, then `C-M-SPC` should count as one, as it is both easy to press, and used frequently in Emacs.
- Mnemonicity is a matter of perspective and model. `C-SPC` is a way to mark objects in Emacs. `C-M-SPC` is a way to mark many objects that are delimited. They are related, and thus it is not difficult to remember. Plus, `SPC`-containing keybinds have a special place and must be handled specially. In `vim` one would first need to know why one has to delete "around" and not "inside" the region.
- As I've alluded to earlier, the same is true of `vim`. With Emacs, though one does not have to make a decision to move the cursor to the initial position of the function definition, because one knows how to select the function body. I agree it is not perfect, but without pacakges, one does not exactly have a good solution in either case.

Technically there's a way around this using `tree-sitter` integration. These are tempermental and while writing a `tree-sitter` grammar is the preferred solution for both editors, using a regular expression-based major mode in Emacs can approximate a function definition better than can a `vim` motion. There are few places where one can learn about definition of textobjects, while almost all of the major modes are written in Emacs lisp.

With pacakges, the situation is radically different. In Emacs I know of `smartparens` that would allow one to do that in a single command, and if one anticipates that killing and yanking function bodies, as opposed to entire paragraphs is something that they'll do often, they can adjust them.

And this is key!

Modal editing is neither exclusive to `vim`, nor is it fundamentally better than non-modal editing. Even so, it is then reasonable to state that something like `kakoune` is a far superior editor, because its notion of text object allows non-destructive feedback before an operation is performed, not `vim` and not even `neovim` can claim the same.

I can borrow concepts that I like being modal and transfer them to Emacs with `general` but be far more productive in the `insert`-ion mode because Emacs exposes its full API in that mode, while `vi` does not.

### Good performance is a work in progress

This is perhaps the one place where I'd say that good performance is good. Emacs is noticeably less performant as a program, owing to the blocking single-threaded nature of the Emacs lisp interpreter that it is built around.

Emacs is less responsive, but not slower.

But the truth is, that despite this it is in no way slower. It is just that one is encouraged to think more specifically about the problems that one encounters while editing, and how to solve them. A common solution to most vimgolf problems in Emacs, is to record a macro. Indeed, because a macro is a function of repeated application of a group of operations, and breaking down editing into operational groups is perhaps the impetus behind both editors.

The difference is that `vi` is more like assembly. It provides editing-Turing-completeness, but most operations are combinations of the primitives. Both `neovim` and Emacs break down objects into functions, which can themselves be re-usable. In `neovim` I would need to provide a notion of a textobject, with extents and positions a more declarative, but involved approach. With Emacs, to define a notion of a new text object, all one needs to do is to define how to move to the end and to the beginning of the extent. If the move operations only work correctly in some circumstances, those become the context for the concept itself. Specifically, citing from the example of the previous seciton, to mark a symbolic expression one assumes that the next character is the opening delimiter, and seeks until it encounters a matching closing delimiter. It is trivial to write the function differently to include the group of arguments, but not the whole of the signature or to move the beginning position. One can extend and sophisticate the behaviour to a great extent. With `neovim` I will assume that the same mechanism works, because all one needs to do is exactly the same.

In principle both operations are going to be linear in the extent of the text between the delimiters. Neovim has a slight edge because it can concurrently scan multiple lines if that is the case, but in practical terms both of those are extremely quick. Lua interprets to a fast JIT, while Emacs Lisp is often plain natively compiled.

The only difference in the speed of operation between `neovim` and Emacs, is purely perceptual. This is something that had been brought up countless times, and a significant pain point in the modern day Emacs commmunity. Being slow comes down to a psychological effect that I can choose to ignore until it is fixed.

Potentially, though it may be possible to make it go away by creating a front-end that connects to an Emacs server as a backend until a pure solution is found.

I will conceed that I will miss `neovide`'s lightning fast reponse and ability to do complex tasks very quickly. Emacs will do the same, but look worse while doing so. That is pretty much the extent of it.

### Extensible in Lua, but Lua is not as powerful as Lisp

This is somewhat controversial. But I will say that the way that `neovim` requires one to work around Lua is sub-optimal.

Emacs lisp offers immense power that Lua can only approximate and only for the general population. Something like `use-package` would be incredibly difficult to create in Lua, if not impossible. It would rely heavily on tables and would in general be a form of a DSL. The difference is that in the lisp world, a DSL is still a lisp, but with syntax extensions. Within the curly-braced family that is not so and Java is qualitatively different from Rust, which is qualitatively different from C++.

There are also issues stemming from the fact that `neovim` is a dual citizen of VimScript, and Lua for extensions and some things are implemented as C-functions. It is a problem that is pertinent to Emacs as well, but thanks to its incredible documentation viewer less problematic. Emacs has many packages implemented in the Common-lisp sub-dialect, and everything has to speak Emacs lisp in the end, but that is far from a problem.

Perhaps one thing I find extremely annoying is significant comments, that are not highlighted as significant and not handled as they should: via macro. But in all fairness the fact that Emacs complains about punctuation and many many other things when you go off and write your own elisp functions leads one to be able to write better programs. Lua does not encourage such practices. This shows in some areas.

Finally Emacs lisp has one feature that Lua will never have, and that is the ability to do incremental evaluation.

If I wanted to install a new package, all I would need to do is to write the `(use-package thing)` and hit `C-x C-e` on it. This will evaluate that form, and only that form. The result of which is a quick understanding of what functions can do, and an extremely rapid prototyping cycle. With `neovide` in order for `lazy` to **actually** download the package that I want, I need to close and reopen `neovide`. It is fast, much faster than Emacs, but at the same time it is unnecessary.

### Package ecosystem is worse

Emacs offers a smaller number of much better polished packages that are often, also significantly shorter than their `neovim` counterparts. They rarely if ever have walls of text as Readmes, and often don't need to provide anything beyond the regular docstrings.  The amount of effort and opportunities to make a radical mistake in an Emacs package is orders of magnitude lower than that in Lua for `neovim`.

And it shows.

I found that while `neovim` has a large number of packages, it has far less impressive stuff, and in some areas things that I would hardly qualify as useful, and errs more on the side of providing the functionality and hoping that the functionality will find a use, rather than purposeful exploration. Additionally, most packages for Neovim are written quite recently. This is a problem, because it indicates a lack of longevity in these packages and an API instability. With Emacs it is often the case that packages go stale, but it is often the case that pacakges that hadn't been updated since the 2000's are still quite functional and didn't need to be updated to work. Emacs lisp hasn't changed much even though the host application did.

I was infuriated to find that the perception that `vim` is targetted for packages way more than any other editor that doesn't live inside a browser, was based on a combination of stale "awesome" lists, marketing hype, and inability to differentiate serious projects from those that think that providing VSChrap support is tantamount to providing IDE tooling.

The reason why that might be the case comes down to the following three things that didn't seem obvious to me until I've seen the state of Neovim packages:
- Emacs is very adverse to non-free software. This extends to the default package archives. It is also the main reason why up until very recently it was not possible to load packages written in native executable formats.
- Emacs lisp is not a general programming language. Very few people who "know how to code" can pick up Lisp on the go. It will require one to reframe their mind and to work differently.
- Emacs does not advertise its forward-looking features well. I once had to prove to a maintainer of an "awesome" list that Emacs was not a terminal text editor. This is something being worked upon, I believe that a rebranding would be useful, but it will not shift mindshare much.
- The Emacs community consists of people who will not enter a flame war and prove that the editor is good. So anyone who gets most of their information from reddit, or some other "loudest opinion is correct" platform, will get the impression that Emacs is worse than it actually is.
- Emacs advocates focus on the wrong things. This is perhaps most evident when asking if Emacs has "killer apps". Most would cite `org` or `magit` and **maybe** mention `dired` or `tetris`. Those are packages that 1) I can easily live without, 2) I don't think are radically better than other packages doing the same thing, 3) even if present in other editors (and Neovim has also `neorg` which is a dumbed-down version of `org` touted as an improvement), they do not make those editors remotely comparable.

Vim has a loud community of people. Despite the fact that it is trivial to replicate `vim` inside Emacs, @ThePrimagean would insist on making jokes about skill issues, and how `vim` is better. Indeed, if all you do and all you'll ever do, is edit C-like curly braced code, `vim` has a certain appeal, and a few advantages. I've conceded those when I started this article. **AND I REALLY SHOULDN'T HAVE**.

# Takeways

I fully left the door open to switching sides and using this new tool for a long time, until mine reaches a level of maturity. I don't think that's correct.

What I think I should do instead, is to take this experience and refine what is missing. Particularly, I have actionable points, that only exist because I have had a bout of using `neovide`.

Emacs needs its own widget toolset. This means that I would need to hack around the `redisplay` function and allow for it to be extended.

We don't have enough tutorials in Emacs, and an over-abundance of 1337 haxxors that shall concede no ground and never admit any wrong.  I don't particularly have a problem with how `vim` works.  It's not exactly what I'd call efficient, but if Emacs died tomorrow, or stopped improving at a breakneck pace, I'd use `vim`.  I've used it before, I can do so again.  But I find it quite problematic that people don't exactly have a great deal of understanding.  They think that `vim` is what it is not, and that Emacs isn't what it is: a fine text editor.  This can be fixed by, shall we say, having a decent amount of documentation and "street cred".

Thirdly, there's a good reason to try and create a more responsive UI for Emacs. The main mistake architecturally speaking is that the Emacs lisp interpreter is bundled with a horrendous mess of GTK. Emacs deserves its own toolkit. This is far from unfixable.

Indeed while it would be perhaps too cumbersome to try and decouple the code for the time being, I'll contend myself with writing a Neovide-like front end, and making it connect to an existing emacs daemon. This shouldn't be insurmountable, and in fact is probably easier than writing one's own text editor. It should also allow Emacs to slowly wean itself off of the GTK front-end. Here the slow release cycle of Emacs is a benefit, because I can target a stable API and ABI. All I'd need to do is begin the hard part that can break only when there had been a large non-maintenance release. Finally, the code and the copyright is to be signed off to the GNU foundation. That way this work can be upstreamed, and Emacs can finally shake off the burden of being a text-only editor with _no form_ and _all function_.


## Useful ideas

Ergonomic keybinds. `hjkl` for navigation is perfect.

Editing functions exposed to the user and written by the user. The editor by itself doesn't come with any configurations.

Plugins are libraries.

Exiting to `normal` mode has action (cleans up whitespace).

instead of motions, define a highlighting method. Build it in, because any of the EasyMotion and others actually modify the buffer.

Modal navigation. Most people don't use the `]` and `}` when using Vim.

Transients are useful.

When writing the easymotion I could add ways of defining the motion to specific objects: `$` at the end, `w` at the end of the word, overlay it graphically.

Rely on the WM to provide tabbing and windows. Only open new ones, never tabs.
