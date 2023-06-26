import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Copy from "./assets/icon-copy.svg";
import Check from "./assets/icon-check.svg";
import Arrow from "./assets/icon-arrow-right.svg";

function App() {
  const [value, setValue] = useState(10);
  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const uppercase = "QWERTYUIOPASDFGHJKLZXCVBNM";

  const lowercase = "qwertyuiopasdfghjklzxcvbnm";
  const numberList = "1234567890";
  const symbolChars = '!@#$%^&*()_+-={}[];:"|,.<>?';

  const [password, setPassword] = useState("Password");

  const [includeUppercase, setUppercase] = useState(false);
  const [includeLowercase, setLower] = useState(false);
  const [number, setNumber] = useState(false);
  const [includeSymbol, setSymbol] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  function copyButton() {
    navigator.clipboard.writeText(password);
  }
  function generateLevel() {
    let levelAnswer = "";
    let levelType = 0;
    if (includeUppercase) {
      levelType++;
    }
    if (includeLowercase) {
      levelType++;
    }
    if (number) {
      levelType++;
    }
    if (includeSymbol) {
      levelType++;
    }

    if (levelType === 0) {
      levelAnswer = "";
    }
    if (
      levelType === 1 ||
      (value < 5 && (uppercase || lowercase || numberList || symbolChars))
    ) {
      levelAnswer = "TOO WEAK!";
    }
    if (
      levelType === 2 ||
      (value > 5 &&
        value < 10 &&
        (uppercase || lowercase || numberList || symbolChars))
    ) {
      levelAnswer = "WEAK";
    }

    if (
      levelType === 3 ||
      (value > 10 &&
        value < 15 &&
        (uppercase || lowercase || numberList || symbolChars))
    ) {
      levelAnswer = "MEDIUM";
    }
    if (
      levelType === 4 ||
      (value > 15 && (uppercase || lowercase || numberList || symbolChars))
    ) {
      levelAnswer = "STRONG";
    }

    return levelAnswer;
  }

  function generatePassword() {
    let charachterList = "";
    if (includeUppercase) {
      charachterList += uppercase;
    }
    if (includeLowercase) {
      charachterList += lowercase;
    }
    if (number) {
      charachterList += numberList;
    }
    if (includeSymbol) {
      charachterList += symbolChars;
    }

    let newPassword = "";
    for (let i = 0; i < value; i++) {
      const randomIndex = Math.floor(Math.random() * charachterList.length);
      newPassword += charachterList[randomIndex];
    }
    setPassword(newPassword);
    return newPassword;
  }
  function handleGeneratePassword() {
    const newPassword = generatePassword(
      value,
      uppercase,
      lowercase,
      number,
      symbolChars,
      generateLevel
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="head-title">Password Generator</h1>
        <div className="result">
          <p className="show-password">{password}</p>
          <img onClick={copyButton} className="copy" src={Copy} alt="" />
        </div>
        <div className="main-info">
          <div className="head-info">
            <h1 className="length">Character Length</h1>
            <h2 className="number">{value}</h2>
          </div>

          <div className="slider">
            <input
              style={{
                background: `linear-gradient(to right, #a4ffaf 0%, #a4ffaf ${
                  value * 5
                }%, #18171f 0%, #18171f 100%)`,
              }}
              onChange={handleSliderChange}
              value={value}
              type="range"
              min="0"
              max="20"
            />
          </div>

          <div className="check">
            <div className="middle-section">
              <div
                onClick={() => setUppercase(!includeUppercase)}
                style={{
                  backgroundColor: includeUppercase ? "#A4FFAF" : "transparent",
                  border: includeUppercase
                    ? "2px solid #A4FFAF"
                    : "2px solid #E6E5EA",
                }}
                className="checkbox"
              >
                {includeUppercase ? (
                  <img className="check-icon" src={Check} alt="" />
                ) : (
                  <div></div>
                )}
              </div>
              <h1 className="title uppercase">Include Uppercase Letters</h1>
            </div>
            <div className="middle-section">
              <div
                onClick={() => setLower(!includeLowercase)}
                style={{
                  backgroundColor: includeLowercase ? "#A4FFAF" : "transparent",
                  border: includeLowercase
                    ? "2px solid #A4FFAF"
                    : "2px solid #E6E5EA",
                }}
                className="checkbox"
              >
                {includeLowercase ? (
                  <img className="check-icon" src={Check} alt="" />
                ) : (
                  <div></div>
                )}{" "}
              </div>
              <h1 className="title lowcase">Include Lowercase Letters</h1>
            </div>
            <div className="middle-section">
              <div
                onClick={() => setNumber(!number)}
                style={{
                  backgroundColor: number ? "#A4FFAF" : "transparent",
                  border: number ? "2px solid #A4FFAF" : "2px solid #E6E5EA",
                }}
                className="checkbox"
              >
                {number ? (
                  <img className="check-icon" src={Check} alt="" />
                ) : (
                  <div></div>
                )}{" "}
              </div>
              <h1 className="title number">Include Numbers</h1>
            </div>
          </div>
          <div className="middle-section">
            <div
              onClick={() => setSymbol(!includeSymbol)}
              style={{
                backgroundColor: includeSymbol ? "#A4FFAF" : "transparent",
                border: includeSymbol
                  ? "2px solid #A4FFAF"
                  : "2px solid #E6E5EA",
              }}
              className="checkbox"
            >
              {includeSymbol ? (
                <img className="check-icon" src={Check} alt="" />
              ) : (
                <div></div>
              )}{" "}
            </div>
            <h2 className="title symbol">Include Symbols</h2>
          </div>
          <div className="measure">
            <h1 className="strength">STRENGTH</h1>
            <div className="strong">
              <h1 className="med">{generateLevel()}</h1>
              <div
                style={{
                  background:
                    generateLevel() === "TOO WEAK!"
                      ? "#F64A4A"
                      : generateLevel() === "WEAK"
                      ? "#FB7C58"
                      : generateLevel() === "MEDIUM"
                      ? "#F8CD65"
                      : generateLevel() === "STRONG"
                      ? "#A4FFAF"
                      : "",
                  border: generateLevel() ? "transparent" : "2px solid white",
                }}
                className="strength-measure "
              ></div>
              <div
                style={{
                  background:
                    generateLevel() === "TOO WEAK"
                      ? "#FB7C58"
                      : generateLevel() === "WEAK"
                      ? "#FB7C58"
                      : generateLevel() === "MEDIUM"
                      ? "#F8CD65"
                      : generateLevel() === "STRONG"
                      ? "#A4FFAF"
                      : "",
                  border: generateLevel() ? "transparent" : "2px solid white",
                }}
                className="strength-measure "
              ></div>
              <div
                style={{
                  background:
                    generateLevel() === "MEDIUM"
                      ? "#F8CD65"
                      : generateLevel() === "STRONG"
                      ? "#A4FFAF"
                      : "",
                  border: generateLevel() ? "transparent" : "2px solid white",
                }}
                className="strength-measure "
              ></div>
              <div
                style={{
                  background: generateLevel() === "STRONG" ? "#A4FFAF" : "",
                  border: generateLevel() ? "transparent" : "2px solid white",
                }}
                className="strength-measure "
              ></div>
            </div>
          </div>

          <button className="generate" onClick={generatePassword}>
            GENERATE
            <img className="arrow" src={Arrow} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
