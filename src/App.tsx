import { Component } from "react";
import ReactSwitch from "react-switch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CityList from "./components/city-list.component";

type Props = {};

type State = {
  checked: boolean,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked: boolean) {
    this.setState({ checked });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand bg-white border-bottom">
          <h2 className="text-body pl-2">
            <strong>Weather</strong>
          </h2>
          <div className="navbar-nav ml-auto">
            <ReactSwitch onChange={this.handleChange} checked={this.state.checked} 
            offColor="#ddd"
            onColor="#ddd"
            height={40}
            width={80}
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  borderRadius: "20px",
                  color: "rgb(69, 170, 221)",
                  paddingRight: 2
                }}
              >
                &#176;C
              </div>
            }
            checkedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "white",
                  borderRadius: "20px",
                  background: "rgb(69, 170, 221)",
                  paddingRight: 2
                }}
              >
                &#176;C
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  borderRadius: "20px",
                  color: "rgb(69, 170, 221)",
                  paddingLeft: 2
                }}
              >
                &#176;F
              </div>
            }
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  borderRadius: "20px",
                  background: "rgb(69, 170, 221)",
                  color: "white",
                  paddingLeft: 2
                }}
              >
                &#176;F
              </div>
            }
        />
          </div>
        </nav>

        <div className="bg-container">
          <CityList checked={this.state.checked} />
        </div>
      </>
    );
  }
}

export default App;
