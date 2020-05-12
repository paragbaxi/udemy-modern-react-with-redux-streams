import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    {/* Switch stops Router from being "greedy" and matching more than one Route */}
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route
                            path="/streams/new"
                            exact
                            component={StreamCreate}
                        />
                        <Route
                            path="/streams/edit/:id"
                            exact
                            component={StreamEdit}
                        />
                        <Route
                            path="/streams/delete/:id"
                            exact
                            component={StreamDelete}
                        />
                        <Route
                            path="/streams/:id"
                            exact
                            component={StreamShow}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
