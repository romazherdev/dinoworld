import * as THREE from "three";


export class AnimationState {
    #mixer: THREE.AnimationMixer;
    #isActive: boolean = false;

    get isActive() {
        return this.#isActive;
    }

    constructor(
        public readonly name: string,
        public readonly clip: THREE.AnimationClip,
    ) { }


    activate() {
        this.#isActive = true;

        const action = this.#mixer.clipAction(this.clip);
        action.play();
    }

    setMixer(mixer: THREE.AnimationMixer) {
        this.#mixer = mixer;
    }
}