
import { Button } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from 'react-i18next';
import Lists from './Lists';

function Main() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const { t } = useTranslation();

    return (
        <>

            <h1 className='Text'>{t("welcome")}</h1>

            <div className='Main-Button'>
                {!isAuthenticated ?
                    <Button onClick={() => loginWithRedirect()} inverted color='teal'>{t("login")}</Button> :
                    <Lists />}
            </div>

        </>

    );
}

export default Main;