import * as THREE from "three";
import { AnimationState } from "./children/animation-state";

// Finite-state machine
export class AnimationController {
    #states: Record<string, AnimationState> = {};
    #activeStateName: string;
    #mixer: THREE.AnimationMixer;

    get #activeState(): AnimationState {
        return this.#states[this.#activeStateName];
    }

    constructor(mixer: THREE.AnimationMixer) {
        this.#mixer = mixer;
    }

    addState(state: AnimationState) {
        state.setMixer(this.#mixer);

        this.#states[state.name] = state

        if (Object.keys(this.#states).length === 1) {
            this.#activeStateName = state.name;
            this.#activeState.activate();
        }


        return this;
    }

    tick(deltaTime: number) {
        this.#mixer.update(deltaTime);
    }
}

