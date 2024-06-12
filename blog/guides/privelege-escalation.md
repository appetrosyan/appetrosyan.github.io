# A zeroth-order guide to privelege escalation

This is not meant to be a detailed comparison, just a
back-of-the-envelope guide explaining why you should or shouldn't use
a particular program in particular circumstances.


### `sudo`

This program is sadly, considered the default on most GNU+Linux
distributions.  It is a rather complex beast, despite the fact that it
is, for lack of a better term, the original `systemd`, an ugly piece
of code that almost everyone hates, but still runs for some reason.
Not to say that `systemd` is bad, these days it's perhaps what it was
meant to be all along, but `sudo` is something that you likely need to
know about, but also something that you should avoid if possible on
your own machines.

Contrary too popular belief, this program is not built-in.  It is, in
fact, not even installed, unless explicitly specified on
newbiew-friendly advanced distributions such as ArchLinux.

So what do you need to know about `sudo`.  Well, it's an SUID binary.
99% of the codebase is completely inert, in that you don't actually
use most of it, all you use if for is privelege escalation for the
`root` user.

Is this a bad thing?  Yes.  The program, by sheer size is a huge
attack surface.  If you can avoid it, please do.

One thing I should mention is that `sudo` comes with `sudoedit`, which
is a program that would have been nice when editors couldn't privelege
escalate on their own, given that now they can, there's few reasons to.

`sudo -E` is an important case where the environment must be
preserved, for example, when you're doing something that the original
`sudo` is ill-equipped to do, that is running a graphical application.
The implementation is considered sub-par, to the point, where both KDE
and Gnome had their own replacements, `kdesudo` and `gsudo`.  Both
deprecated by the way.  The consensus, is that if you have the
technical budget to create a graphical program, you surely also have
the technical budget to do privelege escalation properly.

This program is configured via the `sudoers` file.  The trouble with
that file, is that it has an obtuse syntax, and must be edited with a
special program: `visudo`.  Don't you feel like you're safe already?

### Doas

Doas is what `sudo` should have been.  It's a TUI-only alternative to
`sudo`, that uses the same mechanism, but by virtue of being much
smaller, and better maintained, seems to have fewer unknown
vulnerabilities.

The entire man page for `doas` fits into half a screen.  Its usage is
small-enough so that people undestand what it actually does.

The configuration file is both straightforward, and can be specified
via the `-c` flag, which usually means that the user can easily change
it.  The greatest improvement that `doas` offers over `sudo` is that
it actually explains much of the stuff that is buried deep in the
abstractions.

I found it much easier to try and set up particular rules for
particular programs.  If you ask me, just use `doas` if you have the
ability to do so.

### Polkit

This is what I use.  This program is likely to come pre-installed.  It
is what `systemd` falls back on, if you try to perform an action that
needs root priveleges, but you forgot to use `sudo`.  It's main
advantage is that it lives in the modern day and age.  It is a program
that integrates with your desktop environment, and you can make WMs
work just as well.  You can make rules in ....  ewww...  JavaScript.
But other than that, the program is fairly straightforward.

Ideally, it doesn't require any input.  Any operation that must
require privelege escalation, must be performed in an isolated process
and the privelege must be de-escalated as quickly as possible.  That
is not something that you can do, while keeping the UX of `sudo`,
where `sudo make` has different abilities to just regular `make`.

One reason I choose to use it as the SUID binary with `paru`, is
because I often use it to compile `emacs-git`, and that takes a while.
I often put it in the background and do other stuff.  On more than one
occasion, I had to re-run the compilation several times with `sudo`,
because I missed the time when the terminal prompted me for input.
Sure, I now know that `konsole` has a way to monitor for silence, but
that is neither here nor there.  Add `pkexec` as a drop-in replacement
for `sudo` and you're golden.

As an added bonus, you have the option to do this:
```
WRAPPER USAGE
       To avoid modifying existing software to prefix their command-line invocations with pkexec, it's possible to use pkexec in a she-bang wrapper[1]
       like this:

           #!/usr/bin/pkexec /usr/bin/python

           import os
           import sys

           print "Hello, I'm running as uid %d"%(os.getuid())

           for n in range(len(sys.argv)):
               print "arg[%d]=‘%s'"%(n, sys.argv[n])

       If this script is installed into /usr/bin/my-pk-test, then the following annotations

             [...]
             <annotate key="org.freedesktop.policykit.exec.path">/usr/bin/python</annotate>
             <annotate key="org.freedesktop.policykit.exec.argv1">/usr/bin/my-pk-test</annotate>
             [...]

       can be used to select the appropriate polkit action. Be careful to get the latter annotation right, otherwise it will match any pkexec invocation
       of /usr/bin/python scripts.
```

So the user experience can be improved at the source, and packaged up.
For obvious reasons, the rules need to be edited in some way, and the
mornonic choice of using XML is a pain, but the work in making the
system be standard, be reliable, and be supported by multiple
applications is already done.  I think that the `suckless` crowd would
find it far easier to patch in a different file type, rather than try
and implement their own, inferior design.

### Systemd run0

This program is quite an interesting beast.  I tried to hate it, and
almost managed to do so, but at some point I realised that it is
actually a very good substitute for `sudo`.  It is _not_ an SUID
program, and as a consequence, the security of it, in places where
SUID style privelege escalation would be problematic, and re-writing
programs to use something like `polkit` would be difficult, `run0`
finds a nice niche.

I can see myself using `run0` and `polkit` exclusively.  But the
program hasn't been well-tested, so feel free to experiment with it,
but don't blame me if it breaks.  It's all very early days.
