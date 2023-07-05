
document.getElementById('menu-btn').addEventListener('click', function () {
    document.getElementById('side-bar').classList.toggle('expanded')
})

document.getElementById('history-home').onclick = () => {selectBlock('group-0')}

document.getElementById('home-btn').onclick = () => {
    document.getElementById('settings-page').classList.add('hidden')
    document.getElementById('home-page').classList.remove('hidden')
}
document.getElementById('settings-btn').onclick = () => {
    document.getElementById('home-page').classList.add('hidden')
    document.getElementById('settings-page').classList.remove('hidden')
}



blocks.get('group-0').addGoal()
blocks.get('group-0').addGoal()
blocks.get('group-0').addGroup()
blocks.get('goal-1').createTree(5)
blocks.get('goal-2').createTree(3)

blocks.get('goal-7').setCompleted(true)
blocks.get('goal-8').setCompleted(true)
blocks.get('goal-10').setCompleted(true)
blocks.get('goal-11').setCompleted(true)
blocks.get('goal-14').setCompleted(true)

blocks.get('goal-67').setCompleted(true)
blocks.get('goal-68').setCompleted(true)
blocks.get('goal-70').setCompleted(true)
blocks.get('goal-71').setCompleted(true)
blocks.get('goal-74').setCompleted(true)
blocks.get('goal-75').setCompleted(true)
blocks.get('goal-77').setCompleted(true)

blocks.get('goal-75').split()
blocks.get('goal-80').setCompleted(true)

blocks.get('group-1').addGoal()
blocks.get('group-1').addGoal()
blocks.get('group-1').addGroup()
blocks.get('group-1').addGoal()
blocks.get('goal-83').split()
blocks.get('goal-85').setCompleted(true)
