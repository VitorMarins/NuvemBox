import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import { corPrincipal } from './src/constants/colors';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={corPrincipal} barStyle="light-content" />
      <Routes />
    </>
  );
}