export function sessionIsExpired(expires) {
    if (expires < new Date()) {
        return true;
    }
    return false;
};