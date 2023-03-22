import { Button, Form, Segment } from 'semantic-ui-react'


function Login() {
    return (
        <div>
            <h1>Вхід</h1>
            <Segment inverted color='teal'>
                <Form inverted>
                    <Form.Group grouped widths='equal'>
                        <Form.Input required fluid label='Логін' placeholder='Логін' />
                        <Form.Input required fluid label='Пароль' placeholder='Пароль' />
                    </Form.Group>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button onClick={() => console.log("submit")} inverted color='teal' type='submit'>Підтвердити</Button>
                </Form>
            </Segment>
        </div>

    );
}

export default Login;