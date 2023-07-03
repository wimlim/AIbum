import { simd, threads } from 'wasm-feature-detect';

export async function loadAIbumCore() {
	let loader;
	const simd_support = await simd();
	const threads_support = await threads();
	if (threads_support)
		loader = simd_support ? import('./aibum_core_wasm-simd-threads') : import('./aibum_core_wasm-threads');
	else
		loader = simd_support ? import('./aibum_core_wasm-simd') : import('./aibum_core_wasm-basic');

	const {default : loadAIbumCore} = await loader;
	return await loadAIbumCore();
}
