// App.js
import React from 'react';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import LoginSignupButtons from './components/LoginSignupButtons';
import ProductList from './components/ProductList';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        {/* <LoginSignupButtons /> */}
        <ProductList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
