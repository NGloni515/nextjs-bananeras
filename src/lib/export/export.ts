import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import axios from '@/lib/axios';
import { ExportType } from '@/types/export';

export const fetchExport = async (
  exportId: string,
  sent: boolean = false
): Promise<ExportType> => {
  const session = await getServerSession(authOptions);
  const headers = session ? { Authorization: `Bearer ${session.refreshToken}` } : {};
  const endpoint = sent ? `/export/export-sent/${exportId}` : `/export/${exportId}`;
  const response = await axios.get<ExportType>(endpoint, { headers });
  return response.data;
};
