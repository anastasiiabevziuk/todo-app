import { Dropdown, Input, Menu } from 'semantic-ui-react'
import { useAuth0 } from "@auth0/auth0-react";

const languageOptions = [
    { key: 'English', text: 'English', value: 'English' },
    { key: 'Українська', text: 'Українська', value: 'Українська' },
]

function Header() {
    const { logout } = useAuth0();

    return (

        <div>
            <Menu className='Menu-Header' attached='top'>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown
                            button
                            className='icon Menu-Header'
                            floating
                            labeled
                            icon='world'
                            options={languageOptions}
                            search
                            text='Українська'
                        />
                    </Menu.Item>
                    <Menu.Item
                        name='Вихід'
                        active={'logout' === 'logout'}
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        className='Menu-Header'
                    />
                </Menu.Menu>
            </Menu>
        </div>


    );
}

export default Header;