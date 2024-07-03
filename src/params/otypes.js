
/**
 * @param {string} param
 * @return {param is ('project' | 'dataset' | 'image' | 'screen' | 'plate' | 'well')}
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
 */
export function match(param) {
    const otypes = ['project', 'dataset', 'image', 'screen', 'plate', 'well'];
	return otypes.includes(param);
}
