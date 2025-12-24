import React, { useState } from "react";
import FormularioIndividual from "./FormularioIndividual";
import FormularioMultiple from "./FormularioMultiple";

export const FormMananger = () => {
  // 'inicio', 'individual', o 'multiple'
  const [vista, setVista] = useState("inicio");

  return (
    <div className="container-fluid min-vh-100 bg-dark text-white p-4">
      {/* HEADER SIEMPRE VISIBLE */}
      <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
        <h3>Calados ACDF</h3>
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => setVista("individual")}
          >
            1 CPE
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setVista("multiple")}
          >
            Varias CPE
          </button>
          <button
            className="btn btn-outline-light ms-3"
            onClick={() => setVista("inicio")}
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <main>
        {vista === "inicio" && (
          <div className="text-center mt-5">
            <h2>Bienvenido</h2>
            <p>Seleccione una opción arriba para comenzar.</p>
          </div>
        )}

        {vista === "individual" && <FormularioIndividual />}

        {vista === "multiple" && <FormularioMultiple />}
      </main>
    </div>
  );
};
