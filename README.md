A simple project for fast repeating the Lingualeo words.
Their default application is not comfortable and fast.

The first left button in UI shuffles the words.

#### How to get words

Create '.env' file with next content

```bash
ACCOUNT_EMAIL=<leo email>
ACCOUNT_PASSWORD=<leo password>
```

Then download words

> It will update the file in `./auto-generated/words.json`

```bash
pnpm run generate-words
```

#### How to repeat words

Start

```bash
pnpm run dev
```

Navigate

```bash
http://localhost:3000
```

In order to repeat last 20 words for example

```bash
http://localhost:3000/last/20
```
