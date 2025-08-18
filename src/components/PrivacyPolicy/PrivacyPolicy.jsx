"use client";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="container mx-auto mt-20 flex-grow px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-[#46331d] text-center drop-shadow-lg">
          Privacy Policy – Thalea Apartment
        </h1>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            1. Titolare del Trattamento
          </h2>
          <p>Il titolare del trattamento dei dati personali è:</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Thalea Apartment</strong>
            </li>
            <li>Via Cagliari 5, Palermo, Italia</li>
            <li>Email: thaleapalermoapartment@gmail.com</li>
            <li>Telefono: +39 [numero di telefono]</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            2. Tipologia di dati raccolti
          </h2>
          <p>Raccogliamo e trattiamo i seguenti dati personali:</p>
          <ul className="list-disc list-inside">
            <li>
              Dati anagrafici e di contatto: nome, cognome, email, numero di
              telefono.
            </li>
            <li>
              Dati relativi alla prenotazione: date di arrivo e partenza, numero
              di ospiti, preferenze specifiche.
            </li>
            <li>
              Dati di pagamento: informazioni necessarie per completare la
              transazione (gestite in sicurezza tramite provider esterno come
              Stripe o PayPal).
            </li>
            <li>
              Dati di navigazione: cookie, indirizzo IP, tipo di browser, pagine
              visitate, finalità statistiche e di miglioramento dei servizi.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            3. Finalità del trattamento
          </h2>
          <ul className="list-disc list-inside">
            <li>Gestione delle prenotazioni e comunicazioni con gli ospiti.</li>
            <li>
              Adempimento di obblighi fiscali e contabili previsti dalla legge.
            </li>
            <li>
              Invio di comunicazioni relative al soggiorno, aggiornamenti o
              offerte speciali (solo se espresso consenso).
            </li>
            <li>
              Analisi statistiche anonime per migliorare i servizi offerti.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            4. Base giuridica del trattamento
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Esecuzione di un contratto (prenotazione della casa vacanze).
            </li>
            <li>Adempimento di obblighi legali.</li>
            <li>
              Consenso dell’utente per comunicazioni promozionali o newsletter.
            </li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">5. Conservazione dei dati</h2>
          <ul className="list-disc list-inside">
            <li>Dati di prenotazione: fino a 10 anni per finalità fiscali.</li>
            <li>Dati di navigazione anonimizzati: fino a 24 mesi.</li>
            <li>Dati di marketing: fino a revoca del consenso.</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            6. Comunicazione dei dati a terzi
          </h2>
          <p>I dati personali possono essere comunicati a:</p>
          <ul className="list-disc list-inside">
            <li>Fornitori di servizi di pagamento (Stripe, PayPal).</li>
            <li>Fornitori di servizi informatici e hosting.</li>
            <li>Autorità pubbliche, se richiesto dalla legge.</li>
          </ul>
          <p>
            I dati{" "}
            <strong>non saranno ceduti a terzi per finalità commerciali</strong>{" "}
            senza il consenso espresso dell’utente.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            7. Diritti dell’interessato
          </h2>
          <p>L’ospite ha diritto di:</p>
          <ul className="list-disc list-inside">
            <li>Accedere ai propri dati personali.</li>
            <li>Chiedere la rettifica o la cancellazione dei dati.</li>
            <li>
              Richiedere la limitazione del trattamento o la portabilità dei
              dati.
            </li>
            <li>Opporsi al trattamento per motivi legittimi.</li>
            <li>Revocare il consenso in qualsiasi momento.</li>
          </ul>
          <p>
            Per esercitare tali diritti, contattare il titolare ai recapiti
            indicati nella sezione 1.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">8. Sicurezza dei dati</h2>
          <p>
            Thalea Apartment adotta misure tecniche e organizzative per
            proteggere i dati personali da accessi non autorizzati, perdita o
            alterazione. I dati di pagamento sono gestiti esclusivamente tramite
            provider esterni certificati e sicuri.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">
            9. Modifiche alla Privacy Policy
          </h2>
          <p>
            Thalea Apartment si riserva il diritto di aggiornare questa Privacy
            Policy. Gli aggiornamenti saranno pubblicati sul sito web e indicati
            con la data di revisione.
          </p>
        </section>

        <section className="mb-8 space-y-6 text-[#46331d]">
          <h2 className="text-2xl font-semibold">10. Contatti</h2>
          <p>Per qualsiasi informazione o richiesta relativa alla privacy:</p>
          <ul className="list-disc list-inside">
            <li>Email: info@thaleapalermo.com</li>
            <li>Telefono: +39 [numero di telefono]</li>
          </ul>
        </section>
      </main>

      <p className="mb-6 text-[#46331d] text-center">
        Ultimo aggiornamento: 16 Agosto 2025
      </p>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
