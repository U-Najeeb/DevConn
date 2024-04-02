import { CopyBlock, hybrid } from "react-code-blocks";

type codeSnippetProps = {
  snippet: string;
};

const CodeSnippet: React.FC<codeSnippetProps> = ({ snippet }) => {
  return (
    <div className="p-2">
      <div>
        <div className="bg-[#1D1F21] flex gap-1 p-4 rounded-t-lg ">
          <span className="w-[10px] h-[10px] bg-red-700  block rounded-full "></span>
          <span className="w-[10px] h-[10px] bg-yellow-500  block rounded-full "></span>
          <span className="w-[10px] h-[10px] bg-green-500 block rounded-full "></span>
        </div>
        <CopyBlock
          text={snippet}
          language="jsx"
          theme={hybrid}
          wrapLongLines
          showLineNumbers={false}
          customStyle={{
            borderRadius: "0",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
          codeBlock
        />
      </div>
    </div>
  );
};

export default CodeSnippet;
