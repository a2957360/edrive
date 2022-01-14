import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import SignatureCanvas from "react-signature-canvas";
// import "../style/electronicSignature.css";
class ElectronicSignature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
    };
  }
  canvas = {
    clear: () => {},
    toDataURL: (param) => {
      return "";
    },
  };
  // 重置
  reset() {
    this.canvas.clear();
  }
  // 保存
  save() {
    const imgUrl = this.canvas.toDataURL("image/png");
    // this.setState({ imgUrl: imgUrl });
    this.props.save(imgUrl);
  }
  render() {
    return (
      <Fragment>
        <div className="main">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 500,
              height: 500,
              className: "write-name-canvas",
            }}
            ref={(ref) => {
              this.canvas = ref;
            }}
          />
          <div>
            {this.state.imgUrl}
          </div>
          <div className="write-name-operation">
            <button onClick={() => this.reset()}>重置</button>
            <button onClick={() => this.save()}>保存</button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ElectronicSignature;