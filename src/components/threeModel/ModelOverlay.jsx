import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./ModelOverlay.module.css";

const ModelBackdrop = (props) => {
  return <div className={classes.Modelbackdrop} onClick={props.onClose} />;
};

const Model = (props) => {
  return (
    <div className={classes.model_overlay}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("modelOverlay");

const ModelOverlay = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<ModelBackdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<Model>{props.children}</Model>, portalElement)}
    </Fragment>
  );
};

export default ModelOverlay;
