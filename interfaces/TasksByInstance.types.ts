export interface TypesTasksByInstance {
  status: string;
  data: Data;
}

interface Data {
  total: number;
  tasks: Task[];
}

interface Task {
  tkiid: string;
  name: string;
  status: string;
  owner: null | string;
  assignedTo: string;
  assignedToDisplayName: string;
  assignedToID: number;
  assignedToType: string;
  dueTime: string;
  closeByUser: null | string;
  closeByUserFullName: null | string;
}