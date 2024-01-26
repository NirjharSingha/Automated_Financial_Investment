"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddAccount } from "../components/AddAccount";
import Toast from "../components/Toast";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useGlobals } from "../contexts/Globals";
import accountDao from "../db/dao/accountDao";

const Accounts = () => {
  const allAccounts = [
    {
      accountId: "addgnbgfhghtre1",
      bankId: "afgdhfjkhkm1",
      balance: 100000,
    },
    {
      accountId: "addgnbgfhghtre2",
      bankId: "afgdhfjkhkm2",
      balance: 200000,
    },
    {
      accountId: "addgnbgfhghtre3",
      bankId: "afgdhfjkhkm3",
      balance: 300000,
    },
    {
      accountId: "addgnbgfhghtre4",
      bankId: "afgdhfjkhkm4",
      balance: 200000,
    },
    {
      accountId: "addgnbgfhghtre5",
      bankId: "afgdhfjkhkm5",
      balance: 500000,
    },
    {
      accountId: "addgnbgfhghtre6",
      bankId: "afgdhfjkhkm6",
      balance: 600000,
    },
    {
      accountId: "addgnbgfhghtre7",
      bankId: "afgdhfjkhkm7",
      balance: 300000,
    },
  ];
  const { accounts, setAccounts, shouldFetchAccount, setShouldFetchAccount } =
    useGlobals();
  const toastRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await accountDao.getAll();
      setAccounts(accounts);
    };
    if (shouldFetchAccount) {
      fetchAccounts();
      setShouldFetchAccount(false);
    }
  }, []);

  const handleAddAccount = async (accountId, bankId, balance) => {
    await accountDao.add({ accountId, bankId, balance });
    setAccounts([...accounts, { accountId, bankId, balance }]);
    toastRef && toastRef.current && toastRef.current.click();
  };

  return (
    <div
      className="absolute top-[4rem] left-[13rem] w-full overflow-x-hidden overflow-y-auto"
      style={{
        maxWidth: "calc(100vw - 13rem)",
        maxHeight: "calc(100svh - 4rem)",
      }}
    >
      <div style={{ display: "none" }}>
        <Toast title={"Account added successfully."} toastRef={toastRef} />
      </div>
      <div className="flex mt-4 mb-4 w-full pl-7 pr-7 items-center justify-between">
        <p className="font-serif font-bold text-xl">Your Accounts</p>
        <AddAccount handler={handleAddAccount} />
      </div>
      <Table>
        <TableCaption>A list of your accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] text-center">Serial No</TableHead>
            <TableHead className="text-center">Account ID</TableHead>
            <TableHead className="text-center">Bank ID</TableHead>
            <TableHead className="text-center">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow
              key={index}
              onClick={() => {
                const string = `${account.accountId}_concat_${account.bankId}_concat_${account.balance}`;
                router.push(`/accounts/${string}`);
              }}
              className="cursor-pointer hover:bg-gray-200"
            >
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell className="text-center">{account.accountId}</TableCell>
              <TableCell className="text-center">{account.bankId}</TableCell>
              <TableCell className="text-center">{account.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Accounts;
