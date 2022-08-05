# get changelog section



get a section from a `release-please` generated changelog



lib: 

```js
import snipe from "get-changelog-section"

let markdown = `
# 2.1.2 (2041-23-44)
## blah blah
ergearg
ethaeth
### 2.1.4 (2222-22-04)
## something wikid
- something **strange**
#### 5.5.5-alpha.5.5.5-1 (1234-01-33)
honk
honk honk honk ˚˚÷÷ƒƒƒßß∂ßå∑œøøøø
`

let section = snipe({markdown, version: 2.1.4})

console.log(section) // "## something wikid\n- something **stranger**"
```



filter:

```js
import get_changelog_section from "get-changelog-section"

let version = process.argv[2]
let reader = process.argv[3] == null || process.argv[3] == "-" 
	? process.stdin
	: (await import("fs")).createReadStream(process.argv[3])
let markdown = ""
for await (let chunk of reader) {
  markdown += chunk
}

process.stdout.write(get_changelog_section({markdown, version}))
```

