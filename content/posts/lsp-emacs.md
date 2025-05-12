+++
date= 2024-07-28
title = "How to set up LSP in Emacs"
+++
This is a semi-rant, but I believe a worthwhile use of my time.  There
are two compliant implementations of the language server protocol,
which do not have a bipartisan objective review attached to them.

Some would argue that `eglot` is superior by virtue of being in the
Emacs core, some would instead argue that `lsp-mode` is more feature
complete and far more lenient towards language servers with
non-standard extensions.  Those are true, but they only affect the
first-hand experience, something that only a total script kiddie will
complain about.

As an intermediate Emacsian, I believe my insight to be of use both to
script kiddies that will eventually transition to masters, as well as
masters that do not believe in such nonsense as LSP.

Without further ado.

## LSP-mode

This is the most presentable of the bunch.  It comes with a
[well-groomed website](https://emacs-lsp.github.io/lsp-mode/), a
detailed set of instructions, and frankly some of the broadest
supports for language-server-specific features.  It also comes with
the companion mode for `dap-mode`, which, as the name suggests is
going to be major source of pain, but will eventually allow one to use
some debuggers in some languages.


My setup if I were using `lsp-mode` would look like this
```emacs-lisp
(use-package lsp-mode
  :ensure t
  :bind
  (:map lsp-mode-map
		("C-." . xref-find-definitions)
		("C-c C-r" . lsp-rename)
		("C-<return>" . lsp-execute-code-action)
		("C-c m" . lsp-rust-analyzer-open-cargo-toml))
  :custom
  (lsp-inlay-hint-enable t)
  (lsp-rust-analyzer-closure-return-type-hints "with_block")
  (lsp-rust-analyzer-display-chaining-hints t)
  (lsp-rust-analyzer-display-closure-return-type-hints t)
  (lsp-completion-enable nil)
  (lsp-rust-analyzer-cargo-watch-command "clippy")
  (lsp-rust-analyzer-display-reborrow-hints "mutable")
  :hook
  (lsp-mode . lsp-inlay-hints-mode)
  (lsp-mode . yas-minor-mode))
```

Now, most guides will assume that you know what this means, but as
Emacs doesn't have much beginner friendly documentation, but instead
assumes that you will discover lisp forms on your own, it bears
explaining some of this at least once.

### Detour, `use-package`



`
