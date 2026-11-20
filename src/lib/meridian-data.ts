export type ModuleInfo = {
  id: string;
  name: string;
  code: string;
  icon: "book" | "percent" | "clipboard" | "arrows" | "scale" | "calculator";
};

export const MODULES: ModuleInfo[] = [
  { id: "gl", name: "General Ledger Posting", code: "GLPOST01", icon: "book" },
  { id: "int", name: "Interest Posting", code: "INTPOST2", icon: "percent" },
  { id: "trd", name: "Trade Order", code: "TRDORD01", icon: "clipboard" },
  { id: "set", name: "Trade Settlement", code: "TRDSETL1", icon: "arrows" },
  { id: "rec", name: "Daily Reconciliation", code: "RECON001", icon: "scale" },
  { id: "tax", name: "Tax Computation", code: "TAXCALC", icon: "calculator" },
];

export const SUGGESTIONS = [
  "Settlement entries to the ledger",
  "Where is WS-BUS-DATE used?",
  "Reconciliation breaks",
  "Tax on interest",
];

export type Answer = {
  summary: string;
  tags: string[];
  confidence: string;
  detailed: string[];
  evidence: string;
};

const INTPOST2: Answer = {
  summary:
    "INTPOST2 posts interest to customer accounts by reading ACCTFILE and updating the DB2 table MRDN.ACCOUNT, and is invoked from a nightly JCL job.",
  tags: ["AI INSIGHT", "TECHNICAL · BUSINESS"],
  confidence: "HIGH",
  detailed: [
    "Purpose: posts periodic interest to customer accounts.",
    "Inputs: reads ACCTFILE (CICS/VSAM file).",
    "Data: updates the MRDN.ACCOUNT DB2 table via embedded SQL.",
    "Execution: called from a JCL job step in the nightly batch.",
    "Coupling: shares data with other programs through COUPLED_VIA_SQL and COUPLED_VIA_DATA relationships.",
    "Risk: modernisation risk is rated Medium because of the SQL and file dependencies.",
    "Gap: line-level evidence and runtime metrics were not provided.",
  ],
  evidence:
    "The answer is based on the program metadata and enrichment data supplied for the matched program INTPOST2. The enrichment data lists ACCTFILE under files read and MRDN.ACCOUNT under SQL tables referenced, which indicates the program reads account records and updates the account table. The coupling data shows COUPLED_VIA_SQL and COUPLED_VIA_DATA links to neighbouring programs, which supports the statement about shared dependencies. JCL mapping shows a job step calling this program, which supports the batch execution claim. No log or runtime metrics were supplied, so throughput, timing and failure rates cannot be confirmed from the available material.",
};

const SETTLEMENT: Answer = {
  summary:
    "TRDSETL1 and GLPOST01 post settlement entries to the ledger: TRDSETL1 writes settled trades to SETLFILE, which GLPOST01 reads to create the general ledger postings.",
  tags: ["AI INSIGHT", "TECHNICAL · BUSINESS"],
  confidence: "HIGH",
  detailed: [
    "Purpose: moves settled trade values into the general ledger.",
    "Inputs: TRDSETL1 reads TRADEFILE and writes SETLFILE.",
    "Data: GLPOST01 reads SETLFILE and inserts rows into MRDN.GL_ENTRY.",
    "Execution: both run in sequence in the end-of-day settlement JCL stream.",
    "Coupling: linked through COUPLED_VIA_DATA on SETLFILE.",
    "Risk: modernisation risk is rated High because two programs share one file layout.",
    "Gap: copybook versions for SETLFILE were not provided.",
  ],
  evidence:
    "The answer is based on the file usage and JCL mapping supplied for TRDSETL1 and GLPOST01. TRDSETL1 lists SETLFILE under files written, and GLPOST01 lists the same file under files read, which indicates a producer–consumer relationship. GLPOST01 references MRDN.GL_ENTRY in its SQL tables, which supports the ledger posting claim. The JCL mapping shows both programs in consecutive steps of the same job. Copybook versions were not supplied, so field-level compatibility cannot be confirmed.",
};

const BUSDATE: Answer = {
  summary:
    "WS-BUS-DATE is used in GLPOST01, INTPOST2 and RECON001 to stamp postings and select the processing window for the current business day.",
  tags: ["AI INSIGHT", "TECHNICAL"],
  confidence: "MEDIUM",
  detailed: [
    "Purpose: holds the current business date for batch processing.",
    "Inputs: populated from the control record in CTLFILE at program start.",
    "Data: written to posting date columns in MRDN.GL_ENTRY and MRDN.ACCOUNT.",
    "Execution: referenced in the nightly batch programs only.",
    "Coupling: shared through a common copybook, COUPLED_VIA_DATA.",
    "Risk: date handling changes would affect three programs at once.",
    "Gap: references in online CICS programs were not analysed.",
  ],
  evidence:
    "The answer is based on the variable cross-reference supplied for the six programs. WS-BUS-DATE appears in GLPOST01, INTPOST2 and RECON001 through a shared copybook. Each program moves the value from the CTLFILE control record during initialisation, which supports the source claim. SQL statements in GLPOST01 and INTPOST2 use the variable as a host variable for posting dates. Online programs were outside the analysed scope, so other usages cannot be ruled out.",
};

const RECON: Answer = {
  summary:
    "RECON001 detects reconciliation breaks by comparing ledger balances in MRDN.GL_ENTRY against account balances in MRDN.ACCOUNT and writing mismatches to BREAKFILE.",
  tags: ["AI INSIGHT", "BUSINESS"],
  confidence: "HIGH",
  detailed: [
    "Purpose: identifies daily balance differences between ledger and accounts.",
    "Inputs: reads MRDN.GL_ENTRY and MRDN.ACCOUNT via embedded SQL.",
    "Data: writes break records to BREAKFILE for operations review.",
    "Execution: runs as the final step of the nightly batch.",
    "Coupling: depends on GLPOST01 and INTPOST2 outputs through COUPLED_VIA_SQL.",
    "Risk: modernisation risk is rated Medium because of its upstream dependencies.",
    "Gap: break tolerance thresholds were not provided.",
  ],
  evidence:
    "The answer is based on the program metadata supplied for RECON001. Its SQL tables referenced include MRDN.GL_ENTRY and MRDN.ACCOUNT, and BREAKFILE is listed under files written. The coupling data shows COUPLED_VIA_SQL links to GLPOST01 and INTPOST2, which supports the dependency claim. JCL mapping places RECON001 in the last step of the nightly job. Threshold parameters were not supplied, so the exact break rules cannot be confirmed.",
};

const TAX: Answer = {
  summary:
    "TAXCALC computes withholding tax on interest by reading posted interest amounts from MRDN.ACCOUNT after INTPOST2 runs and writing tax entries to TAXFILE.",
  tags: ["AI INSIGHT", "TECHNICAL · BUSINESS"],
  confidence: "MEDIUM",
  detailed: [
    "Purpose: calculates tax due on credited interest.",
    "Inputs: reads interest amounts from MRDN.ACCOUNT.",
    "Data: writes tax entries to TAXFILE and updates tax fields in MRDN.ACCOUNT.",
    "Execution: runs after INTPOST2 in the nightly batch.",
    "Coupling: linked to INTPOST2 through COUPLED_VIA_SQL.",
    "Risk: modernisation risk is rated Medium because tax rules are hard-coded.",
    "Gap: current tax rate tables were not provided.",
  ],
  evidence:
    "The answer is based on the program metadata supplied for TAXCALC and INTPOST2. TAXCALC references MRDN.ACCOUNT in its SQL tables and lists TAXFILE under files written. The coupling data shows a COUPLED_VIA_SQL link to INTPOST2, and JCL mapping places TAXCALC in the step after INTPOST2. Rate tables were not supplied, so the exact tax percentages cannot be confirmed.",
};

const TRDORD: Answer = {
  summary:
    "TRDORD01 captures customer trade orders from ORDERFILE, validates them against MRDN.ACCOUNT and writes accepted orders to TRADEFILE for settlement by TRDSETL1.",
  tags: ["AI INSIGHT", "TECHNICAL · BUSINESS"],
  confidence: "HIGH",
  detailed: [
    "Purpose: validates and books customer trade orders.",
    "Inputs: reads ORDERFILE (VSAM file).",
    "Data: checks balances in MRDN.ACCOUNT and writes TRADEFILE.",
    "Execution: called from the intraday order JCL job.",
    "Coupling: feeds TRDSETL1 through COUPLED_VIA_DATA on TRADEFILE.",
    "Risk: modernisation risk is rated Medium because of the shared file layout.",
    "Gap: order rejection codes were not provided.",
  ],
  evidence:
    "The answer is based on the program metadata supplied for TRDORD01. ORDERFILE is listed under files read and TRADEFILE under files written, and MRDN.ACCOUNT appears in its SQL tables referenced. The coupling data shows a COUPLED_VIA_DATA link to TRDSETL1 on TRADEFILE, which supports the hand-off claim. JCL mapping shows the program in the intraday order job. Rejection code tables were not supplied, so validation rules cannot be fully confirmed.",
};

export function findAnswer(question: string): Answer {
  const q = question.toLowerCase();
  if (q.includes("trdord") || q.includes("trade order")) return TRDORD;
  if (q.includes("intpost")) return INTPOST2;
  if (q.includes("glpost") || q.includes("trdsetl")) return SETTLEMENT;
  if (q.includes("tax")) return TAX;
  if (q.includes("recon") || q.includes("break")) return RECON;
  if (q.includes("bus-date") || q.includes("bus date") || q.includes("ws-")) return BUSDATE;
  if (q.includes("settle") || q.includes("ledger")) return SETTLEMENT;
  return INTPOST2;
}
