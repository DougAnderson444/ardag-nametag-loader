# ArDAG NameTag Loader

Takes a name and a tag, resolves the latest ArDag from Arweave and mounts the app to the DOM.

_Name_ can be:

- Arweave wallet address, like `hbaAsPk0AlmLPFLSNqgH0tk-Z20RL1rOxuXMTuOUTDw`
- ARNS Name, like `douganderson444.ar`
- PermaPage subdomain name like: `douganderson444.arweave.dev`
- Decentralzied Identifier like `did:ar:UGnqpxdraMbkmG-4F6jU7xkFhErNgaXLQf39tW7yYck`

_Tag_ is the name of the App Component.

So if I want Doug's `ContactCard`, I simply look up `douganderson.ar/ContactCard` and that loads my contact card.

Since it uses ArDag, it always resolves to the latest version, but historical versions are always available in case you like to go retro.

There's also another component that can show everything Graph under this namespace.
