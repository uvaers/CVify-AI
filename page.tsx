import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resum.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import WaterDropGrid from "@/components/ui/WaterDropGrid";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
      <div className="absolute inset-0 z-0 overflow-hidden md:left-60 left-10">
        <WaterDropGrid />
      </div>
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
          Free{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            ATS-Friendly Resume
          </span>{" "}
          in Minutes
        </h1>
        <p className="text-lg text-gray-200">
          Our <span className="font-bold">resume builder</span> empowers you to create a polished, professional resume with ease, even if you&apos;re just starting out.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/resumes">Get started</Link>
        </Button>
      </div>

      <div className="relative z-10">
        <Image
          src={resumePreview}
          alt="Resume preview"
          width={600}
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>

    
    </main>
  );
}