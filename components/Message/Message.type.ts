import { IMessage } from "@/data/messages/message.type";

export interface IChatMessage {
  index: number;
  isNameSame: boolean;
  initial: string;
  message: IMessage;
  firstname: string;
  user_name: string;
  expandBtnImage: () => void;
  last: boolean;
  isWebM: boolean;
  onErrorList: [];
  onError: () => void;
  expandBtnList: () => void;
  time: string;
  isNameSameAsPrevious: boolean;
  isNameSameAsNext: boolean;
}
