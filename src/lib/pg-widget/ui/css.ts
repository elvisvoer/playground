import { css } from "lit";

export const variables = css`
  :host {
    --bg-opacity: 1;
  }
`;

export const container = css`
  .container {
    width: 100%;
  }
`;

export const flex = css`
  .flex {
    display: flex;
  }
`;

export const flex1 = css`
  .flex-1 {
    flex: 1 1 0%;
  }
`;

export const bgGray100 = css`
  .bg-gray-100 {
    background-color: rgba(247, 250, 252, var(--bg-opacity));
  }
`;
