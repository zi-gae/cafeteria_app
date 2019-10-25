import React, { PureComponent } from "react";
import WritePostPresenter from "./WritePostPresenter";

class WritePostContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <WritePostPresenter />;
  }
}

export default WritePostContainer;
