import { Link } from 'react-router-dom';
import { Button, Form, Segment, Label } from 'semantic-ui-react'


function Registration() {
    return (
        <>
            <h1 className='Text'>Реєстрація</h1>
            <Segment inverted color='teal'>
                <Form inverted>
                    <Form.Group grouped widths='equal'>
                        <Form.Input required fluid label='ФІО' placeholder='ФІО' />
                        <Form.Input required fluid label='Логін' placeholder='Логін' />
                        <Form.Input required fluid label='Пароль' placeholder='Пароль' />
                        <Form.Input required fluid label='Повторити пароль' placeholder='Пароль' />
                    </Form.Group>
                    <Link to="/login">
                        <Label color='teal' pointing >Є акаунту, вхід</Label>
                    </Link>
                    <Form.Checkbox label='Я погоджуюся з Умовами використання' />
                    <Button inverted color='teal' onClick={() => console.log("submit")} type='submit'>Підтвердити</Button>
                </Form>
            </Segment>
        </>
    );
}

export default Registration;