interface JobBilling {
  type: string;
  description: string;
  payToUser?: string;
  amount: number;
}

interface JobParticipantRequest {
  user: string;
  role: string;
  status: string;
  // requested payAmount
  payAmount: number;
  // when participant wants to suggest another pay
  counterOfferAmount?: number;
  // user who created this request. Could be
  // admin or user
  requestedBy: string;
}

interface JobParticipant {
  user: string;
  role: string;
  status: string;
  payAmount: number;
}

interface JobAttachment {
  file: string;
  url: string;
  thumbnail: string;
}

interface Job {
  _id: string;
  user: string;
  title: string;
  description: string;
  startDate?: Date;
  expectedCompletionDate?: Date;
  actualCompletionDate?: Date;
  status: JobStatus;
  billing?: {
    items: JobBilling[];
    amount: number;
  };
  participantRequests?: JobParticipantRequest[];
  participants?: JobParticipant[];
  attachments?: JobAttachment[];
}

interface JobCreate {
  title: string;
  description: string;
  attachments?: JobAttachment[];
  startDate?: Date;
  expectedCompletionDate?: Date;
  status: string;
}

enum JobRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}
interface JobSearch extends BaseSearchModel {
  users?: string[];

  titles?: string[];

  descriptions?: string[];

  startDateFr?: Date;

  startDateTo?: Date;

  expectedCompletionDateFr?: Date;

  expectedCompletionDateTo?: Date;

  actualCompletionDateFr?: Date;

  actionCompletionDateTo?: Date;

  status?: JobStatus[];

  billings?: Billing[];

  participantRequests?: ParticipantRequest[];

  participants?: Participant[];

  sortBy?: JobSort & BaseSort;
}

enum JobSort {
  TITLE = "title",
  DESCRIPTION = "description",
  START_DATE = "startDate",
  EXPECTED_COMPLETION_DATE = "expectedCompletionDate",
  ACTUAL_COMPLETION_DATE = "actualCompletionDate",
  STATUS = "status",
  BILLING_AMOUNT = "billingAmount",
  PARTICIPANT_USER = "participantUser",
}

enum JobStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  INCOMPLETE = "incomplete",
  ABANDONED = "abandoned",
}

enum JobRole {
  DESIGNER = "designer",
  CONSTRUCTOR = "constructor",
  PROJECT_MANAGER = "project_manager",
}

enum JobParticipantStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}
interface Participant {
  user: string;
  role: JobRole;
  status: JobParticipantStatus;
  acceptAmount?: number; // accepted pay amount
}
interface ParticipantRequest {
  user: string;
  role: JobRole;
  status: JobRequestStatus;
  requestedBy: string; // user or admin
  requestAmount?: number; // requested pay amount
}
interface UpdateJob {
  title?: string;

  description?: string;

  startDate?: Date;

  expectedCompletionDate?: Date;

  attachments?: Attachment[];
}
