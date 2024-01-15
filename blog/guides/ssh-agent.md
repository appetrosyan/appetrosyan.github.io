# Prelude

SSH has some of the dumbest ideas in UX.

Rather than use the fact that the person responsible for the creation of this program is capable of such stupidity so as to discredit ssh, we politely forgive them for flaunting "I am a security expert" as if that makes their stupidity _more forgivable_.

Enough ranting though.

We're here to set up KeePassXC on a clean Arch installation as an SSH agent.

## KeePassXC

KeePassXC is probably my favourite application on Linux.
It gives me local control over passwords, the option to use a cloud, and access to it on mobile operating systems.

Here we're mostly talking about how to use KeePassXC to reduce the amount of typing of keys into the program.
The less you input your password into the computer, the harder it is to crack.
Nobody can eavesdrop on you inserting your key, and make a correlation.
While you could avoid being side-channelled in such a way by swapping around the switches on your keyboard on a regular basis, this is still not an exact solution.

Plus, I often found that _good_ security practices, _i.e._ common sense, comes with no compromises to the user experience.
So, without further ado,
```sh
pkexec pacman -S keepassxc
```

The next step is to create a database.
I'd recommend that you consider making your database portable; there's advantages to having multiple databases, and advantages to securing your database with something more reliable than just a password.
However, I personally find that the value that it offers is marginal.

Sure, it is _more_ secure to try and use a YubiKey (one of my favourite investments), to unlock your database _in addition_ to a strong password that you change on a regular basis.
But the attack vector that I'm covering is _not what you might think_.
In particular, I'm not trying to protect myself from a world collapse scenario, nor am I pretending to protect myself from alphabetical organisations all around the world.
Instead, I'm trying to protect myself from a person who is likely to take interest in me, but also not to be too technical: your average thief and black hat.
Those people do not, as a rule, go and attack people personally, but rather in bulk.
They breach LastPass (and I happened to be stupid enough to have an account with them), among a few others.
This means that the most likely attacker is a script kiddie.
They go after personal information in cloud storage as well, so keeping my password database in Dropbox, while convenient, is likely not worth it.
However, assuming that I don't leave my flash drives out and about (and I don't), and transport the keys and password databases only locally, then the only way to breach my security is by breaching my machines as well.
Regardless, it only makes sense to protect my work machine from malware/key-loggers, and to avoid using cloud services.
At this point, if people have access to my machine, they could compromise my password, but not the YubiKey.
And yes, at this point the YubiKey is doing the legwork, but it is also a piece of hardware that can potentially lock me out of information that I should be able to recover.
It is in my opinion better to not lose the information I have access to via password databases, and potentially grant this information to malicious actors, than it is to potentially lock myself out of it.

::: warning
I would caution the reader to be aware that this only represents the state of things **at the time of writing**.

The risk/benefit analysis has to be revisited every single time something changes in the _status quo_.

I myself am experimenting with using a YubiKey as the only factor in authentication.
:::

## Creating SSH keys

The command we want is interactive: 
```sh
ssh-keygen -t ed25519
```

This will prompt you for some input, and I would recommend that you follow the defaults.

::: warning
Don't try to avoid setting a passphrase.
This is not a good idea for one simple reason: your key is _the key_, if you want to encrypt it, you must encrypt it either with another key, or another key that's derived from your password.
I know that it is tedious to input a long password into your terminal any time you want to use a program like `ssh` or `gpg` to sign your commits, but I assure you, setting a long password is of paramount importance.
The rest of this article is dedicated to making the tedium more manageable, so I'd advise you to heed this warning.
:::

::: details An aside on our chosen method
We are going to go with the defaults.
This is somewhat dangerous, because it assumes that people developing `ssh` know what they're doing, and as I asserted earlier, user experience blunders seem to cast doubt on that.
Still, I've worked in cryptography, and I should say that `ed25519` is a relatively safe bet.
What isn't safe is relying on the same key for a long time.
:::

::: details Changing keys and passwords frequently
I am torn on the idea of updating one's credentials regularly.
I think that with passwords, there can be a very compelling argument against changing them frequently: this is a potential point of vulnerability, it requires a very specific architecture on the back-end, and quite frankly can lead you to forget the password.
If you can make it work, this will probably protect you from attacks via data breaches, and improve the _effective_ strength of your passwords.
With that said, it will probably result in you forgetting the password, and having to fix it in some other fashion, which intrinsically makes the system less secure.

With keys, the balance of updating them is very different.
Either they are used as the address and thus identifier in some piece of software, or it is treated as a password.
If it's the former, you simply _can't_ change your key and that's that.
But GitHub and GitLab and most other systems that use your ssh key, do so as a password, and in this case, there is almost always an additional layer of security which you must go through.
As such, there are very few actual downsides to changing your keys, as long as you're thorough with the changes.
:::
## Getting the `ssh-agent` to work

This is somewhat of a problem, because (at least on KDE), none of the regular plumbing for setting it up works.

I also have quite an esoteric set-up, because I mostly use `fish` and I use it as my login shell.
There are differing opinions on whether a non-POSIX compliant shell is a good thing, and that maybe the difficulties that I'm facing are all due to deviating from the norm.
But I'm a contrarian, and to make this term worth something I need to do extra work to get anything to work.

Firstly, you should probably add the `ssh-agent` to the list of services that you need.
```sh
systemctl enable --user --now ssh-agent
```

This is a service file that was thoughtfully provided by the maintainers of Arch Linux. Not many are aware that it exists, but if it didn't here's what it looks like on my machine:
```systemd
# Requires SSH_AUTH_SOCK="$XDG_RUNTIME_DIR/ssh-agent.socket" to be set in environment
[Unit]
ConditionEnvironment=!SSH_AGENT_PID
Description=OpenSSH key agent
Documentation=man:ssh-agent(1) man:ssh-add(1) man:ssh(1)

[Service]
Environment=SSH_AUTH_SOCK=%t/ssh-agent.socket
ExecStart=/usr/bin/ssh-agent -D -a $SSH_AUTH_SOCK
PassEnvironment=SSH_AGENT_PID
SuccessExitStatus=2
Type=simple

[Install]
WantedBy=default.target
```

Next you would need to add an environment variable `SSH_AUTH_SOCK` to your shell.
There is currently no consensus on how to do it, but plenty of opinionated idealists with ideas of why a way works isn't what you should use.
At the moment, the way that evidently works best is to add a file in `~/.config/environment.d/`,
```sh
echo 'SSH_AUTH_SOCK="${XDG_RUNTIME_DIR}/ssh-agent.socket"' >> ~/.config/environment.d/ssh-askpass.conf
```

I cannot emphasise enough how badly user-specific environment variables are handled on GNU.
Particularly those pertaining to the early programs like window managers and security agents.

Now you need to log out and in again.

::: info
A Restart is what I'd recommend for that purpose, on Arch Linux it might have other benefits, particularly if you've ran `pacman -Syu` before.
:::

::: tip
To verify that things work now, run

```sh
ssh-add -l
```

if it produces something like this:
```console
The agent has no identities.
```
then we're good

:::

## Setting up KeePassXC

::: tip
We are largely going to closely follow the [upstream documentation](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/SSHAgent.adoc): if the two documents differ, I'd recommend you more closely follow the upstream document rather than the steps outlined here.
:::


## `pinentry` for GNU Privacy Guard (`gnupg`)

This is probably something that could be left for another post, but I'm adding it here for posterity.
Firstly, there's an asymmetry between the `pinentry` programs.
`pinentry-qt` is, as always, an afterthought.
`pinentry-gnome3` has integration with the secret services, meaning that you could enable KeePassXC's secret service integration, and be done with it.

The easiest way to achieve it, is by setting the following in `.gnupg/gpg-agent.conf`

```conf
pinentry-program /usr/bin/pinentry-gnome3
```
This program, at the time of writing will not start, you need to also install `gcr` of the third version.


At this point, you might want to disable the KDE wallet subsystem, so that it's not exactly competing with KeePassXC, and enable the service with KeePassXC.

The best thing to do is to now test things!
