import { List, Segment, Icon, Input, Checkbox } from 'semantic-ui-react'

function Items() {
    return (
        <div>
            <h1>Елементи</h1>
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
                <h4>В процесі</h4>
                <List divided verticalAlign='middle' className='Lists-Container' >

                    <List.Item className="Lists-Items" onClick={() => console.log("item")} as='a'>
                        <List.Content floated='right'>
                            <Icon name='favorite' />
                        </List.Content>
                        <List.Content floated='left'>
                            <Checkbox radio />
                        </List.Content>
                        <List.Content>To Do</List.Content>
                    </List.Item>
                </List>
            </Segment >

            <Segment inverted color='teal'>
                <h4>Історія</h4>

                <List divided verticalAlign='middle' className='Lists-Container' >

                    <List.Item className="Lists-Items" onClick={() => console.log("item")} as='a'>
                        <List.Content floated='left'>
                            <Checkbox radio checked />
                        </List.Content>
                        <List.Content>To Do</List.Content>
                    </List.Item>
                </List>
            </Segment >
        </div >

    );
}

export default Items;