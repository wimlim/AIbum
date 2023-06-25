/**
 * @file Help.tsx
 * @description help
 */

import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
interface HelpProps {
}

const markdownFilePath='./assets/help.md'
const readMarkdownFile=async (path:string,setter:React.Dispatch<React.SetStateAction<string>>)=>{
    const response = await fetch(path);
    const text = await response.text();
    setter(text);
}

export const Help: React.FC<HelpProps> = () => {
    const [helpFileContent, setHelpFileContent] = useState('');

    /*useEffect(() => {
        readMarkdownFile(markdownFilePath,setHelpFileContent)
    }, [])
    
    console.log(helpFileContent)
*/
    return (
        <div>
            <ReactMarkdown>
                {helpFileContent}
            </ReactMarkdown>
        </div>
    )
}