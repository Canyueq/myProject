import {
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
const createCube = (matrix: Matrix4) => {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  // const material = new MeshBasicMaterial();

  // 创建就有物理意义的材质
  const physicallyMaterial = createMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, physicallyMaterial) as any;

  //设置位置
  cube.position.setFromMatrixPosition(matrix);

  //设置缩放
  cube.scale.setFromMatrixScale(matrix);

  //设置旋转
  cube.rotation.setFromRotationMatrix(matrix);

  //它本质上是 修改几何数据，而不是设置对象的变换状态。
  // cube.applyMatrix4(matrix);

  cube.tick = (delta: number) => {
    // increase the cube's rotation each frame
    const radiansPerSecond = MathUtils.degToRad(30);
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    const x = (cube.position.x += 1 * delta) % -3;
    const y = (cube.position.y += 1 * delta) % -3;
    const z = (cube.position.z += 1 * delta) % -3;
    cube.position.z = z;
    cube.position.x = x;
    cube.position.y = y;
  };

  return cube;
};
const createMaterial = () => {
  //创建纹理加载的实例
  const textureLoader = new TextureLoader();
  //加载纹理
  const texture = textureLoader.load(
    "apps/frontend/public/assets/textures/uv-test-bw.png",
  );
  // create a "standard" material
  const material = new MeshStandardMaterial({ map: texture });

  material.map = texture;

  return material;
};

export { createCube, createMaterial };
