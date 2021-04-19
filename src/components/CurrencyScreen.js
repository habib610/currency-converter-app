import axios from "axios";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { countries } from "./countries";
import Loader from "react-loader-spinner";

const CurrencyScreen = () => {
  const [primaryCountry, setPrimaryCounty] = useState("INR");
  const [secondaryCountry, setSecondaryCounty] = useState("INR");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    conversion_result: 0,
    result: "",
    time_last_update_unix: "",
    time_last_update_utc: "",
  });

  const [firstCountry, setFirstCountry] = useState("");
  const [secondCountry, setSecondCountry] = useState("");

  const [amount, setAmount] = useState(1);

  const apiUrl = `https://v6.exchangerate-api.com/v6/f3e5f9a1d552a33b1deea2a2/pair/${primaryCountry}/${secondaryCountry}/${amount}`;

  const getCurrency = async () => {
    setLoading(true);
    const { data } = await axios.get(apiUrl);
    const first = countries.find((item) => item.abb === primaryCountry);
    const second = countries.find((item) => item.abb === secondaryCountry);
    setFirstCountry(first.country);
    setSecondCountry(second.country);
    setResult({
      conversion_result: data.conversion_result,
      result: data.result,
      time_last_update_unix: data.time_last_update_unix,
      time_last_update_utc: data.time_last_update_utc,
    });
    setLoading(false);
  };

  return (
    <Row className="mt-5 pt-5">
      <Col>
        <Row>
          <Col md={8} className="mx-auto bg-dark  text-center">
            <Form>
              <Form.Row>
                <Col md={6}>
                  <h4>Currency I have</h4>
                  <Form.Control
                    as="select"
                    placeholder="Primary Country"
                    onChange={(e) => setPrimaryCounty(e.target.value)}
                  >
                    {countries.map((item) => (
                      <option key={item.id} value={item.abb}>
                        {item.abb} ({item.country})
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={6}>
                  <h4>Currency I want </h4>
                  <Form.Control
                    as="select"
                    placeholder="Primary Country"
                    onChange={(e) => setSecondaryCounty(e.target.value)}
                  >
                    {countries.map((item) => (
                      <option key={item.id} value={item.abb}>
                        {item.abb} ({item.country})
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Row>
              <h4 className="mt-2">Amount </h4>
              <Form.Row>
                <Col md={6} className="mx-auto">
                  <Form.Control
                    type="number"
                    value={amount}
                    placeholder="Enter Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Col>
              </Form.Row>
            </Form>
            <button className="myBtn" onClick={getCurrency}>
              Covert Currency
            </button>
          </Col>
        </Row>
        <Row>
          {result.result && !loading && (
            <Col md={8} className="mx-auto mt-5 text-center">
              <p>
                  <strong>{amount} {firstCountry} equals</strong>
              </p>
              <h1>
                {result.conversion_result} {secondCountry}
              </h1>
            </Col>
          )}

          {loading && (
            <Col md={8} className="mx-auto mt-5 text-center">
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                // timeout={3000} //3 secs
              />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default CurrencyScreen;
