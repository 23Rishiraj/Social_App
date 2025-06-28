import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider ,extendTheme,ColorModeScript} from "@chakra-ui/react";
import{ mode } from '@chakra-ui/theme-tools';

import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const style ={
  global:(props)=>({
    body:{
      color:mode('gray.800','whiteAlpha.900')(props),
      bg:mode('gray.100','#101010')(props)
    }
  })
};

const config={
  initialcolormode:"dark",
  usesystemcolormode:true
};

const colors={
  gray:{
    light:"#616161",
    dark:"rgb(30,30,30)"
  }
};

const theme=extendTheme({config,style,colors})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
)
