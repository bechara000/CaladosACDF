import React, { useState } from "react";

export const FormularioIndividual = () => {
  const [especie, setEspecie] = useState("");

  return (
    <div>
      <h2>Formulario Individual</h2>
      <form className="p-3 col-5">
        <div className="mb-3">
          <label htmlFor="nCtg" className="form-label fw-bold">
            N° CTG:
          </label>
          <input
            type="text"
            className="form-control"
            id="nCtg"
            placeholder="Ingrese N° CTG"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaCupo" className="form-label fw-bold">
            Fecha Cupo:
          </label>
          <input
            type="text"
            className="form-control"
            id="fechaCupo"
            placeholder="Ingrese la fecha"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="especie" className="form-label fw-bold">
            Especie:
          </label>
          <select
            className="form-select"
            id="especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
          >
            <option value="" disabled>
              Elije una especie
            </option>
            {/* Agrega opciones según sea necesario */}
            <option value="Maíz">Maíz</option>
            <option value="Trigo">Trigo</option>
            <option value="Sorgo">Sorgo</option>
            <option value="Soja">Soja</option>
            <option value="Girasol">Girasol</option>
            <option value="Cebada forrajera">Cebada Forrajera</option>
            <option value="Ingreso Manual">Ingreso Manual</option>
          </select>
          {especie === "Ingreso Manual" && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Ingrese especie manual"
            />
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="titularCpe" className="form-label fw-bold">
            TITULAR CPE:
          </label>
          <input
            type="text"
            className="form-control"
            id="titularCpe"
            placeholder="Ingrese titular CPE"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="remitente" className="form-label fw-bold">
            REMITENTE:
          </label>
          <input
            type="text"
            className="form-control"
            id="remitente"
            placeholder="Ingrese Remitente Com."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="remitente2" className="form-label fw-bold">
            REMITENTE 2:
          </label>
          <input
            type="text"
            className="form-control"
            id="remitente2"
            placeholder="Ingrese Remitente Com."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="patente" className="form-label fw-bold">
            PATENTE:
          </label>
          <input
            type="text"
            className="form-control"
            id="patente"
            placeholder="Ingrese patente"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="procedencia" className="form-label fw-bold">
            PROCEDENCIA:
          </label>
          <input
            type="text"
            className="form-control"
            id="procedencia"
            placeholder="Ingrese procedencia"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="analisis" className="form-label fw-bold">
            ANÁLISIS:
          </label>
          <textarea
            className="form-control"
            id="analisis"
            rows="4"
            placeholder="INGRESE CALADO"
          ></textarea>
        </div>

        <div className="d-grid mt-4">
          <button
            type="submit"
            className="btn btn-dark"
            style={{ backgroundColor: "#181d31", borderColor: "#181d31" }}
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};
