import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationController, AnimationState } from '../core/animation-controller';

export class Charecter extends THREE.Object3D {
    #animationController: AnimationController;

    constructor() {
        super();

        const loader = new GLTFLoader();
        loader.load('/assets/models/t-rex/t-rex.gltf', (gltf: GLTF) => {
            const model = gltf.scene;
            const animations = gltf.animations;

            model.traverse(object => {
                // TODO: Add check if mesh (object.isMesh does not exist)
                object.castShadow = true;
                object.receiveShadow = true;
            })

            this.setupAnimationController(model, animations);

            this.add(model);
        }, undefined, function (error) {
            console.error(error);
        });
    }

    setupAnimationController(model: THREE.Group, animations: THREE.AnimationClip[]) {
        const idle = new AnimationState('idle', animations[0]);
        const mixer = new THREE.AnimationMixer(model);

        this.#animationController = new AnimationController(mixer)
            .addState(idle);
    }

    update(deltaTime: number) {
        this.#animationController?.tick(deltaTime);
    }
}
