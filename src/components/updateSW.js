import React, { useEffect, useState } from "react";
import * as serviceWorker from "../serviceWorker";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  background: #66af30;
  padding: 12px;
  color: #fff;
  cursor: pointer;
  z-index: 10000;
`;

let waitingWorker;

const UpdateSW = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        waitingWorker = registration.waiting;
        setShowUpdate(true);
      },
    });
  }, []);

  if (!showUpdate) return null;

  return (
    <Container
      onClick={() => {
        if (waitingWorker) waitingWorker.postMessage({ type: "SKIP_WAITING" });
        window.location.reload(true);
      }}
    >
      Click to update the app bro
    </Container>
  );
};

export default UpdateSW;
