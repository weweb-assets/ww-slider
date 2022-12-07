export function getContent(c) {
    if (typeof c === 'object' && 'type' in c && c.type === 'collection' && c.data) {
        if (c.limit !== null) return c.data.slice(c.offset, c.offset + c.limit);
        else return c.data;
    } else if (Array.isArray(c)) {
        return c.filter(item => item !== undefined);
    } else {
        return [];
    }
}
