export function LoadingIcon() {
  return (
    <svg width="180" height="80vh" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 10 80 Q 52.5 10, 95 80 T 180 80"
        stroke="green"
        fill="transparent"
      >
        <animate
          attributeName="d"
          begin="1s"
          dur="3s"
          values="M 10 80 Q 52.5 10, 95 80 T 180 80; M 10 80 Q 52.5 80, 95 80 T 180 80; M 10 80 Q 52.5 10, 95 80 T 180 80;"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          begin="1s"
          dur="10s"
          values="red; orange; yellow; green; blue; indigo; violet; red"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M 10 80 Q 52.5 80, 95 10 T 180 80"
        stroke="green"
        fill="transparent"
      >
        <animate
          attributeName="d"
          begin="1s"
          dur="3s"
          values="M 10 80 Q 52.5 80, 95 10 T 180 80; M 10 80 Q 52.5 80, 95 80 T 180 80; M 10 80 Q 52.5 80, 95 10 T 180 80"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          begin="1s"
          dur="10s"
          values="red; orange; yellow; green; blue; indigo; violet; red"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
