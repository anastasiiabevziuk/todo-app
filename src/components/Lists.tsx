import { Link } from 'react-router-dom';
import { useState } from 'react';
import { List, Segment, Button, Input } from 'semantic-ui-react'
import { listSlice } from '../store/reducers/listsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks/redux';
import { useTranslation } from 'react-i18next';


function Lists() {
    const [inputValueList, setInputValueList] = useState("");


    const { addList, deleteList, activeItems } = listSlice.actions;
    const dispatch = useAppDispatch();
    const list = useAppSelector((state) => state.listReducer);

    const { t } = useTranslation();

    return (
        <div>

            <div className='Items-Header-Content Text-Container'>
                <h1 className='Text'>{t("lists")}</h1>
            </div>

            <Segment className="Segment-Add" inverted>
                <Input
                    value={inputValueList}
                    onChange={event => setInputValueList(event.currentTarget.value)}
                />
                <Button color='teal' inverted onClick={event => {
                    event.preventDefault();
                    dispatch(addList(inputValueList));
                    setInputValueList("");
                }}>
                    {t("add")}
                </Button>
            </Segment>

            <Segment inverted color='teal'>
                <h4>{t("all")} </h4>
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

