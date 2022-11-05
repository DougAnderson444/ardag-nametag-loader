import * as b64 from '@stablelib/base64';
import { hash } from '@stablelib/sha256';
import { arns } from '@peerpiper/did-ar';

export function getArweaveAddress(jwk) {
	// get uint8array of the string
	const bytes = b64.decodeURLSafe(jwk.n);

	// get the isomorphic hash of the asset as the tag
	const hashed = hash(bytes); // make tag unique, so that it can go to a new owner without conflict
	const hashB64 = b64.encodeURLSafe(new Uint8Array(hashed)).replace('=', '');
	return hashB64;
}

export async function getDagData({ dag, tagNode, key }) {
	if (!tagNode[key]) return null;
	let val;
	try {
		val = (await dag.get(tagNode[key]))?.value?.value;
	} catch (error) {
		// no props given
		console.log('No props given. Set as null.');
		val = null;
	}

	return val;
}

export function isNameSpace(str) {
	// check if str is a string ending in .ar or .arweave.dev
	return typeof str === 'string' && (str.endsWith('.ar') || str.endsWith('.arweave.dev'));
}

export function isDID(str) {
	// check if str is a string starting with did:ar
	const truth = typeof str === 'string' && str.startsWith('did:ar');
	console.log('isDID', truth);
	return truth;
}

export function isAddress(str) {
	// check if string is a valid arweave address
	return typeof str === 'string' && str.length === 43;
}

export async function fromDid(did: string) {
	const arnsInstance = await arns.init({ inMemory: true });
	console.log('arnsInstance', arnsInstance);
	const didDoc = await arnsInstance.resolveDID(did);
	return didDoc;
}
