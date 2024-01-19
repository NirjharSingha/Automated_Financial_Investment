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
// import { MdEdit, MdDelete } from "react-icons/md";
import { AddAccount } from "../components/AddAccount";
import Toast from "../components/Toast";

import React, { useRef } from "react";
import { useState } from "react";

const Accounts = () => {
  const allAccounts = [
    {
      accountId: "addgnbgfhghtre1",
      bankId: "afgdhfjkhkm1",
    },
    {
      accountId: "addgnbgfhghtre2",
      bankId: "afgdhfjkhkm2",
    },
    {
      accountId: "addgnbgfhghtre3",
      bankId: "afgdhfjkhkm3",
    },
    {
      accountId: "addgnbgfhghtre4",
      bankId: "afgdhfjkhkm4",
    },
    {
      accountId: "addgnbgfhghtre5",
      bankId: "afgdhfjkhkm5",
    },
    {
      accountId: "addgnbgfhghtre6",
      bankId: "afgdhfjkhkm6",
    },
    {
      accountId: "addgnbgfhghtre7",
      bankId: "afgdhfjkhkm7",
    },
  ];
  const [accounts, setAccounts] = useState(allAccounts);
  const [showToast, setShowToast] = useState(false);
  const toastRef = useRef(null);

  const handleAddAccount = (accountId, bankId) => {
    setAccounts([...accounts, { accountId, bankId }]);
    // toast("Event has been created.");
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
        <AddAccount handler={handleAddAccount} setShowToast={setShowToast} />
      </div>
      <Table>
        <TableCaption>A list of your accounts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] text-center">Serial No</TableHead>
            <TableHead className="text-center">Account ID</TableHead>
            <TableHead className="text-center">Bank ID</TableHead>
            {/* <TableHead className="text-center">Options</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-center">{index}</TableCell>
              <TableCell className="text-center">{account.accountId}</TableCell>
              <TableCell className="text-center">{account.bankId}</TableCell>
              {/* <TableCell className="flex w-full justify-center text-lg">
                <MdEdit className="text-blue-600 mr-2" />
                <MdDelete className="text-red-500" />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Accounts;
