"use client";

const CardApartment = ({ apartmentData }) => {
  const { apartment, nights, totalPrice, guestsCount } = apartmentData;
  const images = apartment.images || [];

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
    </div>
  );
};

export default CardApartment;
