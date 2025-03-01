"use client";

import React, { useEffect, useRef, useState } from "react";
import AddMarkerDetailsModal from "./AddMarkerDetailsModal";
import { useLocale, useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CATEGORY_COLORS } from "@/constant";



const GoMap = () => {
  const t = useTranslations("addMarkerModal");
  const locale = useLocale()

  const [isAddMarkerModalOpen, setIsAddMarkerModalOpen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState("Cafe");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [newMarker, setNewMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<{ x: number; y: number } | null>(null);
  const [markers, setMarkers] = useState<{ position: google.maps.LatLngLiteral; name: string; category: string }[]>([]);

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
    updateCenterPosition(mapInstance);

    mapInstance.addListener("idle", () => updateCenterPosition(mapInstance));
    mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        setIsAddMarkerModalOpen(true);
        setNewMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      }
    });
  };

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

  const handleAddMarker = () => {
    if (!newMarker || !name) return;
    const newMarkerObj = {
      position: newMarker,
      name,
      category,
      desc,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarkerObj]);

    if (map) {
      const marker = new window.google.maps.Marker({
        position: newMarker,
        map: map,
        icon: {
          url: `https://maps.google.com/mapfiles/ms/icons/${CATEGORY_COLORS[category]}-dot.png`,
          labelOrigin: new window.google.maps.Point(0, 32),
        },
        label: {
          text: `${name} (${category})`,
          color: CATEGORY_COLORS[category],
          fontWeight: "bold",
          fontSize: "14px",
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="text-align:center; width: 200px;">
                    <strong>${name}</strong><br/>
                    <span style="color:${CATEGORY_COLORS[category]}">${category}</span>
                    <p>${desc}</p>
                  </div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      setIsAddMarkerModalOpen(false);
    }

    setNewMarker(null);
    setName("");
    setDesc("");
  };

  return (
    <div className="relative mt-20">
      <div className="z-50">
        <Select
          value={category}
          onValueChange={setCategory}
          dir={locale === "he" ? "rtl" : "ltr"}
        >
          <SelectTrigger className="mb-3 focus:ring-0 focus:outline-none">
            <SelectValue placeholder={t("categoryPlaceholder")} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Cafe">{t("categories.cafe")}</SelectItem>
            <SelectItem value="Restaurant">{t("categories.restaurant")}</SelectItem>
            <SelectItem value="Park">{t("categories.park")}</SelectItem>
            <SelectItem value="Shopping">{t("categories.shopping")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div ref={mapRef} style={{ height: "90vh", width: "100%" }} />

      {isAddMarkerModalOpen && mapCenter && (
        <div className="w-full h-full relative flex items-center">
          <AddMarkerDetailsModal
            isOpen={isAddMarkerModalOpen}
            setIsOpen={setIsAddMarkerModalOpen}
            title={name}
            setTitle={setName}
            category={category}
            setCategory={setCategory}
            desc={desc}
            setDesc={setDesc}
            onSubmit={handleAddMarker}
            position={mapCenter}
          />
        </div>
      )}
    </div>
  );
};

export default GoMap;
