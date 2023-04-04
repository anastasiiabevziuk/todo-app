
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


function Main() {

    return (
        <>
            <h1>Привіт</h1>
            <div className='Main-Button'>
                <Link to="/login">
                    <Button inverted color='teal'>Вхід</Button>
                </Link>
                <Link to="/registration">
                    <Button inverted color='teal'>Реєстрація</Button>
                </Link>
            </div>

        </>



    );
}

export default Main;