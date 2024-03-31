import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import ModelGroup from "./ModelGroup";
import { useSelector } from "react-redux";
import img from "/floor.jpg";
import wall from "/wall.jpeg";
import "./Three.css";

function NewThree(props) {
  const lines = useSelector((state) => state.canvaReducer.lines);
  console.log(lines);
  const canvasRef = useRef(null);

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    console.log(canvas);
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "image.png";
    link.click();
  };
  // ========================
  // const envMap = useEnvironment({files:'pic.hdr'})
  //  const loader = new RGBELoader();
  //     loader.setDataType(THREE.UnsignedByteType);

  //     loader.load('pic.hdr', function (texture) {
  //       const envMap = new THREE.WebGLCubeRenderTarget(texture.image.height);
  //       envMap.fromEquirectangularTexture(renderer, texture);
  //       scene.background = envMap.texture;

  //       const pmremGenerator = new THREE.PMREMGenerator(renderer);
  //       pmremGenerator.compileEquirectangularShader();

  //       const pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
  //       pmremCubeUVPacker.update(renderer);

  //       const envMapMipMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
  //       scene.environment = envMapMipMap;
  // })
  return (
    <>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        ref={canvasRef}
        style={{
          width: "100%",
          height: "90%",
          display: "block",
          zIndex: "10000000",
          // border: "5px solid red",
        }}
        camera={{
          fov: 45,
          near: 0.8,
          far: 10000,
          position: [20, 40, 10],
        }}
      >
        {/* <Environment files="pic.hdr" background /> */}
        <ambientLight intensity={0.5} position={[5, 10, 15]} />
        <OrbitControls />
        <Walls lines={props.projectLines || []} />
        {/* <Test/> */}
        <ModelGroup />
        <Floor />
      </Canvas>
      {props.showBtn && (
        <button className="screen-btn" onClick={saveCanvasAsImage}>
          Take screenShot
        </button>
      )}
    </>
  );
}

function Walls({ lines }) {
  return lines.map((line, index) => <Wall key={index} line={line} />);
}

function Wall({ line }) {
  const distance = Math.sqrt(
    Math.pow(line.endX - line.startX, 2) + Math.pow(line.endY - line.startY, 2)
  );

  const positionX = (line.startX + line.endX) / 2;
  const positionY = 5 / 2;
  const positionZ = (line.startY + line.endY) / 2;
  const rotationY = Math.atan2(
    line.startY - line.endY,
    line.startX - line.endX
  );
  const wallImg = useTexture(wall);

  return (
    <mesh
      position={[positionX / 10 - 40, positionY, positionZ / 10 - 30]}
      rotation-y={-rotationY}
    >
      <boxGeometry args={[distance / 10, 5, 0.4]} />
      <meshBasicMaterial color={0xaaaaaa} map={wallImg} />
      {/* <WallGUI /> */}
    </mesh>
  );
}
function Floor() {
  const floorImg = useTexture(img);
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[300, 300, 1]} />
      <meshBasicMaterial map={floorImg} />
    </mesh>
  );
}
export default NewThree;
