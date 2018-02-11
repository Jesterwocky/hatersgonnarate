import {
  calloutContext,
  calloutConversation,
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

function addMessageToConversationAction(conversationId, threadType, message) {
  return {
    type: UPDATE_CONVERSATION_THREAD,
    payload: {
      conversationId,
      threadType,
      message,
    },
  };
}

export function getCalloutThreads(dispatch, calloutId) {
  // TODO: get conversations linked to calloutId
  dispatch(getConversationAction(calloutContext, calloutConversation));
}

export function addMessageToConversation(dispatch, conversationId, threadType, message) {
  dispatch(addMessageToConversationAction(conversationId, threadType, message));
}
