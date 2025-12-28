import React, { useState } from "react";

export const FormularioMultiple = () => {
  const initialSharedState = {
    fechaCupo: "",
    titularCpe: "",
    remitente: "",
    remitente2: "",
    especie: "",
    patente: "",
    procedencia: "",
  };

  const initialItemState = {
    CTG: "",
    analisis: "",
  };

  // Estado para datos compartidos
  const [sharedData, setSharedData] = useState(initialSharedState);
  const [especie, setEspecie] = useState("");

  // Estado para el item actual (CTG y Analisis)
  const [currentItem, setCurrentItem] = useState(initialItemState);

  // Lista de items agragados al formulario actual
  const [currentItemsList, setCurrentItemsList] = useState([]);

  // Lista de tarjetas generadas (formularios completados)
  const [listaGuardada, setListaGuardada] = useState([]);

  const [error, setError] = useState("");

  // Manejo de cambios en datos compartidos
  const handleSharedChange = (e) => {
    const { name, value } = e.target;
    setSharedData({
      ...sharedData,
      [name]: value,
    });
  };

  // Manejo de cambios en especie (dropdown)
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setEspecie(value);
    if (value === "Ingreso Manual") {
      setSharedData({ ...sharedData, especie: "" });
    } else {
      setSharedData({ ...sharedData, especie: value });
    }
  };

  // Manejo de cambios en item actual
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value,
    });
  };

  // Agregar item a la lista actual
  const addItem = () => {
    // Validacion CTG (solo 11 numeros)
    const ctgRegex = /^\d{11}$/;
    if (!ctgRegex.test(currentItem.CTG)) {
      setError("El CTG debe estar formado por 11 números.");
      return;
    }

    // Validacion CTG duplicado
    if (currentItemsList.some((item) => item.CTG === currentItem.CTG)) {
      setError("Este CTG ya ha sido agregado a la lista.");
      return;
    }

    setError("");
    setCurrentItemsList([...currentItemsList, currentItem]);
    setCurrentItem(initialItemState); // Limpiar inputs de item
  };

  // Eliminar item de la lista actual
  const removeItem = (index) => {
    const newList = currentItemsList.filter((_, i) => i !== index);
    setCurrentItemsList(newList);
  };

  // Finalizar carga del formulario actual
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItemsList.length === 0) {
      alert("Debes agregar al menos una CPE (CTG y Análisis).");
      return;
    }

    const newEntry = {
      shared: sharedData,
      items: currentItemsList,
    };

    setListaGuardada([...listaGuardada, newEntry]);

    // Resetear formulario
    setSharedData(initialSharedState);
    setEspecie("");
    setCurrentItemsList([]);
    setCurrentItem(initialItemState);
    setError("");
  };

  // Copiar al portapapeles
  const handleCopy = (entry) => {
    let text = `
*CALADOS AGROCEREALES DON FERNANDO SRL*
*Especie:* ${entry.shared.especie}
*Titular:* ${entry.shared.titularCpe}`;

    if (entry.shared.remitente) {
      text += `\n*Remitente:* ${entry.shared.remitente}`;
    }

    if (entry.shared.remitente2) {
      text += `\n*Remitente 2:* ${entry.shared.remitente2}`;
    }

    text += `
*Patente:* ${entry.shared.patente}
*Procedencia:* ${entry.shared.procedencia}
*Fecha cupo:* ${entry.shared.fechaCupo || "INFORMAR CUPO"}
`;

    // Listar items
    entry.items.forEach((item) => {
      text += `\nCTG: ${item.CTG} - Análisis: ${item.analisis}`;
    });

    navigator.clipboard.writeText(text.trim());
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <div className="col-md-5">
          <h2>Formulario Múltiple</h2>
          <form
            className="p-3 shadow-sm rounded bg-light"
            onSubmit={handleSubmit}
          >
            {/* --- DATOS COMPARTIDOS --- */}
            <h5 className="mb-3 text-primary">Datos Compartidos</h5>

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
                value={sharedData.fechaCupo}
                onChange={handleSharedChange}
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
                  value={sharedData.especie}
                  onChange={handleSharedChange}
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
                value={sharedData.titularCpe}
                onChange={handleSharedChange}
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
                value={sharedData.remitente}
                onChange={handleSharedChange}
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
                value={sharedData.remitente2}
                onChange={handleSharedChange}
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
                value={sharedData.patente}
                onChange={handleSharedChange}
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
                value={sharedData.procedencia}
                onChange={handleSharedChange}
              />
            </div>

            <hr />

            {/* --- CARGA INDIVIDUAL DE ITEMS --- */}
            <h5 className="mb-3 text-primary">Agregar CPE</h5>

            <div className="card p-2 mb-3 bg-white border-0 shadow-sm">
              <div className="mb-2">
                <label className="form-label fw-bold">N° CTG:</label>
                <input
                  type="text"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder="Ingrese N° CTG (11 dígitos)"
                  name="CTG"
                  value={currentItem.CTG}
                  onChange={handleItemChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Análisis:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese análisis"
                  name="analisis"
                  value={currentItem.analisis}
                  onChange={handleItemChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={addItem}
              >
                Agregar Item
              </button>
            </div>

            {/* LISTA PRELIMINAR DE ITEMS */}
            {currentItemsList.length > 0 && (
              <div className="mb-3">
                <h6>Items agregados ({currentItemsList.length}):</h6>
                <ul className="list-group">
                  {currentItemsList.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <small>
                        <strong>CTG:</strong> {item.CTG} <br />
                        <strong>Análisis:</strong> {item.analisis}
                      </small>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeItem(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-dark"
                style={{ backgroundColor: "#181d31", borderColor: "#181d31" }}
              >
                Generar Resumen
              </button>
            </div>
          </form>
        </div>

        {/* COLUMNA DERECHA: LISTADO DE CALADOS */}
        <div className="col-md-7">
          <div className="text-center mb-4">
            <h4>Listado de Calados Múltiples</h4>
            <p className="text-muted small">
              Click en copiar y pega en Whatsapp
            </p>
          </div>

          <div
            className="d-flex flex-column gap-3 overflow-auto"
            style={{ maxHeight: "80vh" }}
          >
            {listaGuardada.length === 0 ? (
              <p className="text-center text-muted">
                No hay calados cargados aún.
              </p>
            ) : (
              listaGuardada.map((entry, index) => (
                <div
                  key={index}
                  className="card p-3 shadow-sm bg-light text-dark"
                >
                  <div className="card-body">
                    <h6 className="fw-bold text-uppercase mb-3">
                      CALADOS AGROCEREALES DON FERNANDO SRL
                    </h6>
                    <p className="mb-1">
                      <strong>Especie:</strong> {entry.shared.especie}
                    </p>
                    <p className="mb-1">
                      <strong>Titular:</strong> {entry.shared.titularCpe}
                    </p>
                    {entry.shared.remitente && (
                      <p className="mb-1">
                        <strong>Remitente:</strong> {entry.shared.remitente}
                      </p>
                    )}
                    {entry.shared.remitente2 && (
                      <p className="mb-1">
                        <strong>Remitente 2:</strong> {entry.shared.remitente2}
                      </p>
                    )}
                    <p className="mb-1">
                      <strong>Patente:</strong> {entry.shared.patente}
                    </p>
                    <p className="mb-1">
                      <strong>Procedencia:</strong> {entry.shared.procedencia}
                    </p>
                    <p className="mb-3">
                      <strong>Fecha cupo:</strong>{" "}
                      {entry.shared.fechaCupo || "INFORMAR CUPO"}
                    </p>

                    <h6 className="border-bottom pb-2">Items:</h6>
                    {entry.items.map((item, i) => (
                      <div
                        key={i}
                        className="mb-1 ps-2 border-start border-3 border-secondary"
                      >
                        <strong>CTG:</strong> {item.CTG} -{" "}
                        <strong>Análisis:</strong> {item.analisis}
                      </div>
                    ))}

                    <button
                      className="btn btn-primary w-100 mt-3"
                      style={{ backgroundColor: "#8c9eff", border: "none" }}
                      onClick={() => handleCopy(entry)}
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
