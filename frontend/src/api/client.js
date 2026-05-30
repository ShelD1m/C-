const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const TOKEN_KEY = 'resume_plus_token';

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    }
}

export function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = getToken();

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const hasFormData = options.body instanceof FormData;
    if (options.body && !hasFormData && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message = typeof body === 'object' && body?.message
            ? body.message
            : 'Ошибка запроса к серверу';
        throw new Error(message);
    }

    return body;
}

export const api = {
    register: (payload) => request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    login: (payload) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    me: () => request('/auth/me'),

    profile: () => request('/profile'),

    listResumes: () => request('/resumes'),

    createResume: (payload) => request('/resumes', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),

    getResume: (id) => request(`/resumes/${id}`),

    updateResume: (id, payload) => request(`/resumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    }),

    deleteResume: (id) => request(`/resumes/${id}`, {
        method: 'DELETE',
    }),

    publishResume: (id) => request(`/resumes/${id}/publish`, {
        method: 'POST',
    }),

    unpublishResume: (id) => request(`/resumes/${id}/unpublish`, {
        method: 'POST',
    }),

    importJson: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return request('/import/json', {
            method: 'POST',
            body: formData,
        });
    },

    importPdf: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return request('/import/pdf', {
            method: 'POST',
            body: formData,
        });
    },

    getPublicResume: (slug) => request(`/public/resumes/${slug}`),

    improveText: (payload) => request('/ai/improve-text', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),
};

export {API_URL};
