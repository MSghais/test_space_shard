import {
  Box,
  Text,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Avatar,
  Input,
  Icon,
  ModalFooter,
  useToast,
  Select,
  SelectField,
} from "@chakra-ui/react";
import {  useAccount } from "wagmi";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import React from "react";
import { BsSendExclamation } from "react-icons/bs";
import { Transaction, ethers, utils } from "ethers";
import { BiSend } from "react-icons/bi";
import { TOKEN_TIPS } from "../../../constants/address";
import { getEthersSigner } from "../../../hooks/ethers";
import { useSession } from "next-auth/react";
import axios from "axios";
import { erc20ABI } from "@wagmi/core";
interface ITipsModal {
  modalOpen: boolean;
  addressToken?: string;
  amount?: string;
  recipient?: string;
  onClose: () => void;
  onOpen: () => void;
  suggestedRecipients?: string[]
  titleModalHeader?:string;
  titleButton?:string;
  titleModalBody?:string;

}

interface IFormTips {
  addressToken?: string;
  amount?: string;
  recipient?: string;
  suggestedRecipients?: string[]

}
const TipsModalPanel = ({
  modalOpen,
  addressToken,
  amount,
  recipient,
  onClose,
  onOpen,
  suggestedRecipients,
  titleButton,
  titleModalBody,
  titleModalHeader,
}: ITipsModal) => {
  // const form = React.useMemo<IFormTips>({
  //   addressToken: addressToken ?? "",
  //   amount: amount ?? "",
  //   recipient: recipient,
  // });

  const formRef = React.useRef<IFormTips>({
    addressToken: addressToken ?? "",
    amount: amount ?? "",
    recipient: recipient,
  });

  const form = useMemo(() => {

    formRef.current.recipient = recipient
    return formRef

  }, [recipient])

  const account = useAccount();
  const address = account.address;
  const toast = useToast();
  const chain = useAccount()?.chain;

  // let _signer: SignerType | undefined;
  let _signer: ethers.providers.JsonRpcSigner | undefined;
  const session = useSession()
  // let [signer, setSigner]=useState();
  const [isLoadingInfoGroup, setIsLoadingInfoGroup] = useState<boolean>(false);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);
  const [tokenAddress, setTokenAddress] = useState<string | undefined>();
  const [recipientAddress, setRecipientAddress] = useState<string | undefined>(recipient);
  const [amountToSend, setAmountToSend] = useState<string | undefined>();

  const setRecipientAddressVoid = (value: string) => {
    setRecipientAddress(value)
  }
  // console.log("recipient", recipient);
  useEffect(() => {
    const getSigner = async () => {
      _signer = await getEthersSigner();
    };

    if (address && !_signer) {
      getSigner();
    }
  }, [isLoadingInfoGroup, chain, address, recipient, _signer]);

  const handleTransferToken = async () => {
    try {

      if (isLoadingTransfer) {
        toast({
          title: "Transfer already send",
          status: "warning",
          isClosable: true,
        });
        return
      }
      // const { addressToken, amount, recipient } = form.current;
      const { addressToken, amount, recipient } = form.current;

      if (!recipient && !form?.current?.recipient) {
        toast({
          title: "No recipient",
          status: "warning",
          isClosable: true,
        });
        return;
      }

      if (!utils.isAddress(recipient) || !ethers.utils.isAddress(recipient)) {
        toast({
          title: "Recipient is not an address",
          status: "warning",
          isClosable: true,
        });
        return;
      }

      if (!addressToken) {
        toast({
          title: "No token address to send",
          status: "warning",
          isClosable: true,
        });
        return;
      }

      if (!utils.isAddress(addressToken)) {
        toast({
          title: "Address token is not an address",
          status: "warning",
          isClosable: true,
        });
        return;
      }

      if (!amount) {
        toast({
          title: "No amount to send",
          status: "warning",
          isClosable: true,
        });
        return;
      }

      if (!account && !account?.address && !session && !session?.data?.user) {
        toast({
          title: "Please login",
          status: "warning",
          isClosable: true,
        });
        return;
      }
      setIsLoadingTransfer(true)
      if (account && account?.address) {
        if (addressToken == ethers.constants.AddressZero) {
          let transaction = {
            value: ethers.utils.parseEther(form.current.amount),
            to: recipient,
          };
          //    (await signerBro.data.sendTransaction(transaction)).wait()
          (await _signer.sendTransaction(transaction)).wait();
          toast({
            title: `Tips succeed`,
            description: `Send ${form?.current?.amount} ETH to ${form?.current?.addressToken}`
            // status: "error"
          })
        } else {
          try {
            const tokenContract = new ethers.Contract(
              form.current.addressToken,
              erc20ABI,
              _signer
            );
            let decimals = await tokenContract.decimals();
            console.log("decimals", decimals);
            console.log("form.current.recipient", form.current.recipient);

            let parsedAmount = ethers.utils.parseUnits(
              form.current.amount,
              decimals
            );
            await tokenContract.transfer(form.current.recipient, parsedAmount);
            toast({
              title: `Tips succeed`,
              description: `Send ${form?.current?.amount} to ${form?.current?.addressToken}`
              // status: "error"
            })
          } catch (e) {
            console.log("error transfer token ERC20", e);
          }

        }
      }

      else if (session && session?.data?.user) {
        toast({
          title: "Transfer is loading",
          status: "loading",
          isClosable: true,
        });
        /** @TODO handle transfer backend api
         * 
         */

        const res = await axios.post("/api/restricted/handleTransfer", {
          recipient: form?.current?.recipient,
          addressToken: form?.current?.addressToken,
          amount: form?.current?.amount,
        })

        if (res?.status != 200) {
          toast({
            title: "Handle transfer failed",
            status: "error",
            isClosable: true
          })
          return
        }
        toast({
          title: `Tips succeed`,
          description: `Send ${form?.current?.amount} to ${form?.current?.addressToken}`
          // status: "error"
        })

      }
    } catch (e) {
    }
    finally {
      setIsLoadingTransfer(false)
    }



  };

  const selectChangeEvent = (value: string) => {
    console.log("selectChangeEvent");
    console.log("value", value);
    setTokenAddress(value);
    form.current.addressToken = value;
  };

  return (
    <Box>
      <Button
       onClick={onOpen}
        w={"100%"}

      >
        Tips <Icon as={BsSendExclamation}></Icon>
      </Button>

      <Modal
        // scroll
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        isOpen={modalOpen}
        onClose={() => onClose}
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent
          // color={color}
          // bg={bg}
          minH={{ base: "55vh" }}
        >
          <ModalHeader>{titleModalHeader ?? "Tips your friends"}</ModalHeader>
          {/* <ModalHeader>Tips'OLATor money </ModalHeader> */}

          <ModalCloseButton onClick={() => {
            setRecipientAddress(recipient)
            // form.current.addressToken = undefined
            // form.current.amount = undefined
            onClose()
          }}

          />
          <ModalBody>
            <Box>{titleModalBody ?? "Tips your friends!"}</Box>
            {/* <Box>
              <CustomSwitchNetwork></CustomSwitchNetwork>
            </Box> */}
            <Box>
              <Input
                placeholder="Recipient"
                size="xl"
                className="mt-4 min-w-[400px]"
                value={
                  recipientAddress
                }
            
                aria-valuetext={recipientAddress}

                onChange={(e) => {
                  setRecipientAddressVoid(e.target.value)
                }}
              />
              {suggestedRecipients && suggestedRecipients.length > 0 &&
                <Box>

                  {suggestedRecipients?.map((sugAddress) => {
                    return (<Box>
                      <Text>{sugAddress}</Text>
                    </Box>)
                  })}

                </Box>
              }


              <Box
                display={{ base: "flex" }}
                py={{ base: "0.5em" }}
                gap={{ base: "0.3em" }}
                justifyContent={"end"}
                alignContent={"baseline"}
              >
                <Box display="flex" gap={{ base: "0.3em" }} w={"100%"}>
                  <Input
                    placeholder="Address token to send"
                    w={"100%"}
                    aria-valuetext={
                      form.current.addressToken ? form.current.addressToken : ""
                    }
                    value={
                      form.current.addressToken ? form.current.addressToken : ""
                    }
                    onChange={(e) => {
                      selectChangeEvent(e.target.value);
                    }}
                  />

                  <Select
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      selectChangeEvent(e.target.value);
                    }}
                  >
                    <option value={ethers.constants.AddressZero}>
                      {" "}
                      ETH{" "}
                      {ethers.constants.AddressZero ==
                        form.current.addressToken && "✅"}
                    </option>
                    {TOKEN_TIPS &&
                      TOKEN_TIPS[chain?.id] &&
                      TOKEN_TIPS[chain?.id ?? 5].length > 0 &&
                      TOKEN_TIPS[chain?.id ?? 5].map((t, i) => {
                        return (
                          <option value={t.value} key={i}>
                            {" "}
                            {t.title}{" "}
                            {t.address == form.current.addressToken && "✅"}
                          </option>
                        );
                      })}
                
                  </Select>
                </Box>

           
              </Box>

              <Input
                placeholder="Amount to send"
                size="xl"
                type="number"
                className="mt-4 min-w-[400px]"
                aria-valuetext={form.current.amount ? form.current.amount : "1"}
                onChange={(e) => {
                  form.current.amount = e.target.value;
                }}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              gap={{ base: "0.5em", md: "1em" }}
              onClick={() => handleTransferToken()}
            >
              Tips<BiSend></BiSend>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TipsModalPanel;
