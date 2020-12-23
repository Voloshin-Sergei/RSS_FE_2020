import React from "react";
import {
  MapContainer,
  TileLayer,
  LayerGroup,
  Circle,
  Tooltip,
} from "react-leaflet";
import "./mapBlock.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

const fillRedOptions = { fillColor: "#FF0000" };
const accessToken =
  "pk.eyJ1IjoiZHJlYW1lci1hIiwiYSI6ImNraXliMWdwMjN6YXUycWxiMng1YXY3cjEifQ.5WvajAdFAhL9b2wUJ4zkAg";

function mapBlock({ countriesArr }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, 
                                       <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, 
                                       Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/colbyfayock/ck8c2foj72lqk1jnug0g2haw0/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
      />
      <LayerGroup>
        {countriesArr.map((countryItem, index) => {
          return (
            <Circle
              center={[
                countryItem.countryInfo.lat,
                countryItem.countryInfo.long,
              ]}
              pathOptions={fillRedOptions}
              radius={countryItem.markerSize}
              stroke={false}
              key={index}
            >
              <Tooltip>{countryItem.cases}</Tooltip>
            </Circle>
          );
        })}
      </LayerGroup>
    </MapContainer>
  );
}
export default mapBlock;
