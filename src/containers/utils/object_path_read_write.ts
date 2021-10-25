/**
 * Recursive object read util
 */

/** Read object recursive and return path */
export function ReadObjectRecursively(obj: object, path: string): object | string | null {

    // Recursive read function
    const read = (currentObj: string | object, currentPath: string[]): object | string | null => {
        if (typeof currentObj == 'string') {
            if (currentPath.length > 1) {
                throw new Error('Expected object, got string');
            } else {
                return currentObj;
            }
        } else {
            if (currentPath[0] in currentObj) {
                return read(
                    currentObj[currentPath[0]],
                    currentPath.slice(1)
                );
            } else {
                return null;
            }
        }
    };
    const result = read(
        obj,
        path.split('/').filter((i) => i).map((i) => i.trim())
    );

    // Return result
    return !result ? null : result as (object | string);
}

/** Read object recursive and write value */
export function WriteObjectRecursively(obj: object, path: string, value: string): void {

    // Recursive read function
    const read = (currentObj: string | object, currentPath: string[]): object | string | null => {
        if (typeof currentObj == 'string') {
            if (currentPath.length > 1) {
                currentObj[currentPath[0]] = {};
                read(currentObj[currentPath[0]], currentPath.slice(1));
            } else {
                currentObj[currentPath[0]] = value;
            }
        } else {
            if (currentPath[0] in currentObj) {
                return read(
                    currentObj[currentPath[0]],
                    currentPath.slice(1)
                );
            } else {
                return null;
            }
        }
    };

    // Start
    read(
        obj,
        path.split('/').filter((i) => i).map((i) => i.trim())
    );
}
