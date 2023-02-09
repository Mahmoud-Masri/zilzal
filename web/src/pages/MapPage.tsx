import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { Provider, useCallback, useEffect, useState } from "react";
import listProviders from "../apis/listProviders";
import listRequests from "../apis/listRequests";

const SyriaLocation: LatLngTuple = [36.272909, 37.045475];

export default function MapPage() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [request, setRequest] = useState<Request[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        listProviders().then((x) => {
            console.log(x)
            setProviders(x);
        });
        listRequests().then((x) => {
            setProviders(x);
        });
    }, []);


    return (
        <div className="map-container">
            <MapContainer center={SyriaLocation} zoom={13} style={{ height: "100vh", width: "100wh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <Marker position={position}></Marker> */}
            </MapContainer>
        </div>
    );
}
