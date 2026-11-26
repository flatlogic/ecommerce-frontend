import { v4 as uuid } from "components/compat/uuid";
import Axios from "axios";
import config from "constants/config";

export interface UploadSchema {
  image?: boolean | undefined;
  size?: number | undefined;
  formats?: string[] | undefined;
}

export interface UploadedFile {
  id: string;
  name: string;
  sizeInBytes: number;
  privateUrl: string;
  publicUrl: string;
  new: boolean;
}

function extractExtensionFrom(filename: string): string | null {
  if (!filename) {
    return null;
  }

  const regex = /(?:\.([^.]+))?$/;
  return regex.exec(filename)?.[1] ?? null;
}

export default class FileUploader {
  static validate(file: File, schema?: UploadSchema) {
    if (!schema) {
      return;
    }

    if (schema.image) {
      if (!file.type.startsWith("image")) {
        throw new Error("You must upload an image");
      }
    }

    if (schema.size && file.size > schema.size) {
      throw new Error("File is too big.");
    }

    const extension = extractExtensionFrom(file.name);

    if (schema.formats && (!extension || !schema.formats.includes(extension))) {
      throw new Error("Invalid format");
    }
  }

  static async upload(
    path: string,
    file: File,
    schema?: UploadSchema,
  ): Promise<UploadedFile> {
    try {
      this.validate(file, schema);
    } catch (error) {
      return Promise.reject(error);
    }

    const extension = extractExtensionFrom(file.name);
    const id = uuid();
    const filename = `${id}.${extension}`;
    const privateUrl = `${path}/${filename}`;

    const publicUrl = await this.uploadToServer(file, path, filename);

    return {
      id: id,
      name: file.name,
      sizeInBytes: file.size,
      privateUrl,
      publicUrl,
      new: true,
    };
  }

  static async uploadToServer(
    file: File,
    path: string,
    filename: string,
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    const uri = `${config.baseURLApi}/file/upload/${path}`;
    await Axios.post(uri, formData, {
      headers: {
        "Content-Type": "multipart/new-data",
      },
    });

    const privateUrl = `${path}/${filename}`;

    return `${config.baseURLApi}/file/download?privateUrl=${privateUrl}`;
  }
}
