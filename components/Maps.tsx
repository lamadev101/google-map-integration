"use client";

import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 40.7128, // Default latitude (New York)
  lng: -74.006, // Default longitude
};

export default function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"], // Add the Places API
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(center);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return isLoaded ? (
    <div>
      <SearchBox setSelectedLocation={setSelectedLocation} inputRef={inputRef} />
      <GoogleMap mapContainerStyle={containerStyle} center={selectedLocation} zoom={12} onLoad={onLoad}>
        <Marker position={selectedLocation} />
      </GoogleMap>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

// ✅ Search Box Component
function SearchBox({ setSelectedLocation, inputRef }: { setSelectedLocation: any, inputRef: any }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300, // Debounce input for better performance
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelectedLocation({ lat, lng });
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search location..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        style={{ padding: "10px", width: "100%", fontSize: "16px" }}
      />
      {status === "OK" && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              style={{ cursor: "pointer", padding: "5px", borderBottom: "1px solid #ddd" }}
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



  // const handleAddMarker = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!newMarker || !name) return;

  //   // Create new marker object
  //   const newMarkerObj = {
  //     position: newMarker,
  //     name,
  //     category,
  //   };

  //   // Add to state
  //   setMarkers((prevMarkers) => [...prevMarkers, newMarkerObj]);

  //   if (map) {
  //     // Create marker
  //     const marker = new window.google.maps.Marker({
  //       position: newMarker,
  //       map: map,
  //       title: name,
  //       icon: {
  //         url: `https://maps.google.com/mapfiles/ms/icons/${CATEGORY_COLORS[category]}-dot.png`,
  //       },
  //     });

  //     // Create InfoWindow
  //     const infoWindow = new window.google.maps.InfoWindow({
  //       content: `<div style="text-align:center">
  //                   <strong>${name}</strong><br/>
  //                   <span style="color:${CATEGORY_COLORS[category]}">${category}</span>
  //                 </div>`,
  //     });

  //     // Show InfoWindow when clicking on marker
  //     marker.addListener("click", () => {
  //       infoWindow.open(map, marker);
  //     });
  //   }

  //   // Reset newMarker and input fields
  //   setNewMarker(null);
  //   setName("");
  // };

