
import { Button } from 'semantic-ui-react'


function Main() {

    return (
        <>
            <h1>Привіт</h1>
            <div className='Main-Button'>
                <Button onClick={() => console.log("login")} inverted color='teal'>Вхід</Button>
                <Button onClick={() => console.log("registration")} inverted color='teal'>Реєстрація</Button>
            </div>

        </>



    );
}

export default Main;