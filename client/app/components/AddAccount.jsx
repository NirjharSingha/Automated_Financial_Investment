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

export function AddAccount({
  handler = () => {},
  isEdit = false,
  account = { accountId: "", bankId: "", balance: 0 },
  index = 0,
}) {
  const [accountId, setAccountId] = useState("");
  const [bankId, setBankId] = useState("");
  const [balance, setBalance] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isEdit ? (
          <button
            className="btn btn-primary font-bold"
            onClick={() => {
              setShowDialog(true);
              setAccountId("");
              setBankId("");
              setBalance(0);
            }}
          >
            Add New Account
          </button>
        ) : (
          <button
            type="button"
            className="rounded-lg h-[2.5rem] pl-4 pr-4 text-white truncate font-bold font-serif bg-blue-400 hover:bg-blue-500"
            onClick={() => {
              setShowDialog(true);
              setAccountId(account.accountId);
              setBankId(account.bankId);
              setBalance(account.balance);
            }}
          >
            Edit Account
          </button>
        )}
      </DialogTrigger>
      {showDialog && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
              Enter your account details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">
                Account ID
              </Label>
              <Input
                id="accountId"
                value={accountId}
                className="col-span-3"
                onChange={(e) => {
                  setAccountId(e.target.value);
                }}
                disabled={isEdit}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankId" className="text-right">
                Bank ID
              </Label>
              <Input
                id="bankId"
                value={bankId}
                className="col-span-3"
                onChange={(e) => {
                  setBankId(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">
                Balance
              </Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                className="col-span-3"
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handler(accountId, bankId, balance);
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
