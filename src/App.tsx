import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Main} />
            {/*<Route path="/login" component={Login} />*/}
        </BrowserRouter>
    );
};

export default App;
