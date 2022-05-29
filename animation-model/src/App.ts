import { Knight } from './models/Knight';

export class App {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  models: {
    knight: Knight;
  }

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x9CA3AF, 1);

    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 2.5);
    this.scene.add(light);

    this.camera.position.z = 5;
    this.camera.position.x = -3;

    document.body.appendChild(this.renderer.domElement);

    this.models = {
      knight: new Knight(this),
    };
  }

  async start() {
    window.addEventListener('resize', () => this._onWindowResize(), false);
    window.addEventListener('keydown', (evt) => this._onKeyDown(evt), false);
    window.addEventListener('keyup', (evt) => this._onKeyUp(evt), false);
  }

  _onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _onKeyDown(evt: KeyboardEvent) {
    if (!this.models) return;
    if (evt.key === 'w') {
      this.models.knight.walk();
    }
  }

  _onKeyUp(evt: KeyboardEvent) {
    if (!this.models) return;
    if (evt.key === 'w') {
      this.models.knight.stop();
    }
  }
}
