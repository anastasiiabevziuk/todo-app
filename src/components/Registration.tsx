import { Button, Form, Segment } from 'semantic-ui-react'


function Registration() {
    return (
        <div>
            <h1>Реєстрація</h1>
            <Segment inverted color='teal'>
                <Form inverted>
                    <Form.Group grouped widths='equal'>
                        <Form.Input required fluid label='ФІО' placeholder='ФІО' />
                        <Form.Input required fluid label='Логін' placeholder='Логін' />
                        <Form.Input required fluid label='Пароль' placeholder='Пароль' />
                        <Form.Input required fluid label='Повторити пароль' placeholder='Пароль' />
                    </Form.Group>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button inverted color='teal' onClick={() => console.log("submit")} type='submit'>Підтвердити</Button>
                </Form>
            </Segment>
        </div>
    );
}

export default Registration;