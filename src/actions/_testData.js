const userData = {
  profilePicUrl: 'http://images6.fanpop.com/image/photos/40700000/461366-dogs-happy-dog-corgi-dogs-40712807-500-500.jpg',
};

export const testUser = {
  id: '9876543210',
  username: 'Jessie',
  ...userData,
};

export const friends = {
  1234567890: {
    id: '1234567890',
    username: 'Frankfurt',
    ...userData,
  },
  1234567891: {
    id: '1234567891',
    username: 'Lenore',
    ...userData,
  },
  1234567892: {
    id: '1234567892',
    username: 'Nancy',
    ...userData,
  },
  1234567893: {
    id: '1234567893',
    username: 'Watson',
    ...userData,
  },
  1234567894: {
    id: '1234567894',
    username: 'Julie',
    ...userData,
  },
};

export const contextualFriends = [
  {
    id: '1234567890',
    username: friends['1234567890'].username,
    saw: true,
    wantToSee: false,
    rating: '3',
  },
  {
    id: '1234567891',
    username: friends['1234567891'].username,
    saw: true,
    wantToSee: false,
    rating: '5',
  },
  {
    id: '1234567892',
    username: friends['1234567892'].username,
    saw: true,
    wantToSee: false,
    rating: '5',
  },
  {
    id: '1234567894',
    username: friends['1234567894'].username,
    saw: false,
    wantToSee: true,
  },
];

const movieData = {
  ratings: {
    user: '',
    friends: '3.5',
    sitewide: '4.5',
  },
  tagline: 'It is a movie',
  blurb: 'The movie that changed everything',
  callouts: [
    {
      id: '0002',
      fromFriend: {
        id: '1234567890',
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had thoughts once',
        },
        username: friends['1234567890'].username,
        profilePicUrl: userData.profilePicUrl,
      },
      toFriend: {
        id: '1234567891',
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had thoughts once',
        },
        username: friends[1234567891].username,
        profilePicUrl: userData.profilePicUrl,
      },
      type: 'shame',
      starter: 'You gotta be kidding me, dude!',
    },
    {
      id: '0003',
      fromFriend: {
        id: '1234567891',
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had thoughts once',
        },
        username: friends[1234567891].username,
        profilePicUrl: userData.profilePicUrl,
      },
      toFriend: {
        id: '1234567892',
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had thoughts once',
        },
        username: friends['1234567892'].username,
        profilePicUrl: userData.profilePicUrl,
      },
      type: 'applaud',
      starter: 'I almost fell asleep, too',
    },
  ],
  comments: {
    byFriends: [
      {
        id: '1234567890',
        username: friends['1234567890'].username,
        snippet: 'SO GOOD!!',
      },
      {
        id: '1234567891',
        username: friends[1234567891].username,
        snippet: 'Meeehhhhh',
      },
      {
        id: '1234567892',
        username: friends['1234567892'].username,
        snippet: 'I fell asleep.',
      },
    ],
  },
  byStrangers: [
    {
      id: '9999999999',
      username: 'youDunnoMe',
      snippet: 'La la la la',
    },
  ],
  friends: {
    1234567890: {
      username: friends[1234567890].username,
      saw: true,
      wantToSee: false,
      rating: '5',
      commentSnippet: 'SO GOOD!!',
    },
    1234567891: {
      username: friends[1234567891].username,
      saw: true,
      wantToSee: false,
      rating: '2',
      commentSnippet: 'Meeehhhhh',
    },
    1234567892: {
      username: friends[1234567892].username,
      saw: true,
      wantToSee: false,
      rating: '3',
      commentSnippet: 'I fell asleep.',
    },
    1234567894: {
      username: friends[1234567894].username,
      saw: false,
      wantToSee: true,
    },
  },
};

export const friendsFull = {
  1234567894: {
    id: '1234567894',
    username: 'Julie',
    topMovies: [],
  },
};

export const ratedMovies = {
  '00001': {
    title: 'Scott Pilgrim vs The World',
    id: '00001',
    ratings: {
      user: '5',
      friends: '4.5',
      sitewide: '3.5',
    },
    tagline: 'It is a movie',
    blurb: 'A guy fights some guys... and one girl!',
    callouts: [
      {
        id: '0001',
        fromFriend: {
          id: '1234567891',
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had thoughts once',
          },
          username: friends[1234567891].username,
          profilePicUrl: userData.profilePicUrl,
        },
        toFriend: {
          id: '1234567890',
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had thoughts once',
          },
          username: friends['1234567890'].username,
          profilePicUrl: userData.profilePicUrl,
        },
        type: 'shame',
        starter: 'This was a MASTERPIECE!',
      },
    ],
    comments: {
      byFriends: [
        {
          id: '1234567890',
          username: friends['1234567890'].username,
          snippet: 'Omg overrated',
        },
        {
          id: '1234567891',
          username: friends[1234567891].username,
          snippet: 'movie was fantastic!',
        },
        {
          id: '1234567892',
          username: friends['1234567892'].username,
          snippet: 'I have soo much to say',
        },
      ],
      byStrangers: [
        {
          id: '9999999999',
          username: 'youDunnoMe',
          snippet: 'La la la la',
        },
      ],
    },
    friends: {
      1234567890: {
        username: friends[1234567890].username,
        saw: true,
        wantToSee: false,
        rating: '1',
        commentSnippet: 'Omg overrated',
      },
      1234567891: {
        username: friends[1234567891].username,
        saw: true,
        wantToSee: false,
        rating: '5',
        commentSnippet: 'movie was fantastic!',
      },
      1234567892: {
        username: friends['1234567892'].username,
        saw: true,
        wantToSee: false,
        rating: '4.5',
        commentSnippet: 'I have soo much to say about this movie',
      },
      1234567893: {
        username: friends['1234567893'].username,
        saw: false,
        wantToSee: true,
      },
      1234567894: {
        username: friends['1234567894'].username,
        saw: false,
        wantToSee: true,
      },
    },
  },
  '00002': {
    title: 'Call Me By Your Name',
    id: '00002',
    ratings: {
      user: '5',
      friends: '3.5',
      sitewide: '4.5',
    },
    tagline: 'The older guy is not 35.',
    blurb: 'That guy looks 35!',
    callouts: [
      {
        id: '0002',
        fromFriend: {
          id: '1234567890',
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had thoughts once',
          },
          username: friends['1234567890'].username,
          profilePicUrl: userData.profilePicUrl,
        },
        toFriend: {
          id: '1234567891',
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had thoughts once',
          },
          username: friends[1234567891].username,
          profilePicUrl: userData.profilePicUrl,
        },
        type: 'shame',
        starter: 'You gotta be kidding me, dude!',
      },
      {
        id: '0003',
        fromFriend: {
          id: '1234567891',
          username: friends[1234567891].username,
          profilePicUrl: userData.profilePicUrl,
        },
        toFriend: {
          id: '1234567892',
          username: friends['1234567892'].username,
          profilePicUrl: userData.profilePicUrl,
        },
        type: 'applaud',
        starter: 'I almost fell asleep, too',
      },
    ],
    comments: {
      byFriends: [
        {
          id: '1234567890',
          username: friends['1234567890'].username,
          snippet: 'SO GOOD!!',
        },
        {
          id: '1234567891',
          username: friends[1234567891].username,
          snippet: 'Meeehhhhh',
        },
        {
          id: '1234567892',
          username: friends['1234567892'].username,
          snippet: 'I fell asleep.',
        },
      ],
    },
    byStrangers: [
      {
        id: '9999999999',
        username: 'youDunnoMe',
        snippet: 'La la la la',
      },
    ],
    friends: {
      1234567890: {
        username: friends[1234567890].username,
        saw: true,
        wantToSee: false,
        rating: '5',
        commentSnippet: 'SO GOOD!!',
      },
      1234567891: {
        username: friends[1234567891].username,
        saw: true,
        wantToSee: false,
        rating: '2',
        commentSnippet: 'Meeehhhhh',
      },
      1234567892: {
        username: friends[1234567892].username,
        saw: true,
        wantToSee: false,
        rating: '3',
        commentSnippet: 'I fell asleep.',
      },
      1234567894: {
        username: friends[1234567894].username,
        saw: false,
        wantToSee: true,
      },
    },
  },
  '00003': {
    title: 'Whiplash',
    id: '00003',
    ratings: {
      user: '5',
      friends: '3.5',
      sitewide: '4.5',
    },
    tagline: 'It is not about Indiana Jones',
    blurb: 'NOT MY TEMPO',
    callouts: [],
    comments: {
      byFriends: [],
      byStrangers: [
        {
          id: '9999999999',
          username: 'youDunnoMe',
          snippet: 'La la la la',
        },
      ],
    },
    friends: {
      1234567890: {
        saw: true,
        wantToSee: false,
        rating: '3',
        commentSnippet: 'I dont like music',
      },
      1234567891: {
        saw: true,
        wantToSee: false,
        rating: '5',
        commentSnippet: 'LOVE so much',
      },
      1234567892: {
        saw: true,
        wantToSee: false,
        rating: '5',
        commentSnippet: 'This movie is king',
      },
      1234567894: {
        saw: false,
        wantToSee: true,
        commentSnippet: 'I wanna see it, but I dont wanna pay for it',
      },
    },
  },
};

export const extraMovies = {
  '00004': {
    id: '00004',
    title: 'A Futile and Stupid Gesture',
    ...movieData,
  },
  '00005': {
    id: '00005',
    title: 'StarWars: The Last Jedi',
    ...movieData,
  },
  '00006': {
    id: '00006',
    title: 'StarWars: Rogue One',
    ...movieData,
  },
};

export const allMovies = Object.assign({}, ratedMovies, extraMovies);

export const matchingMoviesList = [
  {
    id: '00004',
    title: 'A Futile and Stupid Gesture',
  },
  {
    id: '00005',
    title: 'StarWars: The Last Jedi',
  },
  {
    id: '00006',
    title: 'StarWars: Rogue One',
  },
];

export const matchingFriendsList = Object.keys(friends)
  .map(friendKey => friends[friendKey]);

export const modalMovieData = {
  '00004': {
    id: '00004',
    title: 'A Futile and Stupid Gesture',
    blurb: 'A movie about good times, bad times, and that one time at band camp.',
    friends: {
      sawIt: [
        friends['1234567890'],
        friends['1234567891'],
      ],
      interested: [
        friends['1234567892'],
        friends['1234567893'],
        friends['1234567894'],
      ],
    },
  },
  '00005': {
    id: '00005',
    title: 'StarWars: The Last Jedi',
    blurb: 'A movie about good times, bad times, and that one time at band camp.',
    friends: {
      sawIt: [
        friends['1234567890'],
        friends['1234567891'],
      ],
      interested: [
        friends['1234567892'],
        friends['1234567893'],
        friends['1234567894'],
      ],
    },
  },
  '00006': {
    id: '00006',
    title: 'StarWars: Rogue One',
    blurb: 'A movie about good times, bad times, and that one time at band camp.',
    friends: {
      sawIt: [
        friends['1234567890'],
        friends['1234567891'],
      ],
      interested: [
        friends['1234567892'],
        friends['1234567893'],
        friends['1234567894'],
      ],
    },
  },
};

export const reRateMovieData = {
  movieId: '0001',
  title: 'Scott Pilgrim vs The World',
  currentRating: '5',
  previousRatings: [
    {
      dateTime: 'yesterday',
      remarks: 'I mixed this up with another movie',
      context: '2 months after first rating',
    },
    {
      dateTime: 'Jan 1, 2017',
      remarks: 'I mixed this up with another movie',
      context: '2 months after first rating',
    },
  ],
};

export const parties = {
  past: { total: 1, partyDetails: {} },
  pending: { total: 1, partyDetails: {} },
  upcoming: { total: 1, partyDetails: {} },
  newParty: {
    movie: ratedMovies[0],
    friends: [
      friends['1234567890'],
      friends['1234567891'],
    ],
    secret: true,
    when: {
      month: '1',
      day: '1',
      year: '2018',
      time: {
        hours: '12',
        minutes: '30',
      },
    },
    location: 'some location indicator',
    about: "Let's decide once and for all!!!",
  },
};

export const messagesBetweenOthers = {
  id: '00001',
  type: 'seed',
  // store by convo sequence number, maybe in case
  // a message gets deleted ?
  // TODO: decide on data structure
  messages: {
    0: {
      messageSequenceNumber: 0,
      time: 1518215734255,
      id: '00001',
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567891'],
      },
      responseTo: {
        time: 1518215734254,
        id: '00004',
        sender: {
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had something to say. So many thinks! What a thing.',
          },
          ...friends['1234567890'],
        },
        text: 'I did not love it',
      },
      text: 'This movie was so goood! How can you deny?!',
    },
    1: {
      messageSequenceNumber: 1,
      time: 1518215734256,
      id: '00002',
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567890'],
      },
      text: 'It was suck.',
    },
    2: {
      messageSequenceNumber: 2,
      time: 1518215734257,
      id: '00003',
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567890'],
      },
      text: 'Accept it!',
    },
    3: {
      messageSequenceNumber: 3,
      time: 1518215734258,
      id: '00004',
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567891'],
      },
      text: 'Accept it!',
    },
  },
};

export const messagesBetweenFriends = {
  id: '00002',
  type: 'private',
  messages: {
    0: {
      messageSequenceNumber: 0,
      time: 1518215734259,
      id: '00005',
      responseTo: {
        time: 1518215734258,
        id: '00004',
        sender: {
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had something to say. So many thinks! What a thing.',
          },
          ...friends['1234567892'],
        },
        text: 'Dont listen!!!',
      },
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567892'],
      },
      text: 'Mooovie! La la la!',
    },
    1: {
      messageSequenceNumber: 1,
      time: 1518215734260,
      id: '00006',
      sender: {
        ratingSnapshot: {
          rating: '3',
          snippet: 'I had something to say. So many thinks! What a thing.',
        },
        ...friends['1234567891'],
      },
      text: `This is a message about a movie. A pretty good movie.
      A movie that deserves our love and acclaim. But not THAT much.`,
    },
  },
};

export const messagesBetweenAll = {
  id: '00003',
  type: 'public',
  messages: {},
};

export const calloutContext = {
  type: 'callout',
  subType: 'seed',
  contextId: '00001',
  conversationId: '00001',
  movieId: '00001',
  initiator: {
    ...friends['1234567891'],
    ratingSnapshot: {
      rating: '5',
      snippet: 'I had something to say. So many thinks! What a thing.',
    },
  },
  target: {
    ...friends['1234567890'],
    ratingSnapshot: {
      rating: '1',
      snippet: 'I had something to say. So many thinks! What a thing.',
    },
  },
};

export const calloutConversation = {
  id: '00001',
  threads: {
    [messagesBetweenOthers.type]: messagesBetweenOthers,
    [messagesBetweenFriends.type]: messagesBetweenFriends,
    [messagesBetweenAll.type]: messagesBetweenAll,
  },
};
