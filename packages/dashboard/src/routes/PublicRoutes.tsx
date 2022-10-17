import React from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {Dashboard} from '../component/Dashboard';

const PublicRoutes = () => {
    const location = useLocation();

    return (
        <Switch location={location}>
            <Route path="/"
                   exact
                   component={Dashboard} />

            <Redirect to="/" />
        </Switch>
    );
};

export {PublicRoutes};
