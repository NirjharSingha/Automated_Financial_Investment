"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useGlobals } from "@/app/contexts/Globals";

export function AddBill({
  handler = () => {},
  isEdit = false,
  bill = { billId: "", name: "", accountId: 0 },
}) {
  const [accountId, setAccountId] = useState("");
  const [billId, setBillId] = useState("");
  const [name, setName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { accounts } = useGlobals();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isEdit ? (
          <button
            className="btn btn-primary font-bold"
            onClick={() => {
              setShowDialog(true);
              setAccountId("");
              setBillId("");
              setName("");
            }}
          >
            Add New Bill
          </button>
        ) : (
          <MdEdit
            className="text-blue-600 mr-2 cursor-pointer"
            onClick={() => {
              setShowDialog(true);
              setAccountId(bill.accountId);
              setBillId(bill.billId);
              setName(bill.name);
            }}
          />
        )}
      </DialogTrigger>
      {showDialog && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Bill</DialogTitle>
            <DialogDescription>
              Enter your bill details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="billId" className="text-right">
                Bill ID
              </Label>
              <Input
                id="billId"
                value={billId}
                disabled={isEdit}
                className="col-span-3"
                onChange={(e) => {
                  setBillId(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">
                Account ID
              </Label>
              <select
                id="accountId"
                value={accountId}
                className="col-span-3 h-[2.6rem] rounded-lg border-none cursor-pointer font-serif text-sm"
                onChange={(e) => {
                  setAccountId(e.target.value);
                }}
              >
                {!isEdit ? (
                  <option value="">Select an account</option>
                ) : (
                  <option value={bill.accountId}>{bill.accountId}</option>
                )}
                {accounts.map((account) => (
                  <option value={account.accountId}>{account.accountId}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handler(billId, name, accountId);
                setShowDialog(false);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
