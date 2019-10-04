import React from 'react';
import '../css/reboot.css';
import '../css/bootstrap-grid.css';
import '../css/main.css';
import '../css/jquery-ui.min.css';
import '../fonts/stylesheet.css';

import $ from "jquery";


export default class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            minAge: 18,
            search: ''
        }
    }

    componentWillMount() {
        fetch('/users/all')
            .then(res => res.json())
            .then(users => {
                users = users.map((user) => {
                    return (this.renderUser(user))
                });
                this.setState({users: users})
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        $('#minCost').change(() => console.log('aaa'))
    }

    renderUser = (user) => {
        let d = new Date(user.updated_at);
        const strDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        return (
            <tr>
                <td className="result-check"><label><input type="checkbox"/><span></span></label>
                </td>
                <td className="user-name">{user.name}</td>
                {/*<td className="user-family">Васильева</td>*/}
                <td className="user-mail">{user.phoneNumber}</td>
                <td className="user-password">**********</td>
                <td className="user-date">{strDate}</td>
                <td className="user-time">TDB</td>
                <td className="user-time">TDB</td>

                <td className="user-more">
                    <button type="button" className="btn-more"></button>
                    <div className="drop-table">
                        <div className="inner">
                            <div className="drop-table_item">Заблокировать на 1 час</div>
                            <div className="drop-table_item">Заблокировать на 24 часа</div>
                            <div className="drop-table_item">Удалить</div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    };

    handleSearch = (event) => {
        if (event.key === 'Enter') {
            fetch('/users/search?q=' + this.state.search)
                .then(res => res.json())
                .then(users => {
                    const usersTr = users.map(user => this.renderUser(user));
                    this.setState({users: usersTr})
                })
                .catch(err => console.log(err))
        }

    };

    render() {
        console.log(this.state.minAge);
        return (
            <div className="tabs__content">
                <div className="container">
                    <div className="user-filter">
                        <form action="/">
                            <div className="user-filter_item user-filter_age">
                                <span>Возраст</span>
                                <div className="drop-filter drop-filter_age">
                                    <div className="inner">
                                        <div className="title">Возраст</div>
                                        <div className="wrap-range">
                                            <div id="age-range"></div>
                                        </div>
                                        <div className="flex">
                                            <label className="from">
                                                <input id="minCost" type="text"
                                                       //onChange={(e) => this.setState({minAge: e.target.value})}
                                                       value="18"/>
                                            </label>
                                            <label className="until">
                                                <input id="maxCost" type="text" value="100"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-filter_item user-filter_gender">
                                <span>Пол</span>
                                <div className="drop-filter drop-filter_check drop-filter_gender">
                                    <div className="inner">
                                        <div className="checkbox">
                                            <input type="checkbox" id="check-all"/>
                                            <label htmlFor="check-all"><strong>Все</strong></label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="check-female"/>
                                            <label htmlFor="check-female">Женский</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="check-male"/>
                                            <label htmlFor="check-male">Мужской</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-filter_item user-filter_activity">
                                <span>Активность</span>
                                <div className="drop-filter drop-filter_check drop-filter_activity">
                                    <div className="inner">
                                        <div className="checkbox">
                                            <input type="checkbox" id="activity-all"/>
                                            <label htmlFor="activity-all"><strong>Все</strong></label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="activity-yes"/>
                                            <label htmlFor="activity-yes">Да</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="activity-not"/>
                                            <label htmlFor="activity-not">Нет</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-filter_item user-filter_subscribe">
                                <span>Подписка</span>
                                <div className="drop-filter drop-filter_check drop-filter_subscribe">
                                    <div className="inner">
                                        <div className="checkbox">
                                            <input type="checkbox" id="subscribe-all"/>
                                            <label htmlFor="subscribe-all"><strong>Все</strong></label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="subscribe-yes"/>
                                            <label htmlFor="subscribe-yes">Да</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="subscribe-not"/>
                                            <label htmlFor="subscribe-not">Нет</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-filter_item user-filter_status">
                                <span>Статус подписки</span>
                                <div className="drop-filter drop-filter_check drop-filter_status">
                                    <div className="inner">
                                        <div className="checkbox">
                                            <input type="checkbox" id="status-all"/>
                                            <label htmlFor="status-all"><strong>Все</strong></label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="status-yes"/>
                                            <label htmlFor="status-yes">Да</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="status-not"/>
                                            <label htmlFor="status-not">Нет</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-filter_input">
                                <input
                                    value={this.state.search}
                                    onChange={(event) => this.setState({search: event.target.value})}
                                    onKeyPress={this.handleSearch}
                                    type="text"
                                    placeholder="Поиск по таблице"/>
                            </div>
                        </form>
                    </div>

                    <div className="tabs__table">
                        <table className="table table-user">
                            <thead>
                            <tr>
                                <td className="result-check"><label><input type="checkbox"/><span></span></label>
                                </td>
                                <td className="user-name">ИМЯ</td>
                                {/*<td className="user-family">ФАМИЛИЯ</td>*/}
                                <td className="user-mail">ТЕЛЕФОН</td>
                                <td className="user-password">ПАРОЛЬ</td>
                                <td className="user-date">Дата</td>
                                <td className="user-time">ПОДПИСКА</td>
                                <td className="user-time">СТАТУС ПОДПИСКИ</td>
                                <td className="user-more"></td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.users}
                            </tbody>
                        </table>

                        <div className="table-pagination">
                            <ul>
                                <li className="arrow disable"><a href="#"><img src="../img/icons/arrow-left.svg"
                                                                               alt="prev"/></a></li>
                                <li className="selected"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">16</a></li>
                                <li className="arrow"><a href="#"><img src="../img/icons/arrow-right.svg"
                                                                       alt="next"/></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

};
