import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import {
  mockAccounts,
  mockBanks,
  mockTransactions,
  mockUser,
} from "@/components/mockData";

const Home = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const page =
    typeof window !== "undefined" ? Number(searchParams?.page) || 1 : 1;

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={mockUser.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox />
        </header>

        <RecentTransactions
          accounts={mockAccounts}
          transactions={mockTransactions}
          appwriteItemId={mockAccounts[0].appwriteItemId}
          page={page}
        />
      </div>

      <RightSidebar
        user={mockUser}
        transactions={mockTransactions}
        banks={mockBanks}
      />
    </section>
  );
};

export default Home;
