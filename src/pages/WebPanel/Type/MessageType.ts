export interface MessagesUserDataType {
    id: string;
    first_name: string;
    last_name: string;
    user_photo: string;
  }


export interface MessagesDataType {
    id: string;
    message_text: string;
    sender: MessagesUserDataType;
    receiver: MessagesUserDataType;
    is_popup: boolean;
    is_read: boolean;
    is_deleted_from_sender: boolean;
    is_deleted_from_receiver: boolean;
    is_delete: boolean;
    created_at: string;
    updated_at: string;
  }

  