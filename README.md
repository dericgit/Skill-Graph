# Skill Graph

## Introduction
The skill graph contains two components: tree and timeline.

This suite can visualize your gained (gaining) skills in an impressive way, compared to the archaic and boring list. You may find it useful in your personal site.

What's more, the SVG visualization of timeline is not attractive, and it can be enhanced in many ways as well. So I'd appreciate it if you can upgrade it.

## Usage
To start using now, you need to modify `skillInfo.json` into your preferred condition (Maybe you know how to cook Chinese food, but I don't). After that, you can directly run processing script for tree view and timeline view.

```
node tree/tree.js
node timeline/timeline.js
```

If everything goes well, you will get generated rendered JSON data for tree, and SVG data for timeline. The HTML template is also in repos, so you can use them or embed into your own page.

**Attention**: The script in `treeInfo.html` need to request for JSON file, but it will be blocked by browser in File System environment. So you may need to setup it in a server in order to use it.
## Raw Data Format
1. Item Meta Info
   * `name`
   * `timeStamp`
   * `exPoints`
   * `fathers`
2. Category Info
   * `name`
   * `categories` (Sub-categories, recursive structure)

Example : `skillInfo.json`

## Categories
The information of categories are separately organized in `skillInfo.json`, in a hierarchical order.

However, `fathers` of one item may be many categories in different depth, or even with cross-reference. It doesn't matter since **the item can appear repeatedly**.

## Item's Meta Info
### TimeStamp
1. Start Time
2. Complete Time ('-1' when it is not completed yet)

### exPoints
The experience points you gained from attaining corresponding skill, which will effect the block size in timeline view.

### fathers
To what categories it belongs

## File Structure
1. Data Structure Library
	* `treeLib.js`
2. Data Processor
	* `timeline.js`
	* `tree.js`
   * `j2x.js`
3. Data Rendering
	* `renderTL.js`
	* `renderTree.js`
4. Static file
   * `timeline.html`, `timeline.svg`, `timeline.css`
   * `tree.html`, `treeInfo.json`, `treeInfo.html`

## Acknowledgement
* Tree's visualization, [Tilford Tree](http://bl.ocks.org/mbostock/4063550), based on [D3js](http://d3js.org/)
* Tree's markdown to HTML parsing, thanks to [Markdown-js](https://github.com/evilstreak/markdown-js)
