# Prelude

SSH has some of the dumbest ideas in UX.

Rather than use the fact that the person responsible for the creation of this program is capable of such stupidity so as to discredit ssh, we politely forgive them for flaunting "I am a security expert" as if that makes their stupidity _more forgiveable_.

Enough ranting though.

We're here to set up KeePassXC on a clean Arch installation as an SSH agent.

## TODO: Install KeepassXC

## TODO: Creating SSH keys


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
A Restart is what I'd recommend for that purpose, on ArchLinux it might have other benefits, particularly if you've ran `pacman -Syu` before.
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

## Setting up KeepassXC

::: tip
We are largely going to closely follow the [upstream documentation](https://github.com/keepassxreboot/keepassxc/blob/develop/docs/topics/SSHAgent.adoc): if the two documents differ, I'd recommend you more closely follow the upstream document rather than the steps outlined here.
:::
