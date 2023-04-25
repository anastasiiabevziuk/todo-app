import { useState } from 'react';
import { List, Segment, Input, Checkbox, Button } from 'semantic-ui-react'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { todoSlice } from '../store/reducers/todoSlice';
import { Link } from 'react-router-dom';


function Items() {
    const [inputValue, setInputValue] = useState("");


    const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todoReducer);


    return (
        <div>

            <div className='Items-Header-Content'>
                <div>
                    <Link to="/lists">
                        <Button inverted basic color='teal' icon="arrow left" size="mini" />
                    </Link>
                </div>

                <div className='Text-Container'>
                    <h1 className='Text'>Елементи</h1>
                </div>

            </div>

            <Segment className="Segment-Add" inverted>
                <Input
                    value={inputValue}
                    onChange={event => setInputValue(event.currentTarget.value)}
                />
                <Button icon='add' color='teal' content='Add' inverted onClick={event => {
                    event.preventDefault();
                    dispatch(addTodo(inputValue));
                    setInputValue("");
                }}>

                </Button>
            </Segment>
            <Segment inverted color='teal'>
                <h4>В процесі</h4>
                <List divided verticalAlign='middle' className='Lists-Container' >

                    {todos.map(todo => (<List.Item key={todo.id} className="Lists-Items" as='a'>
                        <List.Content floated='right'>
                            <Button basic icon='delete' size="mini" onClick={() => dispatch(deleteTodo(String(todo.id)))} />
                        </List.Content>
                        <List.Content floated='left'>
                            <Checkbox
                                radio
                                checked={todo.completed}
                                onClick={() => dispatch(completeTodo(String(todo.id)))}
                            />
                        </List.Content>
                        <List.Content onClick={() => dispatch(completeTodo(String(todo.id)))} verticalAlign="top">{todo.message}</List.Content>
                    </List.Item>

                    ))}
                </List>
            </Segment >


        </div >

    );
}

export default Items;