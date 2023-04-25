export function sessionIsExpired(expires) {
    if (expires < new Date()) {
        return true;
    }
    return false;
};

export function findObjByType(array, type) {
    let obj = array.find(item => item.type === type)

    return obj;
}