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
import { AddBill } from "@/app/components/AddBill";
import Toast from "@/app/components/Toast";
import { AddAccount } from "@/app/components/AddAccount";
import { useGlobals } from "@/app/contexts/Globals";
import { useRouter } from "next/navigation";
import BarChart from "@/app/components/charts/BarChart";
import Doughnut from "@/app/components/charts/Doughnut";
import billDao from "../db/dao/billDao";

const page = () => {
  const [toastMessage, setToastMessage] = useState("");
  const toastRef = useRef(null);

  const allBills = [
    {
      billId: "afgdhfjkhkm1",
      name: "Electricity",
      accountId: "addgnbgfhghtre2",
    },
    {
      billId: "afgdhfjkhkm2",
      name: "Credit Card",
      accountId: "addgnbgfhghtre1",
    },
    {
      billId: "afgdhfjkhkm3",
      name: "Internet",
      accountId: "addgnbgfhghtre4",
    },
    {
      billId: "afgdhfjkhkm4",
      name: "Water",
      accountId: "addgnbgfhghtre5",
    },
    {
      billId: "afgdhfjkhkm5",
      name: "Utility",
      accountId: "addgnbgfhghtre2",
    },
    {
      billId: "afgdhfjkhkm6",
      name: "Credit Card",
      accountId: "addgnbgfhghtre3",
    },
  ];

  const duesAll = [
    {
      billId: "afgdhfjkhkm1",
      name: "Electricity",
      amount: 1200,
      date: "2024-02-10",
    },
    {
      billId: "afgdhfjkhkm2",
      name: "Credit Card",
      amount: 12000,
      date: "2024-02-12",
    },
    {
      billId: "afgdhfjkhkm5",
      name: "Utility",
      amount: 1700,
      date: "2024-02-15",
    },
  ];
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBillls = async () => {
      const bills = await billDao.getAll();
      setBills(bills);
    };
    fetchBillls();
  }, []);

  const handleAddBill = async (billId, name, accountId) => {
    setBills((prev) => [...prev, { billId, name, accountId }]);
    await billDao.add({ billId, name, accountId });
    setToastMessage("Bill added successfully.");
  };

  const handleEditBill = async (billId, name, accountId) => {
    setBills((prev) => {
      const updatedBills = [...prev];
      const index = updatedBills.findIndex((bill) => bill.billId === billId);
      updatedBills[index] = { billId, name, accountId };
      return updatedBills;
    });
    await billDao.update({ billId, name, accountId });
    setToastMessage("Bill edited successfully.");
  };

  const handleDeleteBill = async (billId) => {
    setBills((prev) => {
      const updatedBills = prev.filter((bill) => bill.billId !== billId);
      return updatedBills;
    });
    await billDao.delete(billId);
    setToastMessage("Bill deleted successfully.");
  };

  useEffect(() => {
    if (toastMessage !== "") {
      toastRef && toastRef.current && toastRef.current.click();
    }
  }, [toastMessage]);

  return (
    <div
      className="absolute top-[4rem] left-[13rem] w-full overflow-x-hidden overflow-y-auto p-4"
      style={{
        maxWidth: "calc(100vw - 13rem)",
        maxHeight: "calc(100svh - 4rem)",
      }}
    >
      <p className="font-serif font-bold pb-3 pt-2 truncate text-xl text-gray-700">
        Your Monthly Bills
      </p>
      <Table>
        <TableCaption>A list of your monthly bills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Bill ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Account ID</TableHead>
            <TableHead className="text-center">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.billId}>
              <TableCell className="font-medium text-center">
                {bill.billId}
              </TableCell>
              <TableCell className="text-center">{bill.name}</TableCell>
              <TableCell className="text-center">{bill.accountId}</TableCell>
              <TableCell className="flex w-full justify-center text-lg">
                <AddBill handler={handleEditBill} isEdit={true} bill={bill} />
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    handleDeleteBill(bill.billId);
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
              <AddBill handler={handleAddBill} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="font-serif font-bold pb-3 pt-4 truncate text-xl text-gray-700">
        Your Due Bills for this Month
      </p>
      <Table>
        <TableCaption>A list of your due bills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Bill ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {duesAll.map((due) => (
            <TableRow key={due.billId}>
              <TableCell className="font-medium text-center">
                {due.billId}
              </TableCell>
              <TableCell className="text-center">{due.name}</TableCell>
              <TableCell className="text-center">{due.amount}</TableCell>
              <TableCell className="text-center">{due.date}</TableCell>
              <TableCell className="flex w-full justify-center text-lg">
                <button
                  type="button"
                  className="p-2 pl-3 pr-3 font-serif font-bold text-sm bg-slate-400 hover:bg-slate-500 text-white rounded-lg"
                >
                  Pay Now
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <p className="font-serif font-bold pb-3 pt-3 truncate text-xl text-gray-700">
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
      </div> */}
    </div>
  );
};

export default page;
