export interface TypesStatusByInstance {
  status: string;
  data: Data;
}

interface Data {
  creationTime: string;
  description: string;
  richDescription: string;
  executionState: string;
  state: string;
  lastModificationTime: string;
  name: string;
  piid: string;
  caseFolderID: string;
  caseFolderServerName: string;
  processTemplateID: string;
  processTemplateName: string;
  processAppName: string;
  processAppAcronym: string;
  processAppID: string;
  result: null;
  snapshotName: string;
  snapshotID: string;
  branchID: string;
  branchName: string;
  snapshotTip: boolean;
  startingDocumentServerName: null;
  parentCaseId: null;
  parentActivityId: null;
  workflowApplication: null;
  dueDate: string;
  comments: null;
  tasks: null;
  documents: null;
  actionDetails: null;
  relationship: null;
  diagram: Diagram2;
  actions: string[];
  starterId: string;
}

interface Diagram2 {
  processAppID: string;
  milestone: null;
  step: Step2[];
  lanes: Lane[];
  orphaned: null;
}

interface Step2 {
  name: string;
  type: string;
  activityType: null | string;
  externalID: null | string;
  diagram: Diagram | null;
  lane: string;
  x: number;
  y: number;
  attachedTimer: AttachedTimer[] | AttachedTimer2[] | null;
  preTrackingPoint: null;
  postTrackingPoint: null;
  attachedEventHandler: null;
  lines: Line[] | null;
  tokenID: string[] | null;
  taskID: null | string;
  ID: string;
}

interface AttachedTimer2 {
  name: string;
  description: string;
  richDescription: string;
  tokenID: string[];
  ID: string;
}

interface Diagram {
  processAppID: string;
  milestone: null;
  step: Step[];
  lanes: Lane[];
  orphaned: null;
}

interface Lane {
  name: string;
  height: number;
  system: boolean;
}

interface Step {
  name: string;
  type: string;
  activityType: null | string;
  externalID: null | string;
  diagram: null;
  lane: string;
  x: number;
  y: number;
  attachedTimer: AttachedTimer[] | null;
  preTrackingPoint: null;
  postTrackingPoint: null;
  attachedEventHandler: null;
  lines: Line[] | null;
  tokenID: null;
  taskID: null;
  ID: string;
}

interface Line {
  to: string;
  points: string;
  tokenID: null;
  name: string;
}

interface AttachedTimer {
  name: string;
  description: string;
  richDescription: string;
  tokenID: null;
  ID: string;
}