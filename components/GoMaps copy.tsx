"use client";

import React, { useEffect, useRef, useState } from "react";

const CATEGORY_COLORS: { [key: string]: string } = {
  Cafe: "red",
  Restaurant: "blue",
  Park: "green",
  Shopping: "purple",
};

const GoMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [name, setName] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("Cafe");
  const [map, setMap] = useState<google.maps.Map | any>([]);
  const [markers, setMarkers] = useState<{ position: google.maps.LatLngLiteral; name: string; category: string }[]>([]);
  const [newMarker, setNewMarker] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${process.env.NEXT_PUBLIC_GOMAPS_API_KEY}&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      initMap();
    }
  }, [mapLoaded]);

  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 51.505, lng: -0.09 },
      zoom: 13,
    });

    setMap(mapInstance);

    mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setNewMarker({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }
    });
  };


  const handleAddMarker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarker || !name) return;

    const newMarkerObj = {
      position: newMarker,
      name,
      category,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarkerObj]);

    if (map) {
      // Create marker with a label
      const marker = new window.google.maps.Marker({
        position: newMarker,
        map: map,
        icon: {
          url: `https://maps.google.com/mapfiles/ms/icons/${CATEGORY_COLORS[category]}-dot.png`,
          labelOrigin: new window.google.maps.Point(0, 32), // Position label below the marker
        },
        label: {
          text: `${name} (${category})`,
          color: CATEGORY_COLORS[category], // Set text color
          fontWeight: "bold",
          fontSize: "14px",
        },
      });

      //     // Create InfoWindow
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align:center">
                    <strong>${name}</strong><br/>
                    <span style="color:${CATEGORY_COLORS[category]}">${category}</span>
                  </div>`,
      });

      // Show InfoWindow when clicking on marker
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }

  // Reset input fields
  setNewMarker(null);
  setName("");
};

return (
  <div>
    <h3>Click on the map to add a marker</h3>
    <div ref={mapRef} style={{ height: "500px", width: "100%" }} />

    {newMarker && (
      <div style={{ marginTop: "10px", padding: "10px", background: "#f4f4f4" }}>
        <h4>Add Marker</h4>
        <input
          type="text"
          placeholder="Enter place name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "5px", marginBottom: "5px", width: "100%" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "5px", width: "100%" }}
        >
          {Object.keys(CATEGORY_COLORS).map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddMarker}
          style={{ padding: "5px", marginTop: "5px" }}
        >
          Add Marker
        </button>
      </div>
    )}
  </div>
);
};

export default GoMap;
