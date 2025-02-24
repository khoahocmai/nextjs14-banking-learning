"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import BankInfo from "./BankInfo";
import { BankTabItem } from "./BankTabItem";
import { Pagination } from "./Pagination";
import TransactionsTable from "./TransactionsTable";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const [activeAccountId, setActiveAccountId] = useState(appwriteItemId);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(1); // Reset về trang 1 khi chuyển tài khoản
  }, [activeAccountId]);

  const rowsPerPage = 10;
  const filteredTransactions = transactions.filter(
    (t) =>
      t.senderBankId === activeAccountId || t.receiverBankId === activeAccountId
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${activeAccountId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs
        defaultValue={activeAccountId}
        onValueChange={setActiveAccountId}
        className="w-full"
      >
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem account={account} appwriteItemId={activeAccountId} />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={activeAccountId}
              type="full"
            />

            <TransactionsTable transactions={currentTransactions} />

            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
