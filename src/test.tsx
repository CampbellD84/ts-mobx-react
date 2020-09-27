import { useObserver, observer } from 'mobx-react-lite'
import React from 'react'
import Todo from './stores/data/todos/todo'

const todo = new Todo('Learn MobX React', 1)

const TestComponent = observer(() => {
    console.log(todo.name)
    return (
        <div>
            {todo.name}
            <div>
                <button onClick={() => todo.updateName('First Name')}>First Name</button>
                <button onClick={() => todo.updateName('Second Name')}>Second Name</button>
            </div>
        </div>
    )
})

export default TestComponent