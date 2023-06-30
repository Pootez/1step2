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
            return this
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
    * @returns {Array|undefined} The array of children corresponding to the child indexes, or undefined if one or more of the indexes are invalid
    */
    getBranch(arr) {
        if (arr.length <= 0) {
            return undefined
        }
        const index = arr.shift()
        if (index >= this.children.length) {
            return undefined
        }
        if (arr.length == 1) {
            return [this.children[index]]
        }
        let branch = this.children[index].getBranch(arr)
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
            :  !index && this.children.push(new Goal())
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
    }

    /**
     * If Block has less than 2 children, create two children.
     */
    split() {
        if (this.children.length < 2) this.children = [new Goal(), new Goal()]
    }
}