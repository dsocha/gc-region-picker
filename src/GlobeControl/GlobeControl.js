import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StylesWrapper from './GlobeControl.styles';
import { VscChromeClose } from 'react-icons/vsc';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { globeTexture } from './GlobeTexture';
import { PickHelper } from './PickHelper';

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

  // var pickPosition = { x: 0, y: 0 };
  // var pickHelper = new PickHelper();

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

    // <markers>
    for (const region of props.regionList) {
      let marker = getMarker();
      var latRad = region.lat * (Math.PI / 180);
      var lonRad = -region.lon * (Math.PI / 180);
      marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * GLOBE_SIZE, Math.sin(latRad) * GLOBE_SIZE, Math.cos(latRad) * Math.sin(lonRad) * GLOBE_SIZE);
      marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
      globe.add(marker);
    }
    // </markers>

    // <picking>

    // clearPickPosition();

    // window.addEventListener('mousemove', setPickPosition);
    // window.addEventListener('mouseout', clearPickPosition);
    // window.addEventListener('mouseleave', clearPickPosition);

    // window.addEventListener(
    //   'touchstart',
    //   (event) => {
    //     // prevent the window from scrolling
    //     event.preventDefault();
    //     setPickPosition(event.touches[0]);
    //   },
    //   { passive: false }
    // );

    // window.addEventListener('touchmove', (event) => {
    //   setPickPosition(event.touches[0]);
    // });

    // window.addEventListener('touchend', clearPickPosition);
    // </picking>

    // <light>
    light = new THREE.HemisphereLight(0xffffff, 0x333333, 1.3);
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
    // pickHelper.pick(pickPosition, scene, camera, time);
    renderer.render(scene, camera);
  };

  const getMarker = () => {
    let result = new THREE.Object3D();
    let radius = 0.5;
    let sphereRadius = 1.0;
    let height = 3;
    let material = new THREE.MeshPhongMaterial({
      color: 0x00ae9e
    });
    let cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;
    let sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;
    result.add(cone, sphere);
    return result;
  };

  // const getCanvasRelativePosition = (event) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   return {
  //     x: ((event.clientX - rect.left) * canvasRef.current.width) / rect.width,
  //     y: ((event.clientY - rect.top) * canvasRef.current.height) / rect.height
  //   };
  // };

  // const setPickPosition = (event) => {
  //   const pos = getCanvasRelativePosition(event);
  //   pickPosition.x = (pos.x / canvasRef.current.width) * 2 - 1;
  //   pickPosition.y = (pos.y / canvasRef.current.height) * -2 + 1; // note we flip Y
  // };

  // const clearPickPosition = () => {
  //   // unlike the mouse which always has a position
  //   // if the user stops touching the screen we want
  //   // to stop picking. For now we just pick a value
  //   // unlikely to pick something
  //   pickPosition.x = -100000;
  //   pickPosition.y = -100000;
  // };

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
