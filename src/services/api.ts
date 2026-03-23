// src/services/api.ts

const BASE_URL = 'http://localhost:5013/api/';

// ✅ GET
export async function get<TResult>(url: string): Promise<TResult> {
  return await request<TResult>('GET', url);
}

// ✅ POST
export async function post<TResult>(url: string, body: unknown): Promise<TResult> {
  return await request<TResult>('POST', url, body);
}

// ✅ PUT
export async function put<TResult>(url: string, body: unknown): Promise<TResult> {
  return await request<TResult>('PUT', url, body);
}

// ✅ PATCH
export async function patch<TResult>(url: string, body: unknown): Promise<TResult> {
  return await request<TResult>('PATCH', url, body);
}


export async function remove<TResult = void>(url: string): Promise<TResult> {
  return await request<TResult>('DELETE', url);
}

// 🔥 COMMON REQUEST HANDLER
async function request<TResult>(
  method: string,
  url: string,
  body?: unknown
): Promise<TResult> {
  const response = await fetch(BASE_URL + url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  // ❗ Handle error responses
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'API Error');
  }

  // ❗ No content case (DELETE etc.)
  if (response.status === 204) {
    return undefined as TResult;
  }

  const json = await response.json();
  return json as TResult;
}