// Not prerendered: this route only ever redirects, and the redirect target must
// include the real request's query string (e.g. UTM params) which isn't known
// until request time.
export const prerender = false;
