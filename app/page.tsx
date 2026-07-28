import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const galleryImages = [
    "/2.jpeg",
    "/3.jpeg",
    "/4.jpeg",
    "/1.jpeg",
    "/5.jpeg",
    "/6.jpeg",
    "/7.jpeg",
    "/8.jpeg",
    "/9.jpeg",
    "/10.jpeg",
  ];

  const sponsorImages = ["/sponsor1.jpeg", "/sponsor2.jpeg"];

  const socialLinks = [
    {
      href: "https://www.instagram.com/dazzlefootballclub/?hl=en",
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
        </svg>
      ),
    },
    {
      href: "https://www.tiktok.com/@fcdazzle?_r=1&_t=ZS-98PzmgBX0Xk",
      label: "TikTok",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M14.5 2c.8 2 2.4 3.2 4.6 3.4v2.7c-1.7.2-3.2-.3-4.6-1.3v6.4c0 3.5-2.8 6.3-6.3 6.3S1.9 15.8 1.9 12.3 4.7 6 8.2 6c.3 0 .7 0 1 .1v2.8a4.3 4.3 0 0 0-1-.1c-1.8 0-3.3 1.5-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3V2h2.7Z" />
        </svg>
      ),
    },
    {
      href: "https://whatsapp.com/channel/0029Va5anqnD38CN9aHJmI1Z",
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 2a10 10 0 0 0-8.7 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a7.9 7.9 0 0 1-4-.9l-.3-.2-3 .8.8-2.9-.2-.3A7.9 7.9 0 1 1 12 20Zm4.4-5.8c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.7c-.2-.3 0-.5.1-.6l.4-.4c.1-.1.2-.2.2-.4s0-.3-.1-.4l-.7-1.7c-.1-.2-.2-.3-.4-.3H8.3c-.2 0-.4.1-.5.3-.2.2-.5.5-.5 1.2s.6 2.7 1.4 3.8c.8 1.1 3.2 2.6 4.8 2.9.2 0 .4 0 .6-.1.2-.1.5-.2.7-.4.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5l-.6-.9c-.1-.2-.2-.2-.4-.1Z" />
        </svg>
      ),
    },
    {
      href: "https://youtube.com/@dazzlefootballclub?si=Yna2MvezB4HjNNMh",
      label: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M23 7.5a3.4 3.4 0 0 0-2.4-2.4C19.1 4.5 12 4.5 12 4.5s-7.1 0-8.6.6A3.4 3.4 0 0 0 1 7.5 35.8 35.8 0 0 0 1 12a35.8 35.8 0 0 0 0 4.5 3.4 3.4 0 0 0 2.4 2.4C4.9 19.5 12 19.5 12 19.5s7.1 0 8.6-.6a3.4 3.4 0 0 0 2.4-2.4A35.8 35.8 0 0 0 23 12a35.8 35.8 0 0 0 0-4.5ZM9.8 15.4V8.6l6.4 3.4-6.4 3.4Z" />
        </svg>
      ),
    },
    {
      href: "https://x.com/fcdazzle_?s=11",
      label: "X",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M18.9 2H22l-6.8 7.8L23.3 22h-5.9l-4.7-6.2L7.6 22H4.5l7.2-8.2L.7 2h6l4.2 5.6L18.9 2Zm-1 18h1.1L6.2 4H5.1l12.8 16Z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-2 py-5 shadow-sm backdrop-blur sm:px-4 lg:px-6">
        <div className="flex shrink-0 items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-50 sm:h-12 sm:w-12">
            <Image
              src="/dazzlebody.jpeg"
              alt="Dazzle Football Academy logo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center">
          <span className="text-[10px] text-green-800 font-bold uppercase leading-none tracking-wide text-slate-900 sm:text-xs lg:text-lg">
            DAZZLE FOOTBALL ACADEMY
          </span>
        </div>

        <div className="flex shrink-0 items-center justify-end">
          <Link
            href="/register"
            className="rounded-md bg-green-700 px-2 py-1.5 text-[10px] font-semibold text-white transition hover:bg-green-700 sm:px-3 sm:py-2 sm:text-xs"
          >
            Register now
          </Link>
        </div>
      </nav>

      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 lg:px-8">
        <Image
          src="/1.jpeg"
          alt="Football training session"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/50" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-6 text-left">
          <h1 className="max-w-4xl text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-6xl">
            Developing <span className="text-green-600">NIGERIA&apos;S</span> next generation of football <span className="text-green-600">CHAMPIONS</span>.
          </h1>

          <p className="max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
            Elite coaching, structured player development, competitive training, and a proven pathway to football success.
          </p>

          <div className="w-full text-center">
            <p className="mx-auto max-w-3xl text-sm leading-7 text-gray-300 font-medium sm:text-base">
              🏆 Proud home of the 2026 U12 Dana Cup Champions and 2026 U14 Dana Cup Runners-up.
            </p>
          </div>

          <div className="w-full text-center">
            <Link
              href="/register"
              className="inline-flex rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-6 sm:text-base"
            >
              Register now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
              Dazzle in Action
            </p>
            <h2 className="text-3xl font-black uppercase tracking-wide text-slate-900 sm:text-4xl">
              Where Future Champions Are Made
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Take a glimpse into our training sessions, competitive matches, and the moments that shape tomorrow&apos;s football stars.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {galleryImages.map((image, index) => (
              <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={image}
                  alt={`Dazzle academy activity ${index + 1}`}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/20 transition duration-300 group-hover:bg-slate-950/45" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
              Our Sponsors
            </p>
            <h2 className="text-3xl font-black uppercase tracking-wide text-slate-900 sm:text-4xl">
              Partners who believe in our vision
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              We&apos;re proud to work with organizations that share our commitment to developing young football talent and creating opportunities for future champions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sponsorImages.map((image, index) => (
              <div key={image} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={`Sponsor ${index + 1}`}
                  fill
                  className="object-contain p-6 transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/10 transition duration-300 group-hover:bg-slate-950/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white/10">
              <Image src="/dazzlebody.jpeg" alt="Dazzle FC logo" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xl font-bold uppercase tracking-wide">Dazzle FC</p>
              <p className="text-sm text-slate-300">Developing champions through discipline, passion, and purpose.</p>
            </div>
          </div>

          <div className="max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-green-400">
              Stay Connected With Us on Our Socials
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:-translate-y-1 hover:bg-green-700"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
