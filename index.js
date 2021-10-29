import {fromMarkdown} from "mdast-util-from-markdown"
import {visit} from "unist-util-visit"
import {toString} from "mdast-util-to-string"
import {toMarkdown} from "mdast-util-to-markdown"

let pattern = /(\d+\.\d+\.\d+)(-[^ ]+)? \(\d{4}-\d{2}-\d{2}\)/

export default function ({markdown, version}) {
	let content = ""
	let tree = fromMarkdown(markdown)
	function visitor() {
		let hungry = true
		let eating = false
		return function (node) {
			if (eating) {
				if (node.type == "heading") {
					if (toString(node).match(pattern)) {
						eating = false
						return
					}
				}
				content += toMarkdown(node)
				return "skip"
			} else {
				if (node.type == "heading") {
					let string = toString(node)
					let match = string.match(pattern)
					if (hungry && match && match[1] == version) {
						hungry = false
						eating = true
						return "skip"
					}
				}
			}
		}
	}
	visit(tree, visitor())
	return content
}
