import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { env } from '@/lib/env';
import { ExportType } from '@/types/export';

export const fetchExport = async (
  exportId: string,
  sent: boolean = false
): Promise<ExportType> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.refreshToken) {
    throw new Error('No se pudo obtener una sesión válida o el token no está disponible.');
  }

  const endpoint = sent ? `/export/export-sent/${exportId}` : `/export/${exportId}`;
  const url = env.NEXT_PUBLIC_API_URL + endpoint;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.refreshToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error al obtener export:', errorData);
    throw new Error(`Error al obtener export: ${response.statusText}`);
  }

  const data = (await response.json()) as ExportType;
  return data;
};
