const blocks = new Map([
    ['group-count', 0],
    ['goal-count', 0]
])

/**
 * Represents a Block.
 */
class Block {
    /**
     * @param {string} [parent] - The parent of the block.
     */
    constructor(parent = "block-home") {
        this.parent = parent
        this.title = ""
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

    // /**
    //  * Returns the entire family tree of the Block to a depth.
    //  * @param {number|undefined} num The depth of the family tree, 0 returning just this block, negative numbers/undefined returning the entire tree.
    //  * @returns {Array} The array of the tree to the leaf node, or given depth. [block, [block, leafBlock], leafBlock]
    //  */
    // getTree(num = -1) {
    //     if (this.children.length == 0 || num == 0) {
    //         return [this]
    //     }
    //     let arr = [this]
    //     for (let i = 0; i < this.children.length; i++) {
    //         arr.push(this.children[i].getTree(num - 1))
    //     }
    //     return arr
    // }

    // /**
    // * Returns a branch of a family tree, given a list of child indexes.
    // * @param {Array} arr The array of child indexes defining the family branch.
    // * @param {number} depth The the current index in the depth search, starts at 0.
    // * @returns {Array|undefined} The array of children corresponding to the child indexes (starting at this block), or undefined if one or more of the indexes are invalid
    // */
    // getBranch(arr, depth) {
    //     if (arr.length <= 0 || depth >= arr.length) {
    //         return [this]
    //     }
    //     const index = arr[depth]
    //     if (index >= this.children.length || index < 0) {
    //         return undefined
    //     }
    //     if (arr.length == 0) {
    //         return [this.children[index]]
    //     }
    //     let branch = this.children[index].getBranch(arr, depth + 1)
    //     if (!branch) return undefined
    //     branch.unshift(this.children[index])
    //     return branch
    // }

    /**
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGoal(index) {
        const goal = newGoal(this.id)
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, goal.id)
            : !index && this.children.push(goal.id)
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
            this.children.splice(index)
        }
    }

    /**
     * Sets the children to an empty array
     */
    removeChildren() {
        for (let i = 0; i < this.children.length; i++) {
            this.removeChild(0)
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
            leafBlocks += blocks.get(this.children[i]).numberOfLeafBlocks()
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
        const idNum = blocks.get('group-count')
        this.id = 'group-' + idNum
        blocks.set('group-count', idNum + 1)
    }

    /**
     * Add group as child.
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGroup(index) {
        const group = new Group(this.id)
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, group)
            : !index && this.children.push(group)
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
        const idNum = blocks.get('goal-count')
        this.id = 'goal-' + idNum
        blocks.set('goal-count', idNum + 1)
        this.completed = false
    }

    get completion() {
        if (this.children.length == 0) {
            return this.completed ? 1 : 0
        }
        let n = 0
        for (let i = 0; i < this.children.length; i++) {
            n += blocks.get(this.children[i]).completion
        }
        return (n / this.children.length)
    }

    /**
     * If Block has less than 2 children, create two children.
     */
    split() {
        if (this.children.length < 2) {
            this.addGoal()
            this.addGoal()
        }
    }

    /**
     * Creates a tree of a certain depth under this block.
     * @param {number} depth The depth of children under this block.
     * @param {number|undefined} width The count of children each goal will have. Default is 2, must be above 0.
     */
    goalTree(depth, width = 2) {
        if (width > 0 && depth > 0) {
            this.removeChildren()
            for (let i = 0; i < width; i++) {
                this.addGoal()
            }
        }
    }
}

blocks.set('block-home', new HomeGroup())