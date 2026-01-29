import { DirectionalLight } from "three";

const createLights = (position: any = { x: 10, y: 10, z: 10 }) => {
  // Create a directional light
  //创建定位灯光，传入颜色和光强
  const light = new DirectionalLight("white", 8) as any;

  //设置灯源位置
  const { x, y, z } = position as any;
  light.position.set(x, y, z);
  // console.log("position", position);
  light.tick = (delta: number) => {
    const x = (light.position.x += 1 * delta) % 2;
    const y = (light.position.y += 1 * delta) % 2;
    const z = (light.position.z += 1 * delta) % 2;
    light.position.x = x;
    light.position.y = y;
    light.position.z = z;
  };

  return light;
};

export { createLights };
