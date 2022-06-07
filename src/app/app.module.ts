import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppModuleConfig } from "./app.module.types";
import { Charecter } from './charecters/charecter';

export class AppModule {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private clock: THREE.Clock;
    private character: Charecter;

    constructor(
        private readonly root: HTMLElement,
        private readonly config?: AppModuleConfig,
    ) { }

    run() {
        this.initScene();
        this.setupHelpers();
        this.setupLights();
        this.setupGround();
        this.loadObjects();
        this.startAnimationLoop();
    }

    private initScene() {
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xA760FF);
        this.camera = new THREE.PerspectiveCamera(45, this.root.clientWidth / this.root.clientHeight, 1, 1000);
        this.camera.position.set(0, 45, 65);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.root.clientWidth, this.root.clientHeight);
        this.root.appendChild(this.renderer.domElement);
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.renderer.setSize(this.root.clientWidth, this.root.clientHeight);
        this.root.appendChild(this.renderer.domElement);
    }

    private setupHelpers() {
        const { axesHelepr, gridHelper, orbitControlsHelper } = this.config.helpers;

        if (axesHelepr) {
            const axesHelper = new THREE.AxesHelper(5);
            this.scene.add(axesHelper);
        }

        if (gridHelper) {
            const size = 100;
            const divisions = 10;
            const gridHelper = new THREE.GridHelper(size, divisions);
            this.scene.add(gridHelper);
        }

        if (orbitControlsHelper) {
            const controls = new OrbitControls(this.camera, this.renderer.domElement);
            controls.update();
        }
    }

    private setupLights() {
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);

        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(- 1, 1.75, 1);
        dirLight.position.multiplyScalar(30);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.0001;

        this.scene.add(dirLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        
        this.scene.add(hemiLight);
    }

    private setupGround() {
        const groundGeo = new THREE.PlaneGeometry(10000, 10000);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        groundMat.color.setHSL(0.3, 0.8, 0.75);

        const groundMesh = new THREE.Mesh(groundGeo, groundMat);

        groundMesh.rotation.x = - Math.PI / 2;
        groundMesh.receiveShadow = true;
    }

    private loadObjects() {
        this.character = new Charecter();
        this.scene.add(this.character);
    }

    private startAnimationLoop() {
        const animate = () => {
            requestAnimationFrame(animate);

            const deltaTime = this.clock.getDelta();
            this.character.update(deltaTime);

            this.renderer.render(this.scene, this.camera);
        }

        animate();
    }
}
