import React from 'react';
import AddPlaceScreen from "./screens/AddPlaceScreen";
import ToolBar from "./components/ToolBar";
import Users from "./screens/Users";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            path: ''
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <ToolBar path={this.state.path}/>
                    <Switch>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <AddPlaceScreen />
                        </Route>
                    </Switch>
                </div>

            </Router>
        )
    }
}
