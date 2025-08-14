"use client";

import { useRouter } from "next/navigation";

const CardApartment = ({ apartmentData }) => {
  const { apartment, nights, totalPrice, guestsCount } = apartmentData;
  const images = apartment.images || [];
  const router = useRouter();

  const handleBookingClick = () => {
    router.push("/booking");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
      <h4 className="text-lg font-bold mb-2">{apartment.name}</h4>
      {images.length > 0 && (
        <img
          src={images[0]}
          alt={apartment.name}
          className="w-full h-48 object-cover rounded-md mb-2"
        />
      )}
      <p>Notti: {nights}</p>
      <p>Prezzo totale: €{totalPrice}</p>
      <p>Ospiti: {guestsCount}</p>

      <div className="mt-4 text-center">
        <button
          onClick={handleBookingClick}
          className="bg-[#46331d] hover:bg-[#5a4621] text-white font-bold px-6 py-2 rounded-md transition-colors"
        >
          Prenota ora
        </button>
      </div>
    </div>
  );
};

export default CardApartment;
