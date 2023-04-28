import { Icon } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';

function Footer() {

    let now = new Date();
    const { t } = useTranslation();

    return (
        <div>
            <div>
                <a href=" https://join.skype.com/invite/kQNZ4B7hC02y">
                    <Icon link size='large' name='skype' />
                </a>
                <a href="https://www.linkedin.com/in/anastasiia-bevziuk-5212b0178/">
                    <Icon link size='large' name='linkedin' />
                </a>
                <a href="https://github.com/anastasiiabevziuk">
                    <Icon link size='large' name='github' />
                </a>

            </div>
            <p className='Footer-Info'>
                {t("city")} {now.getFullYear()}
            </p>
        </div>
    );
}

export default Footer;