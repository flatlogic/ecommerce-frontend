import React, { Component, type ReactNode } from "react";
import ImagesUploader from "components/admin/FormItems/uploaders/ImagesUploader";
import type { UploadedFile } from "components/admin/FormItems/uploaders/UploadService";

interface ImagesViewItemProps {
  value?: UploadedFile | UploadedFile[] | undefined;
  label?: ReactNode;
}

class ImagesViewItem extends Component<ImagesViewItemProps> {
  valueAsArray = (): UploadedFile[] => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  override render() {
    if (!this.valueAsArray().length) {
      return null;
    }

    return (
      <div className="form-group">
        <label className="col-form-label">{this.props.label}</label>
        <br />
        <ImagesUploader readonly value={this.valueAsArray()} />
      </div>
    );
  }
}

export default ImagesViewItem;
