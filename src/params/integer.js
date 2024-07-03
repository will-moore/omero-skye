
/**
 * @param {string} param
 * @return {Boolean}
 * @satisfies {import('@sveltejs/kit').ParamMatcher}
 */
export function match(param) {
    return /^([0-9]\d*)$/.test(param);
}
