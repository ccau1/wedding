interface UploadedFile {
  _id: string;
  name: string;
  bucketType: string;
  bucketFilePath: string;
  bucketFileName: string;
  originalFileName: string;
  extension: string;
  size: number;
  url: string;
  // whether this should be shown or not
  thumbnailUrl: string;
  createdBy: string;
  compressions: [
    {
      quality: number;
      url: string;
      bucketFileName: string;
      bucketFilePath: string;
    }
  ];
  tags: string[];
  mimeType: string;
  organization: string;
  isArchived: boolean;
  updatedAt: Date;
  createdAt: Date;
}
