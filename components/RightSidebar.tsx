import { countTransactionCategories } from "@/lib/utils";
import Image from "next/image";
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
      <section className="banks mt-6">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg font-semibold text-green-900">My Banks</h2>
          <Link
            href="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-800"
          >
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="Add Bank"
            />
            <span className="text-sm font-medium">Add Bank</span>
          </Link>
        </div>

        {/* Kiểm tra banks có dữ liệu hợp lệ không */}
        {Array.isArray(banks) && banks.length > 0 ? (
          <div className="mt-4 max-h-[250px] overflow-y-auto space-y-3">
            {banks.map((bank) => {
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
            })}
          </div>
        ) : (
          <p className="text-sm text-green-700 mt-3">No banks linked yet.</p>
        )}
      </section>

      {/* Transaction Categories */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-green-900 mb-3">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto">
          {categories.map((category) => (
            <Category key={category.name} category={category} />
          ))}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
