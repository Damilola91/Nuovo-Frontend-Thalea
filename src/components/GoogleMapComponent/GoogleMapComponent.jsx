"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const streetRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [streetViewInstance, setStreetViewInstance] = useState(null);

  // Stato per drag
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 30 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const center = { lat: 38.1145845, lng: 13.36488 };
  const panoId = "Fxwjks-f84uffOHlasizSg";
  const heading = 154.99;
  const pitch = 11.72;

  const thaleaMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#f8f5f0" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#46331d" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#d8cbb4" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9e6f0" }],
    },
  ];

  useEffect(() => {
    if (!mapInstance || !streetRef.current || streetViewInstance) return;

    const panorama = new window.google.maps.StreetViewPanorama(
      streetRef.current,
      {
        pano: panoId,
        pov: { heading: heading, pitch: pitch },
        visible: true,
      }
    );

    mapInstance.setStreetView(panorama);
    setStreetViewInstance(panorama);
  }, [mapInstance, streetRef.current]);

  // --- Drag del mini Street View ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y - e.movementY,
    }));
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div
      className="relative w-full h-[500px] rounded-2xl shadow-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={(e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setPosition((prev) => ({
          x: touch.clientX - 110, // metà della larghezza del mini Street View
          y: window.innerHeight - touch.clientY - 65, // metà dell'altezza
        }));
      }}
      onTouchEnd={() => setIsDragging(false)}
      onTouchStart={(e) => setIsDragging(true)}
    >
      {/* Mappa principale */}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
        }}
        center={center}
        zoom={17}
        options={{
          styles: thaleaMapStyle,
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          draggable: true,
          gestureHandling: "greedy",
        }}
        onLoad={(map) => setMapInstance(map)}
      >
        <Marker
          position={center}
          icon={{
            url: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          title="Thălēa Apartment Palermo"
        />
      </GoogleMap>

      {/* Mini Street View responsive e draggabile */}
      <div
        ref={streetRef}
        onMouseDown={handleMouseDown}
        className="
          absolute cursor-grab active:cursor-grabbing
          w-[220px] h-[130px] 
          sm:w-[200px] sm:h-[120px]
          md:w-[240px] md:h-[140px]
          lg:w-[260px] lg:h-[150px]
          rounded-xl border border-gray-300 shadow-2xl
        "
        style={{
          zIndex: 10,
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          bottom: `${position.y}px`,
          left: `${position.x}px`,
          touchAction: "none",
        }}
      />
    </div>
  );
};

export default GoogleMapComponent;
