import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyScreen from "./components/CurrencyScreen";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <h1 className="text-center mb-5 bg-info py-2 text-white">Currency Converter App</h1>
      <Container className="text-white">
        <CurrencyScreen />
      </Container>
    </>
  );
}

export default App;
