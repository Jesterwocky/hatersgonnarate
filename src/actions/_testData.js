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
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends[0],
            rating: '1',
            thoughts: 'Omg overrated'
          },
          {
            ...friends[1],
            rating: '5',
            thoughts: 'movie was fantastic!'
          },
          {
            ...friends[2],
            rating: '4.5',
            thoughts: 'I have soo much to say about this movie'
          }
        ],
        wantToSee: {
          total: '2',
          friendDetails: [
            friends[3],
            friends[4]
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
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends[0],
            rating: '5',
            thoughts: 'SO GOOD!!'
          },
          {
            ...friends[1],
            rating: '2',
            thoughts: 'Meeehhhhh'
          },
          {
            ...friends[2],
            rating: '3',
            thoughts: 'I fell asleep.'
          }
        ],
        wantToSee: {
          total: '1',
          friendDetails: [
            friends[4]
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
    friends: {
      saw: {
        total: '10',
        friendDetails: [
          {
            ...friends[0],
            rating: '5',
            thoughts: 'SO GOOD!!'
          },
          {
            ...friends[1],
            rating: '2',
            thoughts: 'Meeehhhhh'
          },
          {
            ...friends[2],
            rating: '3',
            thoughts: 'I fell asleep.'
          }
        ],
        wantToSee: {
          total: '1',
          friendDetails: [
            friends[4]
          ]
        }
      }
    }
  }
};

export const reRateMovieData = {
  movieId: '0001',
  movieName: 'Scott Pilgrim vs The World',
  currentRating: '5',
  previousRatings: [
    {
      dateTime: 'yesterday',
      explanation: 'I mixed this up with another movie',
      context: '2 months after first rating'
    },
    {
      dateTime: 'Jan 1, 2017',
      explanation: 'I mixed this up with another movie',
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
      friends[0],
      friends[1]
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
