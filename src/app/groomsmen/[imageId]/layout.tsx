import { FC, ReactNode } from "react";

const GroomsmanCardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var viewport = document.querySelector('meta[name="viewport"]');
              viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
              setTimeout(function() {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1');
              }, 300);
            })();
          `,
        }}
      />
      {children}
    </>
  );
};

export default GroomsmanCardLayout;
