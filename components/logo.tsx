import Link from "next/link";

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
  <Link className="flex flex-row gap-2 items-center" href={"/"}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      className={className}
    >
      <g>
        <path d="M0,17.725l2.031,3.504l0,0c0.396,0.793,1.222,1.335,2.169,1.335l0,0l0,0h13.457l-2.792-4.839H0z" />
        <path d="M24,17.749c0-0.485-0.146-0.939-0.388-1.311L15.73,2.723c-0.405-0.769-1.214-1.287-2.144-1.287H9.419l12.178,21.103   l1.918-3.326C23.903,18.575,24,18.299,24,17.749z" />
        <polygon points="12.874,14.286 7.428,4.851 1.982,14.286  " />
      </g>
    </svg>
    <p className="p-0 m-0 hidden md:block text-xl font-bold">seomix.</p>
  </Link>
);
