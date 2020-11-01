import Cookies from 'universal-cookie'

export function getToken() :string {
    const cookies = new Cookies();
    return cookies.get('AuthToken');
}

export function setToken(token: string) {
    const cookies = new Cookies();
    cookies.set('AuthToken', token, { path: '/' });
    return;
}

export function resetCookies() {
    setToken("");
}
