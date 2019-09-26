import React from 'react';
import './css/reboot.css';
import './css/bootstrap-grid.css';
import './css/main.css';
import {BeatLoader} from 'react-spinners';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

const APIKEY = '8534aa25-b7df-46a1-bebf-2ffeb6df1814';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            process: false,
            city: 'Новосибирск',
            address: 'Советский район',
            name: 'аптеки',
            house: '',
            street: '',
            housing: '',
            checkCounter: 0,
            selected: [],
            bounds: [
                [
                    54.800912,
                    82.925056,
                ],
                [
                    54.913717,
                    83.146464,
                ]
            ]
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch(city, address, text) {
        fetch('https://search-maps.yandex.ru/v1/?text=' + city + address + this.state.street + this.state.house + '&type=geo&results=1&lang=ru_RU&apikey=' + APIKEY)
            .then((res) => res.json())
            .then((response) => {
                console.log(response.features[0].properties.boundedBy);
                // this.setState({bounds: response.features[0].properties.boundedBy});
                return (response.features[0].properties.boundedBy)
            })
            .then((bounds) => {
                this.setState({
                    bounds: [[
                        bounds[0][1], bounds[0][0]
                    ],
                        [
                            bounds[1][1], bounds[1][0]
                        ]]
                });
                console.log('https://search-maps.yandex.ru/v1/?text=' + text + '&type=biz&rspn=1&bbox=' + `${bounds[0][0]},${bounds[0][1]}~${bounds[1][0]},${bounds[1][1]}` + '&results=50&lang=ru_RU&apikey=' + APIKEY);
                fetch('https://search-maps.yandex.ru/v1/?text=' + text + '&type=biz&rspn=1&bbox=' + `${bounds[0][0]},${bounds[0][1]}~${bounds[1][0]},${bounds[1][1]}` + '&results=50&lang=ru_RU&apikey=' + APIKEY)
                    .then((res) => res.json())
                    .then((places) => {
                        return (
                            places.features.map((place, index) => {
                                return ({
                                        id: place.properties.CompanyMetaData.id,
                                        place: place,
                                        marker: <Placemark
                                            // onClick={() => console.log('placeMark')}
                                            key={index}
                                            geometry={place.geometry.coordinates.reverse()}
                                            properties={{
                                                hintContent: "<h3>place.properties.CompanyMetaData.address</h3>"
                                                // iconCaption: place.properties.CompanyMetaData.name
                                            }}
                                            defaultOptions={{
                                                preset: 'islands#blueCircleDotIcon',
                                                openEmptyHint: true,
                                                hasHint: true
                                            }}
                                        />,
                                        list:
                                            <tr key={place.properties.CompanyMetaData.id}>
                                                <td className="result-check"><label><input type="checkbox"
                                                                                           onChange={this.handleCheck}
                                                                                           name={index}/><span></span></label>
                                                </td>
                                                <td className="result-name">{place.properties.CompanyMetaData.name}</td>
                                                <td className="result-type">{text}</td>
                                                <td className="result-city">{city}</td>
                                                <td className="result-street">{place.properties.CompanyMetaData.address}
                                                </td>
                                                {/*<td className="result-house">82</td>*/}
                                                {/*<td className="result-housing">-</td>*/}
                                            </tr>
                                    }

                                )
                            })
                        )
                    })
                    .then((places) => {
                        this.setState({places: places})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    handleCheck(event) {
        const target = event.target;
        console.log(target);
        if (target.checked) {
            this.setState({
                selected: [...this.state.selected, target.name],
                checkCounter: this.state.checkCounter + 1,
            });
        } else {
            const index = this.state.selected.indexOf(target.name);
            let names = this.state.selected;
            names.splice(index, 1);
            this.setState({
                selected: names,
                checkCounter: this.state.checkCounter - 1,
            });
        }
    }

    handleSubmit(event) {
        this.setState({process: true});
        let body = this.state.selected.map((index) => {
            let place = this.state.places[index];
            const tds = place.list.props.children;
            return ({
                name: place.place.properties.CompanyMetaData.name,
                address: place.place.properties.CompanyMetaData.address,
                city: tds[3].props.children,
                kind: tds[2].props.children,
                latitude: place.place.geometry.coordinates[0],
                longitude: place.place.geometry.coordinates[1],
            })
        });
        let formData = new FormData();
        formData.append('places', body);
        fetch('/places/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then((response) => {
                this.setState({
                    process: false,
                    // places: this.state.places,
                    checkCounter: 0,
                    selected: []
                })
            })
            .catch((err) => {
                this.setState({
                    process: false,
                    checkCounter: 0,
                    selected: []
                });
                alert('Ошибка' + err)
            })
    }

    render() {
        return (
            <div>
                <div className="toolbar">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="logo"><a href="#"><img src={require("./img/logo.png")} alt="logo"/></a>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="toolbar-row">
                                    <div className="toolbar__navigation">
                                        <ul className="toolbar__tabs">
                                            <li className="selected"><a href="#">Места</a></li>
                                            <li><a href="#">Пользователи</a></li>
                                            <li><a href="#">Жалобы</a></li>
                                        </ul>
                                    </div>
                                    <div className="toolbar__login">
                                        <ul className="toolbar__user">
                                            <li><a href="#"><img src={require("./img/toolbar__icons.png")}
                                                                 alt="img"/></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabs__content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="place-filter">
                                    <form action="/">

                                        <div className="filter-btns">
                                            <button className="add-btn" type="button">Добавить</button>
                                            <button className="added-btn" type="button">Добавленные</button>
                                        </div>

                                        <div className="form-title">Фильтр поиска мест</div>

                                        <div className="form-item">
                                            <div>Город</div>
                                            <input type={'text'} value={this.state.city}
                                                   onChange={(event) => this.setState({city: event.target.value})}/>
                                        </div>

                                        <div className="form-item">
                                            <div>Адрес</div>
                                            <input type={'text'} value={this.state.address}
                                                         onChange={(event) => this.setState({address: event.target.value})}/>
                                        </div>

                                        <div className="form-item">
                                            <div>Улица</div>
                                            <input type={'text'} value={this.state.street}
                                                   onChange={(event) => this.setState({street: event.target.value})}/>
                                            {/*<select name="street">*/}
                                            {/*    <option value="1">Большой проспект П.С.</option>*/}
                                            {/*    <option value="2">Ленина</option>*/}
                                            {/*</select>*/}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-item">
                                                <div>Дом</div>
                                                <input type={'text'} value={this.state.house}
                                                       onChange={(event) => this.setState({house: event.target.value})}/>
                                                {/*<select name="house">*/}
                                                {/*    <option value="1">1</option>*/}
                                                {/*    <option value="2">2</option>*/}
                                                {/*</select>*/}
                                            </div>

                                            <div className="form-item">
                                                <div>Корпус</div>
                                                <input type={'text'} value={this.state.housing}
                                                       onChange={(event) => this.setState({housing: event.target.value})}/>
                                                {/*<select name="housing">*/}
                                                {/*    <option value="1">1</option>*/}
                                                {/*    <option value="2">2</option>*/}
                                                {/*</select>*/}
                                            </div>
                                        </div>

                                        <div className="form-item">
                                            <div >Тип заведения</div>
                                            <input type={'text'} value={this.state.name}
                                                   onChange={(event) => this.setState({name: event.target.value})}/>
                                        </div>
                                        <input className="form-btn" type={'button'} value="Применить"
                                               onClick={() => this.handleSearch(this.state.city, this.state.address, this.state.name)}/>
                                        {/*<button className="form-btn" type="submit"></button>*/}
                                    </form>
                                </div>

                                <div className="result-filter">
                                    <div
                                        className="result-filter_txt">Выбрано <span>{this.state.checkCounter}</span> объектов
                                    </div>
                                    <button className="btn btn-blue" type="button"
                                            onClick={this.handleSubmit}>Добавить
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="tabs-map">
                                    <div className="map">
                                        <YMaps>
                                            <div>
                                                <Map
                                                    width={'100%'}
                                                    height={440}
                                                    state={this.state}
                                                >
                                                    {this.state.places && this.state.places.map((place) => place.marker)}
                                                </Map>
                                            </div>
                                        </YMaps>
                                    </div>
                                    {/*<img src="img/map.png" alt="img">*/}
                                </div>
                            </div>
                        </div>

                        <div className="tabs__table">
                            {this.state.process ? <BeatLoader
                                    sizeUnit={"px"}
                                    size={150}
                                    color={'#FC3067'}
                                    loading={this.state.process}
                                /> :
                                <table className="table result-table">
                                    <thead>
                                    <tr>
                                        <td className="result-check"><label><input
                                            type="checkbox"/><span></span></label>
                                        </td>
                                        <td className="result-name">Название</td>
                                        <td className="result-type">ТИП</td>
                                        <td className="result-city">Город</td>
                                        <td className="result-street">Адрес</td>
                                        {/*<td className="result-house">ДОМ</td>*/}
                                        {/*<td className="result-housing">Корпус</td>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.places && this.state.places.map((place) => place.list)}
                                    </tbody>
                                </table>}

                            <div className="show-link"><a href="#" className="btn btn-pink">Просмотреть</a></div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default App;
