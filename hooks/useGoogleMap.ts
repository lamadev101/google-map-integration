import { CATEGORY_COLORS } from "@/constant";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function useGoogleMap() {
  const locale = useLocale();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [category, setCategory] = useState("");
  const [filteredCategory, setFilterCategory] = useState("All");

  const [mapLoaded, setMapLoaded] = useState(false);
  const [isAddMarkerModalOpen, setIsAddMarkerModalOpen] = useState(false);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number } | null>(null);
  const [newMarker, setNewMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [markers, setMarkers] = useState<{ position: google.maps.LatLngLiteral; name: string; category: string; desc: string }[]>([]);

  // Use a ref to keep track of the current markers on the map
  const mapRef = useRef<HTMLDivElement>(null);
  const currentMarkersRef = useRef<google.maps.Marker[]>([]);

  // Load Google Maps API
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${process.env.NEXT_PUBLIC_GOMAPS_API_KEY}&libraries=geometry,places&language=${locale}`;
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      initMap();
    }
  }, [mapLoaded]);

  // Load markers from localStorage when component mounts
  useEffect(() => {
    const storedMarkers = localStorage.getItem("mapMarkers");
    if (storedMarkers) {
      let parsedMarkers = JSON.parse(storedMarkers);
      setMarkers(parsedMarkers);
    }
  }, []);

  // Update displayed markers when category is changed
  useEffect(() => {
    if (map) {
      updateMapMarkers();
    }
  }, [markers, filteredCategory]);


  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 51.505, lng: -0.09 },
      zoom: 13,
    });

    setMap(mapInstance);
    updateCenterPosition(mapInstance);

    // Click event to add a new marker
    mapInstance.addListener("idle", () => updateCenterPosition(mapInstance));
    mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setIsAddMarkerModalOpen(true);
        setNewMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      }
    });

    updateMapMarkers();
  };

  // Track the modal position based on the map center
  const updateCenterPosition = (mapInstance: google.maps.Map) => {
    if (!mapRef.current) return;
    const center = mapInstance.getCenter();
    if (!center) return;

    const projection = mapInstance.getProjection();
    if (!projection) return;

    const centerPoint = projection.fromLatLngToPoint(center);
    if (!centerPoint) return;

    setMapCenter({ x: mapRef.current.clientWidth / 2, y: mapRef.current.clientHeight / 2 });
  };

  const updateMapMarkers = () => {
    if (!map) return;

    // Clear existing markers
    currentMarkersRef.current.forEach((marker) => marker.setMap(null));
    currentMarkersRef.current = [];

    // Filter markers based on selected category
    const filteredMarkers = filteredCategory !== "All"
      ? markers.filter((marker) => marker.category === filteredCategory)
      : markers;

    // Add markers to the map
    filteredMarkers.forEach((markerData) => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: map,
        icon: {
          url: `https://maps.google.com/mapfiles/ms/icons/${CATEGORY_COLORS[markerData.category]}-dot.png`,
          labelOrigin: new window.google.maps.Point(0, 32),
        },
        label: {
          text: `${markerData.name} (${markerData.category})`,
          color: CATEGORY_COLORS[markerData.category],
          fontWeight: "bold",
          fontSize: "14px",
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align:center; width: 200px;">
                    <strong>${markerData.name}</strong><br/>
                    <span style="color:${CATEGORY_COLORS[markerData.category]}">${markerData.category}</span>
                    <p>${markerData.desc}</p>
                  </div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Add the new marker to the ref
      currentMarkersRef.current.push(marker);
    });
  };

  const handleAddMarker = () => {
    if (!newMarker || !name || !category || !desc) {
      alert("Please fill in all the fields");
      return;
    }

    const newMarkerObj = {
      position: newMarker,
      name,
      category,
      desc,
    };

    const updatedMarkers = [...markers, newMarkerObj];

    // Save markers to localStorage
    localStorage.setItem("mapMarkers", JSON.stringify(updatedMarkers));

    // Update state
    setMarkers(updatedMarkers);
    setIsAddMarkerModalOpen(false);
    setNewMarker(null);
    setName("");
    setDesc("");
    setFilterCategory("All");
  };

  const clearAllMarkers = () => {
    // Clear markers from localStorage
    localStorage.removeItem("mapMarkers");

    // Clear markers from the map
    currentMarkersRef.current.forEach((marker) => marker.setMap(null));
    currentMarkersRef.current = []; // Reset the ref

    // Clear markers from the state
    setMarkers([]);
  };

  return {
    mapRef,
    locale,
    category,
    setCategory,
    mapCenter,
    name, setName,
    desc, setDesc,
    filteredCategory,
    setFilterCategory,
    isAddMarkerModalOpen,
    setIsAddMarkerModalOpen,
    handleAddMarker,
    clearAllMarkers,
  }
}