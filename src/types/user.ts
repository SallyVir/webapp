export interface User {
    id: string;
    avatar?: string | null;
    name: string;
    password?: string;
    re_login_code: string | null;
    session_expires_at: string | null;
}