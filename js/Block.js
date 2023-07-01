/**
 * Represents a Block.
 */
class Block {
    /**
     * @param {string} [title=""] - The title of the block.
     * @param {string} [description=""] - The description of the block.
     */
    constructor(title = "", description = "") {
        this.title = title
        this.description = description
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
            return this.children[index]
        }
    }

    /**
     * Returns the children of the Block.
     * @return {Array} The children, or undefined if the index is invalid.
     */
    getChildren() {
        return this.children
    }

    /**
     * Returns the entire family tree of the Block to a depth.
     * @param {number|undefined} num The depth of the family tree, 0 returning just this block, negative numbers/undefined returning the entire tree.
     * @returns {Array} The array of the tree to the leaf node, or given depth. [block, [block, leafBlock], leafBlock]
     */
    getTree(num = -1) {
        if (this.children.length == 0 || num == 0) {
            return [this]
        }
        let arr = [this]
        for (let i = 0; i < this.children.length; i++) {
            arr.push(this.children[i].getTree(num - 1))
        }
        return arr
    }

    /**
    * Returns a branch of a family tree, given a list of child indexes.
    * @param {Array} arr The array of child indexes defining the family branch.
    * @param {number} depth The the current index in the depth search, starts at 0.
    * @returns {Array|undefined} The array of children corresponding to the child indexes (starting at this block), or undefined if one or more of the indexes are invalid
    */
    getBranch(arr, depth) {
        if (arr.length <= 0 || depth >= arr.length) {
            return [this]
        }
        const index = arr[depth]
        if (index >= this.children.length || index < 0) {
            return undefined
        }
        if (arr.length == 0) {
            return [this.children[index]]
        }
        let branch = this.children[index].getBranch(arr, depth + 1)
        if (!branch) return undefined
        branch.unshift(this.children[index])
        return branch
    }

    /**
     * 
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGoal(index) {
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, new Goal())
            : !index && this.children.push(new Goal())
    }

    /**
     * 
     * @param {number} index The index of the child Block to be removed.
     */
    removeChild(index) {
        index >= 0 && index < this.children.length
            && this.children.splice(index, 1)
    }

    /**
     * Sets the children to an empty array
     */
    removeChildren() {
        this.children = []
    }

    /**
     * Finds the number of leaf blocks of the blocks family tree.
     * @returns The number of leaf blocks of its family tree.
     */
    numberOfLeafBlocks() {
        if (this.children.length == 0) return 1
        let leafBlocks = 0
        for (let i = 0; i < this.children.length; i++) {
            leafBlocks += this.children[i].numberOfLeafBlocks()
        }
        return leafBlocks
    }
}

/**
 * Represents a Group Block
 */
class Group extends Block {
    /**
     * @param {string} [title=""] - The title of the block.
     * @param {string} [description=""] - The description of the block.
     */
    constructor(title = "", description = "") {
        super(title, description)
    }

    /**
     * 
     * @param {number} index The index of where the child is to be added. If undefined, it get's added at the end.
     */
    addGroup(index) {
        index && index >= 0 && index <= this.children.length
            ? this.children.splice(index, 0, new Group())
            : !index && this.children.push(new Group())
    }
}

/**
 * Represents a Home Group Block
 */
class HomeGroup extends Group {
    /**
     * @param {string} [title=""] - The title of the block.
     * @param {string} [description=""] - The description of the block.
     */
    constructor(title = "", description = "") {
        super(title, description)
    }
}

/**
 * Represents a Goal Block
 */
class Goal extends Block {
    /**
     * @param {string} [title=""] - The title of the block.
     * @param {string} [description=""] - The description of the block.
     */
    constructor(title = "", description = "") {
        super(title, description)
        this.completed = false
    }

    get completion() {
        if (this.children.length == 0) {
            return this.completed ? 1 : 0
        }
        let n = 0
        for (let i = 0; i < this.children.length; i++) {
            n += this.children[i].completion
        }
        return (n / this.children.length)
    }

    /**
     * If Block has less than 2 children, create two children.
     */
    split() {
        if (this.children.length < 2) this.children = [new Goal(), new Goal()]
    }
}