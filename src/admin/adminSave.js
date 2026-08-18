export async function saveData(type, data) {
  const response = await fetch(`/__admin/save/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Save failed with status ${response.status}`);
  }

  return response.json();
}
