import { store } from "../store"; // percorso corretto al tuo store
import {
  clearAvailability,
  clearCompleted,
  clearConfirmed,
  clearBookingDetails,
} from "../reducer/bookingSlice";
import { clearOrderState } from "../reducer/orderSlice";

export const clearReduxStore = () => {
  const cookieKey = "thalea_cookies_preferences";

  // Salva il cookie
  const cookies = localStorage.getItem(cookieKey);

  // Dispatch per svuotare il Redux store
  store.dispatch(clearAvailability());
  store.dispatch(clearCompleted());
  store.dispatch(clearConfirmed());
  store.dispatch(clearBookingDetails());
  store.dispatch(clearOrderState());

  // Persistor aggiorna localStorage per riflettere il reset
  // Se usi redux-persist:
  const { persistor } = store;
  persistor.flush(); // forza il salvataggio

  // Ripristina i cookie
  if (cookies) {
    localStorage.setItem(cookieKey, cookies);
  }
};
