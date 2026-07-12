import { ImageIcon } from "lucide-react";

type MediaPlaceholderProps = {
  width: number;
  height: number;
  filename: string;
  description: string;
  className?: string;
  dark?: boolean;
};

export function MediaPlaceholder({
  width,
  height,
  filename,
  description,
  className = "",
  dark = false,
}: MediaPlaceholderProps) {
  return (
    <figure
      className={`media-placeholder ${dark ? "media-placeholder-dark" : ""} ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-label={`Bildplatzhalter: ${description}`}
    >
      <ImageIcon aria-hidden="true" />
      <figcaption>
        <strong>{description}</strong>
        <span>{filename}</span>
        <small>
          Originalformat {width} × {height} px
        </small>
      </figcaption>
    </figure>
  );
}
