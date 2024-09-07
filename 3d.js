import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.background = new THREE.Color('#1e1f29');

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('room.glb', function (gltf) {
        const model = gltf.scene;

        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        model.position.sub(center);

        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 10 / maxDimension;
        model.scale.set(scale, scale, scale);

        scene.add(model);

        addPointsToModel(model);

        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    
    window.addEventListener('resize', onWindowResize, false);
}

function addPointsToModel(model) {
    const pointGeometry = new THREE.SphereGeometry(0.1);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const boundingBox = new THREE.Box3().setFromObject(model);
    const size = boundingBox.getSize(new THREE.Vector3());

    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    point.position.set(
        size.x - 10.5,
        size.y - 2.5,
        size.z - 7
    );

    point.position.add(boundingBox.getCenter(new THREE.Vector3()));

    model.add(point);
}



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
