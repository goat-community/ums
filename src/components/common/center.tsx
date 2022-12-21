import styled from "styled-components";

interface CenterProps {
  children: React.ReactNode;
}

export function Center(props: CenterProps) {
  return <Div>{props.children}</Div>;
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
