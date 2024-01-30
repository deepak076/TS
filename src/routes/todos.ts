//routes\todos.ts
import { Router } from 'express';

import { Todo } from '../models/todo';
import { todo } from 'node:test';

type requestBody = {text: string};
type requestParams = {todoId: string};
let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as requestBody; 
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };

    todos.push(newTodo);
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo, todos: todos });
})

router.post('/todo/edit/:todoId', (req, res, next) => {
    const params= req.params as requestParams;
    const tid = params.todoId;
    const body = req.body as requestBody;
    const newText = req.body.newText;

    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);

    if (todoIndex >= 0) {
        todos[todoIndex].text = newText;
        res.status(200).json({ message: 'Todo edited successfully', updatedTodo: todos[todoIndex], todos: todos });
    } else {
        res.status(404).json({ message: 'Could not find todo for this id' });
    }
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params= req.params as requestParams;
    const tid = params.todoId;
    const deletedTodo = todos.find(todoItem => todoItem.id === tid);

    if (deletedTodo) {
        todos = todos.filter(todoItem => todoItem.id !== tid);
        res.status(200).json({ message: 'Deleted todo', todos: todos });
    } else {
        res.status(404).json({ message: 'Could not find todo for this id' });
    }
})

export default router;