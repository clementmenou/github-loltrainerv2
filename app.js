import * as BABYLON from 'babylonjs';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const canvas = document.getElementById('renderCanvas');

const engine = new BABYLON.Engine(canvas);

const createScene = async function() {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene)
  
  camera.setPosition(new BABYLON.Vector3(400, 800, -800));
  camera.fov = .4;

  camera.attachControl();

  const boxMaterial = new BABYLON.StandardMaterial();
  const fontData = await (await fetch('/Montserrat_SemiBold.json')).json();

  for(let i = 0; i < 5; i++){
    let box = new BABYLON.MeshBuilder.CreateBox('myBox', {
      size: 16,
      height: 40
    }, scene);
    box.enableEdgesRendering();
    box.edgesWidth = 100;
    box.edgesColor = new BABYLON.Color4(0, 1, 1, 1);
    boxMaterial.alpha = 0;
    box.material = boxMaterial;
    let boxCoordX = getRandomInt(-250, 250);
    let boxCoordZ = getRandomInt(-250, 250);
    box.position = new BABYLON.Vector3(boxCoordX, 15, boxCoordZ);

    const text1 = BABYLON.MeshBuilder.CreateText('', 'A', fontData, {
      size: 12,
      depth: 1
    }, scene);

    const textMaterial = new BABYLON.StandardMaterial();
    text1.material = textMaterial;
    textMaterial.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);

    text1.position = new BABYLON.Vector3(0, 17, 8);
  }


  const ground = new BABYLON.MeshBuilder.CreateGround('', {
    height: 4000,
    width: 4000
  });

  const groundMaterial = new BABYLON.StandardMaterial();
  groundMaterial.emissiveColor = new BABYLON.Color3(.1, .1, .1);
  groundMaterial.alpha = .9;
  ground.material = groundMaterial;

  return scene;
}

const scene = await createScene();

engine.runRenderLoop(function () {
  scene.render();
});