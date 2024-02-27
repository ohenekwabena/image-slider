import styled, { keyframes } from "styled-components";

function Spinner() {
  return <Wrapper></Wrapper>;
}

const spin = keyframes`   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`;

const Wrapper = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;
