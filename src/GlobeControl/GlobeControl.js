import React, { useEffect, useRef, useState } from 'react';
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
  const labelNameRef = useRef(null);
  const labelValueRef = useRef(null);

  var scene;
  var camera;
  var renderer;
  var globe;
  var light;
  var loader;
  var controls;
  var raycaster;
  var mouseVector;
  var highlightedRegion = null;
  var highlightedObject = null;

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    loadScene();
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      window.removeEventListener('mousemove', onMouseMove, false);
      window.removeEventListener('click', onMouseClick, false);
    };
  }, []);

  const onWindowResize = () => {
    camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    controls.update;
  };

  const onMouseMove = (event) => {
    event.preventDefault();
    mouseVector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
  };

  const onMouseClick = (event) => {
    event.preventDefault();
    if (highlightedRegion) {
      props.onSelect(highlightedRegion);
    }
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
        bumpScale: 0.001,
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
      //marker.name = region.value;
      marker.tag = region.value;
      globe.add(marker);
    }
    // </markers>

    // <picking>
    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector3();
    raycaster.setFromCamera(mouseVector, camera);
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
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouseVector, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (Array.isArray(intersects)) {
      const marker = intersects.filter((x) => x.object && x.object.parent && x.object.parent.tag)[0];
      if (marker && marker.object && marker.object.parent && marker.object.parent.tag) {
        const pointingRegion = marker.object.parent.tag;
        if (highlightedRegion !== pointingRegion) {
          // <highlight region>
          if (highlightedObject) highlightedObject.material.emissive.setHex(0x0);
          highlightedRegion = pointingRegion;
          highlightedObject = marker.object;
          highlightedObject.material.emissive.setHex(0x00ae9e);
          controls.autoRotate = false;
          document.body.style.cursor = 'pointer';
          labelNameRef.current.innerText = props.regionList.filter((x) => x.value === highlightedRegion)[0].label;
          labelValueRef.current.innerText = highlightedRegion;
          // console.log('highlightedRegion: ', highlightedRegion, intersects);
          // </highlight region>
        }
      } else {
        if (highlightedRegion) {
          // <unhighlight region>
          highlightedRegion = null;
          highlightedObject.material.emissive.setHex(0x0);
          highlightedObject = null;
          controls.autoRotate = true;
          document.body.style.cursor = 'default';
          labelNameRef.current.innerText = '';
          labelValueRef.current.innerText = '';
          // console.log('highlightedRegion: ', highlightedRegion, intersects);
          // </unhighlight region>
        }
      }
    }
  };

  const getMarker = () => {
    let result = new THREE.Object3D();
    let radius = 0.5;
    let sphereRadius = 1.4;
    let height = 3;
    let material = new THREE.MeshStandardMaterial({
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

  return (
    <StylesWrapper>
      <div className='globe-control-background' />
      <div className='globe-control-outer'>
        <div className={'globe-control-inner'}>
          <VscChromeClose
            className='icon-close'
            onClick={() => {
              if (props.onClose) props.onClose();
            }}
          />
          <div className='canvas' ref={canvasRef}></div>
          <div className='label-name' ref={labelNameRef}></div>
          <div className='label-value' ref={labelValueRef}></div>
        </div>
      </div>
    </StylesWrapper>
  );
};

GlobeControl.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  regionList: PropTypes.array.isRequired
};

export default GlobeControl;
