interface Source {
    name: string;
    url: string;
    description?: string;
    category?: string;
}

let sources: Source[] = [
    {
      name: 'The Daily Cal',
      url: 'https://www.dailycal.org/',
      description: 'The Daily Cal is the independent student newspaper of the University of California, Berkeley.',
      category: 'Berkeley News',
    },
    {
      name: 'The Epoch Times',
      url: 'https://www.theepochtimes.com/',
      description: 'The Epoch Times is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'Global News',
    },
    {
      name: 'The New York Times',
      url: 'https://www.nytimes.com/',
      description: 'The New York Times is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'US News',
    },
    {
      name: 'The Guardian',
      url: 'https://www.theguardian.com/',
      description: 'The Guardian is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'UK News',
    },
    {
      name: 'The Washington Post',
      url: 'https://www.washingtonpost.com/',
      description: 'The Washington Post is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'US News',
    },
    {
      name: 'The Wall Street Journal',
      url: 'https://www.wsj.com/',
      description: 'The Wall Street Journal is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'US News',
    },
    {
      name: 'The Economist',
      url: 'https://www.economist.com/',
      description: 'The Economist is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'Global News',
    },
    {
      name: 'The Financial Times',
      url: 'https://www.ft.com/',
      description: 'The Financial Times is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'Global News',
    },
    {
      name: 'The New York Post',
      url: 'https://www.nypost.com/',
      description: 'The New York Post is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'US News',
    },
    {
      name: 'The Los Angeles Times',
      url: 'https://www.latimes.com/',
      description: 'The Los Angeles Times is a news website that publishes articles on a variety of topics, including politics, business, science, and technology.',
      category: 'US News',
    }
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
