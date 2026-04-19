import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ from?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const redirectTo = resolvedSearchParams?.from || "/admin";

  return <AdminLoginForm redirectTo={redirectTo} />;
}
