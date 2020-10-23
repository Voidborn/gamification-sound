import Cookies from 'universal-cookie'

export function getToken() {
    const cookies = new Cookies();
    return cookies.get('AuthToken');
}

export function setToken(token: string) {
    const cookies = new Cookies();
    cookies.set('AuthToken', token, { path: '/' });
    return;
}

export function getPointsCookie() {
    const cookies = new Cookies();
    return cookies.get('CollectedPoints');
}

export function setPointsCookie(total: number) {
    const cookies = new Cookies();
    cookies.set('CollectedPoints', total, { path: '/' });
    return;
}

export function resetCookies() {
    setToken("");
    setPointsCookie(0);
}