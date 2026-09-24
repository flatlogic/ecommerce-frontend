import LegacyIcon from "components/compat/LegacyIcon";
import React, { Component } from "react";
import FileUploader, {
  type UploadedFile,
  type UploadSchema,
} from "components/admin/FormItems/uploaders/UploadService";
import Errors from "../error/errors";
import ImagesUploaderWrapper from "components/admin/FormItems/style/ImagesUploaderWrapper";

export interface ImagesUploaderProps {
  value?: UploadedFile | UploadedFile[] | undefined;
  onChange?: ((value: UploadedFile[]) => void) | undefined;
  schema?: UploadSchema | undefined;
  path?: string | undefined;
  max?: number | undefined;
  readonly?: boolean | undefined;
}

interface ImagesUploaderState {
  loading: boolean;
  imageSrc?: string | null;
  imageAlt?: string | null;
}

class ImagesUploader extends Component<
  ImagesUploaderProps,
  ImagesUploaderState
> {
  input: React.RefObject<HTMLInputElement | null>;

  constructor(props: ImagesUploaderProps) {
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

  doPreviewImage = (image: UploadedFile) => {
    this.setState({
      imageSrc: image.publicUrl,
      imageAlt: image.name,
    });
  };

  doCloseImageModal = () => {
    this.setState({
      imageSrc: null,
      imageAlt: null,
    });
  };

  override render() {
    const { max, readonly } = this.props;
    const { loading } = this.state;

    const uploadButton = (
      <label
        className="btn btn-outline-secondary px-4 mb-2"
        style={{ cursor: "pointer" }}
      >
        {"Upload an image"}
        <input
          style={{ display: "none" }}
          disabled={loading || readonly}
          accept="image/*"
          type="file"
          onChange={this.handleChange}
          ref={this.input}
        />
      </label>
    );

    return (
      <ImagesUploaderWrapper>
        {readonly || (max && this.fileList().length >= max)
          ? null
          : uploadButton}

        {this.value() && this.value().length ? (
          <div className="d-flex flex-row flex-wrap">
            {this.value().map((item) => {
              return (
                <div
                  className="mr-2 mb-2 img-card"
                  style={{ height: "100px" }}
                  key={item.id}
                >
                  <img
                    alt={item.name}
                    src={item.publicUrl}
                    className="img-thumbnail"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="img-buttons rounded-bottom">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => this.doPreviewImage(item)}
                    >
                      <LegacyIcon className="la la-search" />
                    </button>

                    {!readonly && (
                      <button
                        type="button"
                        className="btn btn-link ml-2"
                        onClick={() => this.handleRemove(item.id)}
                      >
                        <LegacyIcon className="la la-times" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </ImagesUploaderWrapper>
    );
  }
}

export default ImagesUploader;
