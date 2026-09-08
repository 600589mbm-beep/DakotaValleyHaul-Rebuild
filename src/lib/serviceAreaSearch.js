/** Normalize city spelling without confusing Minnesota with part of a name. */
export function normalizeCitySearch(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\bst\.(?=\s|[a-z]|$)/g, 'saint ')
    .replace(/\bst\b/g, 'saint')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+(?:mn|minnesota)$/, '')
    .trim();
}

/**
 * Return all matching city pages. Shared ZIPs intentionally retain all matches.
 * Keeping this independent of the DOM also makes reset behavior deterministic:
 * passing an empty string restores the entire input list.
 */
export function searchServiceAreas(areas, value) {
  const query = String(value || '').trim();
  if (!query) return { kind: 'all', query, matches: areas };

  const withoutState = query.replace(/[,\s]+(?:mn|minnesota)$/i, '').trim();
  const zip = withoutState.match(/^(\d{5})(?:[-\s]?\d{4})?$/);
  if (zip) {
    return {
      kind: 'zip', query, zip: zip[1],
      matches: areas.filter((area) => area.zipCodes.includes(zip[1])),
    };
  }
  if (/^[\d\s-]+$/.test(withoutState)) return { kind: 'incomplete-zip', query, matches: [] };

  const normalized = normalizeCitySearch(withoutState);
  return {
    kind: 'city', query,
    matches: normalized ? areas.filter((area) => normalizeCitySearch(area.name).includes(normalized)) : [],
  };
}

export function serviceAreaResultMessage(result) {
  if (result.kind === 'incomplete-zip') return 'Enter a 5-digit ZIP code, or search by city name.';
  const count = result.matches.length;
  if (result.kind === 'all') return `Browse all ${count} Minnesota cities.`;
  if (!count) return `No city pages found for “${result.query}”.`;
  return `${count} ${count === 1 ? 'city' : 'cities'} found for “${result.query}”.`;
}
