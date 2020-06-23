import { Inject, CACHE_MANAGER, Injectable, applyDecorators, SetMetadata, Get } from "@nestjs/common"

@Injectable()
export class DecoratorService {
    static client: any;
    constructor(@Inject(CACHE_MANAGER) public _cacheManager: any) {
        DecoratorService.client = _cacheManager;
    }
}

const metadataKey = 'metadata_key';
const ttl = 600;

export const Apply = (...path) => applyDecorators(
    Cacheable(),
    Get(path)
);

export const Cacheable = (): any => (target, propertyKey, descriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        const result = await method.apply(this, args);
        const cacheValue = await DecoratorService.client.get(keyCache);
        if (cacheValue) return cacheValue;
        DecoratorService.client.set(keyCache, result, { ttl });
        return result;
    };
};

export const CacheExist = (): MethodDecorator => (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        const result = await method.apply(this, args);
        const cacheValue = await DecoratorService.client.get(keyCache);
        if (cacheValue) return cacheValue;
        return (`${result}Can't found cache!`);
    };
};

export const CachePush = (): MethodDecorator => (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        const result = await method.apply(this, args);
        const cacheValue = await DecoratorService.client.get(keyCache);
        if (cacheValue) {
            cacheValue.push(result);
            DecoratorService.client.set(keyCache, cacheValue, { ttl });
        }
        return result;
    };
};

export const CacheDelete = (): MethodDecorator => (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        try {
            const result = await method.apply(this, args);
            const cacheValue = await DecoratorService.client.get(keyCache);
            if (cacheValue) {
                const index = cacheValue.findIndex((item) => item._id.toString() === result._id.toString());
                cacheValue.splice(index, 1);
                DecoratorService.client.set(keyCache, cacheValue, { ttl });
            }
            return result;
        } catch (err) {
            return `Can't found data to delete. ${err}`;
        }
    };
};

export const CacheUpdate = (): MethodDecorator => (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        try {
            const result = await method.apply(this, args);
            const cacheValue = await DecoratorService.client.get(keyCache);
            const rs = Object.assign(result, args[1]);
            if (cacheValue) {
                const index = cacheValue.findIndex((item) => item._id.toString() === result._id.toString());
                Object.assign(cacheValue[index], args[1]);
                DecoratorService.client.set(keyCache, cacheValue, { ttl });
            }
            return rs;
        } catch (err) {
            return `Can't found data to update. ${err}`;
        }
    };
};

export const CacheInvalidate = (): MethodDecorator => (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const keyCache = Reflect.getMetadata(metadataKey, target);
        const result = await method.apply(this, args);
        if (await DecoratorService.client.get(keyCache)) {
            DecoratorService.client.del(keyCache);
            return result;
        }
        return 'Not exists key cache!';
    };
};

export const ObjectCache = (key: string): ClassDecorator => (target) => {
    Reflect.defineMetadata(metadataKey, key, target.prototype);
};

//method decorator lưu return của method như một metadataValue, tạo một metadata với key 'methodMetaData'
export const methodDecorator = (): MethodDecorator => (target, key, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        const result = await method.apply(this, args);
        Reflect.defineMetadata('metadata_key', result, target, key);
        return result;
    }
}

