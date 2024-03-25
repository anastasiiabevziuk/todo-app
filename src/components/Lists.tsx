import { SyntheticEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from "@auth0/auth0-react";
import {
    List, Segment, Button, Form, Label, Icon, DropdownMenu, DropdownItem, Dropdown,
} from 'semantic-ui-react'
import { useGetListsQuery, useAddListsMutation, useDeleteListsMutation, useUpdateListMutation } from '../api/listApi';
import IList from '../api/interfaces/iList';
import Loading from './Loading';
import { useAppDispatch } from '../store/hooks/redux';
import { authSlice } from "../store/slice/authSlice";
import Error from './Error';



function Lists() {

    const [inputValueList, setInputValueList] = useState("");
    const [idUpdateList, setIdUpdateList] = useState('');
    const [inputValueUpdateList, setInputValueUpdateList] = useState('');
    const [filterStatus, setFilterStatus] = useState("new");
    const { t } = useTranslation();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const { data = [], isLoading, isError: isErrorAuth } = useGetListsQuery();
    const [addList, { isError }] = useAddListsMutation();
    const [deleteList] = useDeleteListsMutation();
    const [updatePost] = useUpdateListMutation();

    const [filterData, setFilterData] = useState(data);

    const { changeAuthToken } = authSlice.actions;
    const dispatch = useAppDispatch();


    if (isAuthenticated) {
        getAccessTokenSilently().then(token => dispatch(changeAuthToken(token)));
    }


    useEffect(() => {
        if (!isErrorAuth) (
            updateFilterData(filterStatus)
        )

    }, [data, filterStatus, isErrorAuth]);


    const handleAddList = async () => {
        if (inputValueList) {
            await addList({ name: inputValueList }).unwrap();
            setInputValueList('');
        }
    }


    const handleDeleteList = async (id: string) => {
        await deleteList(id).unwrap();
    }


    const handleUpdateList = async (id: string, name: string) => {
        if (inputValueUpdateList) {
            await updatePost({ name: inputValueUpdateList, id: id }).unwrap();
            setIdUpdateList('');
        }
    }


    const handleUpdateListInput = (id: string, name: string) => {
        setIdUpdateList(id);
        setInputValueUpdateList(name);
    }


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    }


    const updateFilterData = (status: string) => {
        if (status === "old") {
            let arrayForSort = [...data];
            const sortData = arrayForSort.sort((a, b) => {
                return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
            });
            setFilterData(sortData);
        } else {
            setFilterData(data);
        }
    }


    const handleFilter = (status: string) => {
        setFilterStatus(status);
        updateFilterData(status);
    }

    if (isErrorAuth) {
        return <Error />
    }

    return (
        <div>
            {isLoading && <Loading />}
            <div className='Items-Header-Content Text-Container'>
                <h1 className='Text'>{t("lists")}</h1>
            </div>


            <Segment className="Segment-Add" inverted>
                <Form onSubmit={handleSubmit} className="Segment-Add">
                    <input
                        maxLength={40}
                        className='Input-Add'
                        value={inputValueList}
                        onChange={event => setInputValueList(event.target.value)}
                    />
                    <Button color='teal' inverted active onClick={handleAddList}>
                        {t("add")}
                    </Button>
                </Form>
                {isError && <Label basic color='red' pointing='left'>
                    <Icon name='circle notched' loading />
                    Try again
                </Label>}
            </Segment>


            <Segment inverted color='teal'>
                <div className='Filter-Conteiner'>
                    <h4>{t("all")} </h4>
                    <Dropdown
                        className='icon Dropdowm-Filter'
                        icon={filterStatus === 'new' ? 'sort amount down' : 'sort amount up'}
                        button
                        color='grey'
                        compact
                    >
                        <DropdownMenu direction='left' className='Dropdowm-Filter'>
                            <DropdownItem icon='sort amount down' text={t("filterNew")} onClick={() => handleFilter("new")} />
                            <DropdownItem icon='sort amount up' text={t("filterOld")} onClick={() => handleFilter("old")} />
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <List divided verticalAlign='middle' className='Lists-Container' >
                    {filterData.map((item: IList) => (
                        <List.Item key={item.id} className="Lists-Items" >
                            {idUpdateList === item.id ?
                                <Form onSubmit={handleSubmit} className='Form-Update'>
                                    <input
                                        autoFocus
                                        maxLength={40}
                                        value={inputValueUpdateList}
                                        onChange={event => setInputValueUpdateList(event.target.value)}
                                        className='Input-Update' />
                                    <Button basic size="mini" color='brown' icon='save outline' onClick={() => handleUpdateList(item.id, item.name)} />
                                </Form> :
                                <Link to="/items" state={{ id: item.id }} className='Lists-Link-Container ' >
                                    <List.Content>{item.name}</List.Content>
                                </Link>}
                            {idUpdateList !== item.id &&
                                <List.Content floated='right'>
                                    <Button basic color='grey' icon='pencil alternate' size="mini" onClick={() => handleUpdateListInput(item.id, item.name)} />
                                    <Button basic color='red' icon='delete' size="mini" onClick={() => handleDeleteList(item.id)} />
                                </List.Content>
                            }
                        </List.Item>
                    ))}
                </List>
            </Segment >
        </ div >
    );
}

export default Lists;

