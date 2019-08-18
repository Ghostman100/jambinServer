import React from 'react';
import './App.css';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

const APIKEY = '8534aa25-b7df-46a1-bebf-2ffeb6df1814';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 'Новосибирск Советский район',
            name: 'аптеки'
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(city, text) {
        fetch('https://search-maps.yandex.ru/v1/?text=' + city + '&type=geo&results=1&lang=ru_RU&apikey=' + APIKEY)
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
                                return (<Placemark key={index} geometry={place.geometry.coordinates.reverse()}/>)
                            })
                        )
                    })
                    .then((markers) => {
                        this.setState({markers: markers})
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <form>
                    Город <input type={'text'} value={this.state.city}
                                 onChange={(event) => this.setState({city: event.target.value})}/>
                    <br/>
                    Поиск <input type={'text'} value={this.state.name}
                                 onChange={(event) => this.setState({name: event.target.value})}/>
                    <br/>
                    <input type="button" value="Применить"
                           onClick={() => this.handleSearch(this.state.city, this.state.name)}/>
                </form>
                <YMaps>

                    <div>
                        My awesome application with maps!
                        <Map defaultState={{
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
                        }}>
                            {this.state.markers}
                        </Map>
                    </div>
                </YMaps>
            </div>)
    }
}

export default App;
