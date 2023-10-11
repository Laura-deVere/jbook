import "./preview.css";

import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
        <head>
          <style>html { background-color: white; }</style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (err) => {
                  const root = document.querySelector("#root");
                  root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + "<div>"
                }
                window.addEventListener("error", (event) => {
                  console.log(event);
                  handleError(event.error)
                }
                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        console.error(err);
                        handleError(err);
                    }
                },false);
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  // {/* sandbox no direct access between parent and child */}
  // {/* allow-same-origin | allows direct access */}
  // {/* allow-scripts | allows script executions */}
  return (
    <div className='preview-wrapper'>
      <iframe
        title='title'
        ref={iframeRef}
        sandbox='allow-scripts'
        src='/test.html'
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
