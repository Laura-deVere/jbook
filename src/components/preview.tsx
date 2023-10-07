import { useEffect, useRef } from "react";

interface PreviewProps {
    code: string;
}
const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        console.error(err);
                        const root = document.querySelector("#root");
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + "<div>"
                    }
                },false);
            </script>
        </body>
    </html>
`

const Preview: React.FC<PreviewProps> = ({code}) => {

    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        iframeRef.current.contentWindow.postMessage(code, "*")
    },[code]);

    {/* sandbox no direct access between parent and child */}
    {/* allow-same-origin | allows direct access */}
    {/* allow-scripts | allows script execution */}
    return <iframe ref={iframeRef} sandbox="allow-scripts" src="/test.html" srcDoc={html}/>
}

export default Preview;