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

> It will update words and apply images if they don't exist

```bash
pnpm run sync
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

Repeat first 2000 words

```bash
http://localhost:3000/offsetlimit/0/2000
```

#### Parse resources

> In all cases it will create a new file `./content/FOUND.json`

Parse youtube video

```bash
pnpm run parse-youtube <id>
```

Parse txt file

```bash
pnpm parse-text <path>
```

Parse pdf

```bash
pnpm parse-pdf <path>
```
