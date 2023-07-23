const dump = (obj: object) => JSON.stringify(obj, null, 2);

const logDump = (obj: object) => console.log(dump(obj));

export {dump, logDump};
