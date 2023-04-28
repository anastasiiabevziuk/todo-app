import { Button, Menu } from 'semantic-ui-react'
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from 'react-i18next';


function Header() {
    const { logout, isAuthenticated } = useAuth0();

    const { t, i18n } = useTranslation();

    const changeLanguage = (language: "ua" | "en") => {
        i18n.changeLanguage(language);
    }

    return (

        <div>
            <Menu className='Menu-Header' attached='top'>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button active={i18n.resolvedLanguage === 'en'} color='teal' inverted onClick={() => changeLanguage('en')}>EN</Button>
                        <Button active={i18n.resolvedLanguage === 'ua'} color='teal' inverted onClick={() => changeLanguage('ua')}>UA</Button>
                    </Menu.Item>
                    <Menu.Item>
                        {isAuthenticated && <Button size="tiny" color='teal' inverted onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>{t("logout")}</Button>}
                    </Menu.Item>

                </Menu.Menu>
            </Menu>
        </div>


    );
}

export default Header;