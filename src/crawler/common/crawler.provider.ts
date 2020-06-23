import { extname } from 'path';
import * as Url from 'url';

export const emp = '';
export const detailOgc = (_sitename, _title, _description, _url, _type) => {
    return {
        sitename: _sitename || emp,
        title: _title || emp,
        description: _description || emp,
        url: _url,
        type: _type || emp,
    };
}

export const mediaOgc = (_url, _width, _height, _type) => {
    return  {
        url: _url || emp,
        width: _width || emp,
        height: _height || emp,
        type: _type|| emp,
    };
}

export const etExtensionUrl = (urlImg) => {
    try {
        return (extname(Url.parse(urlImg).pathname).replace('.', emp));
    } catch (e) {
        return emp;
    }
}

export const isExisthttp = (url: string) => {
    const reUrl = url.replace('http://', '')
    return (reUrl.search('https://') === -1) ? 'https://' + reUrl : reUrl
}
