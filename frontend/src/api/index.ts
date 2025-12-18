const API_BASE = '/api';

export interface ApiUser {
  id: number;
  name: string;
  order: number | null;
}

export interface ApiMeeting {
  id: number;
  date: string;
  half_day: 'AM' | 'PM';
  start_time: string;
  title: string;
  location: string | null;
  is_all_staff: boolean;
  note: string | null;
  status: 'normal' | 'cancelled' | 'rescheduled';
  attendee_ids: number[];
}

export async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchWeekMeetings(weekStart: string): Promise<ApiMeeting[]> {
  const response = await fetch(`${API_BASE}/weeks/${weekStart}/meetings`);
  if (!response.ok) {
    throw new Error('Failed to fetch meetings');
  }
  return response.json();
}

export async function createMeeting(meeting: Omit<ApiMeeting, 'id'>): Promise<ApiMeeting> {
  const response = await fetch(`${API_BASE}/meetings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  });
  if (!response.ok) {
    throw new Error('Failed to create meeting');
  }
  return response.json();
}

export async function updateMeeting(
  id: number,
  meeting: Partial<Omit<ApiMeeting, 'id'>>,
): Promise<ApiMeeting> {
  const response = await fetch(`${API_BASE}/meetings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(meeting),
  });
  if (!response.ok) {
    throw new Error('Failed to update meeting');
  }
  return response.json();
}

export async function deleteMeeting(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/meetings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete meeting');
  }
}

// User management APIs
export async function createUser(user: Omit<ApiUser, 'id'>): Promise<ApiUser> {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
}

export async function updateUser(
  id: number,
  user: Partial<Omit<ApiUser, 'id'>>,
): Promise<ApiUser> {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}

