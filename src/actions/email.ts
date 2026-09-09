"use server";

export async function sendEmail(data: { email: string; name: string; message: string }) {
  // TODO: Implement email sending
  return { success: true, message: "Email berhasil dikirim" };
}
