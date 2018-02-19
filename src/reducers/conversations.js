import {
  GET_CONVERSATIONS,
  UPDATE_CONVERSATION_THREAD,
} from '../actions/conversations';

const initialState = {
  conversations: {
    // conversationId : {}
  },
  context: {
    type: '',
    variant: '',
    contextId: '', // id of context thing, e.g., the callout
    conversationId: '',
    movieId: '',
    initiator: {
      userId: '',
      username: '',
      ratingSnapshot: {
        rating: '',
        snippet: '',
      },
    },
    target: {
      userId: '',
      username: '',
      ratingSnapshot: {
        rating: '',
        snippet: '',
      },
    },
  },
};

const conversationInitialState = {
  id: '',
  type: '',
  threads: {
    // threadId
  },
};

const threadInitialState = {
  threadNum: '', // thread number in relation to conversation
  threadId: '', // `${conversationId}-${threadNum}` ?
  messages: {},
};

function threadReducer(state = threadInitialState, action) {
  switch (action.type) {
    case UPDATE_CONVERSATION_THREAD:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.messageSequenceNumber]: action.payload.message,
        },
      };

    default:
      return state;
  }
}

function conversationReducer(state = conversationInitialState, action) {
  switch (action.type) {
    case UPDATE_CONVERSATION_THREAD:
      return {
        ...state,
        threads: {
          ...state.threads,
          [action.payload.threadType]: threadReducer(
            state.threads[action.payload.threadType],
            action,
          ),
        },
      };

    default:
      return state;
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        context: action.payload.context,
        conversations: {
          ...state.conversations,
          [action.payload.conversation.id]: {
            ...action.payload.conversation,
          },
        },
      };

    case UPDATE_CONVERSATION_THREAD: {
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.conversationId]: conversationReducer(
            state.conversations[action.payload.conversationId],
            action,
          ),
        },
      };
    }

    default:
      return state;
  }
}

export default reducer;
