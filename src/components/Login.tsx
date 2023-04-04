import { Link } from 'react-router-dom';
import { Button, Form, Label, Segment } from 'semantic-ui-react'


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
                    <Link to="/registration">
                        <Label color='teal' pointing >Немає акаунту, зареєструватися</Label>
                    </Link>
                    <Form.Checkbox label='Я погоджуюся з Умовами використання' />

                    <Button onClick={() => console.log("submit")} inverted color='teal' type='submit'>Підтвердити</Button>
                </Form>
            </Segment>
        </div>

    );
}

export default Login;