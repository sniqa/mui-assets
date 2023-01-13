// 子组件传值给父组件
export const useChildToParent = <T>() => {
  let callback: () => T;

  const childHook = (cb: () => T) => {
    callback = cb;
  };

  const parentHook = () => callback();

  return {
    childHook,
    parentHook,
  };
};
