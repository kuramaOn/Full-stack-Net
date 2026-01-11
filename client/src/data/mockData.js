// Mock data for frontend-only mode

export const mockMovies = [
  {
    _id: '1',
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    type: "movie",
    genres: ["Action", "Sci-Fi", "Thriller"],
    releaseYear: 2010,
    duration: 148,
    rating: { average: 4.8, count: 2340 },
    ageRating: "PG-13",
    cast: [
      { name: "Leonardo DiCaprio", character: "Dom Cobb" },
      { name: "Joseph Gordon-Levitt", character: "Arthur" },
      { name: "Elliot Page", character: "Ariadne" }
    ],
    director: "Christopher Nolan",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
    trending: true,
    newRelease: false,
    views: 125000,
    likes: 98000,
    status: "active"
  },
  {
    _id: '2',
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    type: "movie",
    genres: ["Action", "Crime", "Drama"],
    releaseYear: 2008,
    duration: 152,
    rating: { average: 4.9, count: 3200 },
    ageRating: "PG-13",
    cast: [
      { name: "Christian Bale", character: "Bruce Wayne" },
      { name: "Heath Ledger", character: "Joker" },
      { name: "Aaron Eckhart", character: "Harvey Dent" }
    ],
    director: "Christopher Nolan",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: false,
    trending: true,
    newRelease: false,
    views: 156000,
    likes: 142000,
    status: "active"
  },
  {
    _id: '3',
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    type: "movie",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    duration: 169,
    rating: { average: 4.7, count: 2890 },
    ageRating: "PG-13",
    cast: [
      { name: "Matthew McConaughey", character: "Cooper" },
      { name: "Anne Hathaway", character: "Brand" }
    ],
    director: "Christopher Nolan",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: false,
    trending: true,
    newRelease: false,
    views: 98000,
    likes: 87000,
    status: "active"
  },
  {
    _id: '4',
    title: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    type: "movie",
    genres: ["Action", "Sci-Fi"],
    releaseYear: 1999,
    duration: 136,
    rating: { average: 4.6, count: 4200 },
    ageRating: "R",
    director: "Lana Wachowski, Lilly Wachowski",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    featured: false,
    trending: false,
    newRelease: false,
    views: 234000,
    likes: 198000,
    status: "active"
  },
  {
    _id: '5',
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    type: "movie",
    genres: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2019,
    duration: 181,
    rating: { average: 4.5, count: 5600 },
    ageRating: "PG-13",
    director: "Anthony Russo, Joe Russo",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    featured: false,
    trending: true,
    newRelease: false,
    views: 345000,
    likes: 289000,
    status: "active"
  },
  {
    _id: '6',
    title: "Dune",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    type: "movie",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2021,
    duration: 155,
    rating: { average: 4.4, count: 1890 },
    ageRating: "PG-13",
    director: "Denis Villeneuve",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    featured: false,
    trending: false,
    newRelease: true,
    views: 67000,
    likes: 54000,
    status: "active"
  }
];

export const mockSeries = [
  {
    _id: '7',
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    type: "series",
    genres: ["Drama", "Fantasy", "Horror"],
    releaseYear: 2016,
    seasons: 4,
    episodes: 34,
    rating: { average: 4.7, count: 4500 },
    ageRating: "TV-14",
    director: "The Duffer Brothers",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    featured: true,
    trending: true,
    newRelease: false,
    views: 456000,
    likes: 398000,
    status: "active"
  },
  {
    _id: '8',
    title: "Breaking Bad",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    type: "series",
    genres: ["Crime", "Drama", "Thriller"],
    releaseYear: 2008,
    seasons: 5,
    episodes: 62,
    rating: { average: 4.9, count: 6700 },
    ageRating: "TV-MA",
    director: "Vince Gilligan",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: false,
    trending: true,
    newRelease: false,
    views: 678000,
    likes: 645000,
    status: "active"
  },
  {
    _id: '9',
    title: "Wednesday",
    description: "Follows Wednesday Addams' years as a student, when she attempts to master her emerging psychic ability.",
    type: "series",
    genres: ["Comedy", "Crime", "Fantasy"],
    releaseYear: 2022,
    seasons: 1,
    episodes: 8,
    rating: { average: 4.3, count: 2800 },
    ageRating: "TV-14",
    director: "Tim Burton",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: false,
    trending: true,
    newRelease: true,
    views: 289000,
    likes: 234000,
    status: "active"
  },
  {
    _id: '10',
    title: "The Witcher",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    type: "series",
    genres: ["Action", "Adventure", "Fantasy"],
    releaseYear: 2019,
    seasons: 3,
    episodes: 24,
    rating: { average: 4.4, count: 3900 },
    ageRating: "TV-MA",
    director: "Lauren Schmidt Hissrich",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=750&fit=crop",
    banner: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=800&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    featured: false,
    trending: false,
    newRelease: false,
    views: 345000,
    likes: 278000,
    status: "active"
  }
];

export const mockUser = {
  _id: 'user1',
  name: 'Demo User',
  email: 'demo@netflix.com',
  role: 'user',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0ea5e9&color=fff',
  favorites: [],
  watchlist: [],
  subscription: { plan: 'premium' }
};

export const getAllContent = () => {
  return [...mockMovies, ...mockSeries];
};

export const getContentById = (id) => {
  return getAllContent().find(item => item._id === id);
};

export const getContentByType = (type) => {
  return getAllContent().filter(item => item.type === type);
};

export const getFeaturedContent = () => {
  return getAllContent().filter(item => item.featured);
};

export const getTrendingContent = () => {
  return getAllContent().filter(item => item.trending);
};

export const getNewReleases = () => {
  return getAllContent().filter(item => item.newRelease);
};

export const searchContent = (query) => {
  const lowerQuery = query.toLowerCase();
  return getAllContent().filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.genres.some(genre => genre.toLowerCase().includes(lowerQuery))
  );
};
