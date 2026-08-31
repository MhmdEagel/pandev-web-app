"use client";

import { useSession } from "@/lib/auth-client";
import DashboardHeader from "../_components/dashboard-header";
import AvatarForm from "./_components/avatar/avatar-form";
import InformationForm from "./_components/information-form";
import SecurityForm from "./_components/security-form";

export default function SettingsPage() {

  const session = useSession()
  if (!session.data) return null
  const currentUser = session.data.user
  console.log(currentUser)
  return (
    <div className="space-y-4">
      <DashboardHeader title="Pengaturan" description="Kelola avatar, data diri, dan keamanan akun Anda" />
      <AvatarForm />
      <InformationForm userEmail={currentUser?.email} userFullname={currentUser?.name} onsuccess={() => session.refetch()} />
      <SecurityForm />
    </div>
  )
}
