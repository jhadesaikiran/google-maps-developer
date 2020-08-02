import React, { Component } from "react";
import "./App.css";

//decoder
const decodePolyline = require("decode-google-map-polyline");
var polyline2 =
  "}|dyCwjnyN[?gACiCK?aBGwBCcACoAAw@AuAIe@CwAEwAMqEy@?{ACyAAi@AeBIyAK{AQeC_@eBYAAk@My@UcBe@AAq@SaA_@o@YwCaBqBkAOIyB_Bi@e@MMWWaBeBwC}CYY]i@cA}A{@aBKS{A_DAEU_@o@oBUu@Ma@K_@AGCKm@gCa@kBMQWmAOiAEg@I_AKaB?MIeC?IGaBAkA@Y@oA@WHkA@SBk@?M?K?IAKMGmBaAcAi@q@@YQ@UaCwAA??@A?A?A??@A?A?AAA?A?AAA??AA??AA?ACAC?E?E?A?A@??A@A?A@??A@??A@?@A@?@?@AX{Ad@}BLuALiABm@DgA?KBqBJ?fALVCT_BF[";
var pathCoordinates = decodePolyline(polyline2);
var pathlength = pathCoordinates.length;

console.log(pathCoordinates);

//class starts

class IndexMap extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&libraries=geometry&callback=initMap"
    );
    window.initMap = this.initMap;
  };
  // api AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA
  //maps
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 25.27794, lng: 83.00244 },
      zoom: 14,
    });
    //polyline
    const polylinePath = new window.google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    polylinePath.setMap(map);

    //markers
    var marker1 = new window.google.maps.Marker({
      map,

      position: pathCoordinates[0],
    });
    var marker2 = new window.google.maps.Marker({
      map,

      position: pathCoordinates[pathlength - 1],
    });

    //heading
    const point1LatLng = new window.google.maps.LatLng(
      pathCoordinates[0].lat,
      pathCoordinates[0].lng
    );
    const point2LatLng = new window.google.maps.LatLng(
      pathCoordinates[pathlength - 1].lat,
      pathCoordinates[pathlength - 1].lng
    );

    var heading1 = window.google.maps.geometry.spherical.computeHeading(
      point1LatLng,
      point2LatLng
    );
    console.log(heading1);

    //containlocation
    const cityCoords = [
      { lat: 25.258943, lng: 82.943589 },
      { lat: 25.221128, lng: 83.043749 },
      { lat: 25.362872, lng: 83.073362 },
      { lat: 25.381759, lng: 82.969718 },
    ];
    const cityTriangle = new window.google.maps.Polygon({
      paths: cityCoords,
    });
    window.google.maps.event.addListener(map, "click", (e) => {
      const resultColor = window.google.maps.geometry.poly.containsLocation(
        e.latLng,
        cityTriangle
      )
        ? "blue"
        : "red";
      const resultPath = window.google.maps.geometry.poly.containsLocation(
        e.latLng,
        cityTriangle
      ) // A triangle.
        ? "m 0 -1 l 1 2 -2 0 z"
        : window.google.maps.SymbolPath.CIRCLE;
      new window.google.maps.Marker({
        position: e.latLng,
        map,
        icon: {
          path: resultPath,
          fillColor: resultColor,
          fillOpacity: 0.2,
          strokeColor: "white",
          strokeWeight: 0.5,
          scale: 10,
        },
      });
    });
    //endofcontain

    //end
  };

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default IndexMap;

/*
{
  
  var map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  

  let marker1, marker2;
  let poly, geodesicPoly;

  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: {
      lat: 34,
      lng: -40.605,
    },
  });
  map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
    document.getElementById("info")
  );
  marker1 = new window.google.maps.Marker({
    map,
    draggable: true,
    position: {
      lat: 40.714,
      lng: -74.006,
    },
  });
  marker2 = new window.google.maps.Marker({
    map,
    draggable: true,
    position: {
      lat: 48.857,
      lng: 2.352,
    },
  });
  const bounds = new window.google.maps.LatLngBounds(
    marker1.getPosition(),
    marker2.getPosition()
  );
  map.fitBounds(bounds);
  window.google.maps.event.addListener(marker1, "position_changed", update);
  window.google.maps.event.addListener(marker2, "position_changed", update);
  poly = new window.google.maps.Polyline({
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    map: map,
  });
  geodesicPoly = new window.google.maps.Polyline({
    strokeColor: "#CC0099",
    strokeOpacity: 1.0,
    strokeWeight: 3,
    geodesic: true,
    map: map,
  });
  update();
};

update = () => {
  const path = [marker1.getPosition(), marker2.getPosition()];
  poly.setPath(path);
  geodesicPoly.setPath(path);
  const heading = google.maps.geometry.spherical.computeHeading(
    path[0],
    path[1]
  );
  document.getElementById("heading").value = String(heading);
  document.getElementById("origin").value = String(path[0]);
  document.getElementById("destination").value = String(path[1]);
};
*/

/*
 //update
    let update = () => {
      const path = [marker1.getPosition(), marker2.getPosition()];
      poly.setPath(path);

      const heading = window.google.maps.geometry.spherical.computeHeading(
        path[0],
        path[1]
      );
      document.getElementById("heading").value = String(heading);
      document.getElementById("origin").value = String(path[0]);
      document.getElementById("destination").value = String(path[1]);
      console.log(heading);
    };
    //bound
    const bounds = new window.google.maps.LatLngBounds(
      marker1.getPosition(),
      marker2.getPosition()
    );
    map.fitBounds(bounds);
    window.google.maps.event.addListener(marker1, "position_changed", update);
    window.google.maps.event.addListener(marker2, "position_changed", update);
    const poly = new window.google.maps.Polyline({
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: map,
    });

    //end
  // in return 
   <div id="floating-panel">
          Origin: <input type="text" readonly id="origin" /> Destination:
          <input type="text" readonly id="destination" />
          <br />
          Heading: <input type="text" readonly id="heading" /> degrees
        </div>
    */
