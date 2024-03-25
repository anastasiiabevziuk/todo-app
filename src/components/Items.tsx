import { SyntheticEvent, useState, useEffect } from 'react';
import { List, Segment, Checkbox, Button, Form, Label, Icon, Dropdown, DropdownMenu, DropdownItem } from 'semantic-ui-react'
import { useLocation, Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useAddItemsMutation, useDeleteItemsMutation, useGetItemsQuery, useUpdateItemsMutation } from '../api/itemApi';
import IItem from '../api/interfaces/iItem';
import Loading from './Loading';




function Items() {

    const [inputValueItems, setInputValueItems] = useState("");
    const [filterStatus, setFilterStatus] = useState("new");
    const [idUpdateItems, setIdUpdateItems] = useState('');
    const [inputValueUpdateItems, setInputValueUpdateItems] = useState('');

    let { state } = useLocation();
    const { t } = useTranslation();

    const { data = [], isLoading } = useGetItemsQuery(state.id);
    const [addItems, { isError }] = useAddItemsMutation();
    const [deleteItems] = useDeleteItemsMutation();
    const [updateItems] = useUpdateItemsMutation();

    const [filterData, setFilterData] = useState(data);


    useEffect(() => {
        updateFilterData(filterStatus)

    }, [data, filterStatus]);


    const handleDeleteItems = async (id: string) => {
        await deleteItems(id).unwrap();
    }


    const handleUpdateItems = async (id: string, listId: string, description: string, isDone: boolean) => {
        if (inputValueUpdateItems) {
            await updateItems({ description: inputValueUpdateItems, id: id, isDone: isDone, listId: listId }).unwrap();
            setIdUpdateItems('');
        }
    }


    const handleUpdateItemsInput = (id: string, description: string) => {
        setIdUpdateItems(id);
        setInputValueUpdateItems(description);
    }


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

    }


    const handleAddItems = async () => {
        if (inputValueItems) {
            await addItems({ description: inputValueItems, listId: state.id }).unwrap();
            setInputValueItems('');
        }
    }


    const updateFilterData = (status: string) => {
        let arrayForSort = [...data];

        switch (status) {
            case "old":
                const sortData = arrayForSort.sort((a, b) => {
                    return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
                });
                setFilterData(sortData);
                break;
            case "in progress":
                const sortDataInProgress = arrayForSort.filter(item => item.isDone === false);
                setFilterData(sortDataInProgress);
                break;
            case "done":
                const sortDataDone = arrayForSort.filter(item => item.isDone === true);
                setFilterData(sortDataDone);
                break;
            default:
                setFilterData(data);
        }
    }


    const handleFilter = (status: string) => {
        setFilterStatus(status);
        updateFilterData(status);
    }


    const handleIsDoneItems = async (id: string, listId: string, description: string, isDone: boolean,) => {
        await updateItems({ id, listId, description, isDone: !isDone }).unwrap();
    }


    return (
        <div>
            {isLoading && <Loading />}
            <div className='Items-Header-Content'>
                <div>
                    <Link to="/lists">
                        <Button inverted basic color='teal' icon="arrow left" size="mini" />
                    </Link>
                </div>

                <div className='Text-Container'>
                    <h1 className='Text'>{t("elements")}</h1>
                </div>

            </div>


            <Segment className="Segment-Add" inverted>
                <Form onSubmit={handleSubmit} className="Segment-Add">
                    <input
                        maxLength={40}
                        className='Input-Add'
                        value={inputValueItems}
                        onChange={event => setInputValueItems(event.target.value)}
                    />
                    <Button color='teal' active inverted onClick={handleAddItems}>
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
                        icon={filterStatus === "new" || filterStatus === "all" ? "sort amount down" :
                            filterStatus === "old" ? "sort amount up" :
                                filterStatus === "done" ? "check circle outline" :
                                    filterStatus === "in progress" ? "circle notched" : ""}
                        button
                        color='grey'
                        compact
                    >
                        <DropdownMenu direction='left' className='Dropdowm-Filter'>
                            <DropdownItem icon='sort amount down' text={t("filterNew")} onClick={() => setFilterStatus('new')} />
                            <DropdownItem icon='sort amount up' text={t("filterOld")} onClick={() => handleFilter("old")} />
                            <DropdownItem icon='check circle outline' text={t("filterDone")} onClick={() => handleFilter("done")} />
                            <DropdownItem icon='sort amount down' text={t("filterAll")} onClick={() => handleFilter("all")} />
                            <DropdownItem icon='circle notched' text={t("filterInProgress")} onClick={() => handleFilter("in progress")} />
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <List divided verticalAlign='middle' className='Lists-Container' >
                    {filterData.map((item: IItem) => (
                        <List.Item key={item.id} className={item.isDone ? "Lists-Items Item-Done" : "Lists-Items"} >

                            {idUpdateItems === item.id ?
                                <Form onSubmit={handleSubmit} className="Form-Update">
                                    <input
                                        autoFocus
                                        maxLength={40}
                                        value={inputValueUpdateItems}
                                        onChange={event => setInputValueUpdateItems(event.target.value)}
                                        className='Input-Update' />
                                    <Button basic size="mini" color='brown' icon='save outline' onClick={() => handleUpdateItems(item.id, state.id, item.description, item.isDone)} />
                                </Form> : item.description
                            }
                            {idUpdateItems !== item.id &&
                                <List.Content floated='right' verticalAlign='middle'>
                                    <Button basic color='grey' icon='pencil alternate' size="mini" onClick={() => handleUpdateItemsInput(item.id, item.description)} />
                                    <Button basic color='red' icon='delete' size="mini" onClick={() => handleDeleteItems(item.id)} />
                                    <Checkbox
                                        radio
                                        className='Checkbox-Items'
                                        checked={item.isDone}
                                        onClick={() => handleIsDoneItems(item.id, state.id, item.description, item.isDone)}
                                    />

                                </List.Content>
                            }
                        </List.Item>
                    ))}
                </List>
            </Segment >
        </div >

    );
}

export default Items;