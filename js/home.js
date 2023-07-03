
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('side-bar').classList.toggle('expanded')
})

document.getElementById('history-home').onclick = () => {selectBlock('group-0')}

blocks.get('group-0').addGoal()
blocks.get('group-0').addGoal()
blocks.get('group-0').addGroup()
blocks.get('goal-0').createTree(5)
blocks.get('goal-1').createTree(3)

blocks.get('goal-6').setCompleted(true)
blocks.get('goal-7').setCompleted(true)
blocks.get('goal-9').setCompleted(true)
blocks.get('goal-10').setCompleted(true)
blocks.get('goal-13').setCompleted(true)

blocks.get('goal-66').setCompleted(true)
blocks.get('goal-67').setCompleted(true)
blocks.get('goal-69').setCompleted(true)
blocks.get('goal-70').setCompleted(true)
blocks.get('goal-73').setCompleted(true)
blocks.get('goal-74').setCompleted(true)
blocks.get('goal-76').setCompleted(true)

blocks.get('goal-74').split()
blocks.get('goal-79').setCompleted(true)

blocks.get('group-1').addGoal()
blocks.get('group-1').addGoal()
blocks.get('group-1').addGroup()
blocks.get('group-1').addGoal()
blocks.get('goal-82').split()
blocks.get('goal-84').setCompleted(true)
