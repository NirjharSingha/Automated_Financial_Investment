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

export function AddAccount({ handler, setShowToast }) {
  const [accountId, setAccountId] = useState("");
  const [bankId, setBankId] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="btn btn-primary font-bold"
          onClick={() => {
            setShowDialog(true);
            setAccountId("");
            setBankId("");
          }}
        >
          Add New Account
        </button>
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
              <Label htmlFor="name" className="text-right">
                Account ID
              </Label>
              <Input
                id="name"
                value={accountId}
                className="col-span-3"
                onChange={(e) => {
                  setAccountId(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Bank ID
              </Label>
              <Input
                id="username"
                value={bankId}
                className="col-span-3"
                onChange={(e) => {
                  setBankId(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handler(accountId, bankId);
                setShowDialog(false);
                setShowToast(true);
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
