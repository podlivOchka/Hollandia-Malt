/** Resolve images correctly under the GitHub Pages repository path. */
export function assetUrl(filename: string) {
  return `${import.meta.env.BASE_URL}assets/${filename}`;
}
