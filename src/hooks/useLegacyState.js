import { useState, useMemo } from 'react';

export const useLegacyState = initState => {
    const [state, replaceState] = useState(initState);
    const setState = useMemo(() => {
        return updates => replaceState(state => ({ ...state, ...updates }));
    }, [replaceState]);
    return [state, setState];
};

export default useLegacyState;
