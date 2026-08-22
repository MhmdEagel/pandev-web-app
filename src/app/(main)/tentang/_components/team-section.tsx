import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Nama Anggota 1",
    role: "Frontend Developer",
    image: "/assets/profile-placeholder.png",
  },
  {
    name: "Nama Anggota 2",
    role: "Backend Developer",
    image: "/assets/profile-placeholder.png",
  },
  {
    name: "Nama Anggota 3",
    role: "UI/UX Designer",
    image: "/assets/profile-placeholder.png",
  },
  {
    name: "Nama Anggota 4",
    role: "Project Manager",
    image: "/assets/profile-placeholder.png",
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold sm:text-4xl uppercase text-primary">Meet Our Team</h2>
        <p className="mt-2 text-muted-foreground">
          Tim profesional yang berpengalaman di bidangnya
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-primary" />
              <Image
                src={"/assets/profile-placeholder.png"}
                alt={member.name}
                width={160}
                height={160}
                className="relative rounded-full object-cover"
              />
            </div>
            <h3 className="font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
