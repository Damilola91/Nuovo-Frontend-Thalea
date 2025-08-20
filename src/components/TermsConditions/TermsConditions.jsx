"use client";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-[#46331d] text-center drop-shadow-lg">
          Condizioni Generali – Thalea Apartment
        </h1>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">1. Oggetto</h2>
          <p>
            Le presenti condizioni generali disciplinano la prenotazione e il
            soggiorno presso <strong>Thalea Apartment</strong>, situato in Via
            Cagliari 5, Palermo.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">2. Prenotazioni</h2>
          <ul className="list-disc list-inside">
            <li>
              La prenotazione si considera confermata al ricevimento della
              relativa conferma via email.
            </li>
            <li>
              Al momento della prenotazione può essere richiesto il pagamento
              parziale o totale a garanzia.
            </li>
            <li>
              Il cliente è tenuto a fornire dati corretti e aggiornati al
              momento della prenotazione.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">3. Pagamenti</h2>
          <p>
            I pagamenti possono essere effettuati tramite carta di credito,
            debito o altri metodi elettronici supportati (Stripe, PayPal).
          </p>
          <p>
            Il saldo totale deve essere effettuato entro i termini indicati
            nella conferma di prenotazione.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">4. Cancellazioni</h2>
          <p>
            Le politiche di cancellazione sono specificate in fase di
            prenotazione. In caso di cancellazione tardiva o mancata
            presentazione, potrà essere addebitato l’importo totale o una parte
            del soggiorno.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">5. Check-in e Check-out</h2>
          <ul className="list-disc list-inside">
            <li>Check-in: dalle ore 14:00.</li>
            <li>Check-out: entro le ore 10:00.</li>
            <li>
              Eventuali variazioni devono essere concordate anticipatamente.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">6. Obblighi dell’Ospite</h2>
          <ul className="list-disc list-inside">
            <li>
              Rispettare l’appartamento, gli arredi e le aree comuni evitando
              danni.
            </li>
            <li>
              Non superare il numero massimo di ospiti indicato nella
              prenotazione.
            </li>
            <li>Rispettare le regole della casa comunicate al check-in.</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            7. Responsabilità di Thalea Apartment
          </h2>
          <p>
            Thalea Apartment non è responsabile per eventuali furti, smarrimenti
            o danni a beni personali degli ospiti. È responsabilità degli ospiti
            custodire i propri effetti personali.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">8. Forza Maggiore</h2>
          <p>
            In caso di eventi imprevisti (es. calamità naturali, emergenze
            sanitarie) che impediscano il soggiorno, Thalea Apartment potrà
            annullare la prenotazione senza obbligo di risarcimento, salvo
            rimborso di eventuali somme già versate.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">9. Legge Applicabile</h2>
          <p>
            Le presenti condizioni sono regolate dalla legge italiana. Per ogni
            controversia sarà competente il Foro di Palermo.
          </p>
        </section>
      </main>

      <p className="mb-6 text-[#46331d] text-center">
        Ultimo aggiornamento: 20 Agosto 2025
      </p>

      <Footer />
    </div>
  );
};

export default TermsConditions;
