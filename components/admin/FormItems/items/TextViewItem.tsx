import React, { Component, type ReactNode } from "react";

interface TextViewItemProps {
  value?: unknown;
  prefix?: string;
  label?: ReactNode;
}

class TextViewItem extends Component<TextViewItemProps> {
  override render() {
    if (
      !this.props.value &&
      this.props.value !== 0 &&
      this.props.value !== false
    ) {
      return null;
    }

    const value = `${this.props.prefix ? `${this.props.prefix} ` : ""}${String(
      this.props.value,
    )}`;

    return (
      <div className="form-group">
        <label className="col-form-label">{this.props.label}</label>

        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          value={value}
        />
      </div>
    );
  }
}

export default TextViewItem;
