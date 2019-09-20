const flattenObject = dict => {
    const newObject = {};
    Object.keys(dict).forEach(key => {
        if (typeof dict[key] === 'object' && dict[key] !== null) {
            Object.assign(newObject, flattenObject(dict[key]));
        } else {
            newObject[key] = dict[key];
        }
    });
    return newObject;
};

export default flattenObject;
