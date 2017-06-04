/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from 'Containers/LandingPage.jsx';
import AboutPage from 'Presentationals/AboutPage.jsx';
import FormulaPage from 'Presentationals/FormulaPage.jsx';
import ModelPage from 'Presentationals/ModelPage.jsx';
import Header from "Presentationals/Header.jsx";
import 'Styles/App.scss';

export default class App extends React.Component {
    render () {
        return (
            <div className="app">
                <Header/>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/formula" component={FormulaPage} />
                    <Route path="/model" component={ModelPage} />
                </Switch>
            </div>
        );
    }
}
