"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, ExternalLink } from "lucide-react";

const CENTER = { lat: 38.1145845, lng: 13.36488 };
const PANO_ID = "Fxwjks-f84uffOHlasizSg";
const HEADING = 154.99;
const PITCH = 11.72;

const MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f7f4ee" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#2e3d2f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f7f4ee" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8e3d8" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#d8d0c0" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c5dce8" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d4e6c3" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
];

export function WhereMap() {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const streetRef = useRef<HTMLDivElement>(null);
  const [streetViewSet, setStreetViewSet] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 30 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (!mapInstance || !streetRef.current || streetViewSet) return;
    const panorama = new window.google.maps.StreetViewPanorama(streetRef.current, {
      pano: PANO_ID,
      pov: { heading: HEADING, pitch: PITCH },
      visible: true,
    });
    mapInstance.setStreetView(panorama);
    setStreetViewSet(true);
  }, [mapInstance, streetViewSet]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition((prev) => ({ x: prev.x + e.movementX, y: prev.y - e.movementY }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - 110, y: window.innerHeight - touch.clientY - 65 });
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-[#e8e3d8] bg-[#f7f4ee]">
        <p className="text-sm text-[#5a6b5b]">Caricamento mappa…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Indirizzo */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e8e3d8] bg-[#f7f4ee] px-5 py-4">
        <MapPin size={18} className="shrink-0 text-[#4a6741]" />
        <div>
          <p className="text-sm font-medium text-[#2e3d2f]">Thălēa Apartment</p>
          <p className="text-xs text-[#5a6b5b]">Via Maqueda 172, 90133 Palermo PA</p>
        </div>
        <a
          href={`https://www.google.com/maps?q=${CENTER.lat},${CENTER.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1.5 rounded-full border border-[#e8e3d8] px-3 py-1.5 text-xs text-[#5a6b5b] transition-colors hover:border-[#4a6741] hover:text-[#4a6741]"
        >
          <ExternalLink size={12} />
          Google Maps
        </a>
      </div>

      {/* Mappa */}
      <div
        className="relative h-[480px] w-full overflow-hidden rounded-xl border border-[#e8e3d8] shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={CENTER}
          zoom={17}
          options={{
            styles: MAP_STYLE,
            disableDefaultUI: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
          }}
          onLoad={(map) => setMapInstance(map)}
        >
          <Marker
            position={CENTER}
            icon={{
              url: "https://res.cloudinary.com/dbxysr1a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1737132781/PORTFOLIO-SERVER/PHOTO-2025-01-17-17-50-54.jpg",
              scaledSize: new window.google.maps.Size(44, 44),
            }}
            title="Thălēa Apartment Palermo"
          />
        </GoogleMap>

        {/* Mini Street View draggabile */}
        <div
          ref={streetRef}
          onMouseDown={(e) => { setIsDragging(true); e.preventDefault(); }}
          onTouchStart={() => setIsDragging(true)}
          className="absolute cursor-grab rounded-xl border border-white/30 shadow-2xl active:cursor-grabbing"
          style={{
            width: 240,
            height: 140,
            bottom: position.y,
            left: position.x,
            zIndex: 10,
            touchAction: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        />

        {/* Label drag */}
        <div
          className="pointer-events-none absolute rounded-full bg-black/50 px-2.5 py-1 text-xs text-white"
          style={{ bottom: position.y + 145, left: position.x + 4 }}
        >
          Street View
        </div>
      </div>
    </div>
  );
}