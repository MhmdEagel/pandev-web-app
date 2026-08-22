"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/contact-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 w-full max-w-lg mx-4 p-8 rounded-2xl bg-[#1b1b1b]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mt-1 text-white">Hubungi Kami</h2>
        </div>

        <form className="space-y-6 text-white">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              className="bg-white/5 border-white/20 placeholder:text-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="janedoe@email.com"
              className="bg-white/5 border-white/20 placeholder:text-white/70"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan</Label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message here"
              className="w-full min-h-[120px] rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-base focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              className="bg-violet-500 hover:bg-violet-600 text-white px-8"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
