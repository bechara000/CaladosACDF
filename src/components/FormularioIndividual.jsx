import React, { useState } from "react";

export const FormularioIndividual = () => {
  const initialState = {
    CTG: "",
    fechaCupo: "",
    titularCpe: "",
    remitente: "",
    remitente2: "",
    especie: "",
    patente: "",
    procedencia: "",
    analisis: "",
  };

  const [especie, setEspecie] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [listaCalados, setListaCalados] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setEspecie(value);
    if (value === "Ingreso Manual") {
      setFormData({ ...formData, especie: "" });
    } else {
      setFormData({ ...formData, especie: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion CTG (solo 11 numeros)
    const ctgRegex = /^\d{11}$/;
    if (!ctgRegex.test(formData.CTG)) {
      setError("El CTG debe estar formado por 11 números.");
      return;
    }

    setError(""); // Limpiar error si pasa validacion
    setListaCalados([...listaCalados, formData]);
    setFormData(initialState);
    setEspecie("");
  };

  const handleCopy = (item) => {
    let text = `
*CALADO AGROCEREALES DON FERNANDO SRL*
*N° CTG:* ${item.CTG}
*Especie:* ${item.especie}
*Titular:* ${item.titularCpe}`;

    if (item.remitente) {
      text += `\n*Remitente:* ${item.remitente}`;
    }

    if (item.remitente2) {
      text += `\n*Remitente 2:* ${item.remitente2}`;
    }

    text += `
*Patente:* ${item.patente}
*Procedencia:* ${item.procedencia}
*Fecha cupo:* ${item.fechaCupo || "INFORMAR CUPO"}
*Análisis:* ${item.analisis}`;

    navigator.clipboard.writeText(text.trim());
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="col-md-5">
          <h2>Formulario Individual</h2>
          <form
            className="p-3 shadow-sm rounded bg-light"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="CTG" className="form-label fw-bold">
                N° CTG:
              </label>
              <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                id="CTG"
                placeholder="Ingrese N° CTG"
                name="CTG"
                value={formData.CTG}
                onChange={handleChange}
              />
              {error && <div className="invalid-feedback">{error}</div>}
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
                name="fechaCupo"
                value={formData.fechaCupo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="especie" className="form-label fw-bold">
                Especie:
              </label>
              <select
                className="form-select"
                id="especie"
                name="especie"
                value={especie}
                onChange={handleSelectChange}
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
                  name="especie"
                  value={formData.especie}
                  onChange={handleChange}
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
                name="titularCpe"
                value={formData.titularCpe}
                onChange={handleChange}
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
                name="remitente"
                value={formData.remitente}
                onChange={handleChange}
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
                name="remitente2"
                value={formData.remitente2}
                onChange={handleChange}
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
                name="patente"
                value={formData.patente}
                onChange={handleChange}
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
                name="procedencia"
                value={formData.procedencia}
                onChange={handleChange}
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
                name="analisis"
                value={formData.analisis}
                onChange={handleChange}
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

        {/* COLUMNA DERECHA: LISTADO DE CALADOS */}
        <div className="col-md-7">
          <div className="text-center mb-4">
            <h4>Listado de Calados</h4>
            <p className="text-muted small">
              Click en copiar y pega en Whatsapp
            </p>
          </div>

          <div
            className="d-flex flex-column gap-3 overflow-auto"
            style={{ maxHeight: "80vh" }}
          >
            {listaCalados.length === 0 ? (
              <p className="text-center text-muted">
                No hay calados cargados aún.
              </p>
            ) : (
              listaCalados.map((item, index) => (
                <div
                  key={index}
                  className="card p-3 shadow-sm bg-light text-dark"
                >
                  <div className="card-body">
                    <h6 className="fw-bold text-uppercase mb-3">
                      CALADO AGROCEREALES DON FERNANDO SRL
                    </h6>
                    <p className="mb-1">
                      <strong>N° CTG:</strong> {item.CTG}
                    </p>
                    <p className="mb-1">
                      <strong>Especie:</strong> {item.especie}
                    </p>
                    <p className="mb-1">
                      <strong>Titular:</strong> {item.titularCpe}
                    </p>
                    {item.remitente && (
                      <p className="mb-1">
                        <strong>Remitente:</strong> {item.remitente}
                      </p>
                    )}
                    {item.remitente2 && (
                      <p className="mb-1">
                        <strong>Remitente 2:</strong> {item.remitente2}
                      </p>
                    )}
                    <p className="mb-1">
                      <strong>Patente:</strong> {item.patente}
                    </p>
                    <p className="mb-1">
                      <strong>Procedencia:</strong> {item.procedencia}
                    </p>
                    <p className="mb-1">
                      <strong>Fecha cupo:</strong>{" "}
                      {item.fechaCupo || "INFORMAR CUPO"}
                    </p>
                    <p className="mb-1">
                      <strong>Análisis:</strong> {item.analisis}
                    </p>

                    <button
                      className="btn btn-primary w-100 mt-3"
                      style={{ backgroundColor: "#8c9eff", border: "none" }}
                      onClick={() => handleCopy(item)}
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
