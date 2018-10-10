import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ConversationsList extends React.Component {

  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState(
        {
          conversations
        }
      )
    );
  };

  handleClick = id => {
   this.setState(
     {
       activeConversation: id
     }
   );
 };

 handleReceivedConversation = response => {
   const { conversation } = response;
   this.setState(
     {
       conversations: [...this.state.conversations, conversation]
     }
   );
 };

 handleReceivedMessage = response => {
   const { message } = response;
   const conversations = [...this.state.conversations];
   const conversation = conversations.find(
     conversation => conversation.id === message.conversation_id
   );
   conversation.messages = [...conversation.messages, message];
   this.setState(
     { conversations }
   );
 };

 

}
