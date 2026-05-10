import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
