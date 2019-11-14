import React from 'react';

import '../css/reboot.css';
import '../css/bootstrap-grid.css';
import '../css/main.css';
import '../css/jquery-ui.min.css';
import '../fonts/stylesheet.css';

export default class Reports extends React.Component {



    render() {
        return(
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
                            <div className="drop-filter drop-filter_check drop-filter_date">
                                <div className="inner">
                                    <input type="date"/>
                                </div>
                            </div>
                        </div>

                        <div className="complaint-filter_item complaint-filter_type">
                            <span>Тип жалобы</span>
                            <div className="drop-filter drop-filter_check drop-filter_type">
                                <div className="inner">
                                    <div className="checkbox">
                                        <input type="checkbox" id="type-all"/>
                                            <label htmlFor="type-all"><strong>Все</strong></label>
                                    </div>
                                    <div className="checkbox">
                                        <input type="checkbox" id="type-spam"/>
                                            <label htmlFor="type-spam">Спам</label>
                                    </div>
                                    <div className="checkbox">
                                        <input type="checkbox" id="type-else"/>
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
                        <tr>
                            <td className="result-check"><label><input type="checkbox"/><span></span></label></td>
                            <td className="user-name">Петя</td>
                            <td className="user-gender">М</td>
                            <td className="user-age">27</td>
                            <td className="user-id">312036709700</td>
                            <td className="user-idcom">312036709700</td>
                            <td className="user-date">14 янв 2019</td>
                            <td className="user-time">14:15</td>
                            <td className="user-type">Похоже на спам</td>
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
                        <tr>
                            <td className="result-check"><label><input type="checkbox"/><span></span></label></td>
                            <td className="user-name">Петя</td>
                            <td className="user-gender">М</td>
                            <td className="user-age">27</td>
                            <td className="user-id">312036709700</td>
                            <td className="user-idcom">312036709700</td>
                            <td className="user-date">14 янв 2019</td>
                            <td className="user-time">14:15</td>
                            <td className="user-type">Похоже на спам</td>
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
                            <li className="arrow"><a href="#"><img src="img/icons/arrow-right.svg" alt="next"/></a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
    }
}
