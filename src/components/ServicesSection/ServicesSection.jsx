"use client";

const ServicesSection = () => {
  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    >
      <div className="container mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: "#46331d" }}
        >
          Servizi Inclusi
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
            <svg
              className="w-8 h-8"
              style={{ color: "#46331d" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
            <span className="font-medium" style={{ color: "#46331d" }}>
              WiFi Gratuito
            </span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
            <svg
              className="w-8 h-8"
              style={{ color: "#46331d" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="font-medium" style={{ color: "#46331d" }}>
              Parcheggio
            </span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
            <svg
              className="w-8 h-8"
              style={{ color: "#46331d" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="font-medium" style={{ color: "#46331d" }}>
              Cucina Completa
            </span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
            <svg
              className="w-8 h-8"
              style={{ color: "#46331d" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-medium" style={{ color: "#46331d" }}>
              Check-in 24h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
