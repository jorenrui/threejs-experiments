import { App } from './App';
import './style.css';

const app = new App();
app.start();

(function animate() {
  requestAnimationFrame(animate);
  app.renderer.render(app.scene, app.camera);

  if (app.models) {
    Object.keys(app.models).forEach((key) => {
      const model = key as keyof typeof app.models;
      if (model) app.models[model]?.update(app.models[model].model);
    });
  }
})();
