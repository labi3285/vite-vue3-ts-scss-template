export function queryString(key: string): string | null {
  if (window.location.search.length > 3) {
    const querys = window.location.search.substring(1).split('&');
    if (querys.length > 0) {
      for (const query of querys) {
        const pair = query.split('=');
        if (pair.length === 2) {
          if (pair[0] === key) {
            if (pair[1] !== undefined) {
              return pair[1];
            } else {
              return null;
            }
          }
        }
      }
    }
  }
  return null;
}

export function queryFloat(key: string): number | null {
  const t = queryString(key);
  if (t !== null) {
    const f = parseFloat(t);
    if (f !== undefined) {
      return f;
    } else {
      return null;
    }
  }
  return null;
}