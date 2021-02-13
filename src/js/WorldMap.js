import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import GPX from 'leaflet-gpx';
import GpxiesAPI from "./GpxiesAPI";

class WorldMap {
  constructor(mapid = "mapid") {
    // this.worldMap = '';
    this.mapId = mapid;
    this.ZOOM_FOR_EDIT = 15;
    this.MODE_EDIT = "edit";
    this.MODE_VIEW = "view";
    this.MODE_CREATE = "create";
    ///

    this.blueIcon = L.icon({
      iconUrl: "/img/leaflet/button_blue.png",
      iconSize: [16, 16], // size of the icon
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
      popupAnchor: [32, 32], // point from which the popup should open relative to the iconAnchor
    });
    this.redIcon = L.icon({
      iconUrl: "/img/leaflet/button_red.png",
      iconSize: [16, 16], // size of the icon
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
      popupAnchor: [32, 32], // point from which the popup should open relative to the iconAnchor
    });
  }

  setMode(mode = "view") {
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
      id: "mapbox/streets-v11",
      center: [51.505, -0.09],
      zoom: 13,
      accessToken: "pk.eyJ1Ijoibm1pbmtldmljaCIsImEiOiJja2sybmp4OWgxMnEwMm90N3hrbmcyMWZ5In0.5wMIS1zH3Z0LFY2orShZbA",
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
        console.log("Zoom:", this.mymap.getZoom());
        // Add remove all layers
        //this.clearMapMarkers(this.mymap);
        if (this.mymap.getZoom() >= this.ZOOM_FOR_EDIT) {
          // console.log("Bounds:", this.mymap.getBounds());
          let mapBounds = this.mymap.getBounds();

          // Add increasing of bounds for better smoothy
          const INCREASE_COEFFICIENT = 0.001;
          mapBounds._northEast.lat += INCREASE_COEFFICIENT;
          mapBounds._northEast.lng += INCREASE_COEFFICIENT;
          mapBounds._southWest.lat -= INCREASE_COEFFICIENT;
          mapBounds._southWest.lng -= INCREASE_COEFFICIENT;

          // console.log("mapBounds", mapBounds);
          this.markers = [];
          this.polylineCoordinates.map((coord, index) => {
            if (mapBounds.contains(coord)) {
              this.markers.push({ coord: coord, originalIndex: index });
            }
          });
          if (this.markersGroup) {
            this.markersGroup.clearLayers();
          }

          this.drawPointsInBounds(this.markers);

          console.log(this.markers.length);
          console.log(this.markers);
        } else {
          if (this.markersGroup) {
            this.markersGroup.clearLayers();
          }
        }
        console.log(this.mymap._layers);
      }
    }

    this.mymap.on("click", onMapClick);
    this.mymap.on("zoomend", onMapZoom.bind(this));
    this.mymap.on("move", onMapZoom.bind(this));
  }

  async showGpx(hashString) {
    console.log("hashString", hashString);

    const gpxiesAPI = new GpxiesAPI();
    let track = await gpxiesAPI.getTrackPoints(hashString);
    setTimeout(() => {
      this.drawTrack(track.gpx.trk);
    }, 2000);
    return track;
  }

  drawTrack(tracks, editable = true) {
    this.polylineCoordinates = [];
    this.tracksGroup = L.layerGroup();
    tracks.forEach((trk) => {
      trk.trkseg.forEach((trkseg) => {
        trkseg.trkpt.forEach((trkpt) => {
          this.polylineCoordinates.push([parseFloat(trkpt.attr.lat), parseFloat(trkpt.attr.lon)]);
        });
      });
    });
    const polyline = L.polyline(this.polylineCoordinates, { color: "red" });

    this.tracksGroup.addLayer(polyline).addTo(this.mymap);

    // zoom the map to the polyline
    this.mymap.fitBounds(polyline.getBounds());
  }

  drawPointsInBounds(points) {
    this.markersGroup = L.layerGroup();
    points.map((p) => {
      this.markersGroup.addLayer(this.drawTrackPoint(p.coord[0], p.coord[1], p.originalIndex));
    });

    this.markersGroup.addTo(this.mymap);
  }

  drawTrackPoint(lat, lon, indexOfPolylinePoint) {
    let self = this;

    let marker = L.marker([lat, lon], {
      icon: this.blueIcon,
      draggable: "true",
    })
      .on("dragend", (event) => {
        var marker = event.target;
        var position = marker.getLatLng();
        marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: "true" });
        self.polylineCoordinates[indexOfPolylinePoint] = [position.lat, position.lng];
        // self.clearMap(self.mymap);
        // event.target.removeLayer()
        console.log(self.mymap._layers);
        this.tracksGroup.clearLayers();
        const polyline = L.polyline(this.polylineCoordinates, { color: "red" });

        this.tracksGroup.addLayer(polyline).addTo(this.mymap);
        // L.polyline(self.polylineCoordinates, { color: "red" }).addTo(self.mymap);
        // self.mymap.panTo(new L.LatLng(position.lat, position.lng));
      })
      .on("mouseover", (event) => {
        event.target.setIcon(this.redIcon);
      })
      .on("mouseout", (event) => {
        event.target.setIcon(this.blueIcon);
      });

    return marker;
    //this.markerLayer.push(marker);
  }

  removeMarkerLayer() {
    this.markerLayer.map((marker) => {
      this.mymap.removeLayer(marker);
    });
    this.markerLayer = [];
  }

  // Trick for clear all layer and objects from map
  // https://stackoverflow.com/questions/14585688/clear-all-polylines-from-leaflet-map
  clearMapPolyline(leafletMap) {
    console.log("clearMap", leafletMap);
    for (let i in leafletMap._layers) {
      if (leafletMap._layers[i]._path != undefined) {
        console.log(i, leafletMap._layers[i]);
        try {
          leafletMap.removeLayer(leafletMap._layers[i]);
        } catch (e) {
          console.log("problem with " + e + leafletMap._layers[i]);
        }
      }
    }
  }
  clearMapMarkers(leafletMap) {
    console.log("clearMap", leafletMap);
    for (let i in leafletMap._layers) {
      if (leafletMap._layers[i]._path == undefined) {
        console.log(i, leafletMap._layers[i]);
        try {
          leafletMap.removeLayer(leafletMap._layers[i]);
        } catch (e) {
          console.log("problem with " + e + leafletMap._layers[i]);
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
          document.querySelector(".mainContent_container").setAttribute("data-country", countryCode);
        }
      });
    }
    if (isNaN(size)) size = 10000;
    L.circle([lat, lng], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: size,
    })
      .addTo(this.mymap)
      .on("click", onMapClick)
      .bindPopup(`<img src='${countryFlag}' class='map-flag'> ${countryName} (${sourceName}: ${sourceData})`);
  }
}

export default WorldMap;
