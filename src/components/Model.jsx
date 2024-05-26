/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect } from "react";
import { OrbitControls, Html, Billboard  } from "@react-three/drei";
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, MeshPhysicalMaterial, Vector3,  } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useData from "./DataProvider";
import * as THREE from "three"


export default function Model({person, medidas}) {
  const { glb, material_principal, current_material_principal, descripcionSecundaria } = useData();
  const { camera } = useThree();
  const meshRef = useRef();

  const [model, setModel] = useState(null);
  const [modelPerson, setModelPerson] = useState(null);
  const [modelMedidas, setModelMedidas] = useState(null);

  const [targetPosition, setTargetPosition] = useState(null);
  const [shouldMove, setShouldMove] = useState(false);  // Nuevo estado para controlar el movimiento
  const orbitControlsRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(glb, (gltf) => {
      setModel(gltf);
    });
  }, [glb]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("person.glb", (gltf) => {
      setModelPerson(gltf);
    });
  }, [glb]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(`medidas-${glb}`, (gltf) => {
      setModelMedidas(gltf);
    });
  }, [glb]);

  const [colorMap, normalMap, glossMap, specularMap] = useLoader(TextureLoader, [
    `/${material_principal[current_material_principal]}/Diffuse.png`, 
    `/${material_principal[current_material_principal]}/Normal.png`,  
    `/${material_principal[current_material_principal]}/Gloss.png`,   
    `/${material_principal[current_material_principal]}/Specular.png`,         
  ]);

  [colorMap, normalMap, glossMap, specularMap].forEach((texture) => {
    texture.flipY = false;
    texture.anisotropy = 16;
  });

  colorMap.encoding = THREE.sRGBEncoding;

  useEffect(() => {
    if (model) {
      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshPhysicalMaterial({
            map: colorMap,
            normalMap: normalMap,
            roughnessMap: glossMap,
            metalnessMap: specularMap,
            metalness: 0.5,
            roughness: 0.5, 
            envMapIntensity: 1,
            clearcoat: 1.0, 
            clearcoatRoughness: 0.1, 
            reflectivity: 1 
          });
          child.material.needsUpdate = true;
        }
      });
    }
  }, [model, colorMap, normalMap, glossMap, specularMap]);

  const [isCameraAtPosition1, setIsCameraAtPosition1] = useState(false)

  const checkCameraPosition1 = () => {
    const target = new Vector3(6, 0, 0);
    return camera.position.distanceTo(target) < 2;
  }

  const moveToNewPosition = (x,y,z) => {
    setTargetPosition(new Vector3(x, y, z));  // Ajusta la posición objetivo
    setShouldMove(true);  // Activa el movimiento hacia la posición objetivo
  };


  useFrame(() => {
    if (shouldMove) {
      camera.position.lerp(targetPosition, 0.04);  // Mueve la cámara solo si shouldMove es true
      if (camera.position.distanceTo(targetPosition) < 0.1) {
        setShouldMove(false);  // Detiene el movimiento cuando la cámara esté suficientemente cerca del objetivo
      }
      orbitControlsRef.current.update();
    }
    // Continuously update state based on camera's current position
    setIsCameraAtPosition1(checkCameraPosition1());
      
  });

  useEffect(() => {
    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const distance = 10 / aspectRatio; // Ajusta la distancia según el aspecto de la pantalla
      camera.position.set(0, 0, distance + 2);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera]);


  return (
    <>
      <OrbitControls 
        makeDefault 
        ref={orbitControlsRef}
        maxDistance={15}
        enableDamping
        dampingFactor={0.1}
        position={[0,0,0]}
        panSpeed={4}
        zoomSpeed={1.5}
      />
      
      <ambientLight intensity={0.5} color={"white"} />
      {model && <primitive 
        object={model.scene} 
        position={[0, 0, 0]} 
        rotation={[0,0,0]}
        ref={meshRef}
      />}

      {modelMedidas && medidas && <primitive 
        object={modelMedidas.scene} 
        position={[0, 0, 0]} 
        rotation={[0,-1.57,0]}
        ref={meshRef}
      />}

      {modelPerson && person && 
        <><primitive 
          object={modelPerson.scene} 
          position={[0, -0.83, 0]}
          scale={[0.55, 0.55, 0.55]} 
          rotation={[0,0,0]}
          ref={meshRef}
        />

        <Billboard follow={true}>
          <Html transform position={[0, 0.15, 0]} rotation={[0, 0, 0]}>
            <div>
              <p style={{ fontSize: '4px', color: '#2f2f2f'}}>1.60</p>
            </div>
          </Html>
        </Billboard></>
      }

      {!isCameraAtPosition1 &&
          <Html transform position={[3, 0, 0]} rotation={[0,0,0]} sprite>
            <button onClick={()=>moveToNewPosition(7,0,0)} className="position-btn"></button>
          </Html>
      }

      {isCameraAtPosition1 && (
        <Html transform position={[0, 0, 5]} rotation={[0, 1.6, 0]}>
          <div>
            <p className="descripcionSecundaria" dangerouslySetInnerHTML={{ __html: descripcionSecundaria }}/>
          </div>
        </Html>
      )}
    </>
  );
}
