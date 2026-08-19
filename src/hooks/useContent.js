import { useEffect, useState } from "react";

// Seeds from the bundled fallback JSON (first paint, and if the API is
// unreachable), then swaps in live data from /api/content/:type once it
// resolves — but only if it looks like valid, non-empty content, so a
// bad save or a flaky request can't blank the live site.
export default function useContent(type, fallbackData) {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/content/${type}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((fresh) => {
        if (!cancelled && Array.isArray(fresh) && fresh.length > 0) {
          setData(fresh);
        }
      })
      .catch(() => {
        // Keep the bundled fallback data.
      });

    return () => {
      cancelled = true;
    };
  }, [type]);

  return data;
}
