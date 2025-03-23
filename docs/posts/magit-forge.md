---
category:
  - Emacs
  - Work
  - Tooling
date:
  - 2024-01-16
---
# How to set up Magit forge

Magit is an excellent package with incredible depth.

Sadly it is accompanied by the most unreadable documentation which is saying something, given that it's an Emacs package.

Here I will detail an example configuration to set up a GitHub to magit interface.

# GitHub
This is the default, and probably most relevant.
## Preliminary GitHub-specific configuration

Magit, as is common, requires you to generate a token.

While a Firefox plugin will probably have a link and an explanation, to understand what to do in `magit` requires one to dig through an inordinate amount of API documentation.

```sh
git config --global github.user <you-user-name>
```

in my case it's:

```sh
appetrosyan
```

Next, head to [GitHub](https://github.com/settings/tokens/new) and generate a new token:

Then you should perhaps consider making it visible to Emacs.

The `magit` documentation offers the worst possible way to store the information; via `~/.authinfo` as a plain text file.
It's unencrypted, it pollutes your home folder, but also, if you have a syntax error anywhere, you're fucked.

A much better option and one that _almost every other_ program uses, is to use the secrets service.
More on that [here](https://www.gnu.org/software/emacs/manual/html_mono/auth.html#Secret-Service-API).

Now if you're not used to Emacs' documentation style, where instead of saying "you put X into Y", there's a section Y, that never mentioned X, and the X is implicit from the module path, unless the macro is quoted... Yes I hate it too.

What this tells you is that you should integrate the stuff with KeePassXC, as can be seen from the previous article.

It's not at all hard to do, graphically speaking, but the amount of manual fuckery that needs to be done is truly confounding.
What's even worse, is that you as the designer of `forge` **know** exactly what needs to be done, and yet you choose to be obtuse.

::: info TODO
Create a PR and add a neater way to do these things.
:::

So without further ado, you must first create a new entry, and that's easy: set the `TITLE` to `github_api_token`.
We will use it later in the Emacs configuration.

Next you want to set the `password` to the token.

Next, you probably want to go into `Advanced` and write the following mappings.
Set `machine` to `api.github.com`.
Next set `login` to `<your-user-name>^forge`. I set it to `appetrosyan^forge`.

At this point, you can verify that everything is correct, by going to `secrets-show-secrets` in your Emacs, and it should work.

## Setting up Magit Forge

::: tip
A large part of what follows is an example of how an engineer approaches a configuration problem, and not strictly necessary for doing the configuration.
:::

I'll assume that you have installed `magit` via `use-package`.
If you didn't, you're probably still fine, but I'd recommend that you use it.

Firstly, add
```elisp
(use-package forge
  :after magit
  :ensure t)
```
and eval using `C-x C-e`. This will install the package, and allow you to do what you need to do.

Next, we're going to disentangle the "how-to-add-the-token" part.

You probably need to set the `auth-sources` variable.
The reason, is that the defaults are completely unsuitable and insecure.
Instead we shall use `secrets:github_api_token`.
```elisp
(use-package forge
  :after magit
  :config
  (setq auth-sources '("secrets:github_api_token"))
  :ensure t)
```

Now we can verify by evaluating.

## Initial pull

At this point the thing should have been configured.
So, just do the initial pull, as outlined in the docs: open magit `C-x g`, and then do `f n`.
In principle, things should work.

## The importance of good error messages

The problem here is threefold, trying to do an initial pull results in the following error message.
```console
ghub--token: Required Github token ("appetrosyan^forge" for "api.github.com") does not exist.
See https://magit.vc/manual/ghub/Getting-Started.html
or (info "(ghub)Getting Started") for instructions.
(The setup wizard no longer exists.)
```

Problem 1: You never explained why the wizard no longer exists.
You alluded to an explanation existing and assumed it'd be enough (and for most people it is).

Problem 2: You provide the most generic fucking error message possible.
If I want to do this semi-portably and in some ways with some semblance of security, I need to know how to point your dumb fucking function at the right structure to get the information.
This is a problem with the Emacs API, because ideally the way to configure this shouldn't be to set a variable to a vague file that contains the authentication info, it should provide you with an easy way to retrieve information from the secret service, and a way to map that information.
The reason mapping should be done manually by the user, is because you already assume that the user is capable of doing the mapping when creating the `.authinfo` file.
In general it's a good idea to either give user a step-by-step guide on how to set stuff up properly, or you should document every possible approach and allow users to debug the system with intermediate approaches.


Problem 3: The mappings don't agree on concepts.
There's `machine` and there's `URL`.
There's a `login` field and then there's `User Name`.
As for the error message, here's some positives:
- It gives me a precise name for the function, meaning that I can just look through the code and figure out where you were looking.
- It tells me (or rather confirms to me) that a piece of data called the `login` should look like `appetrosyan^forge`.
- It tells me that the `url` or some such must be set to `api.github.com`.
- It points me to two source of documentation: one online, and one offline.
- It also tells me that there _was_ a setup wizard that made my life a lot easier, it just vanished.

This is surprisingly good, not only for an Emacs package, but for software in general.
I would argue that this opens an opportunity to improve the documentation.

Now to figure out how to fix the problem, I call help.
But not just any help, but `helpful`.
The reason why this package is bloody useful, has to do with the fact that it not only shows you the often completely incorrect docstring, or what the function is intended to do, but also what it actually does; and in this case, it's
```elisp
(defun ghub--token (host username package &optional nocreate forge)
  (let* ((user (ghub--ident username package))
		 (token
		  (or (car (ghub--auth-source-get (list :secret)
					 :host host :user user))
			  (progn
				;; Auth-Source caches the information that there is no
				;; value, but in our case that is a situation that needs
				;; fixing so we want to keep trying by invalidating that
				;; information.
				;; The (:max 1) is needed and has to be placed at the
				;; end for Emacs releases before 26.1.  #24 #64 #72
				(auth-source-forget (list :host host :user user :max 1))
				(and (not nocreate)
					 (error "\
Required %s token (\"%s\" for \"%s\") does not exist.
See https://magit.vc/manual/ghub/Getting-Started.html
or (info \"(ghub)Getting Started\") for instructions.
\(The setup wizard no longer exists.)"
							(capitalize (symbol-name (or forge 'github)))
							user host))))))
	(if (functionp token) (funcall token) token)))
```

Splendid, now I know that there's a function where the token behaviour is hard-coded, called `ghub--auth-source-get`.
Moreso, given the error message I can map the values: `host` is `api.github.com`, `user` is `appetrosyan^forge` and Github is considered the default.
This is extremely valuable information, that is possible to retrieve thanks to the good error message.

Now the next step is to figure out what `ghub--auth-source-get` is doing.
```elisp
(defun ghub--auth-source-get (keys &rest spec)
  (declare (indent 1))
  (let ((plist (car (apply #'auth-source-search
						   (append spec (list :max 1))))))
	(mapcar (lambda (k)
			  (plist-get plist k))
			keys)))
```
A bit less informative, but now it forwards to `auth-source-search`, which is a library function.
It's source code is much too complicated, so I won't quote it here.
I will however say that it should create what we need.
So, what do we do?

We adjust the information so that it matches what it expects.
It has the word `:host` and that makes sense.
It has the word `:user` and that makes sense too.
I'd also add the word `token` to the list.

So let's try again!

No. Same error message.

Now the trouble isn't that Jonas has provided a bad error message, given the architecture he's done the best he could.
The trouble is that the layers of abstraction make debugging these sorts of things harder than they need to be.


Perhaps there's a mistake in how `auth-sources` is customized.
Indeed the manual states so;
> It's best to customize this with M-x customize-variable because the choices can get pretty complex.

Let's do that!
Aand here's our problem!
Customizing it to use the default secrets API is the correct approach.
Now to make the customization persistent, we should also consider setting it via `setq` or better, via the `:custom` keyword.


## Doing the right thing finally

It turns out that setting the `auth-sources` variable to `default` is all we need to do.
This gives us the final form:
```elisp
(use-package forge
  :after magit
  :custom
  (auth-sources '(default) "We use the secret service API")
  :ensure t)
```

Now we can verify that forge works!
We can also verify that forge works only on GitHub.

# GitLab
