import { App } from '../App';

export class Model {
  public model?: THREE.Object3D<THREE.Event>;
  public mixers: {
    model: THREE.Object3D<THREE.Event>,
    mixer: THREE.AnimationMixer,
  }[]

  constructor(app: App, modelPath: string, animationPath = '', onModelLoad?: (fbx: THREE.Object3D<THREE.Event>) => void) {
    this.mixers = [];

    const loader = new (THREE as any).FBXLoader();
    loader.setPath('./models/');
    loader.load(modelPath, (fbx: THREE.Object3D<THREE.Event>) => {
      this.model = fbx;

      if (onModelLoad) {
        onModelLoad(fbx);
      } else {
        fbx.scale.setScalar(0.01);
        fbx.traverse((c: any) => {
          c.castShadow = true;
        });
      }

      if (animationPath.length) {
        const anim = new (THREE as any).FBXLoader();
        anim.setPath('./models/');
        anim.load(animationPath, (anim: THREE.Object3D<THREE.Event>) => {
          const mixer = new THREE.AnimationMixer(fbx);
          mixer.clipAction(anim.animations[0]).play();
          app.scene.add(fbx);
          this.mixers.push({ model: fbx, mixer });
        });
      } else {
        app.scene.add(fbx);
      }
    });
  }
}
