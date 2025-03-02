"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import useGoogleMap from "@/hooks/useGoogleMap";

import { Checkbox } from "./ui/checkbox";
import CategorySelector from "./CategorySelector";
import AddMarkerDetailsModal from "./AddMarkerDetailsModal";
import MarkerSymboleColors from "./MarkerSymboleColors";

const GoogleMap = () => {
  const t = useTranslations("map")

  const {
    mapRef,
    locale,
    markers,
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
    <div className="relative mt-20 px-2 md:px-4">
      <div className={clsx("flex gap-4 md:px-8 w-full", locale === "he" ? "flex-row-reverse" : "")}>
       
        {/* Filter Section */}
        <div
          className={clsx(
            "w-full md:w-1/4 fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:static md:bg-transparent md:shadow-none z-50",
            locale === "he" ? "flex-row-reverse" : ""
          )}
        >
          <div className="">
            <label
              className={clsx(
                locale === "he" ? "text-right" : "text-left",
                "mb-2 block w-full"
              )}
            >
              {t("filterCategoryLabel")}
            </label>
            <CategorySelector value={filteredCategory} setValue={setFilterCategory} />
          </div>
          <div
            className={`flex items-center space-x-2 my-4 cursor-pointer ${locale === "he" ? "flex-row-reverse" : ""
              }`}
          >
            <Checkbox
              id="clear"
              onClick={clearAllMarkers}
              checked={markers.length === 0}
              disabled={markers.length === 0}
            />
            <label
              htmlFor="clear"
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${locale === "he" ? "mr-2" : "ml-2"
                }`}
            >
              {t("clearAllMarkers")}
            </label>
          </div>
          <MarkerSymboleColors />
        </div>

        {/* Google Map Container */}
        <div className="w-full">
          <div ref={mapRef} style={{ height: "90vh" }} />
        </div>
      </div>


      {/* Add Marker Modal */}
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
            position={mapCenter}
            onSubmit={handleAddMarker}
          />
        </div>
      )
      }
    </div >
  );
};

export default GoogleMap;