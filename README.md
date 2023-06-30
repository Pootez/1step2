# 1step2
*Set one goal and continuously split it into smaller steps*

*30.06.2023* in the AM

https://www.youtube.com/shorts/cHcx1IgoDjI

## Idea

Start with one block: *Set a goal*
Split that block into two: *Set two goals to accomplish first*
(Ability to split task into more steps)

First block displays over the bottom two, blocks being distributed equally.

When you have a step by step plan, you start on the first step.

When a step is finished, it changes color to display progress.
- Cell turns completely green, and only when all child steps have been done, the parent also turns
- *Cell turns completely green, parent turns partially green relative to amount of children completed, meaning main goal turns green over time.*
- The entire column turns green, main goal becomes a progress bar.

Displaying the goals:
- "Timeline sliders" to zoom and scale entire plan
- *Selecting a goal, it get's focused as "main goal". Ability to go back up to parent goal.*

Homepage could just be one *group block* "1step2", splitting that and selecting a child, would essentially simulate creating a new goal/group.

*A group block* would have a number of blocks as children with a scroll bar at the bottom, showing up as only one block, displaying the name and progress squares under it. It would have a different color (blue) to distinguish it.

*Group block* -> *groups* and *goals* as children
*Goal* block -> *goal* blocks as children

Blocks will have descriptions when selected

When hovering over a goal that isn't selected, circular buttons for adding children will appear left and right for siblings, one to split the goal for 2 children on the bottom, and a bar to grab and move on top. The bottom might be a bar for moving all it's children or something if it already has children?

When a goal is selected: a "vector/scroll wheel" will be available to select amount of visible vertical blocks from 1 to leaf block level. (if there is space)

If 1 is selected, 1 level will be displayed taking 1/2 of the space
If 2 -> 2 levels will be displayed taking 2/3 of the space
The rest will be a visual representation of the remaining children
Groups will always have 1 selected, and their children will be displayed in the same way

A bottom vector should be implemented to be able to display the bottom goals, being able to see "the quest line", aka the leaf steps.
If the leaf blocks are showed, they will take up 1/(top levels + 1). The 1 level being reserved for a visual representation of the rest of the blocks
Bottom should have a "timeline bar" to be able to actually see the goal text

Customizable color scheme:
- Pick up to 7 lerp colors for blocks, change guide animations accordinly
- Themes represented by the logo
	- 1step2
	- 1blue2
	- 1pink2
- Background color customization

### Menu layout
#### Consistent layout
Left sidebar:
- Holds profile, settings and such on top
- Shows current selected block, highlighted and a list above showing all parent blocks up to home.

#### Main menu group
- Header group block: "1step2" (Half of vertical)
- Body of group block: List of goals and groups (half of vertical)
	- Groups displayed as a blue block on top, and a visualization of children on bottom
	- Goals showing as progress color block on top, and visualization of children on bottom

#### When selecting a group
Same as main menu with its corresponding children
A goal block is represented with a named header block and it's children's progress colors

#### When selecting a goal
Header block becomes selected block
Children are displayed underneath

### Logo ideas
![[Pasted image 20230630052233.png|300]]