import { List, Segment, Button, Input } from 'semantic-ui-react'


function Lists() {
    return (
        <div>
            <h1>Список</h1>
            <Segment className="Segment-Add" inverted>
                <Input
                    action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'add',
                        content: 'Add',
                        inverted: true,
                    }}
                    defaultValue=''
                />
            </Segment>
            <Segment inverted color='teal'>
                <List divided verticalAlign='middle' className='Lists-Container' >
                    <List.Item className="Lists-Items" onClick={() => console.log("item")} as='a'>
                        <List.Content floated='right'>
                            <Button size="small" onClick={() => console.log("delite")} inverted color='teal'>Видалити</Button>
                        </List.Content>
                        <List.Content>To Do</List.Content>
                    </List.Item>
                    <List.Item className="Lists-Items" onClick={() => console.log("item")} as='a'>
                        <List.Content floated='right'>
                            <Button size="small" onClick={() => console.log("delite")} inverted color='teal'>Видалити</Button>
                        </List.Content>
                        <List.Content>To Do</List.Content>
                    </List.Item>


                </List>
            </Segment >
        </div >

    );
}

export default Lists;