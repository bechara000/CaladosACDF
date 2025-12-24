export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid navbox">
        <div>
          <a className="navbar-brand" href="#">
            Calados ACDF
          </a>
        </div>
        <div>
          <button type="button" className="btn btn-primary m-1">
            1 CPE
          </button>
          <button type="button" className="btn btn-primary m-1">
            Varias CPE
          </button>
        </div>
      </div>
    </nav>
  );
};
