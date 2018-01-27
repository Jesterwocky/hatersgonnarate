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
            rating: '5',
            thoughts: 'Omg overrated'
          },
          {
            ...friends[1],
            rating: '10',
            thoughts: 'movie was fantastic!'
          },
          {
            ...friends[2],
            rating: '8',
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
  }
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
