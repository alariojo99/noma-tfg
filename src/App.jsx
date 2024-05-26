// eslint-disable-next-line no-unused-vars
import { useEffect, useState, Suspense } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Model from "./components/Model.jsx"
import Button from './components/Button.jsx'
import SettingsButtons from './components/SettingsButtons.jsx'
import Navigation from "./components/Navigation.jsx"
import Info from "./components/Info.jsx"
import * as THREE from "three"

function App() {

  const [infoDisplay, setInfoDisplay] = useState(false)

  const [fullScreen, setFullScreen] = useState(true)

  const [showPerson, setShowPerson] = useState(false)

  const [showMedidas, setShowMedidas] = useState(false)

  const handleInfoToggle = () => {
    setInfoDisplay(prevState => !prevState)
  }

  const handleFullScreenToggle = () => {
    setFullScreen(prevState => !prevState)
  }

  const handlePerson = () => {
    setShowPerson(prevState => !prevState)
  }

  const handleMedidas = () => {
    setShowMedidas(prevState => !prevState)
  }


  return (
    <>
      {fullScreen && <img width={"144px"} src='./src/assets/logo-web-noma.png' className='logo' />}
      <div className="header-btns-container">
        <Button icon="persona.png" handleClick = {handlePerson }  clas="header-btn"/>
        <Button icon="regla.png" handleClick = {handleMedidas } clas="header-btn"/>
        <Button icon="icon-info.png" handleClick = {handleInfoToggle} clas="header-btn"/>
        <Button icon="icon-visible.png" handleClick = {handleFullScreenToggle } class="header-btn"/>
      </div>
      <section className='main-section'>
          <Canvas
            shadows
            gl={
              {
                outputEncoding: THREE.sRGBEncoding,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 3.4,
                antialias: true,
              }
            }
            onCreated={({ gl }) => {
              gl.gammaInput = true;
              gl.gammaOutput = true;
              gl.setSize(window.innerWidth, window.innerHeight);
            }}
          >
            <Suspense fallback={null}>
              <Model person={showPerson} medidas={showMedidas}/>
            </Suspense>
          </Canvas>
      </section>
      {fullScreen && <SettingsButtons position="right" tipo="principal"/>}
      {fullScreen && <Navigation />}
      {infoDisplay && <Info className="info-panel" />}
    </>
  )
}

export default App
