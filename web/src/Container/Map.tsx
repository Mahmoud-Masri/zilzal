import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

const position: LatLngTuple = [38.6696215, 39.1990649];

export default function Map() {
    return (
        <div className="map-container">
            <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100wh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                </Marker>
            </MapContainer>
        </div>
    );
}
