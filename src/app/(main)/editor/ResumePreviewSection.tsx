"use client";

import ResumePreview from "@/components/ResumePreview";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  const handleScoreCheck = () => {
    window.open('https://resume.naukri.com/resume-quality-score', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
        <Button
          variant="outline"
          size="icon"
          title="Check Resume Score"
          onClick={handleScoreCheck}
          className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <LineChart className="size-4" />
        </Button>
      </div>
      <ResumePreview
        resumeData={resumeData}
        className="h-full w-full overflow-y-auto bg-white shadow-xl"
      />
    </div>
  );
}