"use server";

import { env } from "@/lib/env";

export async function sendEmail(data: {
  email: string;
  name: string;
  message: string;
}) {
  const formData = new FormData();
  formData.append("access_key", env.WEB3FORM_API_KEY);
  formData.append("subject", "Email baru dari PanDev");
  formData.append("email", data.email);
  formData.append("name", data.name);
  formData.append("message", data.message);
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    return { message: "Email berhasil dikirim" };
  } catch (error) {
    throw error;
  }
}
