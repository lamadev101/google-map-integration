"use client";

import { Button } from "./ui/button";
import useGoogleMap from "@/hooks/useGoogleMap";
import CategorySelector from "./CategorySelector";
import AddMarkerDetailsModal from "./AddMarkerDetailsModal";
import { CATEGORY_COLORS } from "@/constant";
import clsx from "clsx";

const GoogleMap = () => {

  const {
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
  } = useGoogleMap();


  return (
    <div className="relative mt-20 px-4">
      <div className={clsx("flex gap-4 px-8 w-full", locale === "he" ? "flex-row-reverse" : "")}>
        <div className="w-1/4">
          <div className="">
            <label className="mb-2">Filter Marker by Category</label>
            <CategorySelector value={filteredCategory} setValue={setFilterCategory} />
          </div>

          <Button
            variant={"destructive"}
            onClick={clearAllMarkers}
            className="bg-red-500 cursor-pointer"
          >
            Clear all markers
          </Button>

          <div className="mt-8">
            <h3 className=" font-bold text-xl">Marker Symbols</h3>
            {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
              <div
                key={color}
                className="flex items-center gap-2 mt-2"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Google Map Container */}
        <div className="w-full">
          <div
            ref={mapRef}
            style={{ height: "90vh" }}
          />
        </div>
      </div>


      {/* Add Marker Modal */}
      {isAddMarkerModalOpen && (
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
            position={mapCenter}
            onSubmit={handleAddMarker}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleMap;