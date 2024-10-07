type LogoProps = {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({
  width = "24px",
  height = "24px",
  fill = "currentColor",
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={fill}
    className={className}
  >
    <path d="m0 17.725 2.031 3.504A2.423 2.423 0 0 0 4.2 22.564h13.457l-2.792-4.839H0zM24 17.749c0-.485-.146-.939-.388-1.311L15.73 2.723a2.416 2.416 0 0 0-2.144-1.287H9.419l12.178 21.103 1.918-3.326c.388-.638.485-.914.485-1.464zM12.874 14.286 7.428 4.851l-5.446 9.435z" />
  </svg>
);
