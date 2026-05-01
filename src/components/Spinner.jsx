import "../styles/Spinner.css";

function Spinner() {
  return (
    <div className="spinner">
      <p className="spinner-icon">⏳</p>
      <p>Generating your recipe...</p>
    </div>
  );
}

export default Spinner;
