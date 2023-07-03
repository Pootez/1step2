const blocks = new Map()
const blockCounts = new Map([
    ['group-count', 0],
    ['goal-count', 1]
])
let selection = {
    block: 'group-0'
}

/**
 * Represents a Block.
 */
class Block {
    /**
     * @param {string} [parent] - The parent of the block.
     */
    constructor(parent = "main-content") {
        this.parent = parent
        this.title = "test"
        this.description = ""
        this.children = []
    }

    /**
     * Returns the child at the specified index.
     * @param {number} index - The index of the child.
     * @return {Block|undefined} The child at the specified index, or undefined if the index is invalid.
     */
    getChild(index) {
        if (index >= this.children.length) {
            return undefined
        } else {
            return blocks.get(this.children[index])
        }
    }

    /**
     * Returns the children of the Block.
     * @return {Array} The children, or undefined if the index is invalid.
     */
    getChildren() {
        return this.children.map(id => { blocks.get(id) })
    }

    /**
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGoal(index) {
        const goal = new Goal(this.id)
        blocks.set(goal.id, goal)
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, goal.id)
            : !index && this.children.push(goal.id)
        updateBlocks()
    }

    /**
     * Remove child at index.
     * @param {number|string} index The index or id of the child Block to be removed recursively.
     */
    removeChild(index) {
        if (typeof index == 'number' && index >= 0 && index < this.children.length) {
            const block = blocks.get(this.children[index])
            block.removeChildren()
            blocks.remove(this.children[index])
            this.children.splice(index, 1)
        }
        else {
            const block = blocks.get(index)
            block.removeChildren()
            blocks.remove(index)
            this.children.splice((this.children.indexOf(index)), 1)
        }
    }

    /**
     * Sets the children to an empty array
     */
    removeChildren() {
        if (this.children.length > 0) {
            for (let i = 0; i < this.children.length; i++) {
                this.removeChild(0)
            }
            updateBlocks()
        }
    }

    /**
     * Finds the number of leaf blocks of the blocks family tree.
     * @returns The number of leaf blocks of its family tree.
     */
    get numberOfLeafBlocks() {
        if (this.children.length == 0) return 1
        let leafBlocks = 0
        for (let i = 0; i < this.children.length; i++) {
            leafBlocks += blocks.get(this.children[i]).numberOfLeafBlocks
        }
        return leafBlocks
    }
}

/**
 * Represents a Group Block
 */
class Group extends Block {
    /**
     * @param {string} [parent] - The parent of the block.
     */
    constructor(parent) {
        super(parent)

        const idNum = blockCounts.get('group-count')
        this.id = 'group-' + idNum
        blockCounts.set('group-count', idNum + 1)

        this.createElements()
    }

    createElements() {
        let grid = document.createElement('div')
        grid.id = this.id + '-grid'
        grid.className = 'group-grid'

        let container = document.createElement('div')
        container.id = this.id + '-container'
        container.className = 'group-container'

        let block = document.createElement('button')
        block.id = this.id
        block.className = 'block'

        container.appendChild(block)
        grid.appendChild(container)
        document.getElementById(this.parent + '-grid').appendChild(grid)

        block.addEventListener('click', () => {
            selectBlock(this.id)
        })
    }

    updateElements(slct) {
        let grid = document.getElementById(this.id + '-grid')
        let slctHistoryIndex = slct.history.indexOf(this.id)
        if ((slct.block != 'group-0' && this.id == 'group-0') || slctHistoryIndex >= 0) {
            let slctIndex
            if (slctHistoryIndex >= 0) {
                slctIndex = slctIndex > 0
                    ? this.children.indexOf(slct.history[slctHistoryIndex - 1])
                    : this.children.indexOf(slct.block)
            }
            else { slctIndex = this.children.indexOf(slct.block) != -1 ? this.children.indexOf(slct.block) : this.children.indexOf(slct.history[slct.history.length - 1]) }
            let left = slctIndex <= 0 ? '' : `repeat(${slctIndex}, 0) `
            let right = slctIndex >= this.children.length - 1 ? '' : ` repeat(${this.children.length - slctIndex - 1}, 0)`
            grid.style.gridTemplateColumns = left + '1fr' + right
            grid.style.gridTemplateRows = '0 1fr'
        }
        else {
            if (this.children.length > 0) { grid.style.gridTemplate = `1fr 1fr / repeat(${this.children.length}, 1fr)` }
            else { grid.style.gridTemplate = '1fr / 1fr' }
        }


        this.children.forEach(id => { blocks.get(id).updateElements(slct) })
    }

    /**
     * Add group as child.
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGroup(index) {
        const group = new Group(this.id)
        blocks.set(group.id, group)
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, group.id)
            : !index && this.children.push(group.id)
        updateBlocks()
    }
}

/**
 * Represents a Home Group Block
 */
class HomeGroup extends Group {
    /**
     * @param {string} [parent] - The parent of the block.
     */
    constructor(parent) {
        super(parent)
    }

}

/**
 * Represents a Goal Block
 */
class Goal extends Block {
    /**
     * @param {string} [parent] - The parent of the block.
     */
    constructor(parent) {
        super(parent)

        const idNum = blockCounts.get('goal-count')
        this.id = 'goal-' + idNum
        blockCounts.set('goal-count', idNum + 1)
        this.completed = false

        this.createElements()
    }

    createElements() {
        let container = document.createElement('div')
        container.id = this.id + '-container'
        container.className = 'goal-container'
        container.style.gridArea = this.id

        let block = document.createElement('button')
        block.id = this.id
        block.className = 'block'

        let grid
        if (this.parent.startsWith('group')) {
            grid = document.createElement('div')
            grid.id = this.id + '-grid'
            grid.className = 'goal-grid'
            document.getElementById(this.parent + '-grid').appendChild(grid)
        } else {
            let parent = blocks.get(this.parent)
            while (parent.parent.startsWith('goal')) {
                parent = blocks.get(parent.parent)
            }
            grid = document.getElementById(parent.id + '-grid')
        }

        container.appendChild(block)
        grid.appendChild(container)

        block.addEventListener('click', () => {
            selectBlock(this.id)
        })
    }

    updateElements(slct) {
        let grid
        if (this.parent.startsWith('group')) {
            grid = document.getElementById(this.id + '-grid')

            let depthNum = 0
            let getDepth = (block, n) => {
                if (depthNum < n + 1) { depthNum = n + 1 }
                block.children.forEach(obj => { getDepth(blocks.get(obj), n + 1) })
            }
            getDepth(this, 0)
            const depth = depthNum

            let gridAreas = []
            let populateAreas = (id, n) => {
                let block = blocks.get(id)
                if (gridAreas[n] == undefined) { gridAreas[n] = "" }
                let area = ' ' + block.id
                let number = block.numberOfLeafBlocks
                gridAreas[n] += area.repeat(number)
                if (block.children.length > 0) {
                    block.children.forEach(obj => { populateAreas(obj, n + 1) })
                }
                else {
                    for (let i = n + 1; i < depth; i++) {
                        if (gridAreas[i] == undefined) { gridAreas[i] = "" }
                        gridAreas[i] += area
                    }
                }
            }
            populateAreas(this.id, 0)


            grid.style.gridTemplateColumns = `repeat(${this.numberOfLeafBlocks}, 1fr)`

            let maxDepth = depth > 5 ? 5 : depth
            let subDepdthBlocks = depth == maxDepth ? '' : ` repeat(${depth - maxDepth}, 0)`
            if (maxDepth == 1) { grid.style.gridTemplateRows = '1fr' }
            else { grid.style.gridTemplateRows = `${maxDepth - 1}fr repeat(${maxDepth - 1}, 1fr)` + subDepdthBlocks }

            if (slct.goal == this.id && slct.block != this.id) {
                let index = slct.history.indexOf(this.id)
                depthNum = 0
                getDepth(blocks.get(slct.block), 0)
                let left = slct.leftLeaves == 0 ? '' : `repeat(${slct.leftLeaves}, 0)`
                let right = slct.rightLeaves == 0 ? '' : `repeat(${slct.rightLeaves}, 0)`
                let columns = left + `repeat(${blocks.get(slct.block).numberOfLeafBlocks}, 1fr)` + right
                grid.style.gridTemplateColumns = columns
                if (depthNum == 1) { grid.style.gridTemplateRows = `repeat(${index + 1}, 0) 1fr` }
                else {
                    let childrenBlocks = depthNum == 1 ? '' : ` repeat(${depthNum - 1}, 1fr)`
                    grid.style.gridTemplateRows = `repeat(${index + 1}, 0) ${depthNum - 1}fr` + childrenBlocks
                }
            }

            gridAreas = gridAreas.map((str) => { return '"' + str.trimStart() + '"' }).join('\n')
            grid.style.gridTemplateAreas = gridAreas
        }
        else {
            let parent = blocks.get(this.parent)
            while (parent.parent.startsWith('goal')) {
                parent = blocks.get(parent.parent)
            }
            grid = document.getElementById(parent.id + '-grid')
        }

        const completion = this.completion
        let r = completion < 0.5 ? 255 : (1 - (completion - 0.5) / 0.5) * 255
        let g = completion < 0.5 ? (1 - completion / 0.5) * 99 + (completion / 0.5) * 215 : ((completion - 0.5) / 0.5) * 215 + (1 - (completion - 0.5) / 0.5) * 255
        let b = completion < 0.5 ? (1 - completion / 0.5) * 71 + (completion / 0.5) * 0 : 0
        document.getElementById(this.id).style.backgroundColor = `rgb(${r}, ${g}, ${b})`

        this.children.forEach(id => { blocks.get(id).updateElements() })
    }

    get completion() {
        if (this.children.length == 0) {
            let completion = this.completed ? 1 : 0
            return completion
        }
        let n = 0
        for (let i = 0; i < this.children.length; i++) {
            n += blocks.get(this.children[i]).completion
        }
        return (n / this.children.length)
    }

    setCompleted(bool) {
        if (typeof bool == 'boolean') this.completed = bool
        updateBlocks()
    }

    /**
     * If Block has less than 2 children, create two children.
     */
    split() {
        if (this.children.length < 2) {
            this.addGoal()
            this.addGoal()
            updateBlocks()
        }
    }

    /**
     * Creates a tree of a certain depth under this block.
     * @param {number} depth The depth of children under this block.
     * @param {number|undefined} width The count of children each goal will have. Default is 2, must be above 0.
     */
    createTree(depth, width = 2) {
        if (width > 0 && depth > 0) {
            this.removeChildren()
            for (let i = 0; i < width; i++) {
                this.addGoal()
                blocks.get(this.children[i]).createTree(depth - 1, width)
            }
        }
    }
}

blocks.set('group-0', new HomeGroup('main-content'))

function selectBlock(blockId) {
    selection.block = blockId
    updateBlocks()
}

function updateBlocks() {
    if (selection.block == 'group-0') {
        selection.history = []
        selection.goal = undefined
    }
    else {
        selection.leftLeaves = 0
        selection.rightLeaves = 0
        selection.depth = 0
        selection.history = []
        let block = blocks.get(selection.block)
        while (block.parent != 'group-0') {
            let id = block.id
            block = blocks.get(block.parent)
            let slctIndex = block.children.indexOf(id)
            if (block.id.startsWith('goal')) {
                for (let i = 0; i < slctIndex; i++) {
                    selection.leftLeaves += blocks.get(block.children[i]).numberOfLeafBlocks
                }
                for (let i = slctIndex + 1; i < block.children.length; i++) {
                    selection.rightLeaves += blocks.get(block.children[i]).numberOfLeafBlocks
                }
            }
            selection.depth += 1
            selection.history.push(block.id)
        }
        selection.goal = block.id
    }

    blocks.get('group-0').updateElements(selection)

    const historyDiv = document.getElementById('history')

    let hist
    selection.history.reverse()
    if (selection.block != undefined) {
        hist = selection.history.concat([selection.block])
    }

    if (hist.length == 0 || hist[hist.length - 1] == 'group-0') {
        Array.from(historyDiv.children).forEach((obj) => {
            obj.classList.add('collapsed')
            obj.classList.remove('selected')
        })
        document.getElementById('history-home').classList.add('selected')
    }
    else {
        document.getElementById('history-home').classList.remove('selected')
        for (let i = 0; i < hist.length; i++) {
            let block = blocks.get(hist[i])
            const blockId = block.id

            const completion = block.completion
            let color
            if (completion != undefined) {
                let r = completion < 0.5 ? 255 : (1 - (completion - 0.5) / 0.5) * 255
                let g = completion < 0.5 ? (1 - completion / 0.5) * 99 + (completion / 0.5) * 215 : ((completion - 0.5) / 0.5) * 215 + (1 - (completion - 0.5) / 0.5) * 255
                let b = completion < 0.5 ? (1 - completion / 0.5) * 71 + (completion / 0.5) * 0 : 0
                color = `rgb(${r}, ${g}, ${b})`
            }
            else { color = 'dodgerblue' }

            if (historyDiv.children[i] == undefined) {
                let button = document.createElement('button')
                button.className = 'side-bar-item history-item'
                if (i == hist.length - 1) { button.classList.add('selected') }
                button.onclick = () => { selectBlock(blockId) }
                let div = document.createElement('div')
                div.className = 'side-bar-icon history-icon'
                div.style.backgroundColor = color
                button.append(div)
                let span = document.createElement('span')
                span.className = 'side-bar-text'
                span.innerHTML = block.id
                button.append(span)
                historyDiv.append(button)
            }
            else {
                let button = historyDiv.children[i]
                button.className = 'side-bar-item history-item'
                if (i == hist.length - 1) { button.classList.add('selected') }
                else { button.classList.remove('selected') }
                button.onclick = () => { selectBlock(blockId) }
                button.classList.remove('collapsed')
                button.children[0].style.backgroundColor = color
                button.children[1].innerHTML = block.id
            }
        }
        for (let i = hist.length; i < historyDiv.children.length; i++) {
            historyDiv.children[i].classList.add('collapsed')
            historyDiv.children[i].classList.remove('selected')
        }
    }
}