"use client";

import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoMailOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#414d43] text-[#f8f9fa] py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Thălēa Apartment
          </h2>
          <p className="text-sm">
            Vivi Palermo con il comfort di casa, a due passi dalle meraviglie
            storiche.
          </p>
        </div>

        {/* Link rapidi */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Link Rapidi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="/dintorni" className="hover:underline">
                Dintorni
              </a>
            </li>
            <li>
              <a href="/contatti" className="hover:underline">
                Contatti
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Seguici</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/thaleapalermo?igsh=MTZlMjJiaG5pM3FxOQ%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram size={28} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoFacebook size={28} />
            </a>
            <a
              href="mailto:thaleapalermoapartment@gmail.com"
              className="hover:text-gray-300"
            >
              <IoMailOutline size={28} />
            </a>
            <a
              href="https://wa.me/message/ISKAFLHLXUDQI1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoWhatsapp size={28} />
            </a>
            <a
              href="https://www.booking.com/hotel/it/thalea-apartment.it.html?aid=356980&label=gog235jc-10CAsocUIQdGhhbGVhLWFwYXJ0bWVudEgUWANocYgBApgBM7gBB8gBDdgBA-gBAfgBAYgCAagCAbgCl6iMxQbAAgHSAiQxZTE2NDU1Ny05NmYwLTRlZDQtODIwYS1iNjQ0NWZhYzg2MWTYAgHgAgE&sid=4fafb32b2e7ba9f5288101626ad3f560&dest_id=-123798&dest_type=city&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1755518041&srpvid=ab30538c5769192b&type=total&ucfs=1&"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="/booking-icon.svg"
                alt="Booking.com"
                className="h-7 w-7"
              />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-[#46331d]"
            />
            <button
              type="submit"
              className="bg-[#46331d] hover:bg-[#5a4621] text-white font-semibold px-6 py-2 rounded-md transition-colors"
            >
              Iscriviti
            </button>
          </form>
          {subscribed && (
            <p className="text-green-400 mt-2 text-sm">
              Grazie per esserti iscritto!
            </p>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Thalea Palermo Apartment. All rights reserved.</p>
        <p className="font-semibold mt-1">CIN: IT082053C254M7HSWH</p>
      </div>
    </footer>
  );
};

export default Footer;
