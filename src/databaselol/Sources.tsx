interface Source {
    id: number;
    name: string;
    url: string;
    description?: string;
    category?: string;
}

let sources: Source[] = [
];

export function getSources(): Source[] {
    return sources;
}

export function addSource(source: Source) {
    sources.push(source);
}

export function removeSource(source: Source) {
    sources = sources.filter((s) => s.name !== source.name);
    console.log(sources);
}
