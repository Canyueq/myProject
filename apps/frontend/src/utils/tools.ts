const debonece = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const throttle = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null | null = null;
  let lastTime: number | null = null;
  return (...args: any[]) => {
    const currentTime = Date.now();
    const shouldInvoke = currentTime - (lastTime || 0) >= delay;
    if (shouldInvoke) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(this, args);
      lastTime = currentTime;
    } else if (!timer) {
      timer = setTimeout(
        () => {
          func.apply(this, args);
          lastTime = Date.now();
          timer = null;
        },
        delay - currentTime - (lastTime || 0),
      );
    }
  };
};

export { debonece, throttle };
