
import { Button } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";

function Main() {
    const { loginWithRedirect } = useAuth0();


    return (
        <>

            <h1 className='Text'>Привіт</h1>


            <div className='Main-Button'>
                <Button onClick={() => loginWithRedirect()} inverted color='teal'>Вхід</Button>
            </div>

        </>



    );
}

export default Main;