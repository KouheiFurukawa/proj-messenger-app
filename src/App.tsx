import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Talk from './Talk';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/talk" component={Talk} />
        </BrowserRouter>
    );
};

export default App;
