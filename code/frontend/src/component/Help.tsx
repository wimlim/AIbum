/**
 * @file Help.tsx
 * @description help
 */

import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { helpFileContent } from "../assets/helpDocument"
interface HelpProps {
}


export const Help: React.FC<HelpProps> = () => {
    return (
        <div>
            <ReactMarkdown>
                {helpFileContent}
            </ReactMarkdown>
        </div>
    )
}