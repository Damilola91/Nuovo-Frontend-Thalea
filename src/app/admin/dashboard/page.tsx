/*import AdminDashboard from "../../../components/Pages/AdminDashboard/AdminDashboard";

const AdminDashboardPage = () => {
  return <AdminDashboard />;
};

export default AdminDashboardPage;
*/

import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard | Thălēa Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}

