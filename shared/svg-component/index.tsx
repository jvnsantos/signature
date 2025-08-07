import { CSSProperties } from "react"

type Props = {
  className?: string
  style?: CSSProperties | string
}

export const DocumentSvgElement = ({ className, style }: Props) => {
  return <svg
    style={style as CSSProperties}
    className={className}
    version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#194320"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style={{ fill: '#183423' }} points="383.999,512 51.2,512 51.2,0 460.8,0 460.8,435.2 "></polygon> <polygon style={{ fill: "#408053" }} points="256,0 256,512 383.999,512 460.8,435.2 460.8,0 "></polygon> <g> <polygon style={{ fill: "#194320;" }} points="383.999,512 383.999,435.2 460.8,435.2 "></polygon> <rect x="275.2" y="102.4" style={{ fill: "#194320" }} width="38.4" height="192"></rect> <rect x="352" y="153.6" style={{ fill: "#194320;" }} width="38.4" height="140.8"></rect> </g> <g> <rect x="198.4" y="179.2" style={{ fill: "#408053" }} width="38.4" height="115.2"></rect> <rect x="121.6" y="140.8" style={{ fill: "#408053" }} width="38.4" height="153.6"></rect> </g> </g></svg>
}