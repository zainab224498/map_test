"use client";

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MarkerType {
    id: number;
    position: {
        lat: number;
        lng: number;
    };
    price: number;
    name: string;
    image: string;
}

const mapContainerStyle = {
    height: "100%",
    width: "100%"
};


const markers: MarkerType[] = [
    { id: 1, position: { lat: 24.7136, lng: 46.6753 }, price: 100, name: "House A", image: "https://ychef.files.bbci.co.uk/624x351/p0h9k5dl.jpg" },
    { id: 2, position: { lat: 21.3891, lng: 39.8579 }, price: 200, name: "House B", image: "https://i.pinimg.com/736x/d7/d8/9f/d7d89f745b9e5f46cfbb498f984d20ca.jpg" },
    { id: 3, position: { lat: 26.4207, lng: 50.0880 }, price: 300, name: "House C", image: "https://i.ytimg.com/vi/zumJJUL_ruM/maxresdefault.jpg" },
    { id: 4, position: { lat: 25.1434, lng: 46.1235 }, price: 400, name: "House D", image: "https://cdn.archilovers.com/projects/9ec19d18-107e-41f9-bddf-4fc03411b2b5.jpg" },
    { id: 5, position: { lat: 18.9714, lng: 42.6884 }, price: 500, name: "House E", image: "https://media.designcafe.com/wp-content/uploads/2023/03/14120252/mansion-interior.jpg" },
    { id: 6, position: { lat: 22.3333, lng: 40.6666 }, price: 600, name: "House F", image: "https://media.designcafe.com/wp-content/uploads/2023/07/05195443/modern-interior-design.jpg" },
    { id: 7, position: { lat: 23.4444, lng: 41.7777 }, price: 700, name: "House G", image: "https://images.homify.com/image/upload/c_scale,h_282,w_500/v1448461554/p/photo/image/1144486/e12.jpg" },
    { id: 8, position: { lat: 24.5555, lng: 42.8888 }, price: 800, name: "House H", image: "https://pencilinteriors.co.in/wp-content/uploads/2023/09/SAJI-VEMBALLOR-chest-of-drawers-MIRROR-21.jpg" },
    { id: 9, position: { lat: 25.6666, lng: 43.9999 }, price: 900, name: "House I", image: "https://www.shutterstock.com/image-photo/interior-living-room-television-couch-260nw-2341123617.jpg" },
    { id: 10, position: { lat: 26.7777, lng: 45.1111 }, price: 1000, name: "House J", image: "https://i.pinimg.com/736x/71/e4/fa/71e4fa929a0a9a0c1635e244b3a8a6ae.jpg" }
];

const center = {
    lat: 23.8859, // Approx. center of Saudi Arabia
    lng: 45.0792
};

const MapComponent: React.FC = () => {
    const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
    const [showMore, setShowMore] = useState(false);

    const onMarkerClick = (marker: MarkerType) => {
        setSelectedMarker(marker);
        setShowMore(false); // Reset showMore when a new marker is selected
    };

    const handleSeeMore = () => {
        setShowMore(true);
    };

    return (
        <div className="flex flex-col h-screen sm:flex-row">
            <div className="h-1/2 sm:h-full sm:w-1/2">
                <LoadScript googleMapsApiKey="AIzaSyBmU9-1tZ8rgYd8u48ga9Z25fiLXW3ZCOY">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={6}
                    >
                        {markers.map(marker => (
                            <Marker
                                key={marker.id}
                                position={marker.position}
                                onClick={() => onMarkerClick(marker)}
                                icon={{
                                    url: "data:image/svg+xml;base64," + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30">
                    <rect width="60" height="30" fill="white" rx="5" />
                    <text x="30" y="20" font-size="14" text-anchor="middle" fill="black">${marker.price} $ </text>
                </svg>
              `)
                                }}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
            <div className="flex-1 py-5 px-16  sm:p-5 overflow-y-auto  sm:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {markers
                        .filter(marker =>
                            selectedMarker === null ||
                            selectedMarker.id === marker.id ||
                            (showMore && selectedMarker.id !== marker.id)
                        )
                        .map(marker => (
                            <div key={marker.id} className="flex flex-col border border-gray-300 rounded-lg p-2">
                                <img src={marker.image} alt={marker.name} className="w-full h-3/4 rounded-lg" />
                                <h2 className="font-bold my-2">{marker.name}</h2>
                                <h3 className="font-large">
                                    Price: <span className="animated-price">{marker.price} $</span>
                                </h3>
                            </div>
                        ))}
                </div>
                <div className="flex justify-center mt-8">
                    {selectedMarker && !showMore && (
                        <button
                            onClick={handleSeeMore}
                            className="bg-black text-white border-none rounded-md py-2 px-5 cursor-pointer text-lg"
                        >
                            See More
                        </button>
                    )}
                </div>
            </div>
            <style jsx>{`
                @keyframes colorChange {
                    0% {
                        color: #0c51d9;
                    }
                    50% {
                        color: #618feb;
                    }
                    100% {
                        color: #0c51d9;
                    }
                }

                .animated-price {
                    animation: colorChange 2s linear infinite;
                }
            `}</style>
        </div>


    );
};



export default MapComponent;
