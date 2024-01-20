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

export function AddMonthlyInvest({
  handler = () => {},
  isEdit = false,
  investment = { name: "", amount: 0 },
  index = 0,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isEdit ? (
          <button
            className="h-[2.3rem] pl-4 pr-4 rounded-lg bg-slate-400 text-white font-serif font-bold hover:bg-slate-500"
            onClick={() => {
              setShowDialog(true);
              setName("");
              setAmount(0);
            }}
          >
            Add
          </button>
        ) : (
          <MdEdit
            className="text-blue-600 mr-2 cursor-pointer"
            onClick={() => {
              setShowDialog(true);
              setName(investment.name);
              setAmount(investment.amount);
            }}
          />
        )}
      </DialogTrigger>
      {showDialog && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
              Enter your investment details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">
                Name
              </Label>
              <Input
                id="accountId"
                value={name}
                className="col-span-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                className="col-span-3"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!isEdit) handler(name, amount);
                else handler(index, name, amount);
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
