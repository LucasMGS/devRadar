import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './SideBar.css';
import './Main.css';

import DevItem from './Components/DevItem';
import DevForm from './Components/DevForm';

function App() {

  const [ devs, setDevs ] = useState([]); 

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/dev')

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(devData) {

    const response = await api.post('/dev', devData);


    setDevs([...devs, response.data]);
    
  }
  return (          
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>


      <main>
         <ul>
           {devs.map(dev => (
             <DevItem key={dev._id} dev={dev}/>
           ))}             
         </ul>
      </main>
    </div>
  );
}

export default App;
