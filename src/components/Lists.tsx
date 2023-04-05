import { Link } from 'react-router-dom';
import { useState } from 'react';
import { List, Segment, Button, Input } from 'semantic-ui-react'
import { listSlice } from '../store/reducers/listsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';



function Lists() {
    const [inputValueList, setInputValueList] = useState("");


    const { addList, deleteList, activeItems } = listSlice.actions;
    const dispatch = useAppDispatch();
    const list = useAppSelector((state) => state.listReducer);

    return (
        <div>
            <div className='Items-Header-Content'>
                <Link to="/">
                    <Button inverted basic color='teal' icon="arrow left" size="mini" />
                </Link>
                <h1 className='Text'>Список</h1>
            </div>

            <Segment className="Segment-Add" inverted>
                <Input
                    value={inputValueList}
                    onChange={event => setInputValueList(event.currentTarget.value)}
                />
                <Button icon='add' color='teal' content='Add' inverted onClick={event => {
                    event.preventDefault();
                    dispatch(addList(inputValueList));
                    setInputValueList("");
                }}>

                </Button>
            </Segment>

            <Segment inverted color='teal'>
                <h4>Всі: </h4>
                <List divided verticalAlign='middle' className='Lists-Container' >
                    {list.map(list => (<List.Item key={list.id} className="Lists-Items" >
                        <List.Content floated='right'>
                            <Button basic icon='delete' size="mini" onClick={() => dispatch(deleteList(String(list.id)))} />
                        </List.Content>
                        <Link to="/items" className='Lists-Link-Container' >
                            <List.Content onClick={() => dispatch(activeItems(String(list.id)))} verticalAlign="top">{list.name}</List.Content>
                        </Link>
                    </List.Item>

                    ))}
                </List>
            </Segment >
        </ div>

    );
}

export default Lists;

