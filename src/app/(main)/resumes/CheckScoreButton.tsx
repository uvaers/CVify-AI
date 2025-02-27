"use client";     

import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";

export default function CheckScoreButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.open('https://resume.naukri.com/resume-quality-score', '_blank', 'noopener,noreferrer')}
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
    >
      <LineChart className="size-4" />
      Check your resume score
    </Button>
  );
}   