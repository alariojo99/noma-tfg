import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export default function Resizer() {
  const { gl, camera } = useThree();

  useEffect(() => {
    const handleResize = () => {
      // Actualiza el tamaño del renderizador y la cámara
      gl.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llama inicialmente para establecer el tamaño

    return () => window.removeEventListener('resize', handleResize);
  }, [gl, camera]);

  return null;
}