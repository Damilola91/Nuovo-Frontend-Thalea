"use client";

import { useState, useEffect } from "react";

const UserForm = ({
  userData,
  handleUserChange,
  onCheckboxChange,
  onValidSubmit,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onCheckboxChange(checked); // comunica al padre lo stato della checkbox
    if (checked) {
      onValidSubmit(); // se selezionata, chiama dispatch
    }
  }, [checked]);

  return (
    <section className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
        I tuoi dati
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-medium text-[#46331d]"
          >
            Nome completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-[#46331d]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder="mario@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-[#46331d]"
          >
            Telefono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder="+39 123 456 7890"
          />
        </div>

        {/* 🔹 Checkbox conferma */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="accept"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="accept" className="text-sm text-[#46331d]">
            Confermo la prenotazione
          </label>
        </div>

        {!checked && (
          <p className="text-red-500 mt-2 text-sm">
            Devi selezionare la checkbox per completare la prenotazione.
          </p>
        )}
      </div>
    </section>
  );
};

export default UserForm;
