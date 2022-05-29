import { App } from '../App';
import { Model } from './Model';

export class Knight extends Model {
  app: App;
  clock = new THREE.Clock();
  stats = {
    x: 0,
    velocity: 0,
  }
  isPlayingAnimation = false;
  animationId?: number;

  constructor(app: App) {
    super(app, 'knight_d_pelegrini.fbx', 'Walking.fbx', (fbx) => {
      fbx.position.set(0, -1.5, 0);
      fbx.rotation.y = 4.5;
      fbx.scale.setScalar(0.01);
      fbx.traverse((c: any) => {
        c.castShadow = true;
      });
    });
    this.app = app;
  }

  walk() {
    if (!this.model) return;
    this.stats.velocity = 0.08;
  }

  stop() {
    if (!this.model) return;
    this.stats.velocity = 0;

    if (this.animationId != null) {
      this.isPlayingAnimation = false;
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  update(model: typeof this.model) {
    if (!model) return;
    this.stats.x -= this.stats.velocity;
    model!.position.x = this.stats.x;

    if (this.stats.velocity > 0 && !this.isPlayingAnimation) {
      this.isPlayingAnimation = true;

      if (this.animationId == null) {
        const animate = () => {
          this.mixers.forEach(({ mixer }) => {mixer.update(this.clock.getDelta());});
          this.app.renderer.render(this.app.scene, this.app.camera)
          this.animationId = requestAnimationFrame(animate);
        };
        animate();
      }
    }
  }
}
