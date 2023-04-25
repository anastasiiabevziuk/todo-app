import { Dimmer, Loader } from 'semantic-ui-react';


function Loading() {

    return (
        <>
            <Dimmer.Dimmable blurring>
                <Dimmer active>
                    <Loader />
                </Dimmer>
            </Dimmer.Dimmable>
        </>

    );
}

export default Loading;