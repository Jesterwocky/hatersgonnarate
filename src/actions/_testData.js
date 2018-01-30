const userData = {
  profilePicUrl: 'http://s266.photobucket.com/user/Fenrisfil/media/shepard-funny-face.jpg'
};

export const friends = {
  1234567890: {
    id: '1234567890',
    username: 'Frankfurt',
    ...userData
  },
  1234567891: {
    id: '1234567891',
    username: 'Lenore',
    ...userData
  },
  1234567892: {
    id: '1234567892',
    username: 'Nancy',
    ...userData
  },
  1234567893: {
    id: '1234567893',
    username: 'Watson',
    ...userData
  },
  1234567894: {
    id: '1234567894',
    username: 'Julie',
    ...userData
  }
};


export const friendsFull = {
  1234567894: {
    id: '1234567894',
    username: 'Julie',
    topMovies: []
  }
};

export const movies = {
  '00001': {
    name: 'Scott Pilgrim vs The World',
    id: '00001',
    ratings: {
      user: '5',
      friends: '4.5',
      sitewide: '3.5'
    },
    tagline: 'It is a movie',
    blurb: 'A guy fights some guys... and one girl!',
    activity: {
      callouts: [
        {
          id: '0001',
          fromFriend: {
            id: '1234567891',
            username: friends[1234567891].username,
            profilePicUrl: userData.profilePicUrl
          },
          toFriend: {
            id: '1234567890',
            username: friends['1234567890'].username,
            profilePicUrl: userData.profilePicUrl
          },
          type: 'shame',
          starter: 'This was a MASTERPIECE!'
        },
      ],
      friendComments: [
        {
          id: '1234567890',
          username: friends['1234567890'].username,
          snippet: 'Omg overrated'
        },
        {
          id: '1234567891',
          username: friends[1234567891].username,
          snippet: 'movie was fantastic!'
        },
        {
          id: '1234567892',
          username: friends['1234567892'].username,
          snippet: 'I have soo much to say'
        }
      ],
      strangerComments: [
        {
          id: '9999999999',
          username: 'youDunnoMe',
          snippet: 'La la la la'
        }
      ]
    },
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends['1234567890'],
            rating: '1',
            thoughts: 'Omg overrated'
          },
          {
            ...friends['1234567891'],
            rating: '5',
            thoughts: 'movie was fantastic!'
          },
          {
            ...friends['1234567892'],
            rating: '4.5',
            thoughts: 'I have soo much to say about this movie'
          }
        ],
        wantToSee: {
          total: '2',
          friendDetails: [
            friends['1234567893'],
            friends['1234567894']
          ]
        }
      }
    }
  },
  '00002': {
    name: 'Call Me By Your Name',
    id: '00002',
    ratings: {
      user: '5',
      friends: '3.5',
      sitewide: '4.5'
    },
    tagline: 'The older guy is not 35.',
    blurb: 'That guy looks 35!',
    activity: {
      callouts: [
        {
          id: '0002',
          fromFriend: {
            id: '1234567890',
            username: friends['1234567890'].username,
            profilePicUrl: userData.profilePicUrl
          },
          toFriend: {
            id: '1234567891',
            username: friends[1234567891].username,
            profilePicUrl: userData.profilePicUrl
          },
          type: 'shame',
          starter: 'You gotta be kidding me, dude!'
        },
        {
          id: '0003',
          fromFriend: {
            id: '1234567891',
            username: friends[1234567891].username,
            profilePicUrl: userData.profilePicUrl
          },
          toFriend: {
            id: '1234567892',
            username: friends['1234567892'].username,
            profilePicUrl: userData.profilePicUrl
          },
          type: 'applaud',
          starter: 'I almost fell asleep, too'
        }
      ],
      friendComments: [
        {
          id: '1234567890',
          username: friends['1234567890'].username,
          snippet: 'SO GOOD!!'
        },
        {
          id: '1234567891',
          username: friends[1234567891].username,
          snippet: 'Meeehhhhh'
        },
        {
          id: '1234567892',
          username: friends['1234567892'].username,
          snippet: 'I fell asleep.'
        }
      ],
      strangerComments: [
        {
          id: '9999999999',
          username: 'youDunnoMe',
          snippet: 'La la la la'
        }
      ]
    },
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends['1234567890'],
            rating: '5',
            thoughts: 'SO GOOD!!'
          },
          {
            ...friends['1234567891'],
            rating: '2',
            thoughts: 'Meeehhhhh'
          },
          {
            ...friends['1234567892'],
            rating: '3',
            thoughts: 'I fell asleep.'
          }
        ],
        wantToSee: {
          total: '1',
          friendDetails: [
            friends['1234567894']
          ]
        }
      }
    }
  },
  '00003': {
    name: 'Whiplash',
    id: '00003',
    ratings: {
      user: '5',
      friends: '3.5',
      sitewide: '4.5'
    },
    tagline: 'It is not about Indiana Jones',
    blurb: 'NOT MY TEMPO',
    activity: {
      callouts: [],
      friendComments: [],
      strangerComments: [
        {
          id: '9999999999',
          username: 'youDunnoMe',
          snippet: 'La la la la'
        }
      ]
    },
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends['1234567890'],
            rating: '3',
            thoughts: 'I dont like music'
          },
          {
            ...friends['1234567891'],
            rating: '5',
            thoughts: 'LOVE so much'
          },
          {
            ...friends['1234567892'],
            rating: '5',
            thoughts: 'This movie is king'
          }
        ],
        wantToSee: {
          total: '1',
          friendDetails: [
            friends['1234567894']
          ]
        }
      }
    }
  }
};

export const matchingMoviesList = [
  {
    id: '00002',
    title: 'Call Me By Your Name'
  },
  {
    id: '00001',
    title: 'Scott Pilgrim vs The World'
  },
  {
    id: '00003',
    title: 'Whiplash'
  }
];

export const reRateMovieData = {
  movieId: '0001',
  movieName: 'Scott Pilgrim vs The World',
  currentRating: '5',
  previousRatings: [
    {
      dateTime: 'yesterday',
      remarks: 'I mixed this up with another movie',
      context: '2 months after first rating'
    },
    {
      dateTime: 'Jan 1, 2017',
      remarks: 'I mixed this up with another movie',
      context: '2 months after first rating'
    }
  ]
};

export const parties = {
  past: { total: 1, partyDetails: {} },
  pending: { total: 1, partyDetails: {} },
  upcoming: { total: 1, partyDetails: {} },
  newParty: {
    movie: movies[0],
    friends: [
      friends['1234567890'],
      friends['1234567891']
    ],
    secret: true,
    when: {
      month: '1',
      day: '1',
      year: '2018',
      time: {
        hours: '12',
        minutes: '30'
      }
    },
    location: 'some location indicator',
    about: "Let's decide once and for all!!!"
  }
};
