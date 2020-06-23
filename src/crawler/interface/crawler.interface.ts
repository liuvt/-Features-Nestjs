export interface IOpenGraph {
    sitename?: string,
    title?: string,
    description?: string,
    url: string,
    type?: string,
    image?: IImage,
    video?: IVideo
}

export interface IImage {
    url?: string,
    width?: number,
    height?: number,
    type?: string,
}

export interface IVideo {
    url?: string,
    width?: number,
    height?: number,
    type?: string,
}