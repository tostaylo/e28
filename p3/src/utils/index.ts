import { TimingResult, Definition } from '@/types/index';
export async function fetchData(
	url: string
): Promise<
	Record<string, Definition> | { success: boolean; errors: string; timingResult: TimingResult[] } | undefined
> {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.log(response);
			throw new Error(`Data fetch unsuccessful for ${url}`);
		}

		const json = await response.json();
		const data = await json;

		if (data.success === false) {
			console.log(data.errors);
			throw new Error(`Data fetch unsuccessful for ${url}`);
		}

		return data;
	} catch (err) {
		console.log(err);
		return;
	}
}
