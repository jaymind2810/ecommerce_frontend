export interface MessagesDataType {
    id: string;
    message_text: string;
    sender: string;
    receiver: string;
    is_popup: boolean;
    is_read: boolean;
    is_deleted_from_sender: boolean;
    is_deleted_from_receiver: boolean;
    is_delete: boolean;
    created_at: string;
    updated_at: string;
  }

  