import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import listProviders from "../apis/listProviders";
import listRequests from "../apis/listRequests";
import { HelpProvider, HelpRequest } from "../db";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const SyriaLocation: LatLngTuple = [36.272909, 37.045475];

const redMarker = new L.Icon({
    iconUrl: "/red-marker.png",
    iconSize: [25, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

const greenMarker = new L.Icon({
    iconUrl: "/green-marker.png",
    iconSize: [25, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

export default function MapPage() {
    const [providers, setProviders] = useState<HelpProvider[]>([]);
    const [request, setRequest] = useState<HelpRequest[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        listProviders().then((x) => {
            console.log(x);
            setProviders(x);
        });
        listRequests().then((x) => {
            setRequest(x);
        });
    }, []);

    return (
        <div className="map-container">
            <MapContainer center={SyriaLocation} zoom={10} style={{ height: "100vh", width: "100wh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {providers
                    .filter((x) => x.status !== "Canceled")
                    .map(
                        (provider, i) =>
                            provider.lat &&
                            provider.lng && (
                                <Marker key={i} icon={greenMarker} position={[provider.lat!, provider.lng!]}>
                                    <Popup>
                                        تقديم مساعدة
                                        <br />
                                        {provider.phoneNumber}
                                        <br /> {provider.address} <br /> {provider.status} <br /> النوع :{provider.type}
                                        <br /> {provider._id}
                                        <br /> {provider.note}
                                    </Popup>
                                </Marker>
                            )
                    )}
                {request
                    .filter((x) => x.status !== "Canceled")
                    .map(
                        (request, i) =>
                            request.lat &&
                            request.lng && (
                                <Marker key={i} icon={redMarker} position={[request.lat!, request.lng!]}>
                                    <Popup>
                                        طلب مساعدة
                                        <br />
                                        {request.phoneNumber} <br /> {request.address} <br /> الحالة :{request.status}{" "}
                                        <br /> النوع :{request.type}
                                        <br /> {request._id}
                                        <br /> {request.note}
                                    </Popup>
                                </Marker>
                            )
                    )}
            </MapContainer>
        </div>
    );
}
