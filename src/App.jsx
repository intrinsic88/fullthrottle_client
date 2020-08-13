import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserTable from './Component/userTable/usertable.component';
import { Container } from '@material-ui/core';
import Navbar from './Component/navbar/navbarcomponent';

function App() {
    return ( 
    <div className = "App" >
        <Navbar />
        <Container>
        <UserTable></UserTable>
        </Container>
    </div>
    );
}

export default App;