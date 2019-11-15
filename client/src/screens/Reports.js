import React from 'react';

import '../css/reboot.css';
import '../css/bootstrap-grid.css';
import '../css/main.css';
import '../css/jquery-ui.min.css';
import '../fonts/stylesheet.css';

export default class Reports extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            typeView: false,
            type: 'all'
        }
    }

    componentWillMount() {
        fetch('/users/reports')
            .then(res => res.json())
            .then((users) => {
                return (users.map((user) => {
                    user['age'] = Math.floor((new Date() - new Date(user.birthday).getTime()) / 3.15576e+10);
                    return (user)
                }))
            })
            .then((reports) => {
                this.setState({reports})
            })
            .catch(err => console.log(err))
    }

    renderReport = (report) => {
        let reportType;
        switch (report.type) {
            case "obscene behavior":
                reportType = 'Непристойные сообщения';
                break;
            case 'obscene photos':
                reportType = 'Непристойное фото';
                break;
            case 'bad behavior':
                reportType = 'Плохое поведение оффлайн';
                break;
            case 'spam':
                reportType = 'Плохое поведение оффлайн';
                break;
            default:
                reportType = 'Другое'
        }
        let date = new Date(report.created_at);
        const reportDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
        const time = date.getHours() + ':' + date.getMinutes();
        return (
            <tr>
                <td className="result-check"><label><input type="checkbox"/><span></span></label></td>
                <td className="user-name">{report.name}</td>
                <td className="user-gender">{report.sex.toUpperCase()}</td>
                <td className="user-age">{report.age}</td>
                <td className="user-id">{report.reported_id}</td>
                <td className="user-idcom">{report.user_id}</td>
                <td className="user-date">{reportDate}</td>
                <td className="user-time">{time}</td>
                <td className="user-type">{reportType}</td>
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

    typeFilter = (type) => {
        fetch('/users/reports?type=' + type)
            .then(res => res.json())
            .then((reports) => {
                this.setState({reports: reports})
            })
            .catch(err => console.log(err))
    };

    render() {
        console.log(this.state.reports);

        return (
            <div className="tabs__content">
                <div className="container">

                    <div className="complaint-filter">
                        <form action="/">

                            <div className="complaint-buttons">
                                <button className="complaint-inbox active" type="button">Входящие</button>
                                <button className="complaint-history" type="button">История жалоб</button>
                            </div>

                            <div className="complaint-filter_item complaint-filter_date">
                                <span>Дата</span>

                                {/*<div className="drop-filter drop-filter_check drop-filter_date">*/}
                                {/*    <div className="inner">*/}
                                {/*        <input type="date"/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div
                                // className="complaint-filter_item complaint-filter_type"
                                onClick={() => this.setState({typeView: !this.state.typeView})}

                                className={`user-filter_item user-filter_gender${this.state.typeView === true ? ' active' : ''}`}
                            >
                                <span>Тип жалобы</span>
                                <div
                                    className="drop-filter drop-filter_check drop-filter_type">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="inner">
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-all"
                                                   onChange={() => {

                                                       this.setState({type: 'all'});
                                                       this.typeFilter('')
                                                   }}
                                                   checked={this.state.type === 'all'}
                                            />
                                            <label htmlFor="type-all"><strong>Все</strong></label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-bad"
                                                   onChange={() => {
                                                       this.setState({type: 'bad behavior'});
                                                       this.typeFilter('bad behavior')
                                                   }}
                                                   checked={this.state.type === "bad behavior"}
                                            />
                                            <label htmlFor="type-bad">Плохое поведение оффлайн</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-photos"
                                                   onChange={() => {

                                                       this.setState({type: 'obscene photos'});
                                                       this.typeFilter('obscene photos')
                                                   }}
                                                   checked={this.state.type === "obscene photos"}
                                            />
                                            <label htmlFor="type-photos">Непристойное фото</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-message"
                                                   onChange={() => {

                                                       this.setState({type: 'obscene behavior'});
                                                       this.typeFilter('obscene behavior')
                                                   }}
                                                   checked={this.state.type === "obscene behavior"}
                                            />
                                            <label htmlFor="type-message">Непристойные сообщения</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-spam"
                                                   onChange={() => {

                                                       this.setState({type: 'spam'});
                                                       this.typeFilter('spam')
                                                   }}
                                                   checked={this.state.type === 'spam'}/>
                                            <label htmlFor="type-spam">Спам</label>
                                        </div>
                                        <div className="checkbox">
                                            <input type="checkbox" id="type-else"
                                                   onChange={() => {

                                                       this.setState({type: 'other'});
                                                       this.typeFilter('other')
                                                   }}
                                                   checked={this.state.type === 'other'}
                                            />
                                            <label htmlFor="type-else">Другое</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="user-filter_input">
                                <input type="text" placeholder="Поиск по таблице"/>
                            </div>
                        </form>
                    </div>

                    <div className="tabs__table">
                        <table className="table table-complaint">
                            <thead>
                            <tr>
                                <td className="result-check"><label><input type="checkbox"/><span></span></label></td>
                                <td className="user-name">ИМЯ</td>
                                <td className="user-gender">ПОЛ</td>
                                <td className="user-age">ВОЗРАСТ</td>
                                <td className="user-id">ID ПОЛЬЗОВАТЕЛЯ</td>
                                <td className="user-idcom">ID АВТОРА ЖАЛОБЫ</td>
                                <td className="user-date">Дата</td>
                                <td className="user-time">ВРЕМЯ</td>
                                <td className="user-type">ТИП ЖАЛОБЫ</td>
                                <td className="user-more"></td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.reports.map((report) => {
                                return (this.renderReport(report))
                            })}
                            </tbody>
                        </table>
                        <div id="tooltip"></div>
                        <div className="table-pagination">
                            <ul>
                                <li className="arrow disable"><a href="#"><img src="img/icons/arrow-left.svg"
                                                                               alt="prev"/></a></li>
                                <li className="selected"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">16</a></li>
                                <li className="arrow"><a href="#"><img src="img/icons/arrow-right.svg" alt="next"/></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
