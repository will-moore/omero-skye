// @ts-nocheck

// https://github.com/geoffrich/sveltekit-view-transitions

import { onNavigate } from '$app/navigation';

export const preparePageTransition = () => {
	onNavigate(async (navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((oldStateCaptureResolve) => {
			document.startViewTransition(async () => {
				oldStateCaptureResolve();
				await navigation.complete;
			});
		});
	});
};
