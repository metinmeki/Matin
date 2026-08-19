const AUTH_HEADER_KEY = "adminAuthHeader";

export function setAuthHeader(headerValue) {
  sessionStorage.setItem(AUTH_HEADER_KEY, headerValue);
}

export function clearAuthHeader() {
  sessionStorage.removeItem(AUTH_HEADER_KEY);
}

function authHeaders() {
  const headerValue = sessionStorage.getItem(AUTH_HEADER_KEY);
  return headerValue ? { Authorization: headerValue } : {};
}

export async function verifyLogin(username, password) {
  const headerValue = `Basic ${btoa(`${username}:${password}`)}`;
  const response = await fetch("/api/admin/ping", {
    headers: { Authorization: headerValue },
  });
  if (!response.ok) return false;
  setAuthHeader(headerValue);
  return true;
}

export async function saveData(type, data) {
  const response = await fetch(`/api/admin/save/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Save failed with status ${response.status}`);
  }

  return response.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/admin/upload-image", {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Upload failed with status ${response.status}`);
  }

  const result = await response.json();
  return result.path;
}
