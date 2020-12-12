export async function fetchData<T>(url: string): Promise<T | undefined> {
	try {
		const response = await fetch(url, { credentials: 'include' });
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
