import {
  calloutContext,
  calloutConversation,
  testUser,
} from './_testData';

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS';
export const UPDATE_CONVERSATION_THREAD = 'UPDATE_CONVERSATION_THREAD';

export function getConversationAction(context, conversation) {
  return {
    type: GET_CONVERSATIONS,
    payload: {
      context,
      conversation,
    },
  };
}

const lastSeqNumByThreadType = {
  'seed': 3,
  'private': 1,
  'public': null,
};

let lastMessageId = 6;

// TODO: fix when actual data is coming through
function addMessageToConversationAction(conversationId, threadType, messageText) {
  const messageSequenceNumber = lastSeqNumByThreadType[threadType] += 1;
  const id = lastMessageId + 1;
  lastMessageId += 1;
  const time = Date.now();

  return {
    type: UPDATE_CONVERSATION_THREAD,
    payload: {
      conversationId,
      threadType,
      messageSequenceNumber,
      message: {
        messageSequenceNumber,
        time,
        id: `0000${id}`,
        sender: {
          ratingSnapshot: {
            rating: '3',
            snippet: 'I had something to say. So many thinks! What a thing.',
          },
          ...testUser,
        },
        text: messageText,
      },
    },
  };
}

export function getCalloutThreads(dispatch, calloutId) {
  // TODO: get conversations linked to calloutId
  dispatch(getConversationAction(calloutContext, calloutConversation));
}

export function addMessageToConversation(dispatch, conversationId, threadType, messageText) {
  dispatch(addMessageToConversationAction(conversationId, threadType, messageText));
}
