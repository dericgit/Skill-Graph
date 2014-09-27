# Draft of Skill Tree

## Raw Data Format
1. Item Meta Info
   * Name
   * TimeStamp
   * Experience Points
   * Father Fields
2. Category Info
   * Name
   * Sub-categories

For details, please refer to `skilltree.json'

## Categories or Fields
The main categories will be like:

1. Language Skill
2. Culture and Society
3. Mathematics
4. Nature Science
5. Engineering and Technology
6. Art and Design
7. Physical Skills

While you may change them, add sub-categories.

The `fathers` of item may be many categories, but in fact, when I construct the tree, I can add one item to all of its fathers.

## TimeStamp
1. Start Time
2. Complete Time ('-1' when it is not completed yet)

## Programming
1. Data Structure Library
	* `treeLib.js`
2. Data Processing
	* `timeline.js`
	* `tree.js`
3. Data Visualization
	* `renderTL.js`
	* `renderTree.js`