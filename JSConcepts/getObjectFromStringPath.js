const obj = {
    a: {
        b: {
            c: {
                d: [1, 2, 3],
                e: {
                    f: 3
                }
            }
        }
    }
}

const path1 = 'a.b.c.d';
const path2 = 'a.b.c.e.f';
const path3 = 'a.b.c.d.3'; 

function getObjectFromStringPath(obj, path) {
    if(path === '' || path.length === 0) return undefined;
    if(Array.isArray(path)) path = path.join('.');
    let exactPath = [];
    for(let i=0;i<path.length;i++) {
        if(path[i] !== '.' && path[i] !=='[' && path[i] !== ']') exactPath.push(path[i]);
    }
    const value  = exactPath.reduce((source,path) => source[path], obj);
    return value ? value : undefined;
}

console.log(getObjectFromStringPath(obj, path1));
console.log(getObjectFromStringPath(obj, path2))
console.log(getObjectFromStringPath(obj, path3))
