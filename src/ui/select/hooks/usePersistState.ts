import { useEffect, useMemo, useState } from 'react';

export default function usePersistState<T>(
	initialValue: T,
	id: string
): [T, (newState: T) => void] {
	const initialValueCheck = useMemo(() => {
		const localStorageValueStr = localStorage.getItem('state:' + id);
		// If there is a value stored in localStorage, use that
		if (localStorageValueStr) {
			return JSON.parse(localStorageValueStr);
		}
		// Otherwise use initialValue that was passed to the function
		return initialValue;
	}, []);

	const [state, setState] = useState(initialValueCheck);

	useEffect(() => {
		const stateStr = JSON.stringify(state); // Stringified state
		localStorage.setItem('state:' + id, stateStr); // Set stringified state as item in localStorage
	}, [state]);
	return [state, setState];
}
