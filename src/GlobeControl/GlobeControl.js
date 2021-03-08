import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StylesWrapper from './GlobeControl.styles';
import { VscChromeClose } from 'react-icons/vsc';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);

    loader = new THREE.TextureLoader();

    //const tex = loader.load(require('../Resources/globe-texture.jpg'));

    globe = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshPhongMaterial({
        // map: tex,
        // map: THREE.ImageUtils.loadTexture('world1.png'),
        //bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
        bumpScale: 0.005,
        //specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
        specular: new THREE.Color('grey')
      })
    );

    scene.add(globe);
    light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    controls = new OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 50, 100);
    controls.update();

    var animate = function () {
      requestAnimationFrame(animate);

      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();

      renderer.render(scene, camera);
    };

    animate();
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
  onClose: PropTypes.func.isRequired
};

export default GlobeControl;
