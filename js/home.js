
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('side-bar').classList.toggle('expanded')
})

blocks.get('home-block').addGoal()
blocks.get('home-block').addGoal()
blocks.get('goal-0').createTree(5)
blocks.get('goal-1').createTree(3)
