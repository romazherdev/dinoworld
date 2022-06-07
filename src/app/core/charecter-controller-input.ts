export class CharacterControllerInput {
    private onKeyDownListener;
    private onKeyUpListener;

    private state = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    constructor() {
        this.onKeyDownListener = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDownListener);
        this.onKeyUpListener = this.onKeyUp.bind(this);
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    public onDestroy() {
        window.removeEventListener('keydown', this.onKeyDownListener);
        window.removeEventListener('keyup', this.onKeyUpListener);
    }

    private onKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.state.up = true;

            case 'KeyS':
            case 'ArrowDown':
                this.state.down = true;

            case 'KeyA':
            case 'ArrowLeft':
                this.state.left = true;

            case 'KeyD':
            case 'ArrowRight':
                this.state.right = true;
        }
    }

    private onKeyUp(e: KeyboardEvent) {
        switch (e.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.state.up = false;

            case 'KeyS':
            case 'ArrowDown':
                this.state.down = false;

            case 'KeyA':
            case 'ArrowLeft':
                this.state.left = false;

            case 'KeyD':
            case 'ArrowRight':
                this.state.right = false;
        }
    }
}
