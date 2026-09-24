import LegacyIcon from "components/compat/LegacyIcon";
import React, { Component } from "react";
import FileUploader, {
  type UploadedFile,
  type UploadSchema,
} from "components/admin/FormItems/uploaders/UploadService";
import Errors from "../error/errors";

export interface FilesUploaderProps {
  value?: UploadedFile | UploadedFile[] | undefined;
  onChange?: ((value: UploadedFile[]) => void) | undefined;
  schema?: UploadSchema | undefined;
  path?: string | undefined;
  max?: number | undefined;
  readonly?: boolean | undefined;
}

interface FilesUploaderState {
  loading: boolean;
}

class FilesUploader extends Component<FilesUploaderProps, FilesUploaderState> {
  input: React.RefObject<HTMLInputElement | null>;

  constructor(props: FilesUploaderProps) {
    super(props);
    this.state = {
      loading: false,
    };
    this.input = React.createRef<HTMLInputElement>();
  }

  value = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  fileList = () => {
    return this.value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: "done",
      url: item.publicUrl,
    }));
  };

  handleRemove = (id: string) => {
    this.props.onChange?.(this.value().filter((item) => item.id !== id));
  };

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      const file = files[0];
      if (!file) return;

      FileUploader.validate(file, this.props.schema);

      this.setState({ loading: true });

      const uploadedFile = await FileUploader.upload(
        this.props.path ?? "",
        file,
        this.props.schema,
      );

      if (this.input.current) this.input.current.value = "";

      this.setState({ loading: false });
      this.props.onChange?.([...this.value(), uploadedFile]);
    } catch (error) {
      if (this.input.current) this.input.current.value = "";
      this.setState({ loading: false });
      Errors.showMessage(error);
    }
  };

  formats = () => {
    const { schema } = this.props;

    if (schema && schema.formats) {
      return schema.formats.map((format) => `.${format}`).join(",");
    }

    return undefined;
  };

  override render() {
    const { max, readonly } = this.props;
    const { loading } = this.state;

    const uploadButton = (
      <label
        className="btn btn-outline-secondary px-4 mb-2"
        style={{ cursor: "pointer" }}
      >
        {"Upload a file"}
        <input
          style={{ display: "none" }}
          disabled={loading || readonly}
          accept={this.formats()}
          type="file"
          onChange={this.handleChange}
          ref={this.input}
        />
      </label>
    );

    return (
      <div>
        {readonly || (max && this.fileList().length >= max)
          ? null
          : uploadButton}

        {this.value() && this.value().length ? (
          <div>
            {this.value().map((item) => {
              return (
                <div key={item.id}>
                  <LegacyIcon className="la la-link text-muted mr-2" />

                  <a
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {item.name}
                  </a>

                  {!readonly && (
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => this.handleRemove(item.id)}
                    >
                      <LegacyIcon className="la la-times" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default FilesUploader;
