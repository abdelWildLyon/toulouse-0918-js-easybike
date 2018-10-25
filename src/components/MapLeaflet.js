import React, { Component } from 'react';
import axios from 'axios';

import {
  Map, TileLayer, type Viewport
} from 'react-leaflet';

import { apiKey } from './settings';

import MapControls from './MapControls';
import MarkersLayer from './MarkersLayer';
import UserMarker from './UserMarker';

const defaultCenter = {
  center: [43.599761799999996, 1.443197],
  zoom: 15
};

class MapLeaflet extends Component<
  {},
  { viewport: Viewport },
  > {
  state = {
    viewport: defaultCenter,
  }

  constructor(props) {
    super(props);
    this.state = {
      zoom: defaultCenter.zoom,
      stationsList: [],
      isLoading: false,
      error: null,
      panelToDisplay: ''
    };
    this.clearError = this.clearError.bind(this);
    this.refreshStationsList = this.refreshStationsList.bind(this);
    this.centerOnUser = this.centerOnUser.bind(this);
  }

  componentDidMount() {
    this.refreshStationsList();
    this.interval = setInterval(this.refreshStationsList, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

<<<<<<< HEAD
  centerOnUser(userPosition) {
=======
  centerOnUser = (userPosition) => {
>>>>>>> 13862e6870821b9136fb71f54783ea0320440f9f
    // console.log(`on centre sur ${userPosition}`);
    this.setState({
      viewport: {
        center: userPosition,
        zoom: 15
      }
    })
  }

  clearError() {
    this.setState({ error: null });
  }

<<<<<<< HEAD
  refreshStationsList() {
=======
  refreshStationsList = () => {
>>>>>>> 13862e6870821b9136fb71f54783ea0320440f9f
    const { favStationsId,updateStationsList } = this.props;
    // console.log('refresh');
    this.setState({ error: null });
    const request = `https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=${apiKey}`;
    this.setState({ isLoading: true });

    axios.get(request)
      .then(result => {
        const stationsList = result.data.map(
          station => {
            const isFavorite = favStationsId.includes(station.number);
            return { ...station,isFavorite:isFavorite}
          }
        );
<<<<<<< HEAD
        updateStationsList(stationsList);
        this.setState({
          stationsList: stationsList,
          isLoading: false
        })
=======
        this.setState({
          stationsList: stationsList ,
          isLoading: false
        })
        updateStationsList(stationsList);
>>>>>>> 13862e6870821b9136fb71f54783ea0320440f9f
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  render() {
<<<<<<< HEAD
    const { 
      stationsToDisplay,
      displayFeature,
      minStandsToDisplay,
      minBikesToDisplay,
      selectedOption,
      handleFavList,
      favStationsId
  } = this.props;
    const { viewCenter, zoom, stationsList, viewport } = this.state;

    return (
      <div className="map">
        <Geolocation
          lazy
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) => {
            const isUserLocated = latitude && longitude;

            console.log(`is fetching : ${fetchingPosition}, is user located : ${isUserLocated} `);
            console.log(`latitude = ${latitude} and longitude = ${longitude}`);

            const userPosition = isUserLocated ? [latitude, longitude] : viewCenter;

            return (
              <Map
                className="map__reactleaflet"
                center={userPosition}
                zoom={zoom}
                onClick={displayFeature}
                viewport={viewport}
              >
                <TileLayer
                  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
                />
                <MarkersLayer
                  stationsToDisplay={stationsToDisplay}
                  stationsList={stationsList}
                  error={error}
                  refreshStationsList={this.refreshStationsList}
                  minStandsToDisplay={minStandsToDisplay}
                  minBikesToDisplay={minBikesToDisplay}
                  selectedOption={selectedOption}
                  handleFavList={handleFavList}   
                  favStationsId={favStationsId}
                />
                <MapControls
                  getCurrentPosition={getCurrentPosition}
                  centerOnUser={this.centerOnUser}
                  refreshStationsList={this.refreshStationsList}
                  displayFeature={displayFeature}
                />
                <UserMarker 
                  latitude={latitude}
                  longitude={longitude}
                  isUserLocated={isUserLocated}
                />
              </Map>
            );
          }}
        />
=======
    const { stationsToDisplay, displayFeature, geolocationError, getCurrentPosition, userPosition, isUserLocated } = this.props;
    const { zoom, stationsList, viewport } = this.state;
    const [latitude, longitude] = userPosition;

    // console.log(`is fetching : ${fetchingPosition}, is user located : ${isUserLocated} `);
    // console.log(`latitude = ${latitude} and longitude = ${longitude}`);
    const userMarker = isUserLocated
      ? (
        <Marker position={[latitude, longitude]}>
          <Popup>
            <span>Votre position</span>
          </Popup>
        </Marker>
      )
      : null;

    return (
      <div className="map">
        <Map
          className="map__reactleaflet"
          center={userPosition}
          zoom={zoom}
          onClick={displayFeature}
          viewport={viewport}
        >
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          />
          <MarkersLayer
            stationsToDisplay={stationsToDisplay}
            stationsList={stationsList}
            error={geolocationError}
            refreshStationsList={this.refreshStationsList}
            userPosition={userPosition}
          />
          <MapControls
            getCurrentPosition={getCurrentPosition}
            centerOnUser={this.centerOnUser}
            refreshStationsList={this.refreshStationsList}
            displayFeature={displayFeature}
          />
          {userMarker}
        </Map>
        );
      }}
    />
>>>>>>> 13862e6870821b9136fb71f54783ea0320440f9f
      </div>
    );
  }
}

export default MapLeaflet;
