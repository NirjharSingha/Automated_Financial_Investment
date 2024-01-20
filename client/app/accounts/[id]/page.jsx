"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { MdDelete } from "react-icons/md";
import { AddMonthlyInvest } from "@/app/components/AddMonthlyInvest";
import Toast from "@/app/components/Toast";
import { AddAccount } from "@/app/components/AddAccount";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import BarChart from "@/app/components/charts/BarChart";
import Doughnut from "@/app/components/charts/Doughnut";

const page = ({ params }) => {
  const { id } = params;
  const values = id.split("_concat_");
  const [accountId, bankId, balance] = values;
  const [account, setAccount] = useState({ accountId, bankId, balance });
  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef(null);
  const { setAccounts } = useGlobals();
  const router = useRouter();

  const recentTransactions = [
    {
      transactionId: "addgnbgfhghtre1",
      amount: 100000,
      method: "card",
      date: "2021-09-02",
    },
    {
      transactionId: "addgnbgfhghtre2",
      amount: 100000,
      method: "card",
      date: "2021-09-04",
    },
    {
      transactionId: "addgnbgfhghtre3",
      amount: 100000,
      method: "card",
      date: "2021-09-05",
    },
    {
      transactionId: "addgnbgfhghtre4",
      amount: 100000,
      method: "card",
      date: "2021-09-08",
    },
    {
      transactionId: "addgnbgfhghtre5",
      amount: 100000,
      method: "card",
      date: "2021-09-08",
    },
    {
      transactionId: "addgnbgfhghtre6",
      amount: 100000,
      method: "card",
      date: "2021-09-09",
    },
    {
      transactionId: "addgnbgfhghtre7",
      amount: 100000,
      method: "card",
      date: "2021-09-11",
    },
  ];

  const investmentAll = [
    {
      name: "US Stocks",
      amount: 5000,
    },
    {
      name: "BD Stocks",
      amount: 3000,
    },
    {
      name: "Mutual Funds",
      amount: 6000,
    },
    {
      name: "Fixed Deposit",
      amount: 5000,
    },
  ];
  const [investments, setInvestments] = useState(investmentAll);
  const investmentNames = investments.map((investment) => investment.name);
  const investmentAmounts = investments.map((investment) => investment.amount);

  const [investNames, setInvestNames] = useState(investmentNames);
  const [investAmounts, setInvestAmounts] = useState(investmentAmounts);

  useEffect(() => {
    setInvestNames(investmentNames);
    setInvestAmounts(investmentAmounts);
  }, [investments]);

  const handleAddInvest = (name, amount) => {
    setInvestments((prev) => [...prev, { name, amount }]);
    setToastMessage("Investment added successfully.");
  };

  const handleEditInvest = (index, name, amount) => {
    setInvestments((prev) => {
      const updatedInvestments = [...prev];
      updatedInvestments[index] = { name, amount };
      return updatedInvestments;
    });
    setToastMessage("Investment edited successfully.");
  };

  const handleDeleteInvest = (index) => {
    setInvestments((prev) => {
      const updatedInvestments = prev.filter((_, i) => i !== index);
      return updatedInvestments;
    });
    setToastMessage("Investment deleted successfully.");
  };

  useEffect(() => {
    if (toastMessage !== "") {
      toastRef && toastRef.current && toastRef.current.click();
    }
  }, [toastMessage]);

  const handleEditAccount = (accountId, bankId, balance) => {
    setToastMessage("Account edited successfully.");
    setAccounts((prev) => {
      const updatedAccounts = [...prev];
      const index = updatedAccounts.findIndex(
        (acc) =>
          account.accountId === acc.accountId && account.bankId === acc.bankId
      );
      updatedAccounts[index] = { accountId, bankId, balance };
      return updatedAccounts;
    });
    setAccount({ accountId, bankId, balance });
  };

  return (
    <div
      className="absolute top-[4rem] left-[13rem] w-full overflow-x-hidden overflow-y-auto p-4"
      style={{
        maxWidth: "calc(100vw - 13rem)",
        maxHeight: "calc(100svh - 4rem)",
      }}
    >
      <p className="font-serif font-bold pb-2 truncate">
        Account ID: {account.accountId}
      </p>
      <p className="font-serif font-bold pb-2 truncate">
        Bank ID: {account.bankId}
      </p>
      <p className="font-serif font-bold pb-2 truncate">
        Current Balance: {account.balance}
      </p>
      <p className="font-serif font-bold pb-3 pt-3 truncate text-xl text-gray-700">
        Recent Transactions
      </p>
      <Table>
        <TableCaption>A list of your transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Transaction ID</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Method</TableHead>
            <TableHead className="text-center">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction.transactionId}>
              <TableCell className="font-medium text-center">
                {transaction.transactionId}
              </TableCell>
              <TableCell className="text-center">
                {transaction.amount}
              </TableCell>
              <TableCell className="text-center">
                {transaction.method}
              </TableCell>
              <TableCell className="text-center">{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="font-serif font-bold pb-3 pt-3 truncate text-xl text-gray-700">
        Monthly Investments from this Account
      </p>
      <div style={{ display: "none" }}>
        <Toast title={toastMessage} toastRef={toastRef} />
      </div>
      <Table>
        <TableCaption>A list of your monthly investments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[120px]">Serial No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center w-[180px]">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">{investment.name}</TableCell>
              <TableCell className="text-center">{investment.amount}</TableCell>
              <TableCell className="flex w-full justify-center text-lg">
                <AddMonthlyInvest
                  handler={handleEditInvest}
                  isEdit={true}
                  investment={investment}
                  index={index}
                />
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteInvest(index);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="w-full flex justify-center items-center">
              <AddMonthlyInvest handler={handleAddInvest} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="pl-2 pr-2 mt-8 mb-4 w-[80%] m-auto">
        <BarChart allLabels={investNames} allData={investAmounts} />
        <p className="w-full text-center font-serif mt-3 font-bold text-gray-700">
          A bar chart of your monthly investments.
        </p>
      </div>
      <div className="pl-2 pr-2 mt-8 mb-4 w-[60%] m-auto">
        <Doughnut allLabels={investNames} allData={investAmounts} />
        <p className="w-full text-center font-serif mt-3 font-bold text-gray-700">
          A doughnut chart of your monthly investments.
        </p>
      </div>
      <div className="flex mt-4 w-full pl-4 pr-4 items-center justify-between">
        <AddAccount
          handler={handleEditAccount}
          isEdit={true}
          account={account}
        />
        <button
          type="button"
          className="rounded-lg h-[2.5rem] pl-4 pr-4 text-white truncate font-bold font-serif bg-red-400 hover:bg-red-500"
          onClick={() => {
            setAccounts((prev) => {
              const updatedAccounts = prev.filter(
                (acc) =>
                  acc.accountId !== account.accountId &&
                  acc.bankId !== account.bankId
              );
              return updatedAccounts;
            });
            setToastMessage("Account deleted successfully.");
            router.push("/accounts");
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default page;
