export interface INotConnected {
  connectionError?: {
    errorCode: string;
    errorMessage: string;
  };
  connect?: () => void;
  isLoading?: boolean;
}
