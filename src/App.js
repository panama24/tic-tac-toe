import React from 'react';
import styled from 'styled-components';
import DisplayContainer from './containers/Display';

const App = () => (
  <AppContainer>
    <DisplayContainer />
  </AppContainer>
);

export default App;

const AppContainer = styled.div`
  background-color: #FAD744;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;
