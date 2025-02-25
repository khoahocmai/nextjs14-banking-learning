"use client";

import { countTransactionCategories } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";
import BankCard from "./BankCard";
import Category from "./Category";
import { mockAccounts, mockUser } from "./mockData";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar p-6 bg-green-100 rounded-xl shadow-md">
      {/* Profile Section */}
      <section className="flex flex-col items-center pb-6">
        <div className="profile-banner w-full h-24 bg-gradient-to-r from-green-500 to-green-700 rounded-t-lg" />
        <div className="profile flex flex-col items-center mt-[-40px]">
          <div className="profile-img w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-2 border-green-500">
            <span className="text-4xl font-bold text-green-700">
              {user.firstName[0]}
            </span>
          </div>
          <div className="profile-details text-center mt-3">
            <h1 className="text-lg font-semibold text-green-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-green-700">{user.email}</p>
          </div>
        </div>
      </section>

      {/* Banks Section */}
      <section className="mb-8">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold text-green-900">My Banks</h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 active:bg-emerald-100"
          >
            <Plus className="h-4 w-4" />
            Add Bank
          </Link>
        </div>

        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-3">
            {Array.isArray(banks) && banks.length > 0 ? (
              banks.map((bank) => {
                const account = mockAccounts.find(
                  (acc) => acc.id === bank.accountId
                );

                return (
                  account && (
                    <BankCard
                      key={bank.bankId}
                      account={account}
                      userName={`${mockUser.firstName} ${mockUser.lastName}`}
                      showBalance
                    />
                  )
                );
              })
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50">
                <p className="text-sm text-emerald-600">No banks linked yet.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </section>

      {/* Transaction Categories */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-green-900">
          Top Categories
        </h2>
        <ScrollArea className="h-[280px] pr-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </ScrollArea>
      </section>
    </aside>
  );
};

export default RightSidebar;
