
export default interface CollectionConfigInterface {
  contractName: string;
  contractAddress: string | null;
  subscriptionId: number;
  keyHash: string;
  coordinator: string;
  callbackGasLimit: number;
  requestConfirmations: number;
}
