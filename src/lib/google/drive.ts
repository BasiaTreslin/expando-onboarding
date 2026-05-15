import { getDriveClient } from './client';

export async function createEmployeeFolder(name: string): Promise<string> {
  const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!parentFolderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID env var is not set');
  }

  const drive = getDriveClient();

  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    },
    fields: 'id',
  });

  const folderId = response.data.id;
  if (!folderId) {
    throw new Error('Drive API did not return a folder ID');
  }

  return folderId;
}
