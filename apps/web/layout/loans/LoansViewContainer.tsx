import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Card,
  Box,
  Button,
} from "@chakra-ui/react";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { LaunchInterface, LoanCardView, DepositByUser } from "../../types";
import { LoanCard } from "./LoanCard";
import { BiCard, BiTable } from "react-icons/bi";
import { BsCardChecklist, BsCardList } from "react-icons/bs";
import { TableLoans } from "./TableLoans";
import { DepositCard } from "../launch/deposit/DepositCard";
import { TableDeposit } from "../launch/deposit/TableDeposit";
import axios from "axios";
import { useDatasDispatch } from "../../store/datas";
import { useSession } from "next-auth/react";

enum EnumStreamSelector {
  SENDER = "SENDER",
  RECIPIENT = "RECIPIENT",
}

enum ViewType {
  TABS = "TABS",
  CARDS = "CARDS",
}

export interface IFilterLaunch {
  is_canceled_view: boolean;
  is_no_remain_view: boolean;
}
export const LoansViewContainer = () => {
  const account = useAccount().account;
  const [loans, setLoans] = useState<LaunchInterface[]>([]);

  const { dispatchAllLoans, dispatchSelectedLoan } = useDatasDispatch()
  const [isLoadOneTime, setIsLoadOneTime] = useState<boolean>(false);
  const [deposits, setDepositsUser] = useState<DepositByUser[]>([]);

  const [loansCreated, setLaunchCreated] = useState<LaunchInterface[]>([]);
  const [selectView, setSelectView] = useState<EnumStreamSelector>(
    EnumStreamSelector.SENDER
  );

  const [viewType, setViewType] = useState<ViewType>(ViewType.CARDS);

  const session = useSession()
  const [filterLaunch, setFilterLaunch] = useState<IFilterLaunch>({
    is_canceled_view: true,
    is_no_remain_view: false
  })

  useEffect(() => {
    const getAllLaunchs = async () => {
      const datas = await axios.get("/api/datas/getAllDatas");
      console.log("datas", datas)
      const loans = datas?.data?.data.loans;
      console.log("all_launchs", loans)
      let loansFilter = loans?.filter((loan) => {
        return loan;
      })
      console.log("filter loans", loansFilter)

      setLoans(loansFilter)
      dispatchAllLoans(loansFilter)
      if(session?.data) {
        const res = await axios.get("/api/restricted/loans/depositByUser")
        setDepositsUser(res?.data?.data?.deposits)
      }
      setIsLoadOneTime(true)
    };
    getAllLaunchs()

  }, [account?.address, account, isLoadOneTime, filterLaunch]);

  return (
    <>
      <Box
        display={"flex"}
        gap="1em"
        py={{ base: "1em" }}
        textAlign={"right"}
        justifyContent={"right"}
      >
        <Button onClick={() => setViewType(ViewType.TABS)}>
          Tabs <BiTable></BiTable>
        </Button>
        <Button onClick={() => setViewType(ViewType.CARDS)}>
          Card <BsCardChecklist></BsCardChecklist>
        </Button>

      </Box>

      <Box>
        <Button
          onClick={() => {
            setFilterLaunch({
              ...filterLaunch,
              is_canceled_view: !filterLaunch?.is_canceled_view
            })
          }}
        >{filterLaunch.is_canceled_view ? "See cancel" : "Unsee cancel"} </Button>
      </Box>

      <Tabs
        minH={{ base: "250px", md: "350px" }}
        variant="enclosed"
        // variant={""}
        alignItems={"center"}
        gap={{ sm: "1em" }}
      >
        <TabList>
          <Tab
            onClick={() => setSelectView(EnumStreamSelector.RECIPIENT)}
            _selected={{ color: "brand.primary" }}
          >
            All loans
          </Tab>

          <Tab
            onClick={() => setSelectView(EnumStreamSelector.SENDER)}
            _selected={{ color: "brand.primary" }}
          >
            Launch created
          </Tab>
          <Tab
            onClick={() => setSelectView(EnumStreamSelector.SENDER)}
            _selected={{ color: "brand.primary" }}
          >
            Deposit
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RecipientLaunchComponent
              launchsReceivedProps={loans}
              setLaunchReceivedProps={setLoans}
              setViewType={setViewType}
              viewType={viewType}
              filterLaunch={filterLaunch}
            ></RecipientLaunchComponent>
          </TabPanel>

          <TabPanel>
            <RecipientLaunchComponent
              launchsReceivedProps={loansCreated}
              setLaunchReceivedProps={setLaunchCreated}
              setViewType={setViewType}
              viewType={viewType}
            ></RecipientLaunchComponent>
          </TabPanel>
          <TabPanel>
            <DepositLaunchComponent
              deposits={deposits}
              setDeposits={setDepositsUser}
              setViewType={setViewType}
              viewType={viewType}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

interface IRecipientLaunchComponent {
  launchsReceivedProps: LaunchInterface[];
  setLaunchReceivedProps: (lockups: LaunchInterface[]) => void;
  viewType?: ViewType;
  filterLaunch?: IFilterLaunch;
  setViewType: (viewType: ViewType) => void;
}

const RecipientLaunchComponent = ({
  launchsReceivedProps,
  setLaunchReceivedProps,
  viewType,
  setViewType,
  filterLaunch
}: IRecipientLaunchComponent) => {
  const account = useAccount();
  console.log("launchsReceivedProps", launchsReceivedProps);
  return (
    <Box>
      <Text>Check the loan you can receive here.</Text>
      <Text>Total: {launchsReceivedProps?.length}</Text>
      {viewType == ViewType.CARDS && (
        <Box
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
          }}
          gap={{ base: "0.5em" }}
        >
          {launchsReceivedProps?.length > 0 &&
            launchsReceivedProps.map((l, i) => {
              // if (!s?.was_canceled) {
              return (
                <LoanCard
                  loan={l}
                  key={i}
                  viewType={LoanCardView.RECIPIENT_VIEW}
                />
              );
              // }
            })}
        </Box>
      )}

      {viewType == ViewType.TABS && (
        <TableLoans
          loans={launchsReceivedProps}
          viewType={LoanCardView.RECIPIENT_VIEW}
        ></TableLoans>
      )}
    </Box>
  );
};

interface IDepositLaunchComponent {
  deposits: DepositByUser[];
  setDeposits: (deposits: DepositByUser[]) => void;
  viewType?: ViewType;
  setViewType: (viewType: ViewType) => void;
}

const DepositLaunchComponent = ({
  deposits,
  setDeposits,
  viewType,
  setViewType,
}: IDepositLaunchComponent) => {
  const account = useAccount();
  return (
    <Box>
      <Text>Check the deposit by loan here.</Text>
      <Text>Total: {deposits?.length}</Text>
      {viewType == ViewType.CARDS && (
        <Box
          // display={"grid"}
          // gap={{ base: "0.5em" }}

          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
          }}
          gap={{ base: "0.5em" }}
        >
          {deposits?.length > 0 &&
            deposits.map((deposit, i) => {

              if (!deposit?.asset && Number(deposit?.deposited) > 0) {
                return;
              }
              return (
                <DepositCard
                  deposit={deposit}
                  key={i}
                  viewType={LoanCardView.RECIPIENT_VIEW}
                />
              );
            })}
        </Box>
      )}

      {viewType == ViewType.TABS && (
        <TableDeposit
          deposits={deposits}
          viewType={LoanCardView.RECIPIENT_VIEW}
        ></TableDeposit>
      )}
    </Box>
  );
};

interface ISenderLaunchComponent {
  loansCreated: LaunchInterface[];
  setLaunchCreated: (lockups: LaunchInterface[]) => void;
  viewType?: ViewType;
  setViewType: (viewType: ViewType) => void;
}
const SenderLaunchComponent = ({
  loansCreated,
  setLaunchCreated,
  viewType,
  setViewType,
}: ISenderLaunchComponent) => {
  const account = useAccount();

  return (
    <Box>
      <Text>Find here your stream</Text>
      <Text>Total: {loansCreated?.length}</Text>

      {viewType == ViewType.CARDS && (
        <Box
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
          }}
          gap={{ base: "0.5em" }}
        >
          {loansCreated?.length > 0 &&
            loansCreated.map((s, i) => {
              return (
                <LoanCard
                  loan={s}
                  key={i}
                  viewType={LoanCardView.SENDER_VIEW}
                />
              );
            })}
        </Box>
      )}

      {viewType == ViewType.TABS && (
        <TableLoans
          loans={loansCreated}
          viewType={LoanCardView.SENDER_VIEW}
        ></TableLoans>
      )}
    </Box>
  );
};

/** @TODO add search stream components. Spec to be defined. */
const SearchStreamComponent = () => {
  return (
    <Box>
      <Text>Coming soon</Text>
    </Box>
  );
};
