const INDEXNOW_KEY = 'ab8027dbe005483c9d5ed852e3fb576d';
const HOST = 'www.zeteoh.com';

// Netlify build event handler: pings IndexNow (Bing/Yandex/etc.) with the
// sitemap URL after every successful deploy so newly published/updated pages
// get crawled faster, without depending on a third-party plugin.
export default async () => {
	const response = await fetch('https://api.indexnow.org/indexnow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			host: HOST,
			key: INDEXNOW_KEY,
			keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
			urlList: [`https://${HOST}/sitemap.xml`]
		})
	});

	if (!response.ok) {
		console.error(`IndexNow ping failed: ${response.status} ${await response.text()}`);
	}
};

export const config = {
	// Manually invoked (e.g. via an onSuccess build hook), not an HTTP route.
	path: '/.netlify/functions/indexnow-ping'
};
