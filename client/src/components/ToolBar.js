import React from 'react';
import '../css/reboot.css';
import '../css/bootstrap-grid.css';
import '../css/main.css';

export default class ToolBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let path = window.location.href.split('/');
        path = path[path.length - 1];
        console.log('path', path);
        let userClass = '', placeClass = '';
        switch (path) {
            case 'users':
                userClass = 'selected';
                break;
            case 'places' :
                placeClass = 'selected';
        }
        return (
            <div className="toolbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className="logo"><a href="#"><img src={require("../img/logo.png")} alt="logo"/></a>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="toolbar-row">
                                <div className="toolbar__navigation">
                                    <ul className="toolbar__tabs">
                                        <li className={placeClass}><a href="places">Места</a></li>
                                        <li className={userClass}><a href="users">Пользователи</a></li>
                                        <li><a href="#">Жалобы</a></li>
                                    </ul>
                                </div>
                                <div className="toolbar__login">
                                    <ul className="toolbar__user">
                                        <li><a href="#"><img src={require("../img/toolbar__icons.png")}
                                                             alt="img"/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
