import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePdfDocument } from "@/lib/pdf/resume-pdf-document";
import { parseResumeImport } from "@/lib/validation/resume-schema";
import type { ResumeDocument } from "@/lib/types/resume";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resume = parseResumeImport(body) as ResumeDocument;
    const buffer = await renderToBuffer(<ResumePdfDocument resume={resume} />);

    const name =
      resume.sections.contact.fullName.replace(/\s+/g, "_") || "resume";

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name}_resume.pdf"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF export failed" }, { status: 400 });
  }
}
