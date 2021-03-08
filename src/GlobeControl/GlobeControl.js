import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StylesWrapper from './GlobeControl.styles';
import { VscChromeClose } from 'react-icons/vsc';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { globeTexture } from './GlobeTexture';

const GLOBE_SIZE = 48;
const GLOBE_SEGMENT = 96;

const GlobeControl = (props) => {
  const canvasRef = useRef(null);

  var scene;
  var camera;
  var renderer;
  var globe;
  var light;
  var loader;
  var controls;

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false);

    loadScene();

    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  const onWindowResize = () => {
    camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    controls.update;
  };

  const loadScene = () => {
    // <scene>
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);
    // </scene>

    // <globe>
    loader = new THREE.TextureLoader();
    const tex = loader.load(globeTexture);
    globe = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_SIZE, GLOBE_SEGMENT, GLOBE_SEGMENT),
      new THREE.MeshPhongMaterial({
        map: tex,
        bumpScale: 0.005,
        specular: new THREE.Color('grey')
      })
    );
    scene.add(globe);
    // </globe>

    // <light>
    light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.3);
    scene.add(light);
    // </light>

    // <controls>
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 80;
    controls.maxDistance = 170;
    controls.minPolarAngle = 0.8;
    controls.maxPolarAngle = 2.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    camera.position.set(0, 50, 80);
    controls.update();
    // </controls>

    animate();
  };

  const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  return (
    <StylesWrapper>
      <div className='globe-control-background' />
      <div className='globe-control-outer'>
        <div className='globe-control-inner'>
          <VscChromeClose
            className='icon-close'
            onClick={() => {
              if (props.onClose) props.onClose();
            }}
          />
          <div className='canvas' ref={canvasRef}></div>
        </div>
      </div>
    </StylesWrapper>
  );
};

GlobeControl.propTypes = {
  onClose: PropTypes.func.isRequired,
  regionList: PropTypes.array.isRequired
};

export default GlobeControl;
