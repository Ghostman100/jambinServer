import React from 'react';
import './App.css';
import { BeatLoader } from 'react-spinners';
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
            checkCounter: 0,
            selected: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearch(city, address, text) {
        fetch('https://search-maps.yandex.ru/v1/?text=' + city + address + '&type=geo&results=1&lang=ru_RU&apikey=' + APIKEY)
            .then((res) => res.json())
            .then((response) => {
                console.log(response.features[0].properties.boundedBy);
                // this.setState({bounds: response.features[0].properties.boundedBy});
                return (response.features[0].properties.boundedBy)
            })
            .then((bounds) => {
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
                                        list: <tr key={place.properties.CompanyMetaData.id}>
                                            <td>
                                                <input
                                                    type={'checkbox'}
                                                    onChange={this.handleCheck}
                                                    name={index}
                                                    // value={}
                                                />
                                            </td>
                                            <td>
                                                {place.properties.CompanyMetaData.name}
                                            </td>
                                            <td>
                                                {text}
                                            </td>
                                            <td>
                                                {city}
                                            </td>
                                            <td>
                                                {place.properties.CompanyMetaData.address}
                                            </td>
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
        console.log(formData);
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
                console.log(response);
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
        console.log(this.state.selected);
        return (
            <div style={{flex: 1, height: '100%', borderWidth: 10, borderColor: 'red'}}>
                <form>
                    Город <input type={'text'} value={this.state.city}
                                 onChange={(event) => this.setState({city: event.target.value})}/>
                    <br/>
                    Адрес <input type={'text'} value={this.state.address}
                                 onChange={(event) => this.setState({address: event.target.value})}/>
                    <br/>
                    Поиск <input type={'text'} value={this.state.name}
                                 onChange={(event) => this.setState({name: event.target.value})}/>
                    <br/>
                    <input type="button" value="Применить"
                           onClick={() => this.handleSearch(this.state.city, this.state.address, this.state.name)}/>
                </form>
                <YMaps>
                    <div style={{height: '100%'}}>
                        My awesome application with maps!
                        <Map
                            width={'100%'}
                            height={400}
                            defaultState={{
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
                            }}
                        >
                            {this.state.places && this.state.places.map((place) => place.marker)}
                        </Map>
                    </div>
                </YMaps>
                <p>
                    Выбрано {this.state.checkCounter} объектов
                </p>
                <input type={'button'} value="Добавить" onClick={this.handleSubmit}/>
                {this.state.process ? <BeatLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#FC3067'}
                    loading={this.state.process}
                /> : <table style={{flex: 1, justifyContent: 'space-between'}}>
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Назавание</th>
                        <th>Тип</th>
                        <th>Город</th>
                        <th>Адрес</th>
                    </tr>
                    {this.state.places && this.state.places.map((place) => place.list)}
                    </tbody>
                </table> }
            </div>)
    }
}

export default App;
