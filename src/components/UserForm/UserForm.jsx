"use client";

import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

// forwardRef per consentire lo scroll dall'alto
const UserForm = forwardRef(function UserForm(
  { userData, handleUserChange, onCheckboxChange },
  ref
) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const onToggle = (e) => {
    const v = e.target.checked;
    setChecked(v);
    onCheckboxChange?.(v);
  };

  return (
    <section
      ref={ref}
      id="userform-top"
      className="mb-12 max-w-lg mx-auto bg-[#f3f1e7] p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4 text-[#46331d] text-center">
        {t("userForm.title")}
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-medium text-[#46331d]"
          >
            *{t("userForm.fullName")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder={t("userForm.fullNamePlaceholder")}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-[#46331d]"
          >
            *{t("userForm.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder={t("userForm.emailPlaceholder")}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-[#46331d]"
          >
            *{t("userForm.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleUserChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#46331d] bg-white"
            placeholder={t("userForm.phonePlaceholder")}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="accept"
            checked={checked}
            onChange={onToggle}
            className="w-4 h-4"
          />
          <label htmlFor="accept" className="text-sm text-[#46331d]">
            *{t("userForm.accept")}{" "}
            <a href="/privacy-policy" className="underline text-blue-600">
              {t("userForm.privacyPolicy")}
            </a>
          </label>
        </div>
      </div>
    </section>
  );
});

export default UserForm;
