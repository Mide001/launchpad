import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "../utils";

export const PoolContext = createContext({});

export const PoolContextProvider = ({ children }) => {
  const [allPoolAddress, setAllPoolAddress] = useState([]);
  const [userPoolAddresses, setUserPoolAddresses] = useState([]);
  const [allPools, setAllPools] = useState({});
  const [allLockerAddress, setAllLockerAddress] = useState([]);
  const [userLockersAddresses, setUserLockersAddresses] = useState([]);
  const [refreshIDO, setRefresh] = useState(0);
  const [allLocker, setAllLocker] = useState({});
  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract);
  const { account } = useSelector((state) => state.blockchain);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (refreshIDO) {
        console.log(
          `IDO data refreshed ${refreshIDO} ${
            refreshIDO > 1 ? "times" : "time"
          }`
        );
      }
      allPoolAddress.map(async (address, index) => {
        await utils
          .loadPoolData(address, contract.web3, account)
          .then((IDOPoolData) => {
            setAllPools((p) => ({ ...p, ...{ [address]: IDOPoolData } }));
            const { owner, userData, idoAddress } = IDOPoolData;
            if (
              owner?.toLowerCase() === account?.toLowerCase() ||
              (userData?.totalInvestedETH && userData?.totalInvestedETH !== "0")
            )
              setUserPoolAddresses((prevUserPoolAddresses) => [
                ...prevUserPoolAddresses,
                idoAddress,
              ]);
          });
      });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [allPoolAddress, account, contract.web3, refreshIDO]);

  useEffect(() => {
    setUserPoolAddresses([]);
    const delayDebounceFn = setTimeout(() => {
      Object.values(allPools).map(async (IDOPoolData, index) => {
        const { idoAddress, owner } = IDOPoolData;
        await utils
          .loadUserData(idoAddress, contract.web3, account)
          .then((userData) => {
            IDOPoolData.userData = userData;
            setAllPools((prevAllPools) => ({
              ...prevAllPools,
              ...{ [idoAddress]: IDOPoolData },
            }));

            if (
              owner?.toLowerCase() === account?.toLowerCase() ||
              (userData?.totalInvestedETH && userData?.totalInvestedETH !== "0")
            )
              setUserPoolAddresses((prevUserPoolAddresses) => [
                ...prevUserPoolAddresses,
                idoAddress,
              ]);
          });
      });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [account, allPools, contract.web3]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      allLockerAddress.map(async (address, index) => {
        await utils.getLockerData(address, contract.web3).then((e) => {
          setAllLocker((p) => ({ ...p, ...{ [address]: e } }));
        });
      });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [allLockerAddress, contract.web3]);

  useEffect(() => {
    if (!contract.IDOFactory) {
      return null;
    }
    contract.IDOFactory.methods
      .getIdos()
      .call({ from: account })
      .then((res) => {
        setAllPoolAddress(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
    // console.log(contract.IDOFactory.events);
  }, [dispatch, contract, account]);

  useEffect(() => {
    if (!contract.LockerFactory) {
      return null;
    }
    contract.LockerFactory.events.LockerCreated(
      {
        fromBlock: 0,
      },
      async function (error, event) {
        if (event) {
          setAllLockerAddress((p) => [...p, event.returnValues.lockerAddress]);
        }
      }
    );
  }, [dispatch, contract]);

  useEffect(() => {
    setUserLockersAddresses([]);
    const delayDebounceFn = setTimeout(() => {
      Object.values(allLocker).map(async (lockerData, index) => {
        const { withdrawer, owner, lockerAddress } = lockerData;
        if (
          owner?.toLowerCase() === account?.toLowerCase() ||
          withdrawer?.toLowerCase() === account?.toLowerCase()
        )
          setUserLockersAddresses((prevUserLockersAddresses) => [
            ...prevUserLockersAddresses,
            lockerAddress,
          ]);
      });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [account, allLocker]);

  const value = {
    allPools,
    setRefresh,
    allPoolAddress,
    userPoolAddresses,
    allLocker,
    allLockerAddress,
    userLockersAddresses,
  };
  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const usePoolContext = () => React.useContext(PoolContext);
