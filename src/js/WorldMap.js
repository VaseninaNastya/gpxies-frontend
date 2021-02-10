import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import GPX from 'leaflet-gpx';
import GpxiesAPI from './GpxiesAPI';

class WorldMap {
  constructor(mapid = 'mapid') {
    // this.worldMap = '';
    this.mapId = mapid;
    this.ZOOM_FOR_EDIT = 15;
    this.MODE_EDIT = 'edit';
    this.MODE_VIEW = 'view';
    this.MODE_CREATE = 'create';
  }

  setMode(mode = 'view') {
    this.mode = mode;
  }

  generateLayout() {
    setTimeout(() => {
      this.init();
    }, 1500);
  }

  init() {
    this.mymap = L.map(this.mapId).setView([30.0, 60.0], 2);
    // Default style id: 'mapbox/streets-v11'
    // Blue style id: 'nminkevich/ckiyzis0477jp1aqlqvezwx4l'
    // Yellow id: 'nminkevich/ckiyzpcx00d9m19o3gghoyxeo'
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      center: [51.505, -0.09],
      zoom: 13,
      accessToken: 'pk.eyJ1Ijoibm1pbmtldmljaCIsImEiOiJja2sybmp4OWgxMnEwMm90N3hrbmcyMWZ5In0.5wMIS1zH3Z0LFY2orShZbA',
    }).addTo(this.mymap);

    // var gpx = '/test.gpx'; // URL to your GPX file or the GPX itself
    // let self = this;
    // new L.GPX(gpx, { async: true })
    //   .on('loaded', function (e) {
    //     self.mymap.fitBounds(e.target.getBounds());
    //   })
    //   .addTo(this.mymap);

    function onMapClick(e) {
      console.log(e.latlng.lat, e.latlng.lng);
    }

    function onMapZoom(e) {
      // Add check for EDIT_MODE

      if (this.mode == this.MODE_EDIT) {
        console.log('Zoom:', this.mymap.getZoom());
        // Add remove all layers
        //this.clearMapMarkers(this.mymap);
        if (this.mymap.getZoom() >= this.ZOOM_FOR_EDIT) {
          console.log('Bounds:', this.mymap.getBounds());
          const mapBounds = this.mymap.getBounds();
          // Add increasing of bounds for better smoothy
          this.markers = [];
          this.polylineCoordinates.map((coord, index) => {
            if (mapBounds.contains(coord)) {
              this.markers.push({ coord: coord, originalIndex: index });
            }
          });
          this.drawPointsInBounds(this.markers);
          console.log(this.markers.length);
          console.log(this.markers);
        }
        console.log(this.mymap._layers);
      }
    }

    this.mymap.on('click', onMapClick);
    this.mymap.on('zoomend', onMapZoom.bind(this));
  }

  async showGpx(hashString) {
    console.log('hashString', hashString);

    const gpxiesAPI = new GpxiesAPI();
    let track = await gpxiesAPI.getTrackPoints(hashString);
    setTimeout(() => {
      this.drawTrack(track.gpx.trk);
    }, 2000);
    return track;
  }

  drawTrack(tracks, editable = true) {
    this.polylineCoordinates = [];
    tracks.forEach((trk) => {
      trk.trkseg.forEach((trkseg) => {
        trkseg.trkpt.forEach((trkpt) => {
          this.polylineCoordinates.push([parseFloat(trkpt.attr.lat), parseFloat(trkpt.attr.lon)]);
        });
      });
    });
    let polyline = L.polyline(this.polylineCoordinates, { color: 'red' }).addTo(this.mymap);

    // zoom the map to the polyline
    this.mymap.fitBounds(polyline.getBounds());
  }

  drawPointsInBounds(points) {
    points.map((p) => {
      this.drawTrackPoint(p.coord[0], p.coord[1], p.originalIndex);
    });
  }

  drawTrackPoint(lat, lon, indexOfPolylinePoint) {
    let self = this;

    let marker = L.marker([lat, lon], {
      draggable: 'true',
    })
      .on('dragend', (event) => {
        var marker = event.target;
        var position = marker.getLatLng();
        marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
        self.polylineCoordinates[indexOfPolylinePoint] = [position.lat, position.lng];
        // self.clearMap(self.mymap);
        // event.target.removeLayer()
        console.log(self.mymap._layers);
        L.polyline(self.polylineCoordinates, { color: 'red' }).addTo(self.mymap);
        // self.mymap.panTo(new L.LatLng(position.lat, position.lng));
      })
      .addTo(this.mymap);
    this.markers.push(marker);

    // let self = this;
    // function onTrackPointClick(e) {
    //   console.log('TRKPT:', self.lat, self.lon);
    // }
    // const size = 10;
    // L.circle([lat, lon], {
    //   color: 'blue',
    //   fillColor: '#f03',
    //   fillOpacity: 0.5,
    //   radius: size,
    //   draggable:true
    // })
    //   .addTo(this.mymap)
    //   .on('click', onTrackPointClick)
  }

  // Trick for clear all layer and objects from map
  // https://stackoverflow.com/questions/14585688/clear-all-polylines-from-leaflet-map
  clearMapPolyline(leafletMap) {
    console.log('clearMap', leafletMap);
    for (let i in leafletMap._layers) {
      if (leafletMap._layers[i]._path != undefined) {
        console.log(i, leafletMap._layers[i]);
        try {
          leafletMap.removeLayer(leafletMap._layers[i]);
        } catch (e) {
          console.log('problem with ' + e + leafletMap._layers[i]);
        }
      }
    }
  }
  clearMapMarkers(leafletMap) {
    console.log('clearMap', leafletMap);
    for (let i in leafletMap._layers) {
      if (leafletMap._layers[i]._path == undefined) {
        console.log(i, leafletMap._layers[i]);
        try {
          leafletMap.removeLayer(leafletMap._layers[i]);
        } catch (e) {
          console.log('problem with ' + e + leafletMap._layers[i]);
        }
      }
    }
  }

  /**
   * Draw round for statistic data
   * @param {number} lat - latitude
   * @param {number} lng - longitude
   * @param {number} size - size (1-10)
   */
  drawRound(lat, lng, size, countryName, countryFlag, sourceName, sourceData) {
    let self = this;
    function onMapClick(e) {
      self.geonamesAPI.getCountryName(e.latlng.lat, e.latlng.lng).then((countryCode) => {
        if (countryCode !== undefined) {
          document.querySelector('.mainContent_container').setAttribute('data-country', countryCode);
        }
      });
    }
    if (isNaN(size)) size = 10000;
    L.circle([lat, lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: size,
    })
      .addTo(this.mymap)
      .on('click', onMapClick)
      .bindPopup(`<img src='${countryFlag}' class='map-flag'> ${countryName} (${sourceName}: ${sourceData})`);
  }
}

export default WorldMap;
