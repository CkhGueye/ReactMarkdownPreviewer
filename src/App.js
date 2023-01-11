import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { defaultText } from "./defaultText";

export default function App() {
  const [input, setInput] = useState(defaultText);
  const handleInput = (e) => {
    const text = e.target.value;
    setInput(text);
  };

  return (
    <>
      <div className="App">
        <span className="dots"></span>
        <div className="block-editor">
          <div className="title">Editor</div>
          <textarea
            id="editor"
            type="text"
            value={input}
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="block-preview">
          <div className="title">Previewer</div>
          <div id="preview">
            <ReactMarkdown
              children={input}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return !inline ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      language="javascript"
                      //language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        Designed and coded by{" "}
        <a href="https://linkedin.com/in/cheikhouwgueye">cheikhouw</a>
      </div>
    </>
  );
}
