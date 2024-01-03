import { AdminContainer } from "@/components/containers";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <AdminContainer classname="">
      <Outlet/>
    </AdminContainer>
  )
}
