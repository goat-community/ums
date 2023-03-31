import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff3b3b;
`;

const ErrorDetails = styled.p`
  font-size: 1.5rem;
  color: #333;
`;

const ErrorPage = ({ message }: { message: string }) => (
  <Wrapper>
    <ErrorMessage>Error</ErrorMessage>
    <ErrorDetails>{message}</ErrorDetails>
  </Wrapper>
);

export default ErrorPage;
