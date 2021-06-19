import { withNProgress } from "@tanem/react-nprogress";
import React from "react";

import Bar from "./Bar";
import Container from "./Container";
const Progress = ({ isFinished, progress, animationDuration }) => (
  <Container animationDuration={animationDuration} isFinished={isFinished}>
    <Bar animationDuration={animationDuration} progress={progress} />
  </Container>
);

export default withNProgress(Progress);
