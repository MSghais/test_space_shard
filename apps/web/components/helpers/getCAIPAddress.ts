import { ethers , utils} from "ethers";

export interface AddressValidatorsType {
  [key: string]: ({ address }: { address: string }) => boolean;
}

export function isValidETHAddress(address: string) {
  return utils.isAddress(address);
}

const AddressValidators: AddressValidatorsType = {
  eip155: ({ address }: { address: string }) => {
    return isValidETHAddress(address);
  },
};

function validateCAIP(addressInCAIP: string) {
  const [blockchain, networkId, address] = addressInCAIP.split(":");

  if (!blockchain) return false;
  if (!networkId) return false;
  if (!address) return false;

  const validatorFn = AddressValidators[blockchain];

  return validatorFn({ address });
}

