
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('side-bar').classList.toggle('expanded')
})

const home = new HomeGroup('Home', 'This for sure is Home.')
const selection = []

home.addGroup()
home.addGroup()
home.addGroup()
home.addGroup()
home.addGoal()
home.children[0].addGoal()
home.children[0].children[0].split()
home.children[0].children[0].addGoal()
home.children[1].addGoal()
home.children[3].addGoal()
home.children[4].split()
home.children[1].addGoal()
home.children[1].children[0].split()
home.children[2].addGoal()
home.children[2].children[0].split()
home.children[3].addGoal()
home.children[3].children[0].split()
home.children[1].children[0].children[0].split()
home.children[1].children[0].children[0].children[1].completed = true
home.children[1].children[0].children[1].completed = true

let selectionGrid = createGrid(selection)
populateGrid(selectionGrid, selection)
document.getElementById('main-content').appendChild(selectionGrid)

function populateGrid(grid, selectionArray) {
    const size = getSelectionSize(selectionArray)
    console.log(size)
    const selectedBlock = getSelectedBlock(selectionArray)
    console.log(selectedBlock)
    const dimensionTree = getDimensionTree(selectedBlock, 0)
    let dimensions = []

    for (let i = 0; i < size.depth; i++) {
        dimensions[i] = []
    }
    let sortDimensionTree = (dim) => {
        dimensions[dim[0].depth].push({ block: dim[0].block, width: dim[0].width })
        if (dim.length == 2) {
            for (let i = 0; i < dim[1].length; i++) {
                sortDimensionTree(dim[1][i])
            }
        }

    }
    sortDimensionTree(dimensionTree)

    for (let i = 0; i < dimensions.length; i++) {
        for (let j = 0; j < dimensions[i].length; j++) {
            let width = dimensions[i][j].width
            grid.appendChild(createBlockElement(dimensions[i][j].block, width, size.depth - i))
        }
    }
}

function createBlockElement(block, width, height) {
    let blockElement = document.createElement('div')
    blockElement.className = "block-element"
    let row = width == 1 ? `span ${height}` : `span 1`
    blockElement.style.gridRow = row
    blockElement.style.gridColumn = `span ${width}`
    const completion = block.completion
    if (completion != undefined) {
        let r = completion < 0.5 ? 255 : (1 - (completion - 0.5) / 0.5) * 255
        let g = completion < 0.5 ? (1 - completion / 0.5) * 99 + (completion / 0.5) * 215 : ((completion - 0.5) / 0.5) * 215 + (1 - (completion - 0.5) / 0.5) * 255
        let b = completion < 0.5 ? (1 - completion / 0.5) * 71 + (completion / 0.5) * 0 : 0
        blockElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    } else {
        blockElement.style.backgroundColor = `dodgerblue`
    }

    return blockElement
}

function getDimensionTree(block, depth) {
    const width = block.numberOfLeafBlocks()
    if (block.children.length == 0) return [{ block: block, width: width, depth: depth }]
    let childrenDimensions = []
    for (let i = 0; i < block.children.length; i++) {
        childrenDimensions.push(getDimensionTree(block.children[i], depth + 1))
    }
    return [{ block: block, width: width, depth: depth }, childrenDimensions]
}

function createGrid(selectionArray) {
    const size = getSelectionSize(selectionArray)

    const grid = document.createElement('div')
    grid.style.display = 'grid'
    grid.style.gridTemplate = `repeat(${size.depth}, 1fr) / repeat(${size.width}, 1fr)`
    grid.style.height = '100%'
    grid.id = 'selection-grid'

    return grid
}

function getSelectionSize(selectionArray) {
    const selectedBlock = getSelectedBlock(selectionArray)
    const tree = selectedBlock.getTree()
    return getSize(tree)

}

function getSelectedBlock(selectionArray) {
    const selectedBlocks = home.getBranch(selectionArray, 0)
    console.log(selectedBlocks)
    return selectedBlocks[selectedBlocks.length - 1] // Get the selected Block

}

function getSize(tree) {
    if (tree.length > 1) {
        let width = 0
        let depth = 1
        for (let i = 1; i < tree.length; i++) {
            let size = getSize(tree[i])
            width += size.width
            if (size.depth + 1 > depth) depth = size.depth + 1
        }
        return { width: width, depth: depth }
    } else {
        return { width: 1, depth: 1 }
    }
}