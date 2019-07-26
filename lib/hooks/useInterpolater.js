import { reinterpolate, funcifyHandler } from '../utils';
export const useInterpolater = (target = {}, data = {}, handlersKey = 'handlers') => {
  const deps = new Map();
  const interpolated = reinterpolate(target, data, deps);
  const handlers = interpolated[handlersKey];
  const handlerFuncs = {};

  if (typeof handlers === 'object' && handlers != null) {
    Object.keys(handlers).forEach(key => {
      const handler = handlers[key];
      handlerFuncs[key] = funcifyHandler(reinterpolate(handler, { ...data,
        [handlersKey]: handlerFuncs
      }), key);
    });
  }

  return reinterpolate(target, { ...data,
    [handlersKey]: handlerFuncs
  });
};
export default useInterpolater;