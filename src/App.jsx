import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalTitle,
  Button,
} from "react-bootstrap";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function App({ Component, pageProps = { title: "index" } }) {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const OpenUnity = () => {
    loadUnity(true);
  };
  const [modalShow, setModalShow] = useState(false);
  const handleClick = () => {
    setModalShow(true);
  };
  const [unity, loadUnity] = useState(false);
  const unityContext = new UnityContext({
    loaderUrl: "./Build/virtualstore.loader.js",
    dataUrl: "./Build/virtualstore.data",
    frameworkUrl: "./Build/virtualstore.framework.js",
    codeUrl: "./Build/virtualstore.wasm",
  });

  useEffect(function () {
    unityContext.on("GameOver", function (userName, score) {
      setModalShow(true);
    });
  }, []);

  return (
    <>
      <button onClick={OpenUnity}>Start Virtual Tour</button>
      {/* {`Game Over! ${userName} ${score} points`}{" "} */}
      <div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />{" "}
      </div>
      {unity == true && (
        <Unity
          unityContext={unityContext}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </>
  );
}

export default App;
